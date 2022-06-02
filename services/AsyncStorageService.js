import AsyncStorage from '@react-native-async-storage/async-storage';

const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (err) {
    return err;
  }
};

const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);

    return value;
  } catch (err) {
    return err;
  }
};

const removeData = async key => {
  try {
    const value = await AsyncStorage.removeItem(key);

    return value;
  } catch (err) {
    return err;
  }
};

const AsyncStorageService = {
  setData,
  getData,
  removeData,
};

export default AsyncStorageService;
