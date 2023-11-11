import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import Header from "../components/Header";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        {
          username,
          password,
        }
      );

      const data = response.data;

      if (data && data.token) {
        localStorage.setItem("token", data.token);
        navigation.navigate("Appointment");
      } else {
        // Handle the case where no token is received
        console.error("No token received in the login response.");
      }
    } catch (error) {
      console.error(error);
      // Handle login error, e.g., show an error message
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
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

        <Button color="crimson" title="Login" onPress={handleLogin} />
        <View style={styles.margin}>
          <Button
            title="Register"
            onPress={() => navigation.navigate("Register")}
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
    backgroundColor: "currentcolor",
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
  margin: {
    marginTop: "10px",
  },
});

export default Login;
