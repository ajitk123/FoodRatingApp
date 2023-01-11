import React, { useContext } from "react";
import { AppProvider, UserProvider} from "@realm/react";
import { SafeAreaView, StyleSheet } from "react-native";
import { AppSync } from "./AppSync";
import { FallbackStack } from "./fallback/SignupStack"
import { ReviewRealmContext } from "./models";
import colors from './styles/colors';




export const AppWrapperSync = ({ appId }) => {
  const { RealmProvider } = ReviewRealmContext;
  syncConfig = {
    flexible: true,
    onError: error => console.error(error),
    clientReset: {
      mode: "recoverOrDiscardUnsyncedChanges",
    },
  }  

  return (
    <SafeAreaView style={styles.screen}>
      <AppProvider id={appId}>
        <UserProvider fallback={FallbackStack}>
          <RealmProvider sync={syncConfig}>
            <AppSync />
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default AppWrapperSync;
