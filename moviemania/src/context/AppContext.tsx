import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { fetchList } from '../utils/api';
import { MovieObj } from '../utils/types';

interface Props {
  children: ReactNode;
}

interface Context {
  setMovieList: (array: Array<MovieObj>) => void;
  movieList: MovieObj[];
}

const AppContext = createContext<Context>({
  setMovieList: () => {},
  movieList: [],
});

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }: Props) => {
  const [movieList, setMovieList] = useState<MovieObj[]>([]);

  useEffect(() => {
    const mount = async () => {
      const list = await fetchList();
      setMovieList(list);
    };
    mount();
  }, []);

  return (
    <AppContext.Provider value={{ setMovieList, movieList }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
