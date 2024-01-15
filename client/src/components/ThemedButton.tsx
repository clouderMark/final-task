import {ElementType} from 'react';
import {Button, ButtonProps} from '@mui/material';
import {useAppSelector} from '../redux/hooks';
import {selectTheme} from '../styles/themeSlice/themeSlice';
import {theme} from '../styles/theme';

interface IProps extends ButtonProps {
  component?: ElementType;
}

const ThemedButton = (props: IProps) => {
  const {type} = useAppSelector(selectTheme);

  return (
    <Button
      {...props}
      sx={{
        color: theme.palette.third[type],
        backgroundColor: theme.palette.first[type],
        '&:hover': {
          backgroundColor: theme.palette.second[type],
        },
        ...props.sx,
      }}
      component={props.component ? props.component : 'button'}
    >
      {props.children}
    </Button>
  );
};

export default ThemedButton;
