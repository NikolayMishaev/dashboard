import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getFirestore,
  collection,
  query,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';
import { setStartLoading, setError, convertDataTicket } from '../utils/utils';
import { ITicketFields, ITicketFieldsUpdate } from '../types/types';
import { defaultTiketFields } from '../utils/constants';

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (_, { rejectWithValue, dispatch }) => {
  try {
    const db = getFirestore();
    const tickets = await getDocs(query(collection(db, 'tickets')));
    if (!tickets) {
      throw new Error('Произошла ошибка при авторизации!');
    }
    tickets.forEach((item) => {
      const data = { ...item.data() };
      const convertedData = convertDataTicket({...defaultTiketFields, ...data});
      dispatch(
        addTicketStore({
          ...convertedData,
          id: item.id,
          confirmDelete: false,
        })
      );
    });
    return true;
  } catch (err) {
    if (err instanceof Error) return rejectWithValue(err.message);
    return rejectWithValue(err);
  }
});

export const deleteTicket = createAsyncThunk<string, {id:string,title:string}>(
  'tickets/deleteTicket',
  async ({ id, title }, { rejectWithValue, dispatch }) => {
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, 'tickets', id));
      dispatch(deleteTicketStore(id));
      return title;
    } catch (err) {
      if (err instanceof Error) return rejectWithValue(err.message);
      return rejectWithValue(err);
    }
  }
);

export const editTicket = createAsyncThunk<string, {id:string,data:ITicketFieldsUpdate}>(
  'tickets/editTicket',
  async ({ data, id }, { rejectWithValue, dispatch }) => {
    try {
      const db = getFirestore();
      await updateDoc(doc(db, 'tickets', id), {
        ...data,
        editedAt: serverTimestamp(),
        completedAt: data.completed ? serverTimestamp() : { seconds: 0 },
      });
      const updatedTicket = (await getDoc(doc(db, 'tickets', id))).data();
      if (!updatedTicket) throw new Error("Произошла ошибка при изменении данных тикета!")
      const convertedData = convertDataTicket({...defaultTiketFields, ...updatedTicket});
      dispatch(updateTicketStore({ ...convertedData, id }));
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return updatedTicket.title;
    } catch (err) {
      if (err instanceof Error) return rejectWithValue(err.message);
      return rejectWithValue(err);
    }
  }
);

export const addTicket = createAsyncThunk<{title:string, id: string}, ITicketFields>('tickets/addTicket', async (data, { rejectWithValue, dispatch }) => {
  try {
    const db = getFirestore();
    const newTicket = await addDoc(collection(db, 'tickets'), {
      ...data,
    });
    await updateDoc(newTicket, { createdAt: serverTimestamp(), editedAt: serverTimestamp() });
    const updatedTicket = (await getDoc(doc(db, 'tickets', newTicket.id))).data();
    if (!updatedTicket) throw new Error("Произошла ошибка при изменении данных тикета!")
    const convertedData = convertDataTicket({...defaultTiketFields, ...updatedTicket});
    dispatch(addTicketStore({ ...convertedData, id: newTicket.id, confirmDelete: false }));
    return { title: data.title, id: newTicket.id };
  } catch (err) {
    if (err instanceof Error) return rejectWithValue(err.message);
    return rejectWithValue(err);
  }
});

interface ITicketsState{
  tickets: Array<ITicketFields>,
  searchValue: string,
  loading: boolean,
  cardView:boolean,
  order: 'desc'|'asc',
  orderBy: string,
  page: number,
  error: string,
  success: string,
}

const initialState: ITicketsState = {
  tickets: [],
  searchValue: '',
  loading: false,
  cardView:false,
  order: 'desc',
  orderBy: 'editedAt',
  page: 0,
  error: '',
  success: '',
  }

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    addTicketStore(state, action: { payload: ITicketFields }) {
      state.tickets.push(action.payload);
    },
    toggleConfirmDelete(state, action) {
      state.tickets = state.tickets.map((i) =>
        i.id === action.payload ? { ...i, confirmDelete: !i.confirmDelete } : { ...i, confirmDelete: false }
      );
    },
    deleteTicketStore(state, action) {
      state.tickets = state.tickets.filter((i) => i.id !== action.payload);
    },
    updateTicketStore(state, action: { payload: ITicketFields }) {
      state.tickets = state.tickets.map((i) => (i.id === action.payload.id ? { ...i, ...action.payload } : i));
    },
    updateSearchValue(state, action: { payload: string }) {
      state.searchValue = action.payload;
    },
    toggleCardView(state, action: { payload: boolean }) {
      state.cardView = action.payload;
    },
    setOrder(state, action: { payload: 'desc' | 'asc' }) {
      state.order = action.payload;
    },
    setOrderBy(state, action: { payload: string }) {
      state.orderBy = action.payload;
    },
    setPage(state, action: { payload: number }) {
      state.page = action.payload;
    },
    clearError(state) {
      state.error = '';
    },
    clearSuccess(state) {
      state.success = '';
    },
    clearTicketsState(state) {
      state.tickets = [];
      state.searchValue = '';
      state.loading = false;
      state.error = '';
      state.success = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTickets.pending,setStartLoading)
    builder.addCase(fetchTickets.fulfilled,(state)=>{
      state.loading = false;
    })
    builder.addCase(fetchTickets.rejected,setError)
    builder.addCase(deleteTicket.pending,setStartLoading)
    builder.addCase(deleteTicket.fulfilled,(state,action)=>{
      state.loading = false;
      state.success = `Тикет '${action.payload}' успешно удален!`;
    })
    builder.addCase(deleteTicket.rejected,setError)
    builder.addCase(addTicket.pending,setStartLoading)
    builder.addCase(addTicket.fulfilled,(state,action)=>{
      state.loading = false;
      state.success = `Тикет '${action.payload.title}' успешно создан!`;
    })
    builder.addCase(addTicket.rejected,setError)
    builder.addCase(editTicket.pending,setStartLoading)
    builder.addCase(editTicket.fulfilled,(state,action)=>{
      state.loading = false;
      state.success = `Тикет '${action.payload}' успешно обновлен!`;
    })
    builder.addCase(editTicket.rejected,setError)
  }
});

const {
  addTicketStore,
  toggleConfirmDelete,
  deleteTicketStore,
  updateTicketStore,
  updateSearchValue,
  clearTicketsState,
  clearError,
  clearSuccess,
  toggleCardView,
  setOrder,
  setOrderBy,
  setPage
} = ticketsSlice.actions;

export { setPage, setOrderBy, setOrder, toggleCardView, toggleConfirmDelete, updateSearchValue, clearTicketsState, clearError, clearSuccess };
export default ticketsSlice.reducer;
