// src/components/NavbarComponents.js
import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Button, Typography, ListItem, ListItemText } from '@mui/material';
import { styles } from './styles/NavbarStyles';

const navItems = [
  { text: 'Home', path: '/' },
  { text: 'Books', path: '/books' },
  { text: 'Authors', path: '/authors' },
];

export const NavLinks = () => {
  const location = useLocation();
  return (
    <>
      {navItems.map((item) => (
        <Button
          key={item.text}
          color="inherit"
          component={RouterLink}
          to={item.path}
          sx={{
            ...styles.navButton,
            '&::after': {
              ...styles.navButton['&::after'],
              transform: location.pathname === item.path ? 'scaleX(1)' : 'scaleX(0)',
            },
          }}
        >
          {item.text}
        </Button>
      ))}
    </>
  );
};

export const AuthButtons = ({ isLoggedIn, onLoginClick, onLogout, username }) => (
  <>
    {!isLoggedIn ? (
      <Button color="inherit" onClick={onLoginClick} sx={styles.authButton}>
        Log In
      </Button>
    ) : (
      <>
        <Typography variant="body1" sx={{ mr: 2, fontWeight: 500 }}>
          Welcome, {username}!
        </Typography>
        <Button color="inherit" onClick={onLogout} sx={styles.authButton}>
          Log Out
        </Button>
      </>
    )}
  </>
);

export const DrawerItems = ({ isLoggedIn, onLoginClick, onLogout, username, toggleMenu }) => {
  const location = useLocation();
  return (
    <>
      {navItems.map((item) => (
        <ListItem
          button
          key={item.text}
          component={RouterLink}
          to={item.path}
          onClick={toggleMenu}
          sx={{
            ...styles.drawerItem,
            '&::after': {
              ...styles.drawerItem['&::after'],
              transform: location.pathname === item.path ? 'scaleX(1)' : 'scaleX(0)',
            },
          }}
        >
          <ListItemText 
            primary={item.text} 
            primaryTypographyProps={styles.drawerItemText} 
          />
        </ListItem>
      ))}
      {isLoggedIn ? (
        <>
          <ListItem>
            <ListItemText 
              primary={`Welcome, ${username}!`} 
              primaryTypographyProps={{ 
                fontWeight: 500,
                fontFamily: "'Poppins', sans-serif" 
              }} 
            />
          </ListItem>
          <ListItem button onClick={onLogout}>
            <ListItemText 
              primary="Log Out" 
              primaryTypographyProps={styles.drawerItemText} 
            />
          </ListItem>
        </>
      ) : (
        <ListItem button onClick={onLoginClick}>
          <ListItemText 
            primary="Log In" 
            primaryTypographyProps={styles.drawerItemText} 
          />
        </ListItem>
      )}
    </>
  );
};