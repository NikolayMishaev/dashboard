/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import debounce from 'debounce';
import { Toaster, toast } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { appTheme, ROUTES } from '../../utils/constants';
import { togglecurrentWidth, clearAppSuccess } from '../../store/appSettingsSlice';
import { clearError, clearSuccess } from '../../store/ticketsSlice';
import Login from '../login/login';
import Dashboard from '../dashboard/dashboard';
import Tickets from '../tickets/tickets';
import ProtectedRoute from '../protected-route/protected-route';
import Header from '../header/header';
import Aside from '../aside/aside';
import AddTicket from '../add-ticket/add-ticket';
import EditTicket from '../edit-ticket/edit-ticket';

interface IProps {
  theme: string;
}

const Wrapper = styled.div<
IProps>
`
  background-color: ${({ theme }) => String(theme)};
  transition: all 0.5s;
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
  min-height: 100vh;
  min-width: 900px;
`;

const App = () => {
  const { light, dark } = appTheme;
  const { lightTheme, successApp } = useAppSelector((state) => state.appSettings);
  const { error, success } = useAppSelector((state) => state.tickets);
  const user = useAppSelector((state) => state.user.user);
  const theme = lightTheme ? light : dark;
  const dispatch = useAppDispatch();

  function resize() {
    dispatch(togglecurrentWidth(window.innerWidth));
  }

  useEffect(() => {
    resize();
    window.onresize = debounce(resize, 100);
  }, [user.uid]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (success) {
      toast.success(success);
      dispatch(clearSuccess());
    }
    if (successApp) {
      toast.success(successApp);
      dispatch(clearAppSuccess());
    }
  }, [error, success, successApp]);

  return (
    <Wrapper theme={theme.appBackground}>
      <Toaster />
      {user.uid && <Header />}
      {user.uid && <Aside />}
      <Routes>
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.dashboard} element={<ProtectedRoute />}>
          <Route path={ROUTES.dashboard} element={<Dashboard />} />
        </Route>
        <Route path={ROUTES.tickets} element={<ProtectedRoute />}>
          <Route path={ROUTES.tickets} element={<Tickets />} />
          <Route path={`${ROUTES.tickets}:id`} element={<EditTicket />} />
        </Route>
        <Route path={ROUTES.addTicket} element={<ProtectedRoute />}>
          <Route path={ROUTES.addTicket} element={<AddTicket />} />
        </Route>
      </Routes>
    </Wrapper>
  );
};

export default App;
