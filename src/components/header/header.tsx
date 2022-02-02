import { useForm } from 'react-hook-form';
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import debounce from 'debounce';
import { getAuth, signOut } from 'firebase/auth';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  TextField,
  Avatar,
  InputAdornment,
  Tooltip,
  MenuItem,
} from '@mui/material';
import { Brightness4, Brightness5, Search } from '@mui/icons-material';
import { toggleTheme, clearAppSettingsState } from '../../store/appSettingsSlice';
import { appTheme, widthMobile } from '../../utils/constants';
import { deleteUser } from '../../store/userSlice';
import { updateSearchValue, clearTicketsState } from '../../store/ticketsSlice';

import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';

const Header = () => {
  const auth = getAuth();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const { lightTheme, currentWidth } = useAppSelector((state) => state.appSettings);
  const { light, dark } = appTheme;
  const theme = lightTheme ? light : dark;
  const path = location.pathname.replace(/^../, (match) => match[1].toUpperCase());
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(deleteUser());
    dispatch(clearTicketsState());
    dispatch(clearAppSettingsState());
  };

  const { register, watch } = useForm();

  function handleInputValue(value: string) {
    dispatch(updateSearchValue(value.toLowerCase()));
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(debounce(handleInputValue, 400), []);

  useEffect(() => {
    if (watch('search') || watch('search') === '') debounceFn(String(watch('search')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('search')]);
  return (
    <Box
      sx={{
        flexGrow: 1,
        marginLeft: currentWidth >= widthMobile.aside ? '255px' : '75px',
        paddingTop: '21px',
        transition: 'all .5s',
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <Typography
            variant="h5"
            component="h1"
            sx={{ flexGrow: 1, color: theme.headerTitle, fontFamily: 'Inter', fontWeight: 'bold' }}
          >
            {path}
          </Typography>
          {path === 'Tickets' && (
            <Box
              component="form"
              sx={{ flexGrow: 1, '& > :not(style)': { m: 1, width: '25vw', height: '56px' } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('search')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                id="outlined-basic"
                label="Search tickets"
                variant={lightTheme ? 'outlined' : 'filled'}
                sx={{ backgroundColor: 'white', borderRadius: '8px' }}
              />
            </Box>
          )}
          <Tooltip title="Светлая тема">
            <Brightness5
              onClick={() => dispatch(toggleTheme(true))}
              sx={{
                color: theme.headerLightButton,
                marginRight: '25px',
                transition: 'all .5s',
                '&:hover': { opacity: 0.6, cursor: 'pointer' },
              }}
            />
          </Tooltip>
          <Tooltip title="Темная тема">
            <Brightness4
              onClick={() => dispatch(toggleTheme(false))}
              sx={{
                color: theme.headerDarkButton,
                marginRight: '32px',
                transition: 'all .5s',
                '&:hover': { opacity: 0.6, cursor: 'pointer' },
              }}
            />
          </Tooltip>
          <p
            style={{
              color: theme.headerUserName,
              paddingLeft: '32px',
              paddingRight: '14px',
              borderLeft: '1px solid #DFE0EB',
            }}
          >
            {user.displayName}
          </p>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Профиль">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={user.photoURL || '#'} alt={user.displayName} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <Typography onClick={handleLogout} textAlign="center">
                  Log out
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
