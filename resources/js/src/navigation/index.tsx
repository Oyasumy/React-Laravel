import { useRedux } from '@hooks';
import { selectAccessToken } from '@reducer/reducer/app';
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoutes } from './router/privateRoute';
import { PublicRoutes } from './router/publicRoute';

export default function App() {
  return (
    <React.Suspense>
      <RenderRoute />
    </React.Suspense>
  );
}

const RenderRoute = () => {
  const { select } = useRedux();

  const userToken = select(selectAccessToken);

  console.log('accesstoken', userToken);

  return <Routes>{userToken ? <Route path='/*' element={<PrivateRoutes />} /> : <Route path='/*' element={<PublicRoutes />} />}</Routes>;
};
