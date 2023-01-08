import 'expo-dev-client';
import 'react-native-get-random-values';
import React from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import {registerRootComponent} from 'expo';
import {AppWrapperSync} from './app/AppWrapperSync';
import {SYNC_CONFIG} from './sync.config';

const App = () =>
  SYNC_CONFIG.enabled ? (
    <AppWrapperSync appId={SYNC_CONFIG.appId} />
  ) : (
    <SafeAreaView style = {{flex: 1, justifyContent: 'center'}}>
      <Text style = {{textAlign: 'center'}}>App is offline</Text>
    </SafeAreaView>
  );

registerRootComponent(App);
