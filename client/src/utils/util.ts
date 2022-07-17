import { MovieObj } from './types';
import { fetchDetails } from './api';

export const getCast = (crew: string) => {
  const formattedCrew = crew.split('(dir.), ');
  return { directors: formattedCrew[0], stars: formattedCrew[1] };
};

export const listValue = (list: MovieObj[], count: number, page: number) => {
  const startCount = (page - 1) * count;
  const endCount = page * count;
  return list.slice(startCount, endCount);
};

export const appendPlot = async (
  data: MovieObj,
  list: MovieObj[],
  setList: Function
) => {
  const plot = await fetchDetails(data.id);
  const clone = [...list];
  const index = clone.findIndex((m) => m.id === data.id);
  clone[index].plot = plot;
  setList(clone);
  return clone[index];
};
