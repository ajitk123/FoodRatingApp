import React, {useState} from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import colors from "../styles/colors";
import { AntDesign } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating';
import { Entypo } from '@expo/vector-icons';
import { DateFormat } from './DateFormat';

export const ReviewItem = React.memo(({ review, onDelete, isMyReview }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const needsAbbrevation = review.description.length > 200;
  const abbreviatedText = needsAbbrevation ? review.description.slice(0, 200)
   + "..." : review.description;


  return (
    <View style={styles.review}>
      <View style={styles.descriptionContainer}>
        <Text style = {styles.name}>{review.firstName} {review.lastName}</Text>
        <DateFormat date = {review.createdAt} style = {styles.date}/>
        <View style={{ flexDirection: "row" }}>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={review.vegRating}
            starSize={15}
            containerStyle={styles.starContainer}
          />
        </View>
        <Text
          style={styles.description}
        >
          {isExpanded ? review.description : abbreviatedText}
        </Text>
        {needsAbbrevation &&
          <Pressable
            style={styles.moreLessButtonContainer}
            onPress={() => setIsExpanded(!isExpanded)}
          >
            <Text style={styles.moreLessButton}>
              Show {isExpanded ? "less" : "more"}
            </Text>
          </Pressable>
        }
      </View>
      {isMyReview && (
        <Pressable style={styles.deleteButtonContainer}>
          <Entypo name="dots-three-vertical" size={24} color="gray" />
        </Pressable>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  // ... existing styles ...
  name: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  date: {
    marginHorizontal: 10,
    marginBottom: 5,
    color: colors.darkGray,
  },
  moreLessButtonContainer: {
    marginHorizontal: 15,
    marginTop: 5,
    alignSelf: "flex-start",
  },
  moreLessButton: {
    color: colors.linkBlue,
    fontWeight: '600',
  },
  review: {
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
