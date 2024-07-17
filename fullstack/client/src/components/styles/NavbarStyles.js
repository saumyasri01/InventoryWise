// src/styles/NavbarStyles.js

export const styles = {
  navButton: {
    mr: 2,
    fontWeight: 700,
    letterSpacing: 0.8,
    fontSize: '1rem',
    position: 'relative',
    textTransform: 'none', // Added this line
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '3px',
      backgroundColor: '#ff69b4', // Pink color
      transform: 'scaleX(0)',
      transition: 'transform 0.3s ease-in-out',
    },
    '&.active::after': {
      transform: 'scaleX(1)',
    },
  },
  logo: {
    textDecoration: 'none',
    color: 'white',
    fontWeight: 800,
    letterSpacing: 2,
   background: 'linear-gradient(45deg, #ffffff, #e0e0e0)', // Adjusted gradient
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
   backgroundClip: 'text',
    textFillColor: 'transparent',
filter: 'drop-shadow(0px 0px 1px rgba(255,255,255,0.5))',
  },
  drawerList: {
    width: 250,
    bgcolor: '#1a3a5c',
    color: '#ffffff',
    height: '100%',
  },
  drawerItem: {
    position: 'relative',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '3px',
      backgroundColor: '#ff69b4', // Pink color
      transform: 'scaleX(0)',
      transition: 'transform 0.3s ease-in-out',
    },
    '&.active::after': {
      transform: 'scaleX(1)',
    },
  },
  drawerItemText: {
    fontWeight: 700,
    letterSpacing: 0.8,
    fontFamily: "'Roboto', sans-serif",
    fontSize: '1rem',
    textTransform: 'none', // Added this line
  },
  authButton: {
    fontWeight: 500,
    letterSpacing: 0.5,
    textTransform: 'none', // Added this line
  },
};