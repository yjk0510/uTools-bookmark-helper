import React, { useState } from 'react'
import styled from 'styled-components'
const Wrap=styled.div`
  padding:20px;
  input{
    width:450px;
    height:28px;
    margin-left:8px;
    border-radius: 4px;
  }
`
import fs from 'fs'
interface IProps {}
const Setting: React.FC<IProps> = (props) => {
  const [nativeId] = useState(utools.getNativeId())
  const [value, setValue] = useState(
    utools.dbStorage.getItem(`${nativeId}/chrome-bookmark`)
  )
  const handleClick = (event: any) => {
    let result = utools.showOpenDialog({
      title: '选择书签文件',
      message: '选择书签文件',
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
    <Wrap>
      自定义书签文件
      <input
        placeholder="请选择你的书签文件"
        onClick={handleClick}
        value={value}
      />
    </Wrap>
  )
}

export default Setting
