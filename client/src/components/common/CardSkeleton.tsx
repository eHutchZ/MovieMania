import { Grid, Skeleton } from '@mui/material';
import { CARD_HEIGHT } from '../../utils/consts';

interface Props {
  cardCount?: number;
}
const CardSkeleton = ({ cardCount = 8 }: Props) => {
  return (
    <Grid container spacing={2}>
      {[...Array(cardCount)].map((a, index) => (
        <Grid item lg={3} md={4} sm={6} xs={12} key={`skeleton-${index}`}>
          <Skeleton height={CARD_HEIGHT} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardSkeleton;
