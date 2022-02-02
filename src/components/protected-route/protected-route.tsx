import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import { ROUTES } from '../../utils/constants';

const ProtectedRoute = () => {
  const user = useAppSelector((state) => state.user.user.uid);
  return user ? <Outlet /> : <Navigate to={ROUTES.login} />;
}

export default ProtectedRoute;