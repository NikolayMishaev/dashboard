/* eslint-disable react/jsx-props-no-spreading */
import { Box, Container, TextField, Typography, InputLabel, MenuItem, FormControl, Select, Grid } from '@mui/material';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../hooks/redux-hooks';
import DashboardButton from '../dashboard-button/dashboard-button';
import { widthMobile } from '../../utils/constants';

import { IStyle, ITicketFieldsUpdate } from '../../types/types';

const Completed = styled.p`
  background-color: ${({ color }) => color};
  border-radius: 8px;
  padding: 8px;
  border: 1px solid lightgrey;
  color: grey;
  margin: auto !important;
`;

interface IButtons {
  title: string;
  type: string;
  id: number;
  style: IStyle;
  handler?: () => void;
  }

interface ITicket {
  handleTicket: (e: ITicketFieldsUpdate) => Promise<void>
  title: string;
  buttons:Array<IButtons>;
  ticket: {title:string | undefined; description: string | undefined; priority: string | undefined};
  editingRights: boolean;
  completed: boolean | undefined;
}

type FormValues = {
  title: string;
  priority: string;
  description: string;
};

const Ticket: FC<ITicket> = ({ handleTicket, title, buttons, ticket, editingRights, completed }) => {
  const { lightTheme, currentWidth } = useAppSelector((state) => state.appSettings);
  const {
    register,
    handleSubmit,
    formState: { errors, submitCount },
  } = useForm<FormValues>();

  useEffect(() => {
    if (Object.keys(errors).length !== 0) toast.error('Выделенные поля не прошли валидацию!');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitCount]);
  return (
    <Container maxWidth={false}>
      {' '}
      <Box
        onSubmit={handleSubmit(handleTicket)}
        component="form"
        sx={{
          p: 3,
          flexGrow: 1,
          marginLeft: currentWidth >= widthMobile.aside ? '255px' : '75px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          border: '1px solid #DFE0EB',
          transition: 'all .5s',
          '& > :not(style)': { m: 1 },
        }}
      >
        <Typography component="p" variant="h5" sx={{ marginBottom: '20px' }}>
          {title}
        </Typography>
        <Grid sx={{ width: '60%', display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 1 } }}>
          <TextField
            {...register('title', {
              required: { value: true, message: 'Это поле обязательно!' },
              maxLength: { value: 50, message: 'Максимальная длина не более 50 символов!' },
            })}
            label={errors?.title?.message || 'Ticket Title *'}
            variant="outlined"
            error={Boolean(errors?.title?.message && true)}
            sx={{ flex: 1 }}
            defaultValue={ticket?.title || ''}
            disabled={completed ? true : !editingRights}
          />
          <FormControl sx={{ flex: 1 }}>
            <InputLabel id="demo-simple-select-label" error={Boolean(errors?.priority?.message && true)}>
              {errors?.priority?.message || 'Select Priority *'}
            </InputLabel>
            <Select
              {...register('priority', { required: { value: true, message: 'Это поле обязательно!' } })}
              label={errors?.priority?.message || 'Select Priority *'}
              defaultValue={ticket?.priority || ''}
              key={ticket?.priority}
              error={Boolean(errors?.priority?.message && true)}
              disabled={completed ? true : !editingRights}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Normal">Normal</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
          <TextField
            {...register('description', {
              maxLength: { value: 100, message: 'Максимальная длина не более 100 символов!' },
            })}
            sx={{ width: '100%', marginTop: '20px' }}
            label={errors?.description?.message || 'Description'}
            error={Boolean(errors?.description?.message && true)}
            multiline
            maxRows={4}
            defaultValue={ticket?.description || ''}
            disabled={completed ? true : !editingRights}
          />
          {completed ? (
            <Completed color={lightTheme ? '#EBFFE6' : '#DAC2DB'}>Completed</Completed>
          ) : (
            editingRights && buttons.map((i:IButtons) => <DashboardButton title={i.title} type={i.type} style={i.style} handler={i.handler} key={i.id} />)
          )}
        </Grid>
      </Box>
    </Container>
  );
}

export default Ticket;
