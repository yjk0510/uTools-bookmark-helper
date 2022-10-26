import { createRoot } from 'react-dom/client'
import React from 'react'
import Setting from './component/setting/index'
import { IFeature } from './interface'
class SettingFeature implements IFeature {
  mode: 'none' | 'list'
  args: any
  constructor() {
    this.mode = 'none'
    this.args = {
      enter: () => {
        utools.setExpendHeight(500)
        document.getElementById('setting_root') &&
          document.getElementById('setting_root').remove()
        //不能直接挂到body,会影响utools视图切换逻辑
        const app = document.createElement('div')
        app.id = 'setting_root'
        document.body.append(app)
        const root = createRoot(app)
        setTimeout(() => {
          root.render(<Setting />)
        }, 100)
      },
    }
  }
}

export default SettingFeature
