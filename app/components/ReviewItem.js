import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { shadows } from "../styles/shadows";
import colors from "../styles/colors";
import Icon from 'react-native-vector-icons/EvilIcons';
import { useUser } from "@realm/react";
import StarRating from 'react-native-star-rating';

const NUM_OF_LINES = 3;

export const ReviewItem = React.memo(({ review, onDelete }) => {
  const { user } = useUser();

  // Check whether the current user's ID matches the user ID stored in the review object
  const showDeleteButton = user?.id === review.userID;

  return (
    <View style={styles.task}>
      <View style={styles.descriptionContainer}>
        <View style={{ flexDirection: "row" }}>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={review.vegRating}
            starSize = {15}
            containerStyle = {styles.starContainer}
          />
        </View>
        <Text numberOfLines={NUM_OF_LINES} style={styles.description}>
          {review.description}
        </Text>
      </View>
      {showDeleteButton && (
        <View style={styles.deleteButtonContainer}>
          <Icon name="trash" color={colors.red} onPress={onDelete} style={styles.icon} />
        </View>
      )}
    </View>
  );
});


const styles = StyleSheet.create({
  task: {
    padding: 10,
    alignSelf: "stretch",
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.gray,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: "center",
  },
  description: {
    paddingHorizontal: 10,
    color: colors.black,
    fontSize: 17,
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
  starContainer: {
    marginLeft: 10,
  },
});
