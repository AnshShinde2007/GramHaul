import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface Coordinates {
  latitude: number;
  longitude: number;
}

export default function ActiveTrip() {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      setLoading(false);

      // Update location every 5 seconds
      const watchId = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (loc) =>
          setLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          })
      );

      return () => watchId.remove();
    })();
  }, []);

  if (loading || !location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text>Fetching your location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation
      >
        <Marker
          coordinate={location}
          title="You are here"
          description="Driver current position"
          pinColor="#2E7D32"
        />
      </MapView>

      <View style={styles.info}>
        <Text style={styles.text}>Latitude: {location.latitude.toFixed(5)}</Text>
        <Text style={styles.text}>Longitude: {location.longitude.toFixed(5)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  info: {
    backgroundColor: "#E8F5E9",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#A5D6A7",
  },
  text: { color: "#2E7D32", fontWeight: "bold" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
