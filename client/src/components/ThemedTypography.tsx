import {ElementType} from 'react';
import {Typography, TypographyProps} from '@mui/material';
import {useAppSelector} from '../redux/hooks';
import {selectTheme} from '../styles/themeSlice/themeSlice';
import {theme} from '../styles/theme';

interface IProps extends TypographyProps {
  component?: ElementType;
}

const ThemedTypography = (props: IProps) => {
  const {type} = useAppSelector(selectTheme);

  return (
    <Typography {...props} sx={{color: theme.palette.third[type], ...props.sx}}>
      {props.children}
    </Typography>
  );
};

export default ThemedTypography;
