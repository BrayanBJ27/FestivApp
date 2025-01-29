import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomNavbar from "../components/BottomNavbar";
import Icon from "react-native-vector-icons/FontAwesome6";
import MainStyles from "../styles/MainStyles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/types";
import axios from "axios";
import { WEATHER_API_KEY } from "@env"; // Importamos la API Key del .env

const getWeatherIcon = (condition: string) => {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes("rain") || conditionLower.includes("drizzle") || conditionLower.includes("shower")) {
    return "cloud-rain";
  }
  if (conditionLower.includes("thunder") || conditionLower.includes("storm") || conditionLower.includes("lightning")) {
    return "cloud-bolt";
  }
  if (conditionLower.includes("snow") || conditionLower.includes("blizzard") || conditionLower.includes("sleet")) {
    return "snowflake";
  }
  if (conditionLower.includes("mist") || conditionLower.includes("fog") || conditionLower.includes("haze")) {
    return "smog";
  }
  if (conditionLower.includes("sunny") || conditionLower.includes("clear")) {
    return "sun";
  }
  if (conditionLower.includes("partly cloudy") || conditionLower.includes("partly sunny")) {
    return "cloud-sun";
  }
  if (conditionLower.includes("cloudy") || conditionLower.includes("overcast")) {
    return "cloud";
  }
  if (conditionLower.includes("wind") || conditionLower.includes("gale") || conditionLower.includes("breezy")) {
    return "wind";
  }
  if (conditionLower.includes("hail") || conditionLower.includes("ice pellets")) {
    return "cloud-hail";
  }
  if (conditionLower.includes("tropical") || conditionLower.includes("hurricane") || conditionLower.includes("cyclone")) {
    return "hurricane";
  }
  if (conditionLower.includes("hot") || conditionLower.includes("heat")) {
    return "temperature-high";
  }
  if (conditionLower.includes("cold") || conditionLower.includes("freeze") || conditionLower.includes("frost")) {
    return "temperature-low";
  }
  if (conditionLower.includes("rain") && (conditionLower.includes("sun") || conditionLower.includes("clear"))) {
    return "cloud-sun-rain";
  }
  return "circle-question";
};

const fetchWeather = async (location: string) => {
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${location}&aqi=no`
    );
    return response.data.current;
  } catch (error) {
    console.error(`Error fetching weather for ${location}:`, error);
    return null;
  }
};

const ScheduleScreen: React.FC = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<string>("Home");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [nickname, setNickname] = useState("Brayan Davila"); // Default value

  const [weatherData, setWeatherData] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({
    "Pillaro Central": true,
    "San Vicente de Quilimbulo": true,
    "Tunguipamba": true,
  });

  // Cargar el nickname guardado en AsyncStorage
  useEffect(() => {
    const loadNickname = async () => {
      try {
        const savedNickname = await AsyncStorage.getItem("nickname");
        if (savedNickname) {
          setNickname(savedNickname);
        }
      } catch (error) {
        console.error("Error al cargar el nickname en Schedule:", error);
      }
    };
    loadNickname();
  }, []);

  useEffect(() => {
    const fetchAllWeather = async () => {
      const locations = ["Pillaro, Ecuador", "San Vicente de Quilimbulo, Ecuador", "Tunguipamba, Ecuador"];
      const locationNames = ["Pillaro Central", "San Vicente de Quilimbulo", "Tunguipamba"];

      let weatherResults: { [key: string]: any } = {};
      let loadingStates: { [key: string]: boolean } = {};

      for (let i = 0; i < locations.length; i++) {
        loadingStates[locationNames[i]] = true;
        const weather = await fetchWeather(locations[i]);
        if (weather) {
          weatherResults[locationNames[i]] = weather;
        }
        loadingStates[locationNames[i]] = false;
      }

      setWeatherData(weatherResults);
      setLoading(loadingStates);
    };

    fetchAllWeather();
  }, []);

  return (
    <SafeAreaView style={MainStyles.safeAreaSS}>
      <ScrollView scrollEnabled={true} contentInsetAdjustmentBehavior="automatic" style={MainStyles.scrollViewSS}>
        <View style={MainStyles.containerSS}>
          <Text style={MainStyles.greetingTextSS}>Good morning</Text>
          <Text style={MainStyles.mainTitleSS}>Hello, {nickname}</Text>
          <ImageBackground style={MainStyles.profileIconSS} source={require("../assets/images/diablada.jpg")} resizeMode="cover" />

          <Text style={MainStyles.sectionTitleSS}>Diablada Pillareña</Text>
          <ImageBackground style={MainStyles.mainImageSS} source={require("../assets/images/diablada.jpg")} resizeMode="cover">
            <View style={MainStyles.overlayContainerSS}>
              <Icon name="location-dot" size={20} color="#fff" />
              <Text style={MainStyles.locationTextSS}>Pillaro/Tungurahua</Text>

              <View style={MainStyles.buttonContainerSS}>
                <TouchableOpacity onPress={() => navigation.navigate("Calendar")}>
                  <Icon name="calendar" size={20} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>

          <View style={MainStyles.dragIndicatorSS} />
          <View style={MainStyles.scheduleContainerSS}>
            <View style={MainStyles.scheduleHeaderSS}>
              <Text style={MainStyles.scheduleTitleSS}>Schedule</Text>
            </View>

            {["Pillaro Central", "San Vicente de Quilimbulo", "Tunguipamba"].map((location, index) => (
              <View key={index} style={MainStyles.scheduleItemSS}>
                <Text style={MainStyles.timeTextSS}>{index === 0 ? "10:30" : index === 1 ? "12:00" : "15:00"}</Text>
                <View style={MainStyles.timelineSS}>
                  <View style={index === 0 ? MainStyles.timelineActiveSS : MainStyles.timelineInactiveSS} />
                </View>
                <Text style={MainStyles.locationNameSS}>{location}</Text>
                <Text style={MainStyles.dateTextSS}>
                  {index === 0 ? "Jan 1" : index === 1 ? "Jan 2nd-3rd" : "Jan 4th-5th"}
                </Text>

                {loading[location] ? (
                  <ActivityIndicator size="small" color="#0373f3" />
                ) : weatherData[location] ? (
                  <>
                    <Icon
                      name={getWeatherIcon(weatherData[location].condition.text)}
                      size={20}
                      color="#00CEC9"
                      style={MainStyles.weatherIconSS}
                    />
                    <Text style={MainStyles.weatherTextSS}>
                      {weatherData[location].temp_c}°C
                    </Text>
                  </>
                ) : (
                  <Text style={MainStyles.errorTextSS}>N/A</Text>
                )}

                <Icon name="map-location-dot" size={20} color="#0373f3" style={MainStyles.scheduleIconSS} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default ScheduleScreen;
