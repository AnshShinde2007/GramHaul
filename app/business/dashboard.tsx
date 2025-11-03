import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BusinessDashboard() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📦 Business Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Orders</Text>
        <Text>You have 3 active shipments.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Activity</Text>
        <Text>Last order delivered successfully!</Text>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#F1F8E9", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#33691E", marginBottom: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: { fontSize: 18, fontWeight: "600", marginBottom: 5 },
  btn: {
    backgroundColor: "#33691E",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  btnText: { color: "#fff", fontWeight: "bold" },
});
