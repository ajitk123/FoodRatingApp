import React, { useCallback, useState } from "react";
import { View, SafeAreaView, StyleSheet, Modal, Pressable } from "react-native";
import { Review } from "../models/Review";
import { ReviewRealmContext } from "../models";
import { AddTaskForm } from "./AddTaskForm";
import ReviewList from "./ReviewList";
import { shadows } from "../styles/shadows";
import colors from "../styles/colors.js";
import { MaterialIcons } from '@expo/vector-icons'; 

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
      <View style={styles.taskList}>
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
        <ReviewList currentUser = {userId} reviews={reviews} onDeleteTask={handleDeleteReview} />
      </View>
      <Pressable onPress={() => setModalVisible(true)} style={styles.modalButton}>
        <MaterialIcons name="rate-review" size={40} color={colors.white} />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  content: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },

  taskList: {
    flex: 1,
    paddingHorizontal: 20,
  },

  modalButton: {
    position: 'absolute',
    bottom: 20,
    left: 25,
    borderRadius: 100,
    padding: 15,
    alignSelf: 'flex-end',
    backgroundColor: colors.green,
    ...shadows,
  },

});
