import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PAGE_URL, PAGE_URL_TYPE, ROLE_ACCESS } from '@constants';
import LayoutMain from '@components/Layout';

import AuthRoute from './auth';

// Routes
const NotFound = lazy(() => import('../../pages/notFound'));
const ErrorPage = lazy(() => import('../../pages/errorPage'));

// AUTH
const ChangePassword = lazy(() => import('../../pages/AuthManager/ChangePassword'));
const ForgotPassword = lazy(() => import('../../pages/AuthManager/ForgotPassword'));
const ResetPassword = lazy(() => import('../../pages/AuthManager/ResetPassword'));

const HomeAuth = lazy(() => import('../../pages/AuthManager/Home'));

const ListUSer = lazy(() => import('../../pages/RoleAdmin/User/List'));
const ManagerUser = lazy(() => import('../../pages/RoleAdmin/User/Manager'));

const ListPost = lazy(() => import('../../pages/AuthManager/Store/List'));
const ManagerPost = lazy(() => import('../../pages/AuthManager/Store/Manager'));

// LC

// USER
const HomeUser = lazy(() => import('../../pages/RoleUser/Home'));
const PostUser = lazy(() => import('../../pages/RoleUser/Post'));

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route
        path='/*'
        element={
          <AuthRoute
            elements={[
              {
                role: [ROLE_ACCESS.ADMIN, ROLE_ACCESS.LC],
                routes: <AuthRoutes key={1} />,
              },
              {
                role: ROLE_ACCESS.ADMIN,
                routes: (
                  <LayoutMain key={2}>
                    <AdminRoutes />
                  </LayoutMain>
                ),
              },
              {
                role: ROLE_ACCESS.LC,
                routes: (
                  <LayoutMain>
                    <LCRoutes />
                  </LayoutMain>
                ),
              },
              {
                role: ROLE_ACCESS.USER,
                routes: <UserRoutes />,
              },
              {
                role: ROLE_ACCESS.NONE,
                routes: <ErrorRoute />,
              },
            ]}
          />
        }
      ></Route>
    </Routes>
  );
};

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<HomeAuth />} />

      <Route path={PAGE_URL.AUTH.CHANGE_PASSWORD} element={<ChangePassword />} />
      <Route path={PAGE_URL.AUTH.FORGET_PASSWORD} element={<ForgotPassword />} />
      <Route path={PAGE_URL.AUTH.RESET_PASSWORD} element={<ResetPassword />} />
    </Routes>
  );
};
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path={PAGE_URL.AUTH.HOME} element={<HomeAuth />} />
      {/* USER */}
      <Route path={PAGE_URL.AUTH.USER}>
        <Route index element={<ListUSer />} />
        <Route path={PAGE_URL_TYPE.LIST} element={<ListUSer />} />
        <Route path={PAGE_URL_TYPE.DETAIL} element={<ManagerUser />} />
        <Route path={PAGE_URL_TYPE.ADD} element={<ManagerUser />} />
        <Route path={PAGE_URL_TYPE.EDIT} element={<ManagerUser />} />
      </Route>

      {/* STORE */}
      <Route path={PAGE_URL.AUTH.STORE}>
        <Route index element={<ListPost />} />
        <Route path={PAGE_URL_TYPE.LIST} element={<ListPost />} />
        <Route path={PAGE_URL_TYPE.ADD} element={<ManagerPost />} />
        <Route path={PAGE_URL_TYPE.EDIT} element={<ManagerPost />} />
      </Route>

      {/* Not found */}
      <Route path='/*' element={<NotFound />} />
    </Routes>
  );
};

const LCRoutes = () => {
  return (
    <Routes>
      <Route path={PAGE_URL.AUTH.HOME} element={<HomeAuth />} />

      {/* USER */}
      {/* <Route path={PAGE_URL.AUTH.USER}>
        <Route index element={<ListUSer />} />
        <Route path={PAGE_URL_TYPE.LIST} element={<ListUSer />} /> */}
      {/* <Route path={'list/:keyword'} element={<TopicList />} /> */}
      {/* <Route path={PAGE_URL_TYPE.ADD} element={<ManagerUser />} /> */}
      {/* <Route path={PAGE_URL_TYPE.EDIT} element={<ManagerUser />} /> */}
      {/* </Route> */}

      {/* STORE */}
      <Route path={PAGE_URL.AUTH.STORE}>
        <Route index element={<ListPost />} />
        <Route path={PAGE_URL_TYPE.LIST} element={<ListPost />} />
        <Route path={PAGE_URL_TYPE.ADD} element={<ManagerPost />} />
        <Route path={PAGE_URL_TYPE.EDIT} element={<ManagerPost />} />
      </Route>

      {/* Not found */}
      <Route path='/*' element={<NotFound />} />
    </Routes>
  );
};

const UserRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<HomeUser />} />
      <Route path={PAGE_URL.USER.HOME} element={<HomeUser />} />
      <Route path={PAGE_URL.USER.POST} element={<PostUser />} />

      {/* Not found */}
      <Route path='/*' element={<NotFound />} />
    </Routes>
  );
};

const ErrorRoute = () => {
  return (
    <Routes>
      {/* Error*/}
      <Route path='/*' element={<ErrorPage />} />
    </Routes>
  );
};
