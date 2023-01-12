import React, { useRef, useState } from "react";
import { KeyboardAvoidingView, Text, ScrollView, TextInput, Pressable, StyleSheet, SafeAreaView } from "react-native";
import { buttonStyles } from "../styles/button";
import colors from "../styles/colors";
import { shadows } from "../styles/shadows";
import Icon from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating';


var Description = '';
var Rating = 0;

export const AddTaskForm = ({ onSubmit, visibleControl }) => {

  // Create a ref to store the input value
  const textInputRef = useRef('');
  const [description, setDescription] = useState(Description);
  const [rating, setRating] = useState(Rating);

  const SubmitAndRefresh = () => {
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
    <ScrollView style={styles.form}>
      <Icon name = 'close' style = {styles.close} onPress = {() => saveProgress()}/>
      <KeyboardAvoidingView style = {styles.inputContainer}>
        <Text style = {styles.headerText}>How vegetarian friendly were the menu options?</Text>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={rating}
          selectedStar={(rating) => setRating(rating)}
          starSize = {20}
          containerStyle = {styles.starContainer}
        />
        <Text style = {styles.headerText}>Comments</Text>
        <TextInput
          ref={textInputRef}
          style={styles.textInput}
          value={description}
          placeholder="Ex. The veggie burgers we're amazing!"
          onChangeText={setDescription}
          // Limit the input to 500 words or fewer
          maxLength={500 * 6}
          autoCorrect={false}
          autoCapitalize="none"
          multiline={true}
          // Set the number of lines dynamically based on the height of the content
          onContentSizeChange={(event) => {
            textInputRef.current.setNativeProps({
              numberOfLines: Math.ceil(event.nativeEvent.contentSize.height / 15),
            });
          }}
        />
        <Pressable disabled = {rating == 0 || description == ""} onPress={SubmitAndRefresh} 
        style={[styles.submit, (rating == 0 || description == "") && buttonStyles.buttonDisabled]}>
          <Text style={styles.icon}>Submit</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
  form: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.gray,
    height: 20,
    marginTop: 80,
    marginHorizontal: 10,
    backgroundColor: colors.white,
  },

  textInput: {
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 10,
    fontSize: 15,
    minHeight: 180,
  },

  inputContainer: {
    flexDirection: "column",
    height: null,
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
    paddingHorizontal: 50,
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
    marginBottom: 10,
  },

});
