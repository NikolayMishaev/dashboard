import { createSlice } from '@reduxjs/toolkit';

const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState: {
    lightTheme: true,
    currentWidth: 0,
    loading: false,
    successApp: '',
  },
  reducers: {
    toggleTheme(state, action: { payload: boolean }) {
      state.lightTheme = action.payload;
      state.successApp = `Тема изменена на ${action.payload ? 'светлую' : 'темную'}!`;
    },
    togglecurrentWidth(state, action: { payload: number }) {
      state.currentWidth = action.payload;
    },
    setLoadingStatus(state, action: { payload: boolean }) {
      state.loading = action.payload;
    },
    clearAppSuccess(state) {
      state.successApp = '';
    },
    clearAppSettingsState(state) {
      state.lightTheme = true;
      state.loading = false;
      state.successApp = '';
    },
  },
});

export const { toggleTheme, togglecurrentWidth, setLoadingStatus, clearAppSettingsState, clearAppSuccess } =
  appSettingsSlice.actions;

export default appSettingsSlice.reducer;
