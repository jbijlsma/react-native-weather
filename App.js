import { StatusBar } from "expo-status-bar";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { OPEN_WEATHER_MAP_API_KEY } from "@env";

import SafeArea from "./components/SafeArea";
import { useState } from "react";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [searchText, setSearchText] = useState();

  const OPEN_WEATHER_MAP_BASE_URL =
    "https://api.openweathermap.org/data/2.5/weather?units=metric";

  const tryCallOpenWeatherApi = async (query) => {
    try {
      const uri =
        OPEN_WEATHER_MAP_BASE_URL +
        query +
        `&appid=${OPEN_WEATHER_MAP_API_KEY}`;
      const response = await fetch(uri);

      if (response.status === 404) {
        Alert.alert("Location not found");
        return;
      }

      const json = await response.json();
      setWeatherData(json);
    } catch (e) {
      Alert.alert("Error", "Location not found");
    }
  };

  const searchSubmitHandler = async () => {
    if (!searchText || searchText.length === 0) return;

    const query = `&q=${searchText}`;
    await tryCallOpenWeatherApi(query);
  };

  const searchTextChangedHandler = (newText) => {
    setSearchText(newText);
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }

    Location.watchPositionAsync({}, async (location) => {
      const { latitude, longitude } = location.coords;

      const query = `&lat=${latitude}&lon=${longitude}`;
      await tryCallOpenWeatherApi(query);
    });
  };

  let currentScreen = (
    <View style={styles.startScreen}>
      <Text style={styles.startScreenText}>React Native</Text>
      <Text style={styles.startScreenText}>Weather</Text>
      <Pressable
        onPress={getLocation}
        style={({ pressed }) => [
          styles.findMyLocationBtn,
          pressed && styles.pressed,
        ]}
      >
        <Ionicons
          name="ios-locate-outline"
          size={32}
          color="white"
        />
        <Text style={styles.findMyLocationText}>Find my location</Text>
      </Pressable>
    </View>
  );

  if (weatherData) {
    currentScreen = (
      <View style={styles.weatherInfoContainer}>
        <Text style={styles.city}>{weatherData?.name}</Text>
        <Text style={styles.weather}>{weatherData?.weather[0]?.main}</Text>
        <View style={styles.tempartureContainer}>
          <Text style={styles.temperature}>
            {Math.round(weatherData?.main?.temp)}
          </Text>
          <View style={styles.degreeContainer}>
            <Text style={styles.degree}>&deg; C</Text>
          </View>
        </View>
        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`,
          }}
          style={{ width: 100, height: 100 }}
        />
      </View>
    );
  }

  return (
    <LinearGradient
      style={styles.gradient}
      colors={["#136a8a", "#267871"]}
    >
      <SafeArea>
        <StatusBar style="auto" />
        <View style={styles.inputContainer}>
          <Ionicons
            name="ios-locate-outline"
            size={32}
            color="white"
          />
          <TextInput
            onChangeText={searchTextChangedHandler}
            onSubmitEditing={searchSubmitHandler}
            selectTextOnFocus
            style={styles.locationInput}
            value={searchText}
            placeholder="Enter location"
            placeholderTextColor="rgba(255,255,255,0.5)"
            width={50}
            height={50}
          />
          <Pressable
            onPress={searchSubmitHandler}
            style={({ pressed }) => [pressed && styles.pressed]}
          >
            <Ionicons
              name="ios-search-outline"
              size={32}
              color="white"
            />
          </Pressable>
        </View>

        {currentScreen}
      </SafeArea>

      <Image
        source={require("./assets/town.png")}
        style={{
          width: "100%",
          height: 100,
        }}
        // stretch looks best on both iOS and android. Repeat does not work on iOS
        resizeMode="stretch"
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  inputContainer: {
    width: "100%",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  locationInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: "white",
  },
  weatherInfoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  city: {
    fontSize: 42,
    color: "white",
    marginBottom: 8,
  },
  weather: {
    fontSize: 16,
    color: "white",
    opacity: 0.7,
    marginBottom: 16,
  },
  tempartureContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  temperature: {
    fontSize: 64,
    color: "white",
  },
  degreeContainer: {
    height: "100%",
    marginTop: 20,
  },
  degree: {
    color: "white",
    fontSize: 18,
  },
  startScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  startScreenText: {
    color: "white",
    fontSize: 36,
    opacity: 0.7,
  },
  findMyLocationBtn: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  findMyLocationText: {
    paddingLeft: 12,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.5,
  },
});
