import {Button, ButtonProps} from '@mui/material';
import {useAppSelector} from '../redux/hooks';
import {selectTheme} from '../styles/themeSlice/themeSlice';
import {theme} from '../styles/theme';

interface IProps extends ButtonProps {}

const ThemedButton = (props: IProps) => {
  const {type} = useAppSelector(selectTheme);

  return (
    <Button {...props} sx={{m: 1, color: theme.palette.third[type]}}>
      {props.children}
    </Button>
  );
};

export default ThemedButton;
