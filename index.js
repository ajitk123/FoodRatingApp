import 'expo-dev-client';
import 'react-native-get-random-values';
import React from 'react';
import {registerRootComponent} from 'expo';
import {AppWrapperSync} from './app/AppWrapperSync';

const App = () =>
  (
    <AppWrapperSync appId={"foodratingapp-loblu"} />
  );

registerRootComponent(App);
