import {Route, Routes} from 'react-router-dom';
import {EPath} from '../types/EPath';
import {useAppSelector} from '../redux/hooks';
import {selectUser} from './LoginUser/redux/userSlice/userSlice';
import Login from '../views/Login';
import Main from '../views/Main';
import AdminUsers from '../views/AdminUsers';
import Collections from '../views/Collections';
import CollectionItem from '../views/CollectionItem';
import NotFound from '../views/NotFound';

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
  {[ERoute.Path]: EPath.NotFound, [ERoute.Component]: NotFound},
  {[ERoute.Path]: EPath.CollectionItem, [ERoute.Component]: CollectionItem},
  {[ERoute.Path]: EPath.Main, [ERoute.Component]: Main},
];

const authRoutes: IRoute[] = [
  {[ERoute.Path]: EPath.Main, [ERoute.Component]: Main},
  {[ERoute.Path]: EPath.Collections, [ERoute.Component]: Collections},
];

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
