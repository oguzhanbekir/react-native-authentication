/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  AsyncStorage
} from 'react-native';

import Splash from './src/pages/Splash';

export default class App extends Component {

  constructor(props) {
    super(props);
    this._loadInitialState;
  }

  _loadInitialState = async () => {
    const  token = await AsyncStorage.getItem('token');
    this.props.navigation.navigate(token ? 'Home' : 'Auth');
  };

  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="#e71474" barStyle="light-content" />
      <Splash navigate={this.props.navigation.navigate}></Splash>
      </View>
   )
  
  }
}

const styles = StyleSheet.create({
  container :{
    backgroundColor:'#fff',
    flex:1,
    justifyContent:'center',
  }
});

