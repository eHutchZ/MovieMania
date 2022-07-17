import { useEffect } from 'react';

import { useAppContext } from '../context/AppContext';
import { MovieObj } from '../utils/types';
import { fetchPopular } from '../utils/api';
import { appendPlot, getCast } from '../utils/util';
import ListContainer from './common/ListContainer';

const PopularList = () => {
  const { popularList, setError, setPopularList } = useAppContext();

  const ITEMS_COUNT = 18;

  useEffect(() => {
    const mount = async () => {
      try {
        const list = await fetchPopular();
        list.map((i: MovieObj) => {
          const { directors, stars } = getCast(i.crew);
          i.directors = directors;
          i.stars = stars;
          return i;
        });
        setPopularList(list);
      } catch (err) {
        setError(true);
      }
    };
    if (popularList.length === 0) {
      mount();
    }
  }, [popularList, setError, setPopularList]);

  return (
    <ListContainer
      list={popularList}
      paginationCount={ITEMS_COUNT}
      appendPlot={(data: MovieObj) =>
        appendPlot(data, popularList, setPopularList)
      }
    />
  );
};

export default PopularList;
