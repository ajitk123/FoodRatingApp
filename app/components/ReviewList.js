import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { ReviewItem } from "./ReviewItem";

export const ReviewList = ({ currentUser, reviews, onDeleteTask }) => {
  
  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={reviews}
        ItemSeparatorComponent = {ItemSeparator}
        keyExtractor={(review) => review._id.toString()}
        renderItem={({ item }) => (
          <ReviewItem
            review={item}
            onDelete={() => onDeleteTask(item)}
            isMyReview = {currentUser === item.userId}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: "center",
  },
  separator: {
    height: 15,
  }
});

export default ReviewList;
