import { render, unmountComponentAtNode } from 'react-dom'
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
        render(<Setting />, document.body)
      },
    }
  }
}

export default SettingFeature
