import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
    mobile: false; // adds the `mobile` breakpoint
    tablet: false;
    laptop: false;
    desktop: false;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#5e5e5e',
    },
    secondary: {
      main: '#90be6d',
    },
    success: {
      main: '#EF626C',
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
  breakpoints: {
    values: {
      xs: 0,
      sm: 760,
      md: 1080,
      lg: 1440,
      xl: 2000,
      xxl: 2001,
    },
  },
});

export default theme;
