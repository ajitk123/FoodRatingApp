import 'expo-dev-client';
import 'react-native-get-random-values';
import React from 'react';
import {registerRootComponent} from 'expo';
import {AppWrapperSync} from './app/AppWrapperSync';

const App = () => {
  try {
    return (<AppWrapperSync appId={"foodratingapp-loblu"} />);
  } catch(e) {
      console.log(e);
  }
}


registerRootComponent(App);
