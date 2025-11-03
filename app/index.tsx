import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

// ✅ Automatically resolve correct API URL
const DEFAULT_LOCAL_IP = "192.168.1.108"; // your LAN IP
const API_URL: string =
  (Constants.expoConfig?.extra?.API_URL as string) ||
  `http://${DEFAULT_LOCAL_IP}:5000`;

export default function Index(): React.ReactElement {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const router = useRouter();

  // ✅ Check if already verified
  useEffect(() => {
    const checkVerification = async () => {
      const isVerified = await AsyncStorage.getItem("isVerified");
      if (isVerified === "true") {
        // redirect if already verified
        router.replace("/roleselection");
      }
    };
    checkVerification();
  }, []);

  // --- Send OTP ---
  const sendOtp = async (): Promise<void> => {
    if (!phoneNumber.startsWith("+")) {
      Alert.alert("Error", "Phone number must include country code (e.g. +91...)");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber }),
      });

      const data = await res.json();

      if (data.success) {
        setOtpSent(true);
        Alert.alert("✅ OTP sent successfully!");
      } else {
        Alert.alert("❌ Failed to send OTP", data.error || "Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      Alert.alert(
        "Network Error",
        "Unable to connect to server. Make sure your phone and PC are on the same Wi-Fi."
      );
    } finally {
      setLoading(false);
    }
  };

  // --- Verify OTP ---
  const verifyOtp = async (): Promise<void> => {
    if (!otp) {
      Alert.alert("Error", "Please enter the OTP.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber, otp }),
      });

      const data = await res.json();

      if (data.success) {
        // ✅ Save verified state
        await AsyncStorage.setItem("isVerified", "true");
        await AsyncStorage.setItem("phoneNumber", phoneNumber);

        Alert.alert("🎉 Phone verified successfully!");
        router.replace("/roleselection");
      } else {
        Alert.alert("❌ Incorrect OTP", "Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Alert.alert("Network Error", "Could not verify OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/gramhaul/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Login with Phone</Text>

      <TextInput
        placeholder="Enter phone number (+91...)"
        style={styles.input}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoComplete="tel"
        value={phoneNumber}
      />

      <TouchableOpacity style={styles.button} onPress={sendOtp} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? "Sending..." : "Send OTP"}
        </Text>
      </TouchableOpacity>

      {otpSent && (
        <>
          <TextInput
            placeholder="Enter OTP"
            style={styles.input}
            onChangeText={setOtp}
            keyboardType="number-pad"
            value={otp}
          />

          <TouchableOpacity style={styles.button} onPress={verifyOtp} disabled={loading}>
            <Text style={styles.buttonText}>
              {loading ? "Verifying..." : "Verify OTP"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#E8F5E9",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2E7D32",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#2E7D32",
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  logo: { width: 200, height: 200, resizeMode: "contain" }
});
