import { createStackNavigator, createAppContainer,createSwitchNavigator } from "react-navigation";

import App from './App.js';
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import Home from './src/pages/Home';

const AppStack = createStackNavigator({ 
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
});

const AuthStack = createStackNavigator({ 
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      header: null,
    },
  },
});

const AppNavigator = createSwitchNavigator(
  {
    App: {screen: App},
    Home: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName:'App',
    headerMode:'none'
  }
)


export default createAppContainer(AppNavigator);