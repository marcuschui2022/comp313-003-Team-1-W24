import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import React from "react";

export default function BlogsRadioButtonsGroup({options, setSelectedBlog, selectedBlog}) {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={selectedBlog}
      >
        <FormControlLabel sx={{"& .MuiFormControlLabel-label": {marginLeft: "-7px"}}} value="all"
                          control={<Radio/>}
                          label="All" onChange={() => setSelectedBlog('all')}/>
        {options.map(x => <FormControlLabel
          sx={{"& .MuiFormControlLabel-label": {marginLeft: "-7px"}}} key={x.blog_id}
          value={x.blog_id} control={<Radio/>} label={x.title}
          onChange={() => setSelectedBlog(x.blog_id)}/>)}

      </RadioGroup>
    </FormControl>
  );
}