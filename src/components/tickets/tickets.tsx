import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns'
import styled from 'styled-components';
import { GridView, FormatListBulleted, Delete, Check, Close } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  Paper,
  Avatar,
  Card,
  CardContent,
  Grid,
  TextField,
} from '@mui/material';
import debounce from 'debounce';
import { toggleConfirmDelete, deleteTicket, toggleCardView, setOrder, setOrderBy, setPage } from '../../store/ticketsSlice';
import { widthMobile } from '../../utils/constants';
import { setPriorityColor, getComparator, getDifferenceLastUpdatedTicket, filterCards, getBackgroundColorCompletedTicketByTheme } from '../../utils/utils';
import EnhancedTableHead from '../enhanced-table-head/enhanced-table-head';
import DashboardButton from '../dashboard-button/dashboard-button';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import { ITicketFields } from '../../types/types';

const Time = styled.p`
  margin: 0;
  color: ${({ color }) => color};
  padding-bottom: 10px;
  font-size: 13px;
`;

const Tickets = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const user = useAppSelector((state) => state.user.user);
  const { tickets, searchValue, loading, cardView, order, orderBy, page } = useAppSelector((state) => state.tickets);
  const { currentWidth, lightTheme } = useAppSelector((state) => state.appSettings);
  const isMounted = useRef(false);


  const { register, watch, setValue } = useForm();

  function handleInputValue(value: number) {
    setRowsPerPage(value)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(debounce(handleInputValue, 1000), []);

useEffect(()=>{
  if (isMounted.current) {dispatch(setPage(0))} else {isMounted.current = true;}
},[searchValue])

useEffect(() => {
  if (watch('page') < 1 || watch('page') > 25) {setValue('page',5)} 
  else if (watch('page')) debounceFn(Math.round(Number(watch('page'))));
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [watch('page')]);

  const handleRequestSort = (event:any, property:string) => {
    const isAsc = orderBy === property && order === 'asc';
    dispatch(setOrder(isAsc ? 'desc' : 'asc'));
    dispatch(setOrderBy(property));
  };

  function handleChangeViewTickets(value:boolean) {
    dispatch(toggleCardView(value));
  }

  async function handleDeleteTicket(id:string, title:string) {
    await dispatch(deleteTicket({ id, title }));
  }

  function handleConfirmDeleteTicket(id:string) {
    dispatch(toggleConfirmDelete(id));
  }

  function handleAddTicket() {
    navigate(`${path}/new`);
  }

  function handleClickTicket(e:React.MouseEvent<HTMLDivElement, MouseEvent>, row:ITicketFields) {
    if (e.target !== null) {
      if ((e.target as HTMLButtonElement).tagName !== 'path') {
        if ((e.target as HTMLButtonElement).tagName !== 'svg') {
          navigate(`${row.id}`);
        }
      }
    }
  }

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    dispatch(setPage(0));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tickets.length) : 0;

  const formatDate = (currentFormat: string, date : number) => format(date * 1000, currentFormat);

  function getDisplayComponent(row:ITicketFields) {
    if (loading && row.confirmDelete) {
      return (
        <div
          className="lds-ripple"
          style={{ transform: 'scale(0.7)', top: '-20px', left: '-20px', width: '24px', height: '24px' }}
        >
          <div> </div>
          <div> </div>
        </div>
      );
    }
    return row.confirmDelete ? (
      <>
        <Check
          sx={{
            color: '#219653',
            marginRight: currentWidth < 1024 ? '-5px' : '3px',
            transition: 'all .5s',
            '&:hover': { opacity: '.5', cursor: 'pointer' },
          }}
          onClick={() => handleDeleteTicket(row.id, row.title)}
        />
        <Close
          sx={{
            color: '#EB5757',
            transition: 'all .5s',
            '&:hover': { opacity: '.5', cursor: 'pointer' },
          }}
          onClick={() => handleConfirmDeleteTicket(row.id)}
        />
      </>
    ) : (
      row.uid === user.uid && !row.completed && (
        <Delete
          onClick={() => handleConfirmDeleteTicket(row.id)}
          sx={{
            color: '#BDBDBD',
            transition: 'all .5s',
            '&:hover': { opacity: '.6', cursor: 'pointer' },
          }}
        />
      )
    );
  }

  return (
    <Box
      sx={{
        position: 'relative',
        margin: `30px 30px 30px ${currentWidth >= widthMobile.aside ? '285px' : '105px'}`,
        transition: 'all .5s',
      }}
    >
      <Paper sx={{ width: '100%', mb: 2, backgroundColor: lightTheme ? '#fff' : '#EDEDED' }}>
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
          <Typography variant="h6" id="tableTitle" component="div">
            All tickets
          </Typography>
          <DashboardButton
            title="New Ticket"
            type="button"
            style={{ backgroundColor: '#2F80ED' }}
            handler={() => handleAddTicket()}
          />
          <Typography component="p" sx={{ marginLeft: 'auto', color: '#687A92' }}>
            View:
          </Typography>
          <GridView
            onClick={() => handleChangeViewTickets(true)}
            sx={{
              margin: '0 10px 0 8px',
              color: cardView ? '#27AE60' : '#BDBDBD',
              transition: 'all .5s',
              '&:hover': { cursor: 'pointer', opacity: 0.6 },
            }}
          />
          <FormatListBulleted
            onClick={() => handleChangeViewTickets(false)}
            sx={{
              marginRight: '24px',
              fontSize: '27px',
              color: cardView ? '#BDBDBD' : '#27AE60',
              transition: 'all .5s',
              '&:hover': { cursor: 'pointer', opacity: 0.6 },
            }}
          />
        </Toolbar>
        {cardView ? (
          <Grid container spacing={2} sx={{ padding: '20px' }}>
            {tickets
              .filter((i) => filterCards(i, searchValue))
              .sort(getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <Grid item xs={currentWidth < widthMobile.cards ? 4 : 3} key={row.id}>
                  <Card
                    sx={{
                      boxShadow: '0px 0px 10px rgba(192, 197, 233, 0.6',
                      borderRadius: '4px',
                    }}
                  >
                    <CardContent
                      onClick={(e:React.MouseEvent<HTMLDivElement, MouseEvent>) => handleClickTicket(e, row)}
                      sx={{
                        position: 'relative',
                        backgroundColor: `${row.completed ? getBackgroundColorCompletedTicketByTheme(lightTheme) : 'none'}`,
                        transition: 'all .5s',
                        '&:hover': { cursor: 'pointer', backgroundColor: '#F3F4F6' },
                      }}
                    >
                      <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
                        {formatDate('PP', row.createdAt.seconds)}
                      </Typography>
                      <Typography
                        component="p"
                        sx={{
                          backgroundColor: setPriorityColor(row.priority),
                          padding: '5px 12px',
                          borderRadius: '100px',
                          display: 'inline-block',
                          color: '#fff',
                          textTransform: 'uppercase',
                          position: 'absolute',
                          top: '14%',
                          right: '20%',
                          fontSize: '13px',
                        }}
                      >
                        {row.priority}
                      </Typography>
                      <Box sx={{ position: 'absolute', top: '14%', right: '2%' }}>{getDisplayComponent(row)}</Box>
                      <Time color={lightTheme ? '#c5c7cd' : '#545454'}>{formatDate('p', row.createdAt.seconds)}</Time>
                      <Typography
                        sx={{
                          fontSize: '17px',
                          fontWeight: 500,
                          lineHeight: '1.2',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                        }}
                      >
                        {row.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '16px',
                          fontWeight: 500,
                          lineHeight: '1.2',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          height: '38px',
                        }}
                      >
                        {row.description}
                      </Typography>
                      <Typography sx={{ fontSize: '14px', color: lightTheme ? '#c5c7cd' : '#545454' }}>
                        Updated 1 day ago
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          marginTop: '15px',
                          fontWeight: 500,
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                        }}
                      >
                        <Avatar
                          sx={{
                            marginRight: '15px',
                          }}
                          src={row.photoURL}
                        />
                        {row.displayName}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        ) : (
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
              <EnhancedTableHead
                order={order === 'asc' ? 'asc' : 'desc'}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {tickets
                  .filter((i) => filterCards(i, searchValue))
                  .sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                    onClick={(e:React.MouseEvent<HTMLDivElement, MouseEvent>) => handleClickTicket(e, row)}
                      key={row.id}
                      sx={{
                        backgroundColor: `${row.completed ? getBackgroundColorCompletedTicketByTheme(lightTheme) : 'none'}`,
                        transition: 'all .5s',
                        '&:hover': { cursor: 'pointer', backgroundColor: '#F3F4F6' },
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ marginRight: '15px' }} src={row.photoURL} />
                          <Box
                            sx={{
                              fontWeight: 500,
                              width: '300px',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                            }}
                          >
                            {row.title}
                            <Typography sx={{ fontSize: '14px', color: lightTheme ? '#c5c7cd' : '#545454' }}>
                              {getDifferenceLastUpdatedTicket(row.editedAt)}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{
                          maxHeight: '73px',
                          overflow: 'hidden',
                        }}
                      >
                        {row.displayName}
                      </TableCell>
                      <TableCell>
                        {formatDate('PP', row.createdAt.seconds)}
                        <Time color={lightTheme ? '#c5c7cd' : '#545454'}>
                          {formatDate('p', row.createdAt.seconds)}
                        </Time>
                      </TableCell>
                      <TableCell sx={{ width: '100px' }}>
                        <Typography
                          component="p"
                          sx={{
                            backgroundColor: setPriorityColor(row.priority),
                            padding: '5px 12px',
                            borderRadius: '100px',
                            display: 'inline-block',
                            color: '#fff',
                            textTransform: 'uppercase',
                            fontSize: '13px',
                          }}
                        >
                          {row.priority}
                        </Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ width: '60px' }}>
                        {getDisplayComponent(row)}
                      </TableCell>
                    </TableRow>
                  ))}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <TextField
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register('page')}
        sx={{position: 'absolute', bottom: '10px', right: '180px', width: '50px', zIndex: '1'}}
          id="standard-number"
          type="number"
          defaultValue={5}
          inputProps={{ style: {padding: '5px 5px 5px 10px', fontSize: '15px'}, min:1, max:25 }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TablePagination
          rowsPerPageOptions={[-1]}
          component="div"
          count={tickets.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default Tickets;