import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

function NavigationBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Doctor Management System
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button component={Link} to="/Home" color="inherit" startIcon={<HomeIcon />}>Home</Button>
        <Button component={Link} to="/register" color="inherit" startIcon={<SchoolIcon />}>Register</Button>
        <Button component={Link} to="/login" color="inherit" startIcon={<PersonIcon />}>Login </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
