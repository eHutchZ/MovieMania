import { lazy, memo, Suspense } from 'react';
import { Fade, Grid } from '@mui/material';
import { MovieObj } from '../../utils/types';
import CardSkeleton from './CardSkeleton';
// import Card from './Card';
const Card = lazy(() => import('./Card'));

interface Props {
  cards: MovieObj[];
  skeletonCount?: number;
}
const CardGroup = ({ cards, skeletonCount = 8 }: Props) => {
  return (
    <Grid container spacing={2} height='100%'>
      <Suspense fallback={<CardSkeleton cardCount={skeletonCount} />}>
        {cards.map((m, index) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={`${m.id}-${index}`}>
            <Card data={m} index={index} />
          </Grid>
        ))}
      </Suspense>
    </Grid>
  );
};

export default memo(CardGroup);
