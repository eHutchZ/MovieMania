import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { fetchTop, fetchDetails } from '../utils/api';
import { MovieObj } from '../utils/types';

interface Props {
  children: ReactNode;
}

interface Context {
  setMovieList: (array: Array<MovieObj>) => void;
  movieList: MovieObj[];
  favoriteList: MovieObj[];
  updateFavorites: (item: MovieObj) => void;
  setPopularList: (array: Array<MovieObj>) => void;
  popularList: MovieObj[];
  setTheatreList: (array: Array<MovieObj>) => void;
  theatreList: MovieObj[];
  setSummary: (str: string) => void;
  summary: string;
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
}

const AppContext = createContext<Context>({
  setMovieList: () => {},
  movieList: [],
  favoriteList: [],
  updateFavorites: () => {},
  setPopularList: () => {},
  popularList: [],
  setTheatreList: () => {},
  theatreList: [],
  setSummary: () => {},
  summary: '',
  setOpenModal: () => {},
  openModal: false,
});

export const useAppContext = () => useContext(AppContext);
export const AppState = AppContext.Consumer;

const AppProvider = ({ children }: Props) => {
  const [movieList, setMovieList] = useState<MovieObj[]>([]);
  const [favoriteList, setFavoriteList] = useState<MovieObj[]>([]);
  const [popularList, setPopularList] = useState<MovieObj[]>([]);
  const [theatreList, setTheatreList] = useState<MovieObj[]>([]);
  const [summary, setSummary] = useState('');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const getCast = (crew: string) => {
      const formattedCrew = crew.split('(dir.), ');
      return { directors: formattedCrew[0], stars: formattedCrew[1] };
    };
    const mount = async () => {
      const favoritesFromStorage = localStorage.getItem('favorites');
      if (favoritesFromStorage) {
        setFavoriteList(JSON.parse(favoritesFromStorage));
      }
      const list = await fetchTop();
      list.map((i: MovieObj) => {
        const { directors, stars } = getCast(i.crew);
        i.directors = directors;
        i.stars = stars;
        return i;
      });
      setMovieList(list);
    };
    mount();
  }, []);

  const updateFavorites = async (item: MovieObj) => {
    const favoredIdx = favoriteList.findIndex((obj) => obj.id === item.id);
    if (favoredIdx > -1) {
      const clone = [...favoriteList];
      clone.splice(favoredIdx, 1);
      localStorage.setItem('favorites', JSON.stringify(clone));
      setFavoriteList(clone);
    } else {
      const plot = await fetchDetails(item.id);
      item.plot = plot;
      const newList = [...favoriteList, item];
      localStorage.setItem('favorites', JSON.stringify(newList));
      setFavoriteList((prev) => [...prev, item]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        setMovieList,
        movieList,
        favoriteList,
        updateFavorites,
        setPopularList,
        popularList,
        setTheatreList,
        theatreList,
        summary,
        setSummary,
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
