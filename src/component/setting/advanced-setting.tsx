import React,{useState} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { BookMark_Sort_Rule, SortRule } from '../../const';

export default function AdvancedSetting() {
  const [value, setValue] = useState(utools.dbStorage.getItem(BookMark_Sort_Rule));
  const handleChange = (e) => {
    setValue(e.target.value)
    utools.dbStorage.setItem(BookMark_Sort_Rule, e.target.value)
  }
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">排序方式</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleChange} 
        value={value}
      >
        <FormControlLabel value={SortRule.Default} control={<Radio />} label="默认" />
        <FormControlLabel value={SortRule.ClickCount} control={<Radio />} label="点击量" />
        
      </RadioGroup>
    </FormControl>
  );
}