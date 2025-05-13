import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const DrawerContainer = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
  },
}));

const Sidebar = () => {
  return (
    <DrawerContainer variant="permanent">
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/applications">
          <ListItemIcon><AssignmentIcon /></ListItemIcon>
          <ListItemText primary="Applications" />
        </ListItem>
        <ListItem button component={Link} to="/users">
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component={Link} to="/application-form">
          <ListItemIcon><AddIcon /></ListItemIcon>
          <ListItemText primary="New Application" />
        </ListItem>
      </List>
    </DrawerContainer>
  );
};

export default Sidebar;