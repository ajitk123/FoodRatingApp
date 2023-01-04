import React from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { shadows } from "../styles/shadows";
import colors from "../styles/colors";
import Icon from 'react-native-vector-icons/EvilIcons';

const NUM_OF_LINES = 5;

export const ReviewItem = React.memo(({ review, onDelete }) => {

  return (
    <View style={styles.task}>
      <View style={styles.descriptionContainer}>
        <View style = {{flexDirection: 'row'}}>
          <Text numberOfLines={1} style={styles.description}>
            Veg Rating: {review.vegRating}
          </Text>
        </View>
        <Text numberOfLines={NUM_OF_LINES} style={styles.description}>
          {review.description}
        </Text>
      </View>
      <View style={styles.deleteButtonContainer}>
        <Icon name = 'trash' color = {colors.red} onPress={onDelete} style = {styles.icon}/>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  task: {
    height: 140,
    alignSelf: "stretch",
    flexDirection: "row",
    marginVertical: 8,
    backgroundColor: colors.white,
    borderRadius: 5,
    ...shadows,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: "center",
  },
  description: {
    paddingHorizontal: 10,
    color: colors.black,
    fontSize: 17,
    marginBottom: 10,
  },
  status: {
    width: 50,
    height: "100%",
    justifyContent: "center",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: colors.gray,
  },
  completed: {
    backgroundColor: colors.purple,
  },
  deleteButtonContainer: {
    justifyContent: "center",
  },
  icon: {
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
});
