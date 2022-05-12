import { render, hydrate, unmountComponentAtNode } from 'react-dom'
import Setting from './component/setting/index'

class SettingFeature {
  mode: 'none' | 'list'
  args: any
  placeholder: string
  constructor() {
    this.mode = 'none'
    this.args = {
      enter: () => {
        utools.setExpendHeight(200)
        //不能直接挂到body,会影响utools视图切换逻辑
        const app = document.createElement('div')
        app.id = 'setting_root'
        document.body.append(app)
        render(<Setting />, app)
        utools.onPluginOut(() => {
          //隐藏设置视图
          unmountComponentAtNode(app)
          //不回uTools js文件，实现视图正常切换
          var head = document.getElementsByTagName('head')[0]
          var script = document.createElement('script')
          script.type = 'text/javascript'
          script.src = 'index.js'
          head.appendChild(script)
        })
      },
    }
  }
}

export default SettingFeature
