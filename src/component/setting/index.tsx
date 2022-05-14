import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
const Wrap = styled.div`
  padding: 20px;
`
const Input = styled.input`
  width: 450px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid #eee;
  margin-top: 10px;
  width: 100%;
`
const Item = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  justify-content: center;
`
const Button = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  border-radius: 3px;
  height: 30px;
  padding: 0 12px;
  font-size: 12px;
  line-height: 20px;
`
const SubmitButton = styled(Button)`
  color: #fff;
  background-color: #1d86f0;
  min-width: 120px;
`

const ItemContent = styled.div``
import fs from 'fs'
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
  const handleQuit = () => {
    utools.redirect('bookmark', '')
  }

  return (
    <>
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
        <ButtonGroup>
          <SubmitButton onClick={handleQuit}>设置完成</SubmitButton>
        </ButtonGroup>
      </Wrap>
      <script src="index.js"></script>
    </>
  )
}

export default Setting
