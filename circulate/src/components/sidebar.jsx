import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => (event) => {
    setOpen(state);
  };
  
  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      {/* IconButton to open the Drawer */}
      <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>

      {/* AppBar (optional) */}
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Marketplace
        </Typography>
      </Toolbar>

      {/* Drawer (Sidebar) */}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          {pages.map((page, index) => (
            <ListItem button component={Link} to={page.path} key={index} onClick={toggleDrawer(false)}>
              <ListItemText primary={page.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;