import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { useAppContext } from '../context/AppContext';
import CardGroup from './common/CardGroup';
import CardSkeleton from './common/CardSkeleton';

import Searchbar from './Searchbar';

const List = () => {
  const { movieList } = useAppContext();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant='h2'>Top Picks</Typography>
        <Searchbar list={movieList} setSelectedIndex={setSelectedIndex} />
      </Box>
      <Box sx={{ width: '100%', my: 2.5, flex: 1 }}>
        {movieList.length ? (
          <CardGroup
            cards={selectedIndex > -1 ? [movieList[selectedIndex]] : movieList}
          />
        ) : (
          <CardSkeleton />
        )}
      </Box>
    </>
  );
};

export default List;
