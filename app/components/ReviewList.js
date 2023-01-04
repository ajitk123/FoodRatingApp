import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { ReviewItem } from "./ReviewItem";

export const ReviewList = ({ reviews, onDeleteTask }) => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={reviews}
        keyExtractor={(review) => review._id.toString()}
        renderItem={({ item }) => (
          <ReviewItem
            review={item}
            onToggleStatus={() => onToggleTaskStatus(item)}
            onDelete={() => onDeleteTask(item)}
            // Don't spread the Realm item as such: {...item}
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
});

export default ReviewList;
