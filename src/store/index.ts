import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import appReducer from './appSettingsSlice';
import ticketsReducer from './ticketsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    appSettings: appReducer,
    tickets: ticketsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;