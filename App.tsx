import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './src/navigator/Navigation';
import { LogBox } from 'react-native';
import { Tabs } from './src/navigator/Tabs';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

export const App = () => {
  return (
    <NavigationContainer>
      <Tabs/>
    </NavigationContainer>
  )
}
