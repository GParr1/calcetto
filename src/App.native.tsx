import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthView from 'View/AuthView';
import ResetPasswordView from 'View/ResetPasswordView';
import Dashboard from 'View/Dashboard';
import MyAccountView from 'View/MyAccountView';
import { getUser } from 'state/auth/selectors';
import AppProviders from 'AppProviders';

const Stack = createStackNavigator();

function App() {
  const user = useSelector(getUser);

  return (
    <AppProviders>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? 'Dashboard' : 'AuthView'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AuthView" component={AuthView} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordView} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="MyAccount" component={MyAccountView} />
      </Stack.Navigator>
    </NavigationContainer>
    </AppProviders>
  );
}

export default function AppNative() {
  return (
    <AppProviders>
      <App />
    </AppProviders>
  );
}
