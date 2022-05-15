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
`

import fs from 'fs'
import { BookMark_File_Path } from '../../const'
interface IProps {}
const Setting: React.FC<IProps> = (props) => {
  const [value, setValue] = useState(
    utools.dbStorage.getItem(BookMark_File_Path)
  )
  const [userInfo] = useState(utools.getUser())
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
        <Box sx={{ p: 2 }}>
          {value && <Chip label={`当前配置文件：${value}`} color="success" />}
          <label htmlFor="contained-button-file">
            <Input
              id="contained-button-file"
              onChange={handleClick}
              type="file"
            />
            <Button
              variant="outlined"
              component="span"
              sx={{ marginLeft: value ? 1 : 0 }}>
              {value ? '重新选择' : '请选择你的书签文件'}
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
