import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BusinessDashboard() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>GramHaul – Business Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📦 Active Shipments</Text>
        <Text>3 trucks currently en route.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🛻 Available Drivers</Text>
        <Text>5 local drivers available nearby.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📍 Track Shipments</Text>
        <Text>Track driver location in real time.</Text>
      </View>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Request Truck</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#E8F5E9" },
  title: { fontSize: 24, fontWeight: "bold", color: "#2E7D32", marginBottom: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardTitle: { fontSize: 18, fontWeight: "600", marginBottom: 5 },
  btn: {
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: { color: "#fff", fontWeight: "bold" },
});
