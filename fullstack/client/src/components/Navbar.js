// src/components/Navbar.js
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../images/Logo.png';
/*import { darkBlueTheme } from '../theme';*/
import { NavLinks, AuthButtons, DrawerItems } from './NavbarComponents';
import { styles } from './styles/NavbarStyles.js';



const Navbar = ({ onLoginClick, isLoggedIn, onLogout, username }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
   
      <AppBar position="static" sx={{ backgroundColor: '#301934' }} >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img
              src={logo}
              alt="InventoryWise Logo"
              style={{ height: '50px', marginRight: '10px' }}
            />
            <Typography
              variant="h5"
              component={RouterLink}
              to="/"
              sx={styles.logo}
            >
              InventoryWise
            </Typography>
          </Box>

          {!isMobile && (
            <>
              <NavLinks />
              <AuthButtons isLoggedIn={isLoggedIn} onLoginClick={onLoginClick} onLogout={onLogout} username={username} />
            </>
          )}

          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMenu}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>

        <Drawer anchor="right" open={isOpen} onClose={toggleMenu}>
          <List sx={styles.drawerList}>
            <DrawerItems 
              isLoggedIn={isLoggedIn} 
              onLoginClick={onLoginClick} 
              onLogout={onLogout} 
              username={username} 
              toggleMenu={toggleMenu}
            />
          </List>
        </Drawer>
      </AppBar>

  );
};

export default Navbar;