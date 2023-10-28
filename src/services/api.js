import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/';
const myKey = '39829920-01ffc9c03864e4c35c3c45cf7';

export const fetchImages = async params => {
  const { data } = await axios.get('api/', {
    params: {
      ...params,
      key: myKey,
    },
  });
  return data;
};
