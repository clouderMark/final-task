import {Container} from '@mui/material';
import LoginUser from '../components/LoginUser/LoginUser';

const Login = () => (
  <Container
    sx={{
      display: 'flex',
      justifyContent: 'center',
      mt: 10,
    }}
  >
    <LoginUser />
  </Container>
);

export default Login;
