const path = require('path')
const fs = require('fs')
const cp = require('child_process')
const settingConfig = require('./setting.js')
let isLocked = false
const _id = utools.getNativeId()
let queryName = ''
const bookmark_file_path = utools.dbStorage.getItem(
  `${_id}/bookmark_helper-File_Path`
)
let bookmarksDataCache = null
let targetUrlData = []
function getBookmarks(dataDir, browser) {
  let bookmarkPath = ''
  if (bookmark_file_path) {
    bookmarkPath = bookmark_file_path
  } else {
    const profiles = ['Default', 'Profile 3', 'Profile 2', 'Profile 1']
    const profile = profiles.find((profile) =>
      fs.existsSync(path.join(dataDir, profile, 'Bookmarks'))
    )
    if (!profile) return []
    bookmarkPath = path.join(dataDir, profile, 'Bookmarks')
  }
  const bookmarksData = []
  const icon = path.join('assets', browser + '.png')
  try {
    const data = JSON.parse(fs.readFileSync(bookmarkPath, 'utf-8'))
    const getUrlData = (item, folder) => {
      if (!item || !Array.isArray(item.children)) return
      item.children.forEach((c) => {
        if (c.type === 'url') {
          bookmarksData.push({
            addAt: parseInt(c.date_added),
            title: c.name || '',
            description: (folder ? '「' + folder + '」' : '') + c.url,
            url: c.url,
            browser,
            icon,
          })
        } else if (c.type === 'folder') {
          getUrlData(c, folder ? folder + ' - ' + c.name : c.name)
        }
      })
    }
    getUrlData(data.roots.bookmark_bar, '')
    getUrlData(data.roots.other, '')
    getUrlData(data.roots.synced, '')
  } catch (e) {
    alert(`请重新选择书签文件,错误信息：${e}`)
  }
  console.log(bookmarksData)
  return bookmarksData
}

/**
 * 使用chrome浏览器打开指定地址
 * @param {链接} url
 * @returns
 */
function openUrlByChrome(url) {
  if (process.platform === 'win32') {
    const suffix = `${path.sep}Google${path.sep}Chrome${path.sep}Application${path.sep}chrome.exe`
    const prefixes = [
      process.env['PROGRAMFILES(X86)'],
      process.env.PROGRAMFILES,
      process.env.LOCALAPPDATA,
    ].filter(Boolean)
    const prefix = prefixes.find((prefix) =>
      fs.existsSync(path.join(prefix, suffix))
    )
    const chromeApp = path.join(prefix, suffix)
    if (chromeApp) {
      cp.spawn(chromeApp, [url], { detached: true })
    } else {
      window.utools.shellOpenExternal(url)
    }
    return
  }
  if (process.platform === 'darwin') {
    const chromeApp = '/Applications/Google Chrome.app'
    if (fs.existsSync(chromeApp)) {
      cp.spawn('open', ['-a', chromeApp, url], { detached: true })
    } else {
      window.utools.shellOpenExternal(url)
    }
  }
}

/**
 * Edge浏览器打开指定地址
 * @param {链接} url
 * @returns
 */
function openUrlByEdge(url) {
  if (process.platform === 'win32') {
    const args = [
      'shell:AppsFolder\\Microsoft.MicrosoftEdge_8wekyb3d8bbwe!MicrosoftEdge',
    ]
    args.push(url)
    cp.spawn('start', args, { shell: 'cmd.exe', detached: true }).once(
      'error',
      () => {
        window.utools.shellOpenExternal(url)
      }
    )
    return
  }
  if (process.platform === 'darwin') {
    const edgeApp = '/Applications/Microsoft Edge.app'
    if (fs.existsSync(edgeApp)) {
      cp.spawn('open', ['-a', edgeApp, url], { detached: true })
    } else {
      window.utools.shellOpenExternal(url)
    }
  }
}

//获取目标结果
function getTargetData(keyword) {
  if (!keyword) {
    return targetUrlData
  }
  const defaultUrl = targetUrlData[0].url
  const targetUrl = decodeURIComponent(defaultUrl).replace(/{{query}}/g, keyword.trim())
  return [
    {
      ...targetUrlData[0],
      url: targetUrl,
      description: targetUrlData[0].description.replace(defaultUrl, targetUrl),
    },
  ]
}
window.exports = {
  'bookmarks-search': {
    mode: 'list',
    args: {
      enter: (action, callbackSetList) => {
        bookmarksDataCache = []
        let chromeDataDir
        let edgeDataDir
        //移除设置页面内容
        document.getElementById('setting_root') &&
          document.getElementById('setting_root').remove()
        if (process.platform === 'win32') {
          chromeDataDir = path.join(
            process.env.LOCALAPPDATA,
            'Google/Chrome/User Data'
          )
        } else if (process.platform === 'darwin') {
          chromeDataDir = path.join(
            window.utools.getPath('appData'),
            'Google/Chrome'
          )
        } else {
          return
        }
        if (fs.existsSync(chromeDataDir)) {
          console.log(chromeDataDir)
          bookmarksDataCache.push(...getBookmarks(chromeDataDir, 'chrome'))
        }

        if (bookmarksDataCache.length > 0) {
          bookmarksDataCache = bookmarksDataCache.sort(
            (a, b) => a.addAt - b.addAt
          )
        }
        callbackSetList(bookmarksDataCache)
      },
      search: (action, searchWord, callbackSetList) => {
        searchWord = searchWord.trim()
        let queryStr =
          isLocked && searchWord.includes(queryName)
            ? searchWord.replace(queryName, '')
            : ''
        console.log(searchWord)
        if (queryStr) {
          return callbackSetList(getTargetData(queryStr))
        }
        if (!searchWord) {
          //清空筛选条件场景兼容
          queryStr = ''
          isLocked = false
          targetUrlData = []
          return callbackSetList()
        }
        if (/\S\s+\S/.test(searchWord)) {
          const regexTexts = searchWord
            .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            .split(/\s+/)
          const searchRegexs = regexTexts.map((rt) => new RegExp(rt, 'i'))
          return callbackSetList(
            bookmarksDataCache.filter(
              (x) =>
                !searchRegexs.find((r) => x.title.search(r) === -1) ||
                !searchRegexs.find((r) => x.description.search(r) === -1)
            )
          )
        } else {
          const regexText = searchWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          const searchRegex = new RegExp(regexText, 'i')
          return callbackSetList(
            bookmarksDataCache.filter(
              (x) =>
                x.title.search(searchRegex) !== -1 ||
                x.description.search(searchRegex) !== -1
            )
          )
        }
      },
      select: (action, itemData) => {
        console.log(itemData)
        activeUrl = decodeURIComponent(itemData.url)
        if (/{{query}}/.test(activeUrl)) {
          isLocked = true
          targetUrlData.push(itemData)
          utools.setSubInputValue(`${itemData.title} `)
          queryName = itemData.title
        } else {
          isLocked = false
          targetUrlData = []
          queryName = ''
        }
        if (isLocked) return
        if (itemData.browser === 'chrome') {
          openUrlByChrome(itemData.url)
        } else {
          openUrlByEdge(itemData.url)
        }
        window.utools.outPlugin()
      },
      placeholder: '输入关键字，检索书签',
    },
  },
  'bookmark-setting': { ...new settingConfig.default() },
}
