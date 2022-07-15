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

/**
 * validate password requirements:
 *  - 8 characters length
 *  - contain both uppercase and lowercase letters
 *  - Have atleast 1 numerical character
 *  - have a special character
 *
 */

export const passwordValidations = [
  'Be at least 6 characters in length',
  'Contain both upper and lowercase alphabetic characters (e.g. A-Z, a-z)',
  'Have at least one numerical character (e.g. 0-9)',
  'Have at least one special character (e.g. ~!@#$%^&*()_-+=)',
];

export const validatePasswordRequirements = password => {
  return {
    length: isLong(8, password),
    case: isCased(password),
    numeral: isNumerical(password),
    special: isSpecial(password),
  };
};

function isLong(length, text) {
  if (text.length >= length) {
    return true;
  }
}
function isNumerical(text) {
  if (/\d/.test(text)) {
    return true;
  }
}
function isSpecial(text) {
  if (/[#?!@$%^&*-]/.test(text)) {
    return true;
  }
}
function isCased(text) {
  if (/[a-z]/.test(text) && /[A-Z]/.test(text)) {
    return true;
  }
}
