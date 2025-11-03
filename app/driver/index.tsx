import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DriverDashboard() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Dashboard</Text>
      <TouchableOpacity style={styles.card} onPress={() => router.push("/driver/available-orders")}>
        <Text>Available Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => router.push("/driver/active-trip")}>
        <Text>Active Trip</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => router.push("/driver/profile")}>
        <Text>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E8F5E9", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#2E7D32", marginBottom: 20 },
  card: { backgroundColor: "#C8E6C9", padding: 20, borderRadius: 10, marginBottom: 10 },
});
