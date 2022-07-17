import { useEffect } from 'react';

import { useAppContext } from '../context/AppContext';
import { fetchTheatres } from '../utils/api';
import ListContainer from './common/ListContainer';

const TopList = () => {
  const { theatreList, setError, setTheatreList } = useAppContext();

  const ITEMS_COUNT = 18;

  useEffect(() => {
    const mount = async () => {
      try {
        const list = await fetchTheatres();
        setTheatreList(list);
      } catch (err) {
        setError(true);
      }
    };
    if (theatreList.length === 0) {
      mount();
    }
  }, [setError, setTheatreList, theatreList]);

  return <ListContainer list={theatreList} paginationCount={ITEMS_COUNT} />;
};

export default TopList;
