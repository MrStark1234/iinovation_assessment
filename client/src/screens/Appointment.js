// screens/AppointmentsScreen.js

import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import axios from "axios";

const AppointmentsScreen = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const [userRole, setUserRole] = useState(""); // Assuming you set the user role after login/register
  const [userDetails, setUserDetails] = useState([]); // State to store doctor or patient details

  useEffect(() => {
    // Fetch appointments and user details on component mount
    fetchAppointments();
    fetchUserDetails();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/appointments"
      );
      setAppointments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      // Assuming different endpoints for doctor and patient details
      const response = await axios.get(
        userRole === "doctor"
          ? "http://localhost:8000/api/doctors"
          : "http://localhost:8000/api/patients"
      );
      setUserDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderDetails = () => {
    if (userRole === "patient" || userRole === "doctor") {
      return (
        <View>
          <Text style={styles.sectionTitle}>
            {userRole === "patient" ? "Doctor" : "Patient"} Details
          </Text>
          <FlatList
            data={userDetails}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.detailsItem}>
                <Text>{item.name}</Text>
                <Text>{item.specialization || item.patientDetails}</Text>
              </View>
            )}
          />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointments</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.appointmentItem}>
            <Text>{item.title}</Text>
            <Text>{item.date}</Text>
          </View>
        )}
      />
      {renderDetails()}
      <Button
        title="Logout"
        onPress={() => navigation.navigate("Registration")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  appointmentItem: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  detailsItem: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    marginBottom: 8,
  },
});

export default AppointmentsScreen;
