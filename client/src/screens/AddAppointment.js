import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

const AddAppointmentScreen = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        "https://telemedicine-server.onrender.com/api/appointments/create",
        {
          name,
          age,
          title,
          description,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log(response.data);
      route.params.fetchAppointments();

      navigation.navigate("Appointment");
    } catch (error) {
      console.error(error);
      setError("An error occurred while submitting the appointment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Appointment</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={(text) => setAge(text)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Consulting For"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline
      />
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <Button title="Submit" onPress={handleSubmit} />
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
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
  title: {
    fontSize: 28,
    marginBottom: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#fff",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: "100%",
    color: "#fff",
    borderRadius: 8,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default AddAppointmentScreen;
