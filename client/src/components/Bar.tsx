import * as React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {AppBar, Container, Toolbar, Button} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {theme} from '../styles/theme';
import {EPath} from '../types/EPath';
import {logout, selectUser} from '../views/login/redux/userSlice/userSlice';
import {selectLang} from './content/redux/langSlice';
import {content} from './content/content';

const Bar = () => {
  const {lang} = useAppSelector(selectLang);
  const {isAuth} = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoginPage = useLocation().pathname === EPath.Login;
  const isSignupPage = useLocation().pathname === EPath.Signup;

  const handleLogout = () => {
    dispatch(logout());
    navigate(EPath.Login, {replace: true});
  };

  return (
    <Container maxWidth={false}>
      <AppBar sx={{backgroundColor: theme.palette.first.main, height: '70px'}}>
        <Toolbar sx={{display: 'flex', alignItems: 'flex-end'}}>
          {isAuth ? (
            <Button sx={{m: 1}} onClick={handleLogout}>
              {content[lang].bar.logout}
            </Button>
          ) : !isLoginPage && !isSignupPage ? (
            <Button onClick={() => navigate(EPath.Login, {replace: true})}>{content[lang].bar.login}</Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Bar;
