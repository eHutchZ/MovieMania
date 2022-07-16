import {
  Box,
  Card as MUIcard,
  CardActionArea,
  CardContent,
  IconButton,
  Rating,
  Typography,
} from '@mui/material';
import { memo, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { MovieObj } from '../../utils/types';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { CARD_HEIGHT } from '../../utils/consts';

interface Props {
  data: MovieObj;
  index: number;
}

const Card = ({ data, index }: Props) => {
  const { appendPlot, favoriteList, updateFavorites } = useAppContext();

  const [showSummary, setShowSummary] = useState(false);

  const handleSummary = async () => {
    if (!data.plot) {
      await appendPlot(data, index);
    }
    setShowSummary((prev) => !prev);
  };
  return (
    <MUIcard
      raised
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: { CARD_HEIGHT },
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
                <strong>Director:</strong> {data.director}
              </Typography>
            </Box>
            <Box>
              <Typography variant='caption'>
                <strong>Stars:</strong> {data.stars}
              </Typography>
            </Box>

            <Box>
              <IconButton
                size='large'
                onClick={() => updateFavorites(data)}
                color={
                  favoriteList.find((i) => i.id === data.id)
                    ? 'success'
                    : 'default'
                }
              >
                <FavoriteIcon />
              </IconButton>
            </Box>
          </Box>
          <CardActionArea
            sx={{ '& > img': { maxWidth: 150 }, flex: 1, ml: 1 }}
            onClick={handleSummary}
          >
            {!showSummary ? (
              <img
                src={data.image}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = require('../../assets/default.jpg');
                }}
              />
            ) : (
              <>
                <Typography variant='caption'>
                  <strong>Summary:</strong>
                </Typography>
                <Typography>{data.plot}</Typography>
              </>
            )}
          </CardActionArea>
        </Box>
      </CardContent>
    </MUIcard>
  );
};

export default memo(Card);
