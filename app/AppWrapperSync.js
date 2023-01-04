import React from "react";
import { AppProvider, UserProvider} from "@realm/react";
import { SafeAreaView, StyleSheet } from "react-native";
import { AppSync } from "./AppSync";
import { FallbackStack } from "./fallback/SignupStack"
import { ReviewRealmContext } from "./models";
import colors from './styles/colors';

export const AppWrapperSync = ({ appId }) => {

  const { RealmProvider } = ReviewRealmContext;
  
  // If we are logged in, add the sync configuration the the RealmProvider and render the app
  return (
    <SafeAreaView style={styles.screen}>
      <AppProvider id={appId}>
        <UserProvider fallback={FallbackStack}>
          <RealmProvider sync = {syncConfig}>
            <AppSync />
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    </SafeAreaView>
  );
};


syncConfig = {
  flexible: true,
  onError: error => console.error(error)
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default AppWrapperSync;
