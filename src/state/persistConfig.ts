import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storageWeb from 'redux-persist/lib/storage';

export const storage =
  Platform.OS === 'web' ? storageWeb : AsyncStorage;
