import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";
import { buttonStyles } from "../styles/button";
import colors from "../styles/colors";
import Icon from "react-native-vector-icons/AntDesign";
import StarRating from "react-native-star-rating";
import { SAMPLE_RESTAURANTS } from "../data/restaurants";

export const AddTaskForm = ({ onSubmit, visibleControl }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [customRestaurant, setCustomRestaurant] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  const restaurantName = selectedRestaurant
    ? selectedRestaurant.name
    : customRestaurant.trim();

  const isValid =
    rating > 0 &&
    description.trim() !== "" &&
    restaurantName !== "" &&
    firstName.trim() !== "";

  const handleSubmit = () => {
    const lat = selectedRestaurant ? selectedRestaurant.latitude : null;
    const lng = selectedRestaurant ? selectedRestaurant.longitude : null;
    const addr = selectedRestaurant ? selectedRestaurant.address : "";
    onSubmit(
      firstName.trim(),
      lastName.trim(),
      restaurantName,
      rating,
      description,
      lat,
      lng,
      addr,
    );
    visibleControl(false);
  };

  const handleClose = () => {
    visibleControl(false);
  };

  const selectRestaurant = (r) => {
    setSelectedRestaurant(r);
    setCustomRestaurant("");
  };

  const handleCustomRestaurant = (text) => {
    setCustomRestaurant(text);
    setSelectedRestaurant(null);
  };

  return (
    <View style={styles.form}>
      <Icon name="close" style={styles.close} onPress={handleClose} />
      <ScrollView
        style={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <KeyboardAvoidingView
          style={styles.inputContainer}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <Text style={styles.headerText}>Your Name</Text>
          <View style={styles.nameRow}>
            <TextInput
              style={[styles.textInput, styles.nameInput]}
              value={firstName}
              placeholder="First name"
              onChangeText={setFirstName}
              autoCorrect={false}
            />
            <TextInput
              style={[styles.textInput, styles.nameInput]}
              value={lastName}
              placeholder="Last name"
              onChangeText={setLastName}
              autoCorrect={false}
            />
          </View>

          <Text style={styles.headerText}>Restaurant</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chipScroll}
          >
            {SAMPLE_RESTAURANTS.map((r) => (
              <Pressable
                key={r.name}
                style={[
                  styles.chip,
                  selectedRestaurant?.name === r.name &&
                    styles.chipSelected,
                ]}
                onPress={() => selectRestaurant(r)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedRestaurant?.name === r.name &&
                      styles.chipTextSelected,
                  ]}
                >
                  {r.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          <TextInput
            style={[styles.textInput, styles.restaurantInput]}
            value={
              selectedRestaurant
                ? selectedRestaurant.name
                : customRestaurant
            }
            placeholder="Or type a restaurant name..."
            onChangeText={handleCustomRestaurant}
            autoCorrect={false}
          />

          <Text style={styles.headerText}>
            How vegetarian friendly were the menu options?
          </Text>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={rating}
            selectedStar={(r) => setRating(r)}
            starSize={20}
            containerStyle={styles.starContainer}
          />

          <Text style={styles.headerText}>Comments</Text>
          <TextInput
            style={[styles.textInput, styles.descriptionInput]}
            value={description}
            placeholder="Ex. The veggie burgers were amazing!"
            onChangeText={setDescription}
            maxLength={3000}
            autoCorrect={false}
            autoCapitalize="none"
            multiline={true}
          />

          <Pressable
            disabled={!isValid}
            onPress={handleSubmit}
            style={[
              styles.submit,
              !isValid && buttonStyles.buttonDisabled,
            ]}
          >
            <Text style={styles.submitText}>Submit</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.gray,
    marginTop: 60,
    marginHorizontal: 10,
    backgroundColor: colors.white,
    maxHeight: "85%",
  },
  scrollContainer: {
    flexGrow: 0,
  },
  inputContainer: {
    paddingBottom: 20,
  },
  nameRow: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  nameInput: {
    flex: 1,
    marginHorizontal: 5,
    minHeight: 40,
  },
  textInput: {
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 6,
    padding: 10,
    fontSize: 15,
  },
  restaurantInput: {
    minHeight: 40,
    marginTop: 10,
  },
  descriptionInput: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  chipScroll: {
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.gray,
    marginRight: 8,
    backgroundColor: colors.white,
  },
  chipSelected: {
    backgroundColor: colors.purple,
    borderColor: colors.purple,
  },
  chipText: {
    fontSize: 13,
    color: colors.black,
  },
  chipTextSelected: {
    color: colors.white,
    fontWeight: "600",
  },
  submit: {
    ...buttonStyles.button,
    width: 120,
    alignSelf: "center",
    marginTop: 20,
  },
  submitText: {
    ...buttonStyles.text,
  },
  starContainer: {
    paddingHorizontal: 50,
    marginBottom: 10,
  },
  close: {
    fontWeight: "bold",
    alignSelf: "flex-end",
    marginTop: 15,
    marginRight: 20,
    fontSize: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 15,
    marginBottom: 10,
    marginTop: 15,
  },
});
