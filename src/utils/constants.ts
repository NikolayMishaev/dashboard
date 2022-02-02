const appTheme = {
  light: {
    appBackground: '#F7F8FC',
    headerLightButton: '#4F4F4F',
    headerDarkButton: '#BDBDBD',
    headerTitle: '#252733',
    headerUserName: '#252733',
  },
  dark: {
    appBackground: '#363740',
    headerLightButton: '#4F4F4F',
    headerDarkButton: '#BDBDBD',
    headerTitle: '#F7F8FC',
    headerUserName: '#F7F8FC',
  },
};

const asideListItem = {
  activeText: {
    color: '#DDE2FF',
  },
  inactiveText: {
    color: '#9FA2B4',
  },
  activeList: {
    backgroundColor: '#9FA2B410',
    borderLeft: '3px solid #DDE2FF',
    width: '43px',
  },
  inactiveList: {
    backgroundColor: 'transparent',
    borderLeft: 'none',
    width: '43px',
  },
  activeIcon: {
    color: '#DDE2FF',
    opacity: 1,
    marginLeft: '5px',
  },
  inactiveIcon: {
    color: '#9FA2B4',
    opacity: 0.4,
    marginLeft: '8px',
    marginRight: '27px',
  },
};

const widthMobile = {
  aside: 1280,
  cards: 1440,
};

const ROUTES = {
  login: '/',
  dashboard: '/dashboard',
  tickets: '/tickets',
  addTicket: '/tickets/new',
};

const headCells = [
  {
    id: 'title',
    label: 'Ticket details',
  },
  {
    id: 'displayName',
    label: 'Owner name',
  },
  {
    id: 'createdAt',
    label: 'Date',
  },
  {
    id: 'priority',
    label: 'Priority',
  },
  {
    id: 'deleteTask',
    label: '',
  },
];

const defaultTiketFields = {
  title: '',
  priority: '',
  description: '',
  completed: false,
  uid: '',
  displayName: '',
  photoURL: '',
  id: '',
  createdAt: { seconds: 0 },
  editedAt: { seconds: 0 },
  completedAt: { seconds: 0 },
};

export { appTheme, asideListItem, widthMobile, ROUTES, headCells, defaultTiketFields };
