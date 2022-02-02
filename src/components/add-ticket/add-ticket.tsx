import { useNavigate } from 'react-router-dom';
import React from 'react';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { addTicket } from '../../store/ticketsSlice';
import { ROUTES } from '../../utils/constants';
import Ticket from '../ticket/ticket';
import { ITicketFieldsUpdate } from '../../types/types';

const AddTicket = () => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCreateTicket = async (e: ITicketFieldsUpdate) => {
    const res: PayloadAction<any> = await dispatch(
      addTicket({
        title: '',
        priority: '',
        description: '',
        ...e,
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        completed: false,
        createdAt: { seconds: 0 },
        editedAt: { seconds: 0 },
        completedAt: { seconds: 0 },
        id: '',
      })
    );
    // eslint-disable-next-line
    if (res.payload.id) navigate(`${ROUTES.tickets}/${res.payload.id}`);
  };

  const buttons = [{ title: 'Create Ticket', type: 'submit', id: 1, style: { backgroundColor: '#2F80ED' } }];

  return (
    <Ticket
      handleTicket={handleCreateTicket}
      title="Create new ticket"
      buttons={buttons}
      ticket={{
        title: undefined,
        description: undefined,
        priority: undefined,
      }}
      editingRights
      completed={false}
    />
  );
};

export default AddTicket;
