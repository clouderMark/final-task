import {Alert, Fade} from '@mui/material';
import {styles} from './styles';
import {useAppSelector} from '../../redux/hooks';
import {selectAlert} from './redux/alertSlice';
import {selectTheme} from '../../styles/themeSlice/themeSlice';
import {theme} from '../../styles/theme';

const AlertLine = () => {
  const {type} = useAppSelector(selectTheme);
  const {isOpen, message, statusCode} = useAppSelector(selectAlert);
  const variant = statusCode && statusCode >= 400 ? 'error' : 'success';

  return (
    <Fade in={isOpen}>
      <Alert
        severity={variant}
        sx={[styles, {color: theme.palette.third[type], background: theme.palette.first[type], zIndex: 9999}]}
        elevation={6}
      >
        {message}
      </Alert>
    </Fade>
  );
};

export default AlertLine;
