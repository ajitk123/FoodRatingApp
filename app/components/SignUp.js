import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import colors from "../styles/colors";
import { shadows } from "../styles/shadows";
import { buttonStyles } from "../styles/button";
import { Realm, useApp} from "@realm/react";

export let AuthState;

(function (AuthState) {
  AuthState[(AuthState["None"] = 0)] = "None";
  AuthState[(AuthState["Loading"] = 1)] = "Loading";
  AuthState[(AuthState["RegisterError"] = 3)] = "RegisterError";
  AuthState[(AuthState["PasswordMismatch"] = 3)] = "PasswordMismatch";
})(AuthState || (AuthState = {}));

export const SignUp = () => {

  const app = useApp();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setPasswordConfirmation] = useState("");
  const [authState, setAuthState] = useState(AuthState.None);
  
    // If the user presses "register" from the auth screen, try to register a
  // new account with the  supplied credentials and login as the newly created user
  const handleRegister = useCallback(async () => {
    setAuthState(AuthState.Loading);

    try {
      
        if(confirmPassword!=password) {
          throw new error("passwords do not match");
        }
        // Register the user...
      await app.emailPasswordAuth.registerUser({ email, password });
      // ...then login with the newly created user
      const credentials = Realm.Credentials.emailPassword(email, password);

      await app.logIn(credentials);

      setAuthState(AuthState.None);
    } catch (e) {
      console.log(e);
      setAuthState(AuthState.RegisterError);
    }

  }, [email, password, setAuthState, app]);

  return (
    <View style={styles.content}>
      <View style={styles.inputContainer}>
        <Text style={buttonStyles.loginText}>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstname}
          onChangeText={setFirstname}
          autoCompleteType="firstname"
          textContentType="firstname"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="First Name"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={buttonStyles.loginText}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastname}
          onChangeText={setLastname}
          autoCompleteType="lastname"
          textContentType="lastname"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Last Name"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={buttonStyles.loginText}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCompleteType="emailAddress"
          textContentType="email"
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
      <View style={styles.inputContainer}>
        <Text style={buttonStyles.loginText}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setPasswordConfirmation}
          secureTextEntry
          autoCompleteType="passwordConfirmation"
          textContentType="passwordConfirmation"
          placeholder="Confirm Password"
        />
      </View>
      <View style={styles.buttons}>
        <Pressable
          onPress={handleRegister}
          style={[styles.button, authState === AuthState.Loading && styles.buttonDisabled]}
          disabled={authState === AuthState.Loading}
        >
          <Text style={buttonStyles.text}>Register</Text>
        </Pressable>
        {authState === AuthState.PasswordMismatch && (
        <Text style={[styles.error]}>Error: Passwords do not Match</Text>
      )}
      {authState === AuthState.RegisterError && (
        <Text style={[styles.error]}>There was an error registering, please try again</Text>
      )}
      </View>
    </View>
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
      textAlign: "center",
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
  