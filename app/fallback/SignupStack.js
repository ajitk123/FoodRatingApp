import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useApp } from "@realm/react";
import { Realm } from "@realm/react";
import colors from "../styles/colors";
import { buttonStyles } from "../styles/button";
import { shadows } from "../styles/shadows";

export const FallbackStack = () => {
  const app = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async () => {
    setError("");
    try {
      if (isSignup) {
        await app.emailPasswordAuth.registerUser({ email, password });
      }
      const credentials = Realm.Credentials.emailPassword(email, password);
      await app.logIn(credentials);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      const credentials = Realm.Credentials.anonymous();
      await app.logIn(credentials);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>FoodRatingApp</Text>
      <Text style={styles.subtitle}>Rate vegetarian-friendly restaurants</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>
          {isSignup ? "Sign Up" : "Log In"}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => {
          setIsSignup(!isSignup);
          setError("");
        }}
      >
        <Text style={styles.switchText}>
          {isSignup
            ? "Already have an account? Log In"
            : "Don't have an account? Sign Up"}
        </Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.guestButton]}
        onPress={handleAnonymousLogin}
      >
        <Text style={styles.buttonText}>Continue as Guest</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: colors.purple,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: colors.darkGray,
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    ...buttonStyles.button,
    ...shadows,
    marginBottom: 15,
  },
  buttonText: {
    ...buttonStyles.text,
  },
  guestButton: {
    backgroundColor: colors.darkGray,
    marginTop: 20,
  },
  switchText: {
    color: colors.purple,
    textAlign: "center",
    fontSize: 15,
  },
  error: {
    color: colors.red,
    textAlign: "center",
    marginBottom: 15,
  },
});
