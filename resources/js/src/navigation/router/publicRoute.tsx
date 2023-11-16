import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PAGE_URL } from '@constants';
import NotFound from '@pages/notFound';

// AUTH
const Login = lazy(() => import('../../pages/AuthManager/Login'));
const ForgotPassword = lazy(() => import('../../pages/AuthManager/ForgotPassword'));
const ResetPassword = lazy(() => import('../../pages/AuthManager/ResetPassword'));

// LC

// USER
const HomeUser = lazy(() => import('../../pages/RoleUser/Home'));
const PostUser = lazy(() => import('../../pages/RoleUser/Post'));

export const PublicRoutes = () => {
  return (
    <Routes>
      {/* Auth Manager */}
      <Route path={PAGE_URL.AUTH.LOGIN} element={<Login text={'sa'} />} />

      <Route path={PAGE_URL.AUTH.FORGET_PASSWORD} element={<ForgotPassword />} />

      <Route path={PAGE_URL.AUTH.RESET_PASSWORD} element={<ResetPassword />} />

      {/* Admin Routes */}

      {/* LC Routes */}

      {/* User Routes */}
      <Route path={'/'} element={<HomeUser />} />
      <Route path={PAGE_URL.USER.HOME} element={<HomeUser />} />
      <Route path={PAGE_URL.USER.POST} element={<PostUser />} />

      {/* Not found */}
      <Route path='/*' element={<NotFound />} />
    </Routes>
  );
};
