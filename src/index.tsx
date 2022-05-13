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
      },
    }
  }
}

export default SettingFeature
