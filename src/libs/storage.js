import AsyncStorage from '@react-native-community/async-storage';

class Storage {
  static instance = Storage();
  store = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.log('storage stores error', error);
      return false;
    }
  };

  get = async key => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.log('storage get error', error);
      throw Error(error);
    }
  };

  multiget = async keys => {
    try {
      return await AsyncStorage.multiGet(keys);
    } catch (error) {
      console.log('storage multiGet error', error);
      throw Error(error);
    }
  };

  getAllKeys = async () => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.log('storage getAllKeys error', error);
      throw Error(error);
    }
  };

  remove = async key => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.log('storage remove error', error);
      return false;
    }
  };
}
