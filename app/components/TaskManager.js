import React, { useCallback, useState } from "react";
import { View, SafeAreaView, StyleSheet, Modal, Pressable, Text } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { Task } from "../models/Task";
import { TaskRealmContext } from "../models";
import { AddTaskForm } from "./AddTaskForm";
import TaskList from "./TaskList";
import { shadows } from "../styles/shadows";
import colors from "/Users/ajit/ReactRealmJSTemplateApp/app/styles/colors.js";

const { useRealm } = TaskRealmContext;

export const TaskManager = ({ tasks, userId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const realm = useRealm();

  const handleAddTask = useCallback(
    (description, vegRating) => {
      if (!description || !vegRating) {
        return;
      }
      // Everything in the function passed to "realm.write" is a transaction and will
      // hence succeed or fail together. A transcation is the smallest unit of transfer
      // in Realm so we want to be mindful of how much we put into one single transaction
      // and split them up if appropriate (more commonly seen server side). Since clients
      // may occasionally be online during short time spans we want to increase the probability
      // of sync participants to successfully sync everything in the transaction, otherwise
      // no changes propagate and the transaction needs to start over when connectivity allows.
      realm.write(() => {
        realm.create("Task", Task.generate(vegRating, description, userId));
      });
    },
    [realm, userId],
  );

  const handleDeleteTask = useCallback(
    (task) => {
      realm.write(() => {
        realm.delete(task);

        // Alternatively if passing the ID as the argument to handleDeleteTask:
        // realm?.delete(realm?.objectForPrimaryKey('Task', id));
      });
    },
    [realm],
  );

  return (
    <SafeAreaView style = {styles.content}>
      <SafeAreaView style={styles.taskList}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <AddTaskForm onSubmit = {handleAddTask} visibleControl = {setModalVisible} />
        </Modal>
        <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
      </SafeAreaView>
    <Pressable onPress={() => setModalVisible(true)} style={styles.modalButton}>
      <Icon name = "plus" style={styles.icon} color = {colors.purpleDark}/>
    </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
  icon: {
    fontSize:55,
    fontWeight: "bold",
  },

  content: {
    flex: 1,
    marginTop: 40,
  },

  taskList: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  modalButton: {
    flexDirection: 'column',
    borderRadius: 200,
    width: 70,
    height: 70,
    padding: 5,
    alignItems: 'center',
    margin: 30,
    backgroundColor: colors.white,
    ...shadows,
  },

});
