import React, { useCallback, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import colors from "../styles/colors";
import { shadows } from "../styles/shadows";
import { buttonStyles } from "../styles/button";
import { Realm, useApp } from "@realm/react";
import { SignUp } from "./SignUp.js";

export let AuthState;

(function (AuthState) {
  AuthState[(AuthState["None"] = 0)] = "None";
  AuthState[(AuthState["Loading"] = 1)] = "Loading";
  AuthState[(AuthState["LoginError"] = 2)] = "LoginError";
})(AuthState || (AuthState = {}));
export const LoginScreen = props => {
  const app = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authState, setAuthState] = useState(AuthState.None);

  // If the user presses "login" from the auth screen, try to log them in
  // with the supplied credentials
  const handleLogin = useCallback(async () => {
    setAuthState(AuthState.Loading);
    const credentials = Realm.Credentials.emailPassword(email, password);
    try {
      await app.logIn(credentials);
      setAuthState(AuthState.None);
    } catch (e) {
      console.log("Error logging in", e);
      setAuthState(AuthState.LoginError);
    }
  }, [email, password, setAuthState, app]);
  
  return (
    <SafeAreaView style={styles.content}>
      <View style={styles.inputContainer}>
        <Text style={buttonStyles.loginText}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCompleteType="email"
          textContentType="emailAddress"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={buttonStyles.loginText}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCompleteType="password"
          textContentType="password"
          placeholder="Password"
        />
      </View>

      {authState === AuthState.LoginError && (
        <Text style={[styles.error]}>Invalid Username or Password, please try again</Text>
      )}

      <View style={styles.buttons}>
        <Pressable
          onPress={handleLogin}
          style={[styles.button, authState === AuthState.Loading && styles.buttonDisabled]}
          disabled={authState === AuthState.Loading}
        >
          <Text style={buttonStyles.text}>Login</Text>
        </Pressable>
          <Pressable
            onPress={() => props.navigation.navigate({name: "Sign Up", key: {SignUp}})}
            style={{
              marginTop: 50,
            }}
            disabled={authState === AuthState.Loading}
          >
            <Text style={buttonStyles.text}>sign up</Text>
          </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },

  inputContainer: {
    padding: 10,
    alignSelf: "stretch",
    marginHorizontal: 10,
  },

  error: {
    textAlign: "right",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
    color: 'rgb(255,0,0)',
  },

  input: {
    borderColor: colors.gray,
    padding: 15,
    height: 50,
    marginVertical: 8,
    backgroundColor: colors.white,
    borderRadius: 25,
    ...shadows,
  },

  buttons: {
    marginTop: 16,
    marginBottom: 20,
    flexDirection: "column",
  },

  button: {
    ...buttonStyles.button,
    ...shadows,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  registerButton: {
    backgroundColor: colors.purpleDark,
  },
});
