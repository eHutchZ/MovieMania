import {
  Box,
  Button,
  Card as MUIcard,
  CardActionArea,
  CardContent,
  CircularProgress,
  IconButton,
  Modal,
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
  appendPlot?: Function;
}

const Card = ({ data, appendPlot }: Props) => {
  const { favoriteList, updateFavorites, setSummary, setOpenModal } =
    useAppContext();
  const handleSummary = async () => {
    setOpenModal(true);
    if (!data.plot) {
      if (appendPlot) {
        const details = await appendPlot(data);
        setSummary(details.plot);
      }
    } else {
      setSummary(data.plot);
    }
  };

  return (
    <MUIcard
      raised
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: { CARD_HEIGHT },
        boxShadow: `0px 1px 2px 1px #00000026`,
        position: 'relative',
        background: 'hsla(0,0%,95.3%,.5)',
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
                <strong>Directors:</strong> {data.directors}
              </Typography>
            </Box>
            <Box>
              <Typography variant='caption'>
                <strong>Stars:</strong> {data.stars}
              </Typography>
            </Box>
          </Box>
          <CardActionArea
            sx={{
              '& > img': { maxWidth: 150 },
              flex: 1,
              ml: 1,
              display: 'flex',
            }}
          >
            <img
              src={data.image}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = require('../../assets/default.jpg');
              }}
            />
          </CardActionArea>
          <Box
            sx={{
              position: 'absolute',
              opacity: 0,
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              transition: 'all .2s ease-in',
              '&:hover': {
                opacity: 1,
                cursor: 'pointer',
              },
            }}
          >
            <Box
              sx={{
                width: '100%',
                backgroundColor: 'rgba(144, 190, 109, 0.65)',
                height: 48,
                px: 2,
              }}
            >
              <Button
                variant='contained'
                type='button'
                size='small'
                onClick={handleSummary}
              >
                Plot
              </Button>
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
        </Box>
      </CardContent>
    </MUIcard>
  );
};

export default memo(Card);
