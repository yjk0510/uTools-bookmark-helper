import React, { useState } from 'react'
import Tabs from './tabs'
import BasicSetting from './basic-setting'
import AdvancedSetting from './advanced-setting'



interface IProps {}
const Setting: React.FC<IProps> = (props) => {
  //@ts-ignore
 return <Tabs data={[{title:'基本设置',cmp:<BasicSetting/>},{title:'高级设置',cmp:<AdvancedSetting/>}]} />
}

export default Setting
