import { FormControl, InputLabel, Select, MenuItem, SelectProps} from '@mui/material'
import React from 'react'

interface SelectFieldProps<T> extends SelectProps {
    label? :string,
    data? : T[],
    valueKey: keyof T,
}
export default function SelectField<T>({label,data,valueKey,...props}: SelectFieldProps<T>) {
  return (
    <FormControl variant="standard" sx={{ display: "flex" }} margin="dense">
      <InputLabel
        id={`select-standard-label-${props.name}`}
        sx={{ textTransform: "uppercase" }}
      >
        {label || props.name}
      </InputLabel>
      <Select {...props}>
        {data?.map((e, i) => (
          <MenuItem value={e[valueKey] as string} key={i}>
            {e[valueKey] as string}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
