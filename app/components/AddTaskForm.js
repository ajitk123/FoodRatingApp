import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Pressable, Platform, StyleSheet, SafeAreaView } from "react-native";
import { buttonStyles } from "../styles/button";
import colors from "../styles/colors";
import { shadows } from "../styles/shadows";
import Icon from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating';

var Description = '';
var Rating = 0;

export const AddTaskForm = ({ onSubmit, visibleControl }) => {
  const [description, setDescription] = useState(Description);
  const [rating, setRating] = useState(Rating);

  const handleSubmit = () => {
    onSubmit(description, rating);
    Description = 0;
    Rating = 0;
    visibleControl(false);
    console.log(rating);
  };

  const saveProgress = () => {
    visibleControl(false);
    Description = description;
    Rating = rating;
  }

  
 
  return (
    <SafeAreaView style={styles.form}>
      <Icon name = 'close' style = {styles.close} onPress = {() => saveProgress()}/>
      <View style = {styles.inputContainer}>
        <Text style = {styles.headerText}>Veg Rating</Text>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={rating}
          selectedStar={(rating) => setRating(rating)}
          starSize = {20}
          starStyle = {styles.star}
          containerStyle = {styles.starContainer}
        />
        <Text style = {styles.headerText}>Comments</Text>
        <TextInput
          value={description}
          placeholder="Ex. The veggie burgers we're amazing!"
          onChangeText={setDescription}
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.textInput}
          multiline = {true}
          numberOfLines = {3}
        />
        <TouchableOpacity disabled = {rating == 0 || description == 0} activeOpacity={0} onPress={handleSubmit} style={styles.submit}>
          <Text style={styles.icon}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
  star: {
    alignContent: 'center',
  },
  
  form: {
    borderRadius: 25,
    marginTop: 80,
    marginHorizontal: 10,
    height: "45%",
    backgroundColor: colors.white,
    ...shadows,
  },

  textInput: {
    height: '45%',
    marginHorizontal: 15,
    borderWidth: 1,
    padding: 10,
    fontSize: 15,
  },

  inputContainer: {
    flexDirection: "column",
  },

  submit: {
    ...buttonStyles.button,
    width: 100,
    height: 40,
    paddingHorizontal: 0,
    paddingVertical: 0,
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: 20,
  },

  starContainer: {
    padding: 10,
  },

  icon: {
    ...buttonStyles.text,
  },

  close: {
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginTop: 15,
    marginRight: 20,
    fontSize: 20,
  },

  headerText: {
    fontSize: 20,
    marginHorizontal: 15,
    marginBottom: 10
  },

});
