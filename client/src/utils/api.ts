import axios from 'axios';

export const fetchTop = async () => {
  try {
    const res = await axios.get('/top');
    //TODO: error state
    return res.data.items || [];
  } catch (err) {
    return [];
  }
};
export const fetchPopular = async () => {
  try {
    const res = await axios.get('/popular');
    //TODO: error state
    return res.data.items || [];
  } catch (err) {
    return [];
  }
};
export const fetchTheatres = async () => {
  try {
    const res = await axios.get('/theatres');
    //TODO: error state
    return res.data.items || [];
  } catch (err) {
    return [];
  }
};

export const fetchDetails = async (id: string) => {
  try {
    const res = await axios.get(`/details?id=${id}`);
    //TODO: error state
    return res.data.plot || '';
  } catch (err) {
    return '';
  }
};
