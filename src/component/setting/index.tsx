import React, { ChangeEvent, useState } from 'react'
import styled from 'styled-components'
const Wrap = styled.div`
  padding: 20px;
`
const Input = styled.input`
  width: 450px;
  height: 28px;
  border-radius: 4px;
`
const Item = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`
const ItemContent = styled.div``
const Radio = styled.input``
const fs = require('fs')
import { BookMark_File_Path } from '../../const'
interface IProps {}
const Setting: React.FC<IProps> = (props) => {
  const [value, setValue] = useState(
    utools.dbStorage.getItem(BookMark_File_Path)
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
    utools.dbStorage.setItem(BookMark_File_Path, path)
  }
  return (
    <Wrap>
      <Item>
        自定义书签文件
        <ItemContent>
          <Input
            placeholder="请选择你的书签文件"
            onClick={handleClick}
            value={value}
          />
        </ItemContent>
      </Item>
    </Wrap>
  )
}

export default Setting
