import { Box, Fade, Typography } from '@mui/material';
import { useAppContext } from '../context/AppContext';
import CardGroup from './common/CardGroup';
import { CARD_HEIGHT } from '../utils/consts';
const Favorites = () => {
  const { favoriteList } = useAppContext();

  return (
    <Box sx={{ width: '100%', my: 2.5, minHeight: CARD_HEIGHT }}>
      {favoriteList.length ? (
        <Fade in={true}>
          <Box>
            <CardGroup cards={favoriteList} skeletonCount={4} />
          </Box>
        </Fade>
      ) : (
        <Box>
          <Typography>Nothing to show here</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Favorites;
