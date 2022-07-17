import axios from 'axios';

export const fetchTop = async () => {
  try {
    const res = await axios.get('/top');
    if (res?.data?.items && res?.data?.errorMessage.length <= 0) {
      return res.data.items;
    } else {
      Error('Error');
    }
  } catch (err) {
    throw err;
  }
};
export const fetchPopular = async () => {
  try {
    const res = await axios.get('/popular');
    if (res?.data?.items && res?.data?.errorMessage.length <= 0) {
      return res.data.items;
    } else {
      throw Error('Error');
    }
  } catch (err) {
    throw err;
  }
};
export const fetchTheatres = async () => {
  try {
    const res = await axios.get('/theatres');
    if (res?.data?.items && res?.data?.errorMessage.length <= 0) {
      return res.data.items;
    } else {
      throw Error('Error');
    }
  } catch (err) {
    throw err;
  }
};

export const fetchDetails = async (id: string) => {
  try {
    const res = await axios.get(`/details?id=${id}`);
    return res.data.plot || '';
  } catch (err) {
    return '';
  }
};
