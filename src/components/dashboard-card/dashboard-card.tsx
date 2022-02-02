import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Paper, Grid } from '@mui/material';
import React, { FC } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
}));

interface IDashboardCard{
  title: string
  value: number | undefined;
  percent: number | undefined;
}

const DashboardCard:FC<IDashboardCard> = ({ title, value = 0, percent }) => (
    <Grid item xs={3}>
      <Item sx={{ padding: '20px 5px' }}>
        <Typography
          sx={{
            fontSize: 18,
            fontStyle: 'normal',
            fontWeight: 'bold',
            lineHeight: '24px',
            color: '#9FA2B4',
            fontFamily: 'Inter',
            marginBottom: '12px',
          }}
          component="p"
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: 40,
            fontStyle: 'normal',
            fontWeight: 'bold',
            lineHeight: '50px',
            color: '#252733',
            fontFamily: 'Inter',
            maxHeight: '50px',
          }}
          component="p"
        >
          {value}
          <Typography
            sx={{
              fontSize: 25,
              fontStyle: 'normal',
              fontWeight: 'bold',
              lineHeight: '50px',
              color: '#252733',
              fontFamily: 'Inter',
              marginLeft: '10px',
            }}
            component="span"
          >
            {percent && `${percent} %`}
            {percent === 0 && ' %'}
          </Typography>
        </Typography>
      </Item>
    </Grid>
  )

export default DashboardCard