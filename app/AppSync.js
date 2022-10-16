import React, { useCallback, useEffect, useMemo } from "react";
import { useApp, useUser } from "@realm/react";
import { Pressable, StyleSheet, Text, View, SafeAreaView, } from "react-native";

import { Task } from "./models/Task";
import { TaskRealmContext } from "./models";
import { TaskManager } from "./components/TaskManager";
import { buttonStyles } from "./styles/button";
import { shadows } from "./styles/shadows";
import colors from "./styles/colors";

const { useRealm, useQuery } = TaskRealmContext;

export const AppSync = () => {
  const realm = useRealm();
  const user = useUser();
  const app = useApp();
  const result = useQuery(Task);

  const tasks = useMemo(() => result.sorted("createdAt"), [result]);

  useEffect(() => {
    realm.subscriptions.update((mutableSubs) => {
      mutableSubs.add(realm.objects(Task));
    });
  }, [realm, result]);

  const handleLogout = useCallback(() => {
    user?.logOut();
  }, [user]);

  return (
    <>
      <Text color = {colors.white} style = {styles.resturauntTitle}>Olive Garden</Text>
      <TaskManager tasks={tasks} userId={user?.id} />
      <Pressable style={styles.authButton} onPress={handleLogout}>
        <Text style={styles.authButtonText}>{`Logout`}</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  idText: {
    color: "#999",
    paddingHorizontal: 20,
  },
  authButton: {
    ...buttonStyles.button,
    ...shadows,
    backgroundColor: colors.purpleDark,
  },
  authButtonText: {
    ...buttonStyles.text,
  },
  resturauntTitle: {
    justifyContent: 'center',
    marginHorizontal: '30.5%',
    marginBottom: 20,
    fontSize: 25,
    fontWeight: 'bold',
    //fontFamily: 'bold',
  },
});
