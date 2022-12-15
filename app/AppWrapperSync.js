import React from "react";
import { AppProvider, UserProvider, RealmProvider } from "@realm/react";
import { useUser } from "@realm/react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ReviewRealmContext } from "./models";
import { AppSync } from "./AppSync";
import { MyStack } from "./components/SignupStack"

export const AppWrapperSync = ({ appId }) => {


  // If we are logged in, add the sync configuration the the RealmProvider and render the app
  return (
    <SafeAreaView style={styles.screen}>
      <AppProvider id={appId}>
        <UserProvider fallback={ MyStack }>
          <RealmProvider realm = {realm}>
            <AppSync />
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    </SafeAreaView>
  );
};

const realm = await Realm.open({ schema: [Review] });
const user = useUser();

// Set the permissions for the User schema
realm.setPermissions({
  schema: Review,
  permissions: {
    // Allow the current user to read and write their own objects
    [user.identity]: {
      read: true,
      write: true
    },
    // Deny read and write access to all other users
    '*': {
      read: false,
      write: false
    }
  }
});



const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0, 204, 104, 1)',
  },
});

export default AppWrapperSync;
