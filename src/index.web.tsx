import React, { useEffect, useRef } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { Animated, Easing, Text, View } from 'react-native';
import { ContainerProps } from 'styles';
import reportWebVitals from 'reportWebVitals';

const LoadingScreen: React.FC = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });

  const containerProps={
    flex:1,
    justifyContent: ContainerProps.justifyCenter,
    alignItems: ContainerProps.alignCenter,
  }
  const spinnerConfig = {
    width: 60,
    height: 60,
    borderWidth: 6,
    borderColor: "#ccc",
    borderTopColor: "#00aa00",
    borderRadius: 30,
    transform: [{ rotate: spin }]
  }
  return (
    <View {...containerProps}>
      <Animated.View style={{...spinnerConfig}} />
      <Text>Loading data...</Text>
    </View>
  );
};

// const RootApp = (
//   <Provider store={store}>
//     <PersistGate loading={<LoadingScreen />} persistor={persistor}>
//       <App />
//     </PersistGate>
//   </Provider>
// )


const container = document.getElementById('root');

if (!container) {
  console.error('Root element non trovato');
} else if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
reportWebVitals(console.log)
