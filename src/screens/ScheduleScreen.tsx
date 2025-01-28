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
import BottomNavbar from "../components/BottomNavbar";
import Icon from "react-native-vector-icons/FontAwesome6";
import MainStyles from "../styles/MainStyles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/types";
import axios from "axios";
import { WEATHER_API_KEY } from "@env"; // Importamos la API Key del .env

// Función para obtener el ícono del clima según la condición
const getWeatherIcon = (condition: string) => {
  if (condition.includes("Rain")) return "cloud-showers-heavy";
  if (condition.includes("Clear") || condition.includes("Sunny")) return "cloud-sun";
  if (condition.includes("Cloudy") || condition.includes("Overcast")) return "cloud";
  return "question"; // Default si no hay coincidencias
};

// Función para obtener el clima de una ubicación
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

  // Estado para almacenar el clima de cada ubicación
  const [weatherData, setWeatherData] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({
    "Pillaro Central": true,
    "San Vicente de Quilimbulo": true,
    "Tunguipamba": true,
  });

  // useEffect para cargar el clima de cada lugar
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
          <Text style={MainStyles.mainTitleSS}>Hello, Brayan</Text>
          <ImageBackground style={MainStyles.profileIconSS} source={require("../assets/images/diablada.jpg")} resizeMode="cover" />

          <Text style={MainStyles.sectionTitleSS}>Diablada Pillareña</Text>
          <ImageBackground style={MainStyles.mainImageSS} source={require("../assets/images/diablada.jpg")} resizeMode="cover">
            <View style={MainStyles.overlayContainerSS}>
              <Icon name="location-arrow" size={20} color="#fff" />
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

            {/* Lista de Lugares en el Timeline */}
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

                {/* Clima */}
                {loading[location] ? (
                  <ActivityIndicator size="small" color="#0373f3" />
                ) : weatherData[location] ? (
                  <>
                    <Icon
                      name={getWeatherIcon(weatherData[location].condition.text)}
                      size={20}
                      color="#0373f3"
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
