import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { Typography, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { PieChartOutline, Article, Label } from '@mui/icons-material';
import React, { FC } from 'react';
import { asideListItem, widthMobile } from '../../utils/constants';
import { useAppSelector } from '../../hooks/redux-hooks';

interface IProps {
  size: string;
}

const AsideWrapper =
  styled.aside <
  IProps >
  `
  width: ${({ size }) => size};
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #363740;
  transition: all 0.5s;
`;

const AsideInner =
  styled.div <
  IProps >
  `
  width: ${({ size }) => size};
  position: fixed;
  transition: all 0.5s;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Aside: FC = () => {
  const currentWidth = useAppSelector((state) => state.appSettings.currentWidth);
  const location = useLocation();
  const path = location.pathname.replace(/^../, (match) => match[1].toUpperCase());
  const navigate = useNavigate();
  const { activeList, inactiveList, activeIcon, inactiveIcon, activeText, inactiveText } = asideListItem;
  const handleListClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent> & {target: Element}) => {
    if (e.target !== null) {
      const currentPath = (e.target).closest('li')?.id;
      if (currentPath !== path) {
        if (currentPath) navigate(`/${currentPath.toLowerCase()}`);
      }
    }
  };

  return (
    <AsideWrapper size={currentWidth < widthMobile.aside ? '75px' : '255px'}>
      <AsideInner size={currentWidth < widthMobile.aside ? '75px' : '255px'}>
        <Box
          sx={{
            marginTop: '40px',
            marginBottom: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Label
            fontSize="small"
            sx={{ color: '#FFF', backgroundColor: '#3751FF', padding: '6px', borderRadius: '20px' }}
          />
          {currentWidth >= widthMobile.aside && (
            <Typography
              variant="h6"
              component="h1"
              sx={{ color: '#A4A6B3', fontFamily: 'Inter', marginLeft: '12px', fontSize: '18px' }}
            >
              Dashboard Kit
            </Typography>
          )}
        </Box>

        <Box sx={{ width: '100%', color: '#A4A6B3' }}>
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding id="Dashboard">
                <Tooltip title={currentWidth < widthMobile.aside ? 'Dashboard' : ''} placement="top">
                  <ListItemButton
                    onClick={handleListClick}
                    sx={path === 'Dashboard' ? { ...activeList } : { ...inactiveList }}
                  >
                    <ListItemIcon>
                      <PieChartOutline sx={path === 'Dashboard' ? { ...activeIcon } : { ...inactiveIcon }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={currentWidth >= widthMobile.aside ? 'Dashboard' : ''}
                      sx={path === 'Dashboard' ? { ...activeText } : { ...inactiveText }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
              <ListItem disablePadding id="Tickets">
                <Tooltip title={currentWidth < widthMobile.aside ? 'Tickets' : ''} placement="bottom">
                  <ListItemButton
                    onClick={handleListClick}
                    sx={path === 'Tickets' ? { ...activeList } : { ...inactiveList }}
                  >
                    <ListItemIcon>
                      <Article sx={path === 'Tickets' ? { ...activeIcon } : { ...inactiveIcon }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={currentWidth >= widthMobile.aside ? 'Tickets' : ''}
                      sx={path === 'Tickets' ? { ...activeText } : { ...inactiveText }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            </List>
          </nav>
        </Box>
      </AsideInner>
    </AsideWrapper>
  );
};

export default Aside;
