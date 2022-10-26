import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Button,
  Avatar,
  Chip,
  Box,
  Typography,
  Input,
  Divider,
} from '@mui/material'

const Wrap = styled.div`
  padding: 20px;
  .MuiAvatar-root {
  }
  #contained-button-file {
    display: none;
  }
  #add-file-button {
    display: none;
  }
`

import fs from 'fs'
import { BookMark_File_Path } from '../../const'
interface IProps {}
const Setting: React.FC<IProps> = (props) => {
  //兼容历史数据
  const formatData = (data: string | string[]) => {
    return data ? (typeof data === 'string' ? [data] : data) : []
  }
  const [value, setValue] = useState(
    formatData(utools.dbStorage.getItem(BookMark_File_Path))
  )
  const [userInfo] = useState(utools.getUser())
  const handleClick = (index: number) => (event: any) => {
    let result = utools.showOpenDialog({
      title: '选择书签文件',
      message: '选择书签文件',
      properties: ['openFile', 'treatPackageAsDirectory', 'showHiddenFiles'],
    })

    let path = result![0]
    if (value.includes(path)) return //重复地址不处理
    let newValue = [...value]
    if (!fs.existsSync(path)) {
      alert('路径非法')
      newValue = [...newValue.slice(0, index), '', ...newValue.slice(index + 1)]
      return
    }

    newValue = [...newValue.slice(0, index), path, ...newValue.slice(index + 1)]
    setValue(newValue)
    utools.dbStorage.setItem(BookMark_File_Path, newValue)
  }
  const handleDelete=(index:number)=>()=>{
    const newValue=[...value.slice(0,index),...value.slice(index+1)]
    setValue(newValue)
    utools.dbStorage.setItem(BookMark_File_Path, newValue)
  }
  const handleQuit = () => {
    utools.redirect('bookmark', '')
  }
  console.log(value)

  return (
    <>
      <Wrap>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography fontWeight={700} fontSize={24}>
            设置
          </Typography>

          <Chip
            avatar={<Avatar alt={userInfo?.nickname} src={userInfo?.avatar} />}
            label={userInfo?.nickname || 'hi ~'}
            sx={{ marginBottom: 2 }}
            variant="outlined"
            size="medium"
          />
        </Box>
        <Divider />
        {value.map((item, index) => {
          return (
            <>
              <Box sx={{ p: 2 }}>
                <Chip
                  label={`配置文件 ${index + 1}：${item}`}
                  color="success"
                />
                <label >
                 
                  <Button
                    variant="outlined"
                    component="span"
                    onClick={handleDelete(index)}
                    sx={{ marginLeft: item ? 1 : 0 }}>
                    {'删除'}
                  </Button>
                </label>
              </Box>
            </>
          )
        })}
        <Box sx={{ p: 2 }}>
          <label htmlFor="add-file-button">
            <Input
              id="add-file-button"
              onClick={handleClick(value?.length || 0)}
              type="file"
            />
            <Button
              variant="outlined"
              component="span"
              sx={{ marginLeft: value ? 1 : 0 }}>
              {'添加的书签文件'}
            </Button>
          </label>
        </Box>

        <Box sx={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            onClick={handleQuit}
            sx={{ marginTop: 4 }}>
            设置完成
          </Button>
        </Box>
      </Wrap>
    </>
  )
}

export default Setting
