import React, { useState, useEffect } from 'react';
import { Typography, Paper, Container, Grid, Box } from '@mui/material';
import { format } from 'date-fns'
import { useAppSelector } from '../../hooks/redux-hooks';
import { widthMobile } from '../../utils/constants';
import DashboardCard from '../dashboard-card/dashboard-card';
import BarChart from '../bar-chart/bar-chart';

const Dashboard = () => {
  const { tickets, loading } = useAppSelector((state) => state.tickets);
  const currentWidth = useAppSelector((state) => state.appSettings.currentWidth);
  const user = useAppSelector((state) => state.user.user);

  interface IDataTask {
    title: string;
    value: number;
    percent?: number;
  }

  const [dataAllTask, setDataAllTask] = useState < Array < IDataTask >> ([{ title: '', value: 0, percent: 0 }]);
  const [dataUserTask, setDataUserTask] = useState < Array < IDataTask >> ([{ title: '', value: 0, percent: 0 }]);
  const [dataChart, setDataChart] = useState([{}]);

  interface IData {
    [key: string]: number;
  }

  interface IDataBoard {
    [key: string]: IData;
  }

  useEffect(() => {
    const objBoard: IDataBoard = {};
    for (let c = 0; c < 13; c += 1) {
      const dateDifference = new Date(new Date().getTime() - c * 86400000);
      const currentDay = format(dateDifference,'d');
      objBoard[currentDay] = { date: Number(currentDay), fullDate: Number(dateDifference) };
    }
    const obj: IData = {};
    tickets.forEach((i) => {
      if (user.uid === i.uid) {
        obj['Total Current User'] = obj['Total Current User'] + 1 || 1;
      }
      if (i.completed) {
        const dateCompletedTicketMs = (i.completedAt?.seconds || 1) * 1000;
        const dateCompletedTicket = new Date(dateCompletedTicketMs).getTime();
        const dateNow = new Date().getTime();
        const daysDifference = dateNow - dateCompletedTicket;
        if (daysDifference / 86400 / 1000 < 13) {
          const day = format(dateCompletedTicket, 'd');
          if (!objBoard[day]) objBoard[day] = {};
          objBoard[day][i.priority || 'undefined'] = objBoard[day][i.priority || 'undefined'] + 1 || 1;
          objBoard[day].fullDate = dateCompletedTicketMs;
          objBoard[day].date = Number(day);
        }
      } else {
        obj[`Total ${i.priority}`] = obj[`Total ${i.priority}`] + 1 || 1;
        obj['Total Uncompleted'] = obj['Total Uncompleted'] + 1 || 1;
        if (user.uid === i.uid) {
          obj[i.priority || 'undefined'] = obj[i.priority || 'undefined'] + 1 || 1;
          obj.Uncompleted = obj.Uncompleted + 1 || 1;
        }
      }
    });
    obj['Total percent'] = Math.round((obj['Total Uncompleted'] / tickets.length) * 100);
    obj.percent = Math.round((obj.Uncompleted / obj['Total Current User']) * 100);

    const dataAllTaskCurrent = [
      { title: 'Total High', value: obj['Total High'] },
      { title: 'Total Normal', value: obj['Total Normal'] },
      { title: 'Total Low', value: obj['Total Low'] },
      { title: 'Total Uncompleted', value: obj['Total Uncompleted'], percent: obj['Total percent'] || 0 },
    ];

    const dataChartCurrent = Object.values(objBoard).sort((a, b) => a.fullDate - b.fullDate);

    const dataUserTaskCurrent = [
      { title: 'High', value: obj.High },
      { title: 'Normal', value: obj.Normal },
      { title: 'Low', value: obj.Low },
      { title: 'Uncompleted', value: obj.Uncompleted, percent: obj.percent || 0 },
    ];
    setDataAllTask([...dataAllTaskCurrent]);
    setDataChart([...dataChartCurrent]);
    setDataUserTask([...dataUserTaskCurrent]);
  }, [tickets, user.uid]);
  return (
    <Container maxWidth={false} sx={{ marginTop: '50px' }}>
      {' '}
      <Box
        sx={{ flexGrow: 1, marginLeft: currentWidth >= widthMobile.aside ? '255px' : '75px', transition: 'all .5s' }}
      >
        {loading ? (
          <div className="lds-ripple">
            <div> </div>
            <div> </div>
          </div>
        ) : (
          <Grid container spacing={2}>
            {dataAllTask.map((i) => (
              <DashboardCard key={i.title} title={i.title} value={i.value} percent={i.percent} />
            ))}
            <Paper sx={{ height: '546px', width: '100%', margin: '30px 0 14px 16px' }}>
              <Box sx={{ margin: '32px 0 0 32px' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }} component="p">
                  Completed Trends
                </Typography>
                <Typography sx={{ fontSize: '14px', color: '#9FA2B4' }} component="p">
                  as of {format(new Date(),'PPp')}
                </Typography>
              </Box>
              <BarChart data={dataChart} />
            </Paper>
            {dataUserTask.map((i) => (
              <DashboardCard key={i.title} title={i.title} value={i.value} percent={i.percent} />
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;
