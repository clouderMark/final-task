import * as React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {AppBar, Toolbar, Button, Box, IconButton} from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import LanguageIcon from '@mui/icons-material/Language';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {theme} from '../styles/theme';
import {EPath} from '../types/EPath';
import {logout, selectUser} from '../views/login/redux/userSlice/userSlice';
import {changeLang, selectLang} from './content/redux/langSlice';
import {content} from './content/content';
import {changeColorTheme, selectTheme} from '../styles/themeSlice/themeSlice';
import {ETheme} from '../types/types';

const Bar = () => {
  const {type} = useAppSelector(selectTheme);
  const {lang} = useAppSelector(selectLang);
  const {isAuth, name, isAdmin} = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoginPage = useLocation().pathname === EPath.Login;
  const isSignupPage = useLocation().pathname === EPath.Signup;

  const handleLogout = () => {
    dispatch(logout());
    navigate(EPath.Login, {replace: true});
  };

  return (
    <AppBar sx={{backgroundColor: theme.palette.first[type], borderBottom: `0.5px solid ${theme.palette.third[type]}`}}>
      <Toolbar sx={{}}>
        {isAdmin ? (
          <Button
            onClick={() => navigate(EPath.AdminUsers, {replace: true})}
            sx={{m: 1, color: theme.palette.third[type]}}
          >
            {content[lang].bar.adminUsers}
          </Button>
        ) : null}
        <Box sx={{ml: 'auto'}}>
          {isAuth ? (
            <Button
              sx={{m: 1, color: theme.palette.third[type]}}
              onClick={handleLogout}
              aria-label={content[lang].bar.logout}
              endIcon={<LogoutRoundedIcon />}
            >
              {name}
            </Button>
          ) : !isLoginPage && !isSignupPage ? (
            <Button onClick={() => navigate(EPath.Login, {replace: true})} sx={{ml: 'auto'}}>
              {content[lang].bar.login}
            </Button>
          ) : null}
          <IconButton sx={{m: 1, color: theme.palette.third[type]}} onClick={() => dispatch(changeLang())}>
            <LanguageIcon />
          </IconButton>
          <IconButton sx={{m: 1, color: theme.palette.third[type]}} onClick={() => dispatch(changeColorTheme())}>
            {type === ETheme.LIGHT ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Bar;
