import React from 'react';
import AppWeb from 'App.web';
import AppNative from 'App.native';
import { Platform } from 'react-native';

export default function App() {
  return Platform.OS === 'web' ? <AppWeb /> : <AppNative />;
}