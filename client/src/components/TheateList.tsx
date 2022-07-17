import { useEffect } from 'react';

import { useAppContext } from '../context/AppContext';
import { fetchTheatres } from '../utils/api';
import ListContainer from './common/ListContainer';

const TopList = () => {
  const { theatreList, setTheatreList } = useAppContext();

  const ITEMS_COUNT = 18;

  useEffect(() => {
    const mount = async () => {
      const list = await fetchTheatres();
      setTheatreList(list);
    };
    mount();
  }, []);

  return <ListContainer list={theatreList} paginationCount={ITEMS_COUNT} />;
};

export default TopList;
