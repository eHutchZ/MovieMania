import { useEffect } from 'react';

import { useAppContext } from '../context/AppContext';
import { MovieObj } from '../utils/types';
import { fetchTop } from '../utils/api';
import { appendPlot, getCast } from '../utils/util';
import ListContainer from './common/ListContainer';

const TopList = () => {
  const { movieList, setError, setMovieList } = useAppContext();

  const ITEMS_COUNT = 18;

  useEffect(() => {
    const mount = async () => {
      try {
        const list = await fetchTop();
        list.map((i: MovieObj) => {
          const { directors, stars } = getCast(i.crew);
          i.directors = directors;
          i.stars = stars;
          return i;
        });
        setMovieList(list);
      } catch (err) {
        setError(true);
      }
    };
    if (movieList.length === 0) {
      mount();
    }
  }, [movieList, setError, setMovieList]);

  return (
    <ListContainer
      list={movieList}
      paginationCount={ITEMS_COUNT}
      appendPlot={(data: MovieObj) => appendPlot(data, movieList, setMovieList)}
    />
  );
};

export default TopList;
