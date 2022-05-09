import { render } from 'react-dom'
import Setting from './component/setting/index'
class SettingFeature {
  mode: 'none' | 'list'
  args: any
  constructor() {
    this.mode = 'none'
    this.args = {
      enter: () => {
        utools.setExpendHeight(600)
        render(<Setting />, document.body)
      },
    }
  }
}

export default SettingFeature
