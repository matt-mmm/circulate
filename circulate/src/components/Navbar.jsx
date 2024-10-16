import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Marketplace
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/Products">
          Products
        </Button>
        <Button color="inherit" component={Link} to="/AboutUs">
          About
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;