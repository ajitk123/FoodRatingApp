import React from "react";
import { AppProvider, UserProvider} from "@realm/react";
import { SafeAreaView, StyleSheet } from "react-native";
import { AppSync } from "./AppSync";
import { MyStack } from "./components/SignupStack"
import { ReviewRealmContext } from "./models";

export const AppWrapperSync = ({ appId }) => {

  const RealmProvider = ReviewRealmContext;
  
  // If we are logged in, add the sync configuration the the RealmProvider and render the app
  return (
    <SafeAreaView style={styles.screen}>
      <AppProvider id={appId}>
        <UserProvider fallback={ MyStack }>
          <RealmProvider>
            <AppSync />
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    </SafeAreaView>
  );
};


syncConfig = {
  flexible: true,
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0, 204, 104, 1)',
  },
});

export default AppWrapperSync;
