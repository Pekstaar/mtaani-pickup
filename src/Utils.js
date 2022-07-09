import AsyncStorageService from '../services/AsyncStorageService';
import {Alert, Platform} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
export const MODAL_TIMEOUT = 2500;

export const logoutUser = callback => {
  AsyncStorageService.removeData('user');
  callback();
};

const handleFirstConnectivityChange = isConnected => {
  NetInfo.isConnected.removeEventListener(
    'connectionChange',
    this.handleFirstConnectivityChange,
  );

  if (isConnected === false) {
    Alert.alert('You are offline!');
  } else {
    Alert.alert('You are online!');
  }
};

export const CheckConnectivity = () => {
  NetInfo.fetch().then(state => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
  });
};
