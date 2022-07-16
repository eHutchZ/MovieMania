import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5e5e5e',
    },
    secondary: {
      main: '#90be6d',
    },
  },
  typography: {
    fontFamily: 'Montserrat-Medium,Montserrat,sans-serif;',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontSize: '32px',
      fontFamily: 'Montserrat-Semibold,Montserrat,sans-serif',
    },
    caption: {
      fontSize: '14px',
    },
    body1: {
      color: '#5e5e5e',
    },
    body2: {
      fontSize: '12px',
      color: '#5e5e5e',
    },
  },
});

export default theme;
