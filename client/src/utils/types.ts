export interface MovieObj {
  id: string;
  image: string;
  title: string;
  fullTitle: string;
  imDbRating: string;
  crew: string;
  directors: string;
  stars: string;
  plot: string | undefined;
  favorite: boolean | undefined;
}
