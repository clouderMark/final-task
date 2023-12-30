import {Box, CssBaseline} from '@mui/material';
import {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import {useCheckUserMutation} from './views/login/redux/loginApi';
import {useAppDispatch, useAppSelector} from './redux/hooks';
import {getToken, selectUser} from './views/login/redux/userSlice/userSlice';
import Loader from './components/Loader/Loader';
import AlertLine from './components/AlertLine/AlertLine';
import Bar from './components/Bar';
import {selectTheme} from './styles/themeSlice/themeSlice';
import {theme} from './styles/theme';

const App = () => {
  const {type} = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  const [checkUser] = useCheckUserMutation();

  const {token} = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(getToken());
  }, []);

  useEffect(() => {
    if (token) {
      checkUser(token);
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Box sx={{background: theme.palette.second[type], height: '100vh'}}>
        <CssBaseline />
        <Loader />
        <Bar />
        <AppRouter />
        <AlertLine />
      </Box>
    </BrowserRouter>
  );
};

export default App;
