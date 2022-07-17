import { useState } from 'react';

import { Box, Pagination, Typography } from '@mui/material';
import CardGroup from './CardGroup';
import CardSkeleton from './CardSkeleton';
import Searchbar from './Searchbar';
import { MovieObj } from '../../utils/types';
import { listValue } from '../../utils/util';

interface Props {
  list: MovieObj[];
  paginationCount: number;
  appendPlot?: Function;
}
const ListContainer = ({ list, paginationCount, appendPlot }: Props) => {
  const [page, setPage] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Searchbar list={list} setSelectedIndex={setSelectedIndex} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          pt: 3,
        }}
      >
        <Pagination
          count={
            selectedIndex === -1 ? Math.ceil(list.length / paginationCount) : 1
          }
          page={page}
          onChange={(e, value) => setPage(value)}
          sx={{ marginLeft: 'auto' }}
        />
      </Box>
      <Box sx={{ width: '100%', my: 2.5, flex: 1 }}>
        {list.length ? (
          <CardGroup
            cards={
              selectedIndex > -1
                ? [list[selectedIndex]]
                : listValue(list, paginationCount, page)
            }
            appendPlot={appendPlot}
          />
        ) : (
          <CardSkeleton />
        )}
      </Box>
    </>
  );
};

export default ListContainer;
