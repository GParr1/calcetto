import React from 'react';
import AppWeb from './src/App.web';
import AppNative from './src/App.native';
import { Platform } from 'react-native';

export default function App() {
  return Platform.OS === 'web' ? <AppWeb /> : <AppNative />;
}