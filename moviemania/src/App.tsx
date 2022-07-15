import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, ThemeProvider, Typography } from '@mui/material';
import AppProvider from './context/AppContext';
import List from './components/List';
import theme from './utils/theme';
import Favorites from './components/Favorites';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Box sx={{ p: 2 }}>
          <Typography variant='h2'>Favorites</Typography>
          <Favorites />
          <Typography variant='h2'>Top Picks</Typography>
          <List />
        </Box>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
