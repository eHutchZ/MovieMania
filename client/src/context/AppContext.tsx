import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { fetchList, fetchDetails } from '../utils/api';
import { MovieObj } from '../utils/types';

interface Props {
  children: ReactNode;
}

interface Context {
  setMovieList: (array: Array<MovieObj>) => void;
  movieList: MovieObj[];
  favoriteList: MovieObj[];
  updateFavorites: (item: MovieObj) => void;
  appendPlot: (item: MovieObj, index: number) => void;
}

const AppContext = createContext<Context>({
  setMovieList: () => {},
  movieList: [],
  favoriteList: [],
  updateFavorites: () => {},
  appendPlot: () => {},
});

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }: Props) => {
  const [movieList, setMovieList] = useState<MovieObj[]>([]);
  const [favoriteList, setFavoriteList] = useState<MovieObj[]>([]);

  useEffect(() => {
    const getCast = (crew: string) => {
      const formattedCrew = crew.split('(dir.), ');
      return { director: formattedCrew[0], stars: formattedCrew[1] };
    };
    const mount = async () => {
      const favoritesFromStorage = localStorage.getItem('favorites');
      if (favoritesFromStorage) {
        setFavoriteList(JSON.parse(favoritesFromStorage));
      }
      const list = await fetchList();
      list.map((i: MovieObj) => {
        const { director, stars } = getCast(i.crew);
        i.director = director;
        i.stars = stars;
        return i;
      });
      setMovieList(list);
    };
    mount();
  }, []);

  const updateFavorites = (item: MovieObj) => {
    const favoredIdx = favoriteList.findIndex((obj) => obj.id === item.id);
    if (favoredIdx > -1) {
      const clone = [...favoriteList];
      clone.splice(favoredIdx, 1);
      localStorage.setItem('favorites', JSON.stringify(clone));
      setFavoriteList(clone);
    } else {
      const newList = [...favoriteList, item];
      localStorage.setItem('favorites', JSON.stringify(newList));
      setFavoriteList((prev) => [...prev, item]);
    }
  };
  const appendPlot = async (data: MovieObj, index: number) => {
    const plot = await fetchDetails(data.id);
    const clone = [...movieList];
    clone[index].plot = plot;
    setMovieList(clone);
  };
  return (
    <AppContext.Provider
      value={{
        setMovieList,
        movieList,
        favoriteList,
        updateFavorites,
        appendPlot,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
