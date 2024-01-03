import {Route, Routes} from 'react-router-dom';
import {EPath} from '../types/EPath';
import {useAppSelector} from '../redux/hooks';
import {selectUser} from '../views/login/redux/userSlice/userSlice';
import Login from '../views/login/Login';
import Main from '../views/Main';
import AdminUsers from '../views/AdminUsers';

enum ERoute {
  Path = 'path',
  Component = 'Component',
}

interface IRoute {
  [ERoute.Path]: EPath;
  [ERoute.Component](): JSX.Element;
}

const publicRoutes: IRoute[] = [
  {[ERoute.Path]: EPath.Login, [ERoute.Component]: Login},
  {[ERoute.Path]: EPath.Signup, [ERoute.Component]: Login},
  {[ERoute.Path]: EPath.NotFound, [ERoute.Component]: Login},
];

const authRoutes: IRoute[] = [{[ERoute.Path]: EPath.Main, [ERoute.Component]: Main}];

const adminRoutes: IRoute[] = [{[ERoute.Path]: EPath.AdminUsers, [ERoute.Component]: AdminUsers}];

const AppRouter = () => {
  const {isAuth, isAdmin} = useAppSelector(selectUser);

  return (
    <Routes>
      {publicRoutes.map(({path, Component}) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {isAuth && authRoutes.map(({path, Component}) => <Route key={path} path={path} element={<Component />} />)}
      {isAdmin && adminRoutes.map(({path, Component}) => <Route key={path} path={path} element={<Component />} />)}
    </Routes>
  );
};

export default AppRouter;
