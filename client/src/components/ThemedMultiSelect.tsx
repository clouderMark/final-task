import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import {FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent} from '@mui/material';
import {selectTheme} from '../styles/themeSlice/themeSlice';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {theme} from '../styles/theme';
import {ELang} from '../types/types';
import {selectLang} from './content/redux/langSlice';

interface IProps {
  inputLabel: string;
  value: string[];
  action: ActionCreatorWithPayload<SelectChangeEvent<string[]>>;
  values: IValue[];
}

export interface IValue {
  value: string;
  name: {
    [ELang.ENG]: string;
    [ELang.BEL]: string;
  };
}

const ThemedMultiSelect = (props: IProps) => {
  const dispatch = useAppDispatch();
  const {inputLabel, value, action, values} = props;
  const {lang} = useAppSelector(selectLang);
  const {type} = useAppSelector(selectTheme);

  return (
    <FormControl sx={{width: '100%', backgroundColor: theme.palette.second[type]}}>
      <InputLabel sx={{color: theme.palette.third[type], opacity: 0.4}}>{inputLabel}</InputLabel>
      <Select
        multiple
        value={value}
        onChange={(e: SelectChangeEvent<string[]>) => dispatch(action(e))}
        input={<OutlinedInput label={inputLabel} />}
        MenuProps={{
          sx: {
            ul: {
              backgroundColor: theme.palette.second[type],
              color: theme.palette.third[type],
            },
          },
        }}
        sx={{color: theme.palette.third[type]}}
      >
        {values.map((el) => (
          <MenuItem key={el.value} value={el.value}>
            {el.name[lang]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ThemedMultiSelect;
