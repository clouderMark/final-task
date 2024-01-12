import {TextField, TextFieldProps} from '@mui/material';
import {theme} from '../styles/theme';
import {useAppSelector} from '../redux/hooks';
import {selectTheme} from '../styles/themeSlice/themeSlice';

const ThemedTextField = (props: TextFieldProps) => {
  const {type} = useAppSelector(selectTheme);

  return (
    <TextField
      {...props}
      sx={{
        '& .MuiInputBase-root.MuiOutlinedInput-root': {
          color: theme.palette.third[type],

          '::placeholder': {
            color: theme.palette.third[type],
          },
        },
        background: theme.palette.second[type],
        ...props.sx,
      }}
    />
  );
};

export default ThemedTextField;
