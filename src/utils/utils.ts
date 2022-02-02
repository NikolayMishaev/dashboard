import { format } from 'date-fns'
import { ITicketFields } from '../types/types';

const setStartLoading = (state: { loading: boolean }) => {
  state.loading = true;
};

const setError = (state: { loading: boolean, error: string }, action: { payload: any }) => {
  state.loading = false;
  if (typeof action.payload === 'string') state.error = action.payload;
};

function convertDataTicket(ticket: ITicketFields) {
  return {
    ...ticket,
    createdAt: { seconds: ticket.createdAt.seconds },
    editedAt: { seconds: ticket.editedAt.seconds },
    completedAt: { seconds: ticket.completed ? ticket?.completedAt?.seconds : 0 },
  };
}

function setPriorityColor(value: string) {
  switch (value.toLowerCase()) {
    case 'high':
      return '#F12B2C';
    case 'normal':
      return '#29CC97';
    case 'low':
      return '#F2C94C';
    default:
      return 'transparent';
  }
}

const getPriorityWeight = (priority: string) => {
  switch (priority) {
    case 'High':
      return 3;
    case 'Normal':
      return 2;
    case 'Low':
      return 1;
    default:
      return 0;
  }
};

function descendingComparator(a: ITicketFields, b: ITicketFields, orderBy: string) {
  if (orderBy === 'priority') {
    return getPriorityWeight(b[orderBy]) - getPriorityWeight(a[orderBy]);
  }
  if (orderBy === 'createdAt' || orderBy === 'editedAt') {
    if (b[orderBy].seconds < a[orderBy].seconds) {
      return -1;
    }
    if (b[orderBy].seconds > a[orderBy].seconds) {
      return 1;
    }
  }
    return 0;
  
}

function getComparator(order: string, orderBy: string) {
  return order === 'desc'
    ? (a: ITicketFields, b: ITicketFields) => descendingComparator(a, b, orderBy)
    : (a: ITicketFields, b: ITicketFields) => -descendingComparator(a, b, orderBy);
}

const getDifferenceLastUpdatedTicket = (editedAt: { seconds: number }) => {
  const countDays = Math.floor((new Date().getTime() - editedAt.seconds * 1000) / 86400 / 1000);
  if (countDays < 1) {
    return `Updated less than a day ago`;
  }
  return `Updated ${countDays} ${countDays > 1 ? 'days' : 'day'} ago`;
};

const checkMatch = (v: string | undefined, searchValue: string) => v && v.toLowerCase().includes(searchValue);

const filterCards = (i: ITicketFields, searchValue: string) =>
  checkMatch(i.displayName, searchValue) ||
  checkMatch(i.title, searchValue) ||
  checkMatch(i.description, searchValue) ||
  checkMatch(i.priority, searchValue) ||
  checkMatch(format((i.createdAt?.seconds || 1) * 1000, 'PPp'), searchValue);

const getBackgroundColorCompletedTicketByTheme = (lightTheme: boolean): string => (lightTheme ? '#EBFFE6' : '#DAC2DB');

export {
  setStartLoading,
  setError,
  convertDataTicket,
  setPriorityColor,
  getComparator,
  getDifferenceLastUpdatedTicket,
  filterCards,
  getBackgroundColorCompletedTicketByTheme,
};
