export interface MovieObj {
  id: string;
  image: string;
  title: string;
  fullTitle: string;
  imDbRating: string;
  description: string | undefined;
  crew: string;
  director: string;
  stars: string;
  plot: string | undefined;
  favorite: boolean | undefined;
}
