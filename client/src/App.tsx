import { useState } from 'react';
import { Box, Tab, ThemeProvider } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import AppProvider from './context/AppContext';
import TopList from './components/TopList';
import PopularList from './components/PopularList';
import TheatreList from './components/TheateList';
import theme from './utils/theme';
import Favorites from './components/Favorites';
import Header from './components/Header';
import PlotModal from './components/common/PlotModal';

function App() {
  const [tab, setTab] = useState('1');
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
          <TabContext value={tab}>
            <TabList
              onChange={(e, newVal) => setTab(newVal)}
              sx={{
                '& .MuiTab-root': {
                  fontWeight: 800,
                },
              }}
            >
              <Tab label='Watch list' value='1' />
              <Tab label='Top 250' value='2' />
              <Tab label='Popular' value='3' />
              <Tab label='In Theatres' value='4' />
            </TabList>
            <TabPanel value='1'>
              <Favorites />
            </TabPanel>
            <TabPanel value='2'>
              <TopList />
            </TabPanel>
            <TabPanel value='3'>
              <PopularList />
            </TabPanel>
            <TabPanel value='4'>
              <TheatreList />
            </TabPanel>
          </TabContext>
          <PlotModal />
        </Box>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
