import React, { useState } from 'react'
// import './style.scss'
//TODO css modules
import fs from 'fs'
interface IProps {}
const Setting: React.FC<IProps> = (props) => {
  const [nativeId] = useState(utools.getNativeId())
  const [value, setValue] = useState(
    utools.dbStorage.getItem(`${nativeId}/chrome-bookmark`)
  )
  const handleClick = (event: any) => {
    let result = utools.showOpenDialog({
      title: '自定义书签文件',
      message: '自定义书签文件',
      properties: ['openFile', 'treatPackageAsDirectory', 'showHiddenFiles'],
    })

    let path = result![0]
    if (!fs.existsSync(path)) {
      alert('路径非法')
      setValue('')
      return
    }
    setValue(path)
    utools.dbStorage.setItem(`${nativeId}/chrome-bookmark`, path)
  }
  return (
    <div className="wrap">
      自定义书签文件
      <input
        placeholder="请选择你的书签文件"
        onClick={handleClick}
        value={value}
      />
    </div>
  )
}

export default Setting
