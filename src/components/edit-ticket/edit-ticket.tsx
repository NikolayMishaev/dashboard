import { useParams, useNavigate } from 'react-router-dom';
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import Ticket from '../ticket/ticket';
import { editTicket, deleteTicket } from '../../store/ticketsSlice';
import { ROUTES } from '../../utils/constants';
import { ITicketFieldsUpdate } from '../../types/types';

const EditTicket = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const ticketId = params.id;
  const user = useAppSelector((state) => state.user.user);
  const tickets = useAppSelector((state) => state.tickets.tickets);
  const currentTicket = tickets.find((i) => i.id === ticketId);

  const handleEditTicket = async (e: ITicketFieldsUpdate) => {
    if (ticketId) {
      await dispatch(editTicket({ data: e, id: ticketId }));
    }
  };

  const handleTicketCompleted = async () => {
    if (ticketId) {
      await dispatch(editTicket({ data: { completed: true }, id: ticketId }));
    }
  };

  const handleTicketDelete = async () => {
    if (ticketId && currentTicket?.title) {
      await dispatch(deleteTicket({ id: ticketId, title: currentTicket?.title || '' }));
      navigate(ROUTES.tickets);
    }
  };

  const buttons = [
    { title: 'Edit Ticket', type: 'submit', id: 1, style: { backgroundColor: '#2F80ED' } },
    { title: 'Complete', type: 'button', id: 2, style: { backgroundColor: '#F2C94C' }, handler: handleTicketCompleted },
    { title: 'Delete', type: 'button', id: 3, style: { backgroundColor: '#EB5757' }, handler: handleTicketDelete },
  ];

  return (
    <Ticket
      handleTicket={handleEditTicket}
      title="Edit ticket"
      buttons={buttons}
      ticket={{ title: currentTicket?.title || '', priority: currentTicket?.priority || '', description: currentTicket?.description || '' }}
      editingRights={currentTicket?.uid === user.uid}
      completed={currentTicket?.completed || false}
    />
  );
};

export default EditTicket;
