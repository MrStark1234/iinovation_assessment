// screens/AppointmentsScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Header from "../components/Header";
import { Feather } from "@expo/vector-icons";

const AppointmentsScreen = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      // const authToken = localStorage.getItem("token");
      // console.log("authToken:", authToken);

      const response = await axios.get(
        "https://telemedicine-server.onrender.com/api/appointments",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setAppointments(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteAppointment = async (id) => {
    try {
      await axios.delete(
        `https://telemedicine-server.onrender.com/api/appointments/delete/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      // Refresh appointments after deletion
      fetchAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={"Innovation Telemedicine-App"}
        icon={require("../images/logo.png")}
      />
      <Image source={require("../images/banner.jpg")} style={styles.banner} />
      <Text style={styles.title}>Appointments</Text>
      <FlatList
        data={appointments}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.appointmentItem}>
            <Text style={styles.txt}>
              <Text style={{ fontWeight: "bold" }}>Patient Name :</Text>
              {item.name}
            </Text>
            <Text style={styles.txt}>
              <Text style={{ fontWeight: "bold" }}>Age :</Text> {item.age}
            </Text>
            <Text style={styles.txt}>
              <Text style={{ fontWeight: "bold" }}>Consulting For : </Text>
              {item.title}
            </Text>
            <Text style={styles.txt}>
              <Text style={{ fontWeight: "bold" }}>Brief Desc : </Text>
              {item.description}
            </Text>
            <Text style={styles.txt}>
              <Text style={{ fontWeight: "bold" }}>Date : </Text>
              {new Date(item.date).toLocaleString()}
            </Text>
            {/* Delete Icon */}
            <TouchableOpacity onPress={() => handleDeleteAppointment(item._id)}>
              <Feather name="trash-2" size={24} color="crimson" />
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.margin}>
        <Button
          color="darkcyan"
          title="Add Appointment"
          onPress={() =>
            navigation.navigate("AddAppointment", {
              fetchAppointments: fetchAppointments,
            })
          }
        />
      </View>

      <Button
        color="crimson"
        title="Logout"
        onPress={() => navigation.navigate("Login")}
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
    backgroundColor: "currentcolor",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: "white",
  },
  txt: {
    color: "white",
  },
  appointmentItem: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    marginBottom: 8,
    color: "white",
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
    color: "white",
  },
  detailsItem: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    marginBottom: 8,
    color: "white",
  },
  banner: {
    width: "100%",
    height: "20%",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
  },
  margin: {
    marginBottom: "12px",
  },
});

export default AppointmentsScreen;
