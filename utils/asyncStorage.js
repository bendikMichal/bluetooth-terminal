
import AsyncStorage from '@react-native-async-storage/async-storage';

export const _storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(
      key,
      value,
    );
  } catch (error) {
    throw error;
  }
};

export const _retrieveData = async (key, _default = "") => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
    await _storeData(key, _default)
  } catch (error) {
    throw error;
  }
};