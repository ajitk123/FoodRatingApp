import React, { useCallback, useState } from "react";
import { SafeAreaView, StyleSheet, Modal, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { Review } from "../models/Review";
import { ReviewRealmContext } from "../models";
import { AddTaskForm } from "./AddTaskForm";
import ReviewList from "./ReviewList";
import { shadows } from "../styles/shadows";
import colors from "../styles/colors.js";

const { useRealm } = ReviewRealmContext;

export const ReviewManager = ({ reviews, userId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const realm = useRealm();

  const handleAddReview = useCallback( // only calls when realm makes a new object
    (description, vegRating) => {
      if (!description || !vegRating) {
        return;
      }
      realm.write(() => {
        realm.create("Review", Review.generate('ajit','kandasamy','olive garden', vegRating, description, userId));
      });
    },
    [realm, userId], // rerenders function when these components change
  );

  const handleDeleteReview = useCallback(
    (review) => {
      realm.write(() => {
        realm.delete(review);
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
          <AddTaskForm onSubmit = {handleAddReview} visibleControl = {setModalVisible} />
        </Modal>
        <ReviewList reviews={reviews} onDeleteTask={handleDeleteReview} />
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
