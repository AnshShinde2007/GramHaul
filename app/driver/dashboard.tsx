import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DriverDashboard() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo Section */}
      <Image source={require("../assets/primarylogo.png")} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>GramHaul – Drivers dashboard</Text>
      {/* Cards */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🛣️ Current Trip ffs</Text>
        <Text style={styles.cardText}>No active trips at the moment.</Text>
        
        <Text style={styles.cardTitle}>📋 Available Orders</Text>
        <Text style={styles.cardText}>2 new load requests nearby.</Text>
        <Text style={styles.cardTitle}>💰 Earnings Summary</Text>
        <Text style={styles.cardText}>This month: ₹12,500</Text>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Accept New Load</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    padding: 20, 
    backgroundColor: "#E8F5E9", 
    alignItems: "center" 
  },
  logo: { 
    width: 100, 
    height: 100, 
    marginBottom: 15, 
    resizeMode: "contain" 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "#2E7D32", 
    marginBottom: 20, 
    textAlign: "center" 
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderLeftWidth: 6,
    borderLeftColor: "#66BB6A",
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: "600", 
    marginBottom: 5, 
    color: "#1B5E20" 
  },
  cardText: { 
    fontSize: 15, 
    color: "#4E4E4E" 
  },
  btn: {
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  btnText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16 
  },
});
