import axios from 'axios';
import {url} from '../globals/BaseUrl';
import AsyncStorageService from './AsyncStorageService';

const AxiosUtility = axios.create({
  baseURL: `${url}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = async instance => {
  const {token} = await JSON.parse(await AsyncStorageService.getData('user'));

  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
};

export default AxiosUtility;
