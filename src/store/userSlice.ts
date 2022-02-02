import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { setError, setStartLoading } from '../utils/utils';

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    if (!user.uid || !user.email || !user.displayName || !user.photoURL) {
      throw new Error('Произошла ошибка при авторизации!');
    }
    const { uid = '', email = '', displayName = '', photoURL = '' } = user;
    return { uid, email, displayName, photoURL };
  } catch (err) {
    if (err instanceof Error) return rejectWithValue(err.message);
    return rejectWithValue(err)
  }
});

interface IUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

interface IUserState {
  user: IUser;
  loading: boolean;
  error: string;
}

const initialState: IUserState = {
  user: { uid: '', email: '', displayName: '', photoURL: '' },
  loading: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    deleteUser(state) {
      state.user = { uid: '', email: '', displayName: '', photoURL: '' };
      state.loading = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, setStartLoading);
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUser.rejected, setError);
  },
});

export const { deleteUser } = userSlice.actions;
export default userSlice.reducer;
