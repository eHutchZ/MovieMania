import { Box, ThemeProvider, Typography } from '@mui/material';
import AppProvider from './context/AppContext';
import List from './components/List';
import theme from './utils/theme';
import Favorites from './components/Favorites';
import Header from './components/Header';
import Searchbar from './components/Searchbar';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Box
          sx={{
            p: 2,
            height: 'calc(100% - 32px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Header />
          <Typography variant='h2'>Favorites</Typography>
          <Favorites />

          <List />
        </Box>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
