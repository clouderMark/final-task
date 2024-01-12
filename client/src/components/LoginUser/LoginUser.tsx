import {useEffect, FormEvent, useState, ChangeEvent} from 'react';
import {Box, Card, Typography} from '@mui/material';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {EPath} from '../../types/EPath';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {selectUser} from './redux/userSlice/userSlice';
import {useLoginUserMutation, useSignupUserMutation} from './redux/loginApi';
import {showAlert} from '../AlertLine/redux/alertSlice';
import {styles} from './styles';
import {EName, IDefaultValid} from './types';
import {defaultValid, defaultValue} from './defaultValue';
import {isValid} from './isValid';
import {selectLang} from '../content/redux/langSlice';
import {content} from '../content/content';
import {selectTheme} from '../../styles/themeSlice/themeSlice';
import {theme} from '../../styles/theme';
import ThemedButton from '../ThemedButton';
import ThemedTextField from '../ThemedTextField';

const LoginUser = () => {
  const {type} = useAppSelector(selectTheme);
  const {lang} = useAppSelector(selectLang);
  const {isAuth} = useAppSelector(selectUser);
  const navigate = useNavigate();
  const isLogin = useLocation().pathname === EPath.Login;
  const [loginUser, {isError: isLoginError, error: loginError}] = useLoginUserMutation();
  const [signupUser, {isError: isRegisterError, error: registerError}] = useSignupUserMutation();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(defaultValue);
  const [valid, setValid] = useState<IDefaultValid>(defaultValid);

  useEffect(() => {
    if (isAuth) navigate(EPath.Main, {replace: true});
  }, [isAuth]);

  useEffect(() => {
    if (isLoginError && 'data' in loginError!) {
      dispatch(showAlert({message: loginError.data.message, statusCode: loginError.status}));
    }

    if (isRegisterError && 'data' in registerError!) {
      dispatch(showAlert({message: registerError.data.message, statusCode: registerError.status}));
    }
  }, [isLoginError, isRegisterError]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue({...value, [event.target.name]: event.target.value});
    setValid({...valid, [event.target.name]: isValid(event.target)});
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLogin && valid[EName.EMAIL] && valid[EName.PASSWORD]) {
      await loginUser({email: value[EName.EMAIL].trim(), password: value[EName.PASSWORD].trim()});
    } else if (valid[EName.NAME] && valid[EName.PASSWORD] && valid[EName.EMAIL]) {
      await signupUser({
        name: value[EName.NAME].trim(),
        email: value[EName.EMAIL].trim(),
        password: value[EName.PASSWORD].trim(),
      });
    } else {
      const target = event.currentTarget;

      setValid({
        [EName.NAME]: isLogin ? true : isValid(target[EName.NAME]),
        [EName.EMAIL]: isValid(target[EName.EMAIL]),
        [EName.PASSWORD]: isValid(target[EName.PASSWORD]),
      });
    }
  };

  return (
    <Card sx={[styles.card, {backgroundColor: theme.palette.first[type]}]}>
      <Typography component="h3" sx={{mt: 'auto'}}>
        {isLogin ? content[lang].login.title.login : content[lang].login.title.registration}
      </Typography>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
        onSubmit={handleSubmit}
      >
        {!isLogin ? (
          <ThemedTextField
            name={EName.NAME}
            sx={{mt: 3}}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            placeholder={content[lang].login.placeholder.name}
            error={valid[EName.NAME] === false}
            color={valid[EName.NAME] ? 'success' : 'primary'}
          />
        ) : null}
        <ThemedTextField
          name={EName.EMAIL}
          sx={{mt: 3}}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          placeholder={content[lang].login.placeholder.email}
          error={valid[EName.EMAIL] === false}
          color={valid[EName.EMAIL] ? 'success' : 'primary'}
        />
        <ThemedTextField
          name={EName.PASSWORD}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          sx={{mt: 3}}
          placeholder={content[lang].login.placeholder.password}
          type="password"
          error={valid[EName.PASSWORD] === false}
          color={valid[EName.PASSWORD] ? 'success' : 'primary'}
        />
        <Box sx={styles.box}>
          <ThemedButton
            type="submit"
            sx={[styles.button, {color: theme.palette.third[type], background: theme.palette.second[type]}]}
            variant="outlined"
          >
            {isLogin ? content[lang].login.button.login : content[lang].login.button.registration}
          </ThemedButton>
          <Typography sx={{mt: 'auto', color: theme.palette.third[type]}}>
            {isLogin ? content[lang].login.label.login : content[lang].login.label.registration}
            <Link to={isLogin ? EPath.Signup : EPath.Login}>
              {isLogin ? content[lang].login.link.login : content[lang].login.link.registration}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default LoginUser;
