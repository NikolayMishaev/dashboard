import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Typography, Box, Container } from '@mui/material';
import LabelIcon from '@mui/icons-material/Label';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import { fetchUser } from '../../store/userSlice';
import { fetchTickets } from '../../store/ticketsSlice';
import DashboardButton from '../dashboard-button/dashboard-button';
import { ROUTES } from '../../utils/constants';

const Login = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const login = async() => {
    await dispatch(fetchTickets());
    await dispatch(fetchUser());
    navigate(ROUTES.dashboard);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#363740',
      }}
    >
      <Box
        sx={{
          width: 380,
          borderRadius: '8px',
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: '32px',
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: '24px',
          lineHeight: '30px',
          textAlign: 'center',
          letterSpacing: '0.3px',
          color: '#252733',
        }}
      >
        <LabelIcon
          fontSize="large"
          sx={{ color: '#FFF', backgroundColor: '#3751FF', padding: '10px', borderRadius: '50px' }}
        />
        <Typography variant="h3" component="h2" sx={{ color: '#A4A6B3', fontFamily: 'Inter', padding: '10px 0 20px' }}>
          Dashboard Kit
        </Typography>
        {loading ? (
          <div className="lds-ripple">
            <div> </div>
            <div> </div>
          </div>
        ) : (
          <DashboardButton
            title="Log in"
            type="button"
            style={{ backgroundColor: '#3751FF', marginLeft: '0', fontWeight: '500' }}
            handler={login}
          />
        )}
      </Box>
    </Container>
  );
};

export default Login;
