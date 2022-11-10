import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { ReviewItem } from "./ReviewItem";

export const ReviewList = ({ tasks, onDeleteTask }) => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={tasks}
        keyExtractor={(task) => task._id.toString()}
        renderItem={({ item }) => (
          <ReviewItem
            task={item}
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
