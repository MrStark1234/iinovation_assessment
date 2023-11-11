import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Register");
    }, 300);
  }, []);
  return (
    <View style={styles.container}>
      <Image source={require("../images/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Innovation Telemedicine-App</Text>
    </View>
  );
};

export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "darkslateblue",
  },
  logo: {
    width: 100,
    height: 100,
    tintColor: "#fff",
  },
  title: { color: "#fff", fontSize: 20, fontWeight: "800", marginTop: 20 },
});
