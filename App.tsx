import React from 'react';
import { View, Text } from 'react-native';
import { useScreens } from 'react-native-screens';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { GameScreen } from './src/screens/GameScreen';
import { RouteName } from './src/enums/Constants';

useScreens();

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Game: { screen: GameScreen }
},
  { initialRouteName: 'Home' }
)

const App = createAppContainer(MainNavigator);

export default App;
