import AsyncStorageService from '../services/AsyncStorageService';

export const MODAL_TIMEOUT = 2500;

export const logoutUser = callback => {
  AsyncStorageService.removeData('user');
  callback();
};
