import { Box, Fade, Grid } from '@mui/material';
import { useAppContext } from '../context/AppContext';
import Card from './common/Card';

const List = () => {
  const { movieList } = useAppContext();
  return (
    <Box sx={{ width: '100%', my: 2.5 }}>
      <Fade in={Boolean(movieList.length)}>
        <Grid container spacing={2}>
          {movieList.map((m, index) => (
            <Grid item lg={3} md={4} sm={6} xs={12} key={`card-${index}`}>
              <Card data={m} index={index} />
            </Grid>
          ))}
        </Grid>
      </Fade>
    </Box>
  );
};

export default List;
