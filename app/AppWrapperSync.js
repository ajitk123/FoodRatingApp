import React from "react";
import { AppProvider, UserProvider } from "@realm/react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ReviewRealmContext } from "./models";
import colors from "./styles/colors";
import { AppSync } from "./AppSync";
import { MyStack } from "./components/SignupStack"

export const AppWrapperSync = ({ appId }) => {
  const { RealmProvider } = ReviewRealmContext;

  // If we are logged in, add the sync configuration the the RealmProvider and render the app
  return (
    <SafeAreaView style={styles.screen}>
      <AppProvider id={appId}>
        <UserProvider fallback={MyStack}>
          <RealmProvider sync={{ flexible: true }}>
            <AppSync />
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    </SafeAreaView>
  );
};

const config = {
  sync: {
    flexible: true,
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0, 204, 104, 1)',
  },
});

export default AppWrapperSync;
