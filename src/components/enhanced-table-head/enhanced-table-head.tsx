import { visuallyHidden } from '@mui/utils';
import { TableHead, TableSortLabel, TableRow, TableCell, Box } from '@mui/material';
import React, { FC } from 'react';
import { headCells } from '../../utils/constants';

interface IEnhancedTableHead{
  order: 'asc' | 'desc';
  orderBy: string;
  onRequestSort: (event:any, property:string) => void;
}

const EnhancedTableHead: FC<IEnhancedTableHead> = ({ order, orderBy, onRequestSort }) => {
  const createSortHandler = (property: string) => (event: any) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sx={{ padding: '0 16px 6px', color: 'red !important' }}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id === 'createdAt' || headCell.id === 'priority' ? (
              <TableSortLabel
                active
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead