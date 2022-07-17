import { lazy, memo, Suspense } from 'react';
import { Grid } from '@mui/material';
import { MovieObj } from '../../utils/types';
import CardSkeleton from './CardSkeleton';
// import Card from './Card';
const Card = lazy(() => import('./Card'));

interface Props {
  cards: MovieObj[];
  skeletonCount?: number;
  appendPlot?: Function;
}
const CardGroup = ({ cards, skeletonCount = 8, appendPlot }: Props) => {
  return (
    <Grid container spacing={2} height='100%'>
      <Suspense fallback={<CardSkeleton cardCount={skeletonCount} />}>
        {cards.map((m, index) => (
          <Grid
            item
            xl={2}
            lg={3}
            md={4}
            sm={6}
            xs={12}
            key={`${m.id}-${index}`}
          >
            <Card data={m} appendPlot={appendPlot} />
          </Grid>
        ))}
      </Suspense>
    </Grid>
  );
};

export default memo(CardGroup);
