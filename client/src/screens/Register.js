// screens/RegistrationScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Picker,
  StyleSheet,
} from "react-native";
import axios from "axios";

const RegistrationScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male"); // Set a default gender
  const [role, setRole] = useState("patient");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/register",
        {
          username,
          password,
          gender,
          role,
        }
      );

      console.log(response.data);
      // You may want to handle successful registration, e.g., show a success message or navigate to another screen
      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
      // Handle registration error, e.g., show an error message
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Patient" value="patient" />
          <Picker.Item label="Doctor" value="doctor" />
        </Picker>
        <Button title="Register" onPress={handleRegister} />
        <View style={styles.margin}>
          <Button
            color="crimson"
            title="Login"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "darkslateblue",
  },
  form: {
    width: "80%", // Adjust the width as needed
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: "white",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    width: "100%", // Make the input fill the width
    color: "white",
  },
  picker: {
    height: 40,
    width: "100%", // Make the picker fill the width
    marginBottom: 12,
  },
  margin: {
    marginTop: "10px",
  },
});

export default RegistrationScreen;
