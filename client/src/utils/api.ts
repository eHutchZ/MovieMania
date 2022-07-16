import axios from 'axios';

export const fetchList = async () => {
  try {
    const res = await axios.get('/list');
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
