import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RoleSelection() {
  const router = useRouter();
  const [licenseNo, setLicenseNo] = useState<string>("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your License Number</Text>

      <TextInput
        style={styles.input}
        placeholder="License Number"
        value={licenseNo}
        onChangeText={setLicenseNo}
      />

      <Text style={styles.title}>Select Your Role</Text>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: "#2E7D32" }]}
        onPress={() => router.push("/onboarding/business")}
      >
        <Text style={styles.btnText}>Business</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: "#1565C0" }]}
        onPress={() => router.push("/onboarding/driver")}
      >
        <Text style={styles.btnText}>Driver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2E7D32",
  },
  btn: {
    width: "80%",
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginVertical: 10,
    borderColor: "#A5D6A7",
    borderWidth: 1,
  },
});
