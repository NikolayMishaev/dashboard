import React, { FC } from 'react';
import Button from '@mui/material/Button';
import { useAppSelector } from '../../hooks/redux-hooks';

import { IStyle } from '../../types/types';

export interface IButton{
  title: string;
  type: string;
  style: IStyle;
  handler?:  () => void;
}

const DashboardButton:FC<IButton> = ({ title, type, style, handler }) => {
  const loading = useAppSelector((state) => state.tickets.loading);
  return loading ? (
    <div className="lds-ripple">
      <div> </div>
      <div> </div>
    </div>
  ) : (
    <Button
      onClick={()=>handler && handler()}
      type={type === 'button' ? 'button' : 'submit'}
      variant="text"
      sx={{
        minHeight: '40px',
        marginLeft: style.marginLeft || '20px',
        textTransform: 'none',
        backgroundColor: style.backgroundColor,
        borderRadius: '8px',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '20px',
        textAlign: 'center',
        letterSpacing: '0.2px',
        color: '#FFFFFF',
        transition: 'all .5s',
        '&:hover': {
          opacity: 0.8,
          backgroundColor: style.backgroundColor,
        },
      }}
    >
      {title}
    </Button>
  );
}

export default DashboardButton