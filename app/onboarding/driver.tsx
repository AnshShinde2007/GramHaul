import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function DriverDetails() {
  const [vehicleNo, setVehicleNo] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    if (vehicleNo && licenseNo) {
      router.push("/driver/dashboard");
    } else {
      alert("Please fill all details");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Onboarding</Text>

      <TextInput
        style={styles.input}
        placeholder="Vehicle Number"
        value={vehicleNo}
        onChangeText={setVehicleNo}
      />

      <TextInput
        style={styles.input}
        placeholder="License Number"
        value={licenseNo}
        onChangeText={setLicenseNo}
      />

      <TouchableOpacity style={styles.btn} onPress={handleContinue}>
        <Text style={styles.btnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1565C0",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginVertical: 10,
    borderColor: "#90CAF9",
    borderWidth: 1,
  },
  btn: {
    backgroundColor: "#1565C0",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: "60%",
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
