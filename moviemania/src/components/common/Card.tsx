import {
  Box,
  Button,
  Card as MUIcard,
  CardContent,
  Rating,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { fetchDetails } from '../../utils/api';
import { MovieObj } from '../../utils/types';

interface Props {
  data: MovieObj;
  index: number;
}
const getCast = (crew: string) => {
  const formattedCrew = crew.split('(dir.), ');
  return { director: formattedCrew[0], stars: formattedCrew[1] };
};
const Card = ({ data, index }: Props) => {
  const { movieList, setMovieList } = useAppContext();

  const [movieDirector, setMovieDirector] = useState('');
  const [movieStars, setMovieStars] = useState('');
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (data.crew) {
      const { director, stars } = getCast(data.crew);
      setMovieDirector(director);
      setMovieStars(stars);
    }
  }, [data.crew]);
  useEffect(() => {
    const appendPlot = async () => {
      const plot = await fetchDetails(data.id);
      const copy = [...movieList];
      copy[index] = { ...copy[index], plot };
      setMovieList(copy);
    };
    //if plot does not already exist in dataset and user has triggered call to action, fetch details
    if (!data.plot && showSummary) {
      appendPlot();
    }
  }, [showSummary]);
  return (
    <MUIcard
      raised
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxShadow: `0px 1px 2px 1px #00000026`,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              flex: 1,
            }}
          >
            <Typography sx={{ mb: 2 }} variant='subtitle1'>
              {data.title}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Rating
                value={parseFloat(data.imDbRating) / 2}
                readOnly
                precision={0.2}
                size='small'
              />
              <Typography variant='caption' sx={{ lineHeight: '18px', ml: 1 }}>
                {data.imDbRating}
              </Typography>
            </Box>
            <Box>
              <Typography variant='caption'>
                <strong>Director:</strong> {movieDirector}
              </Typography>
            </Box>
            <Box>
              <Typography variant='caption'>
                <strong>Stars:</strong> {movieStars}
              </Typography>
            </Box>
            <Box sx={{ marginTop: 'auto' }}>
              <Button onClick={() => setShowSummary((prev) => !prev)}>
                Summary
              </Button>
            </Box>
          </Box>
          <Box sx={{ '& > img': { maxWidth: 150 }, flex: 1, ml: 1 }}>
            {!showSummary ? (
              <img src={data.image} />
            ) : (
              <>
                <Typography variant='caption'>
                  <strong>Summary:</strong>
                </Typography>
                <Typography>{data.plot}</Typography>
              </>
            )}
          </Box>
        </Box>
      </CardContent>
      {/* <CardContent>{data.title}</CardContent> */}
    </MUIcard>
  );
};

export default Card;
