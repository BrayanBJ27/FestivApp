import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert // <-- Importamos Alert desde react-native
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomNavbar from "../components/BottomNavbar";
import Icon from "react-native-vector-icons/FontAwesome6";
import MainStyles from "../styles/MainStyles";
import {
  NavigationProp,
  useNavigation,
  useRoute,
  RouteProp
} from "@react-navigation/native";
import { RootStackParamList } from "../types/types";
import axios from "axios";
import { WEATHER_API_KEY } from "@env";

// URL base de tu backend
const BACKEND_URL = "http://192.168.100.11:3000";

// Función para obtener el ícono del clima a partir de la descripción
const getWeatherIcon = (condition: string) => {
  const conditionLower = condition.toLowerCase();
  if (
    conditionLower.includes("rain") ||
    conditionLower.includes("drizzle") ||
    conditionLower.includes("shower")
  ) {
    return "cloud-rain";
  }
  if (
    conditionLower.includes("thunder") ||
    conditionLower.includes("storm") ||
    conditionLower.includes("lightning")
  ) {
    return "cloud-bolt";
  }
  if (
    conditionLower.includes("snow") ||
    conditionLower.includes("blizzard") ||
    conditionLower.includes("sleet")
  ) {
    return "snowflake";
  }
  if (
    conditionLower.includes("mist") ||
    conditionLower.includes("fog") ||
    conditionLower.includes("haze")
  ) {
    return "smog";
  }
  if (conditionLower.includes("sunny") || conditionLower.includes("clear")) {
    return "sun";
  }
  if (
    conditionLower.includes("partly cloudy") ||
    conditionLower.includes("partly sunny")
  ) {
    return "cloud-sun";
  }
  if (conditionLower.includes("cloudy") || conditionLower.includes("overcast")) {
    return "cloud";
  }
  if (
    conditionLower.includes("wind") ||
    conditionLower.includes("gale") ||
    conditionLower.includes("breezy")
  ) {
    return "wind";
  }
  if (conditionLower.includes("hail") || conditionLower.includes("ice pellets")) {
    return "cloud-hail";
  }
  if (
    conditionLower.includes("tropical") ||
    conditionLower.includes("hurricane") ||
    conditionLower.includes("cyclone")
  ) {
    return "hurricane";
  }
  if (conditionLower.includes("hot") || conditionLower.includes("heat")) {
    return "temperature-high";
  }
  if (
    conditionLower.includes("cold") ||
    conditionLower.includes("freeze") ||
    conditionLower.includes("frost")
  ) {
    return "temperature-low";
  }
  if (
    conditionLower.includes("rain") &&
    (conditionLower.includes("sun") || conditionLower.includes("clear"))
  ) {
    return "cloud-sun-rain";
  }
  return "circle-question";
};

// Función para obtener los datos del clima usando Weather API
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
  const route = useRoute<RouteProp<RootStackParamList, "ScheduleScreen">>();
  const { festivityId } = route.params;

  // Estados para la información del usuario
  const [nickname, setNickname] = useState("Brayan Davila");
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);

  // Estados para la información de la festividad y sus eventos
  const [festivity, setFestivity] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);

  // Estados para el clima: usaremos la id del evento como key
  const [weatherData, setWeatherData] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  // Cargar imagen de perfil desde AsyncStorage
  useEffect(() => {
    const loadProfileImageFromStorage = async () => {
      try {
        const storedImage = await AsyncStorage.getItem("profileImage");
        if (storedImage) {
          setUserProfileImage(storedImage);
        } else {
          setUserProfileImage(null);
        }
      } catch (error) {
        console.error("Error al cargar la imagen de perfil:", error);
        setUserProfileImage(null);
      }
    };
    loadProfileImageFromStorage();
  }, []);

  // Cargar perfil desde el backend
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          const response = await axios.get(`${BACKEND_URL}/users/${storedUserId}`);
          if (response.data.success) {
            const user = response.data.user;
            setNickname(user.name_User);
            if (user.image) {
              setUserProfileImage(user.image);
            }
          } else {
            console.error(
              "No se pudo cargar la información del usuario desde el backend"
            );
          }
        } else {
          console.error("UserId not found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error loading user profile in ScheduleScreen:", error);
      }
    };
    loadUserProfile();
  }, []);

  // Cargar el nickname de AsyncStorage (como respaldo)
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

  // Fetch de la información de la festividad (incluye join con Locations para city/province)
  useEffect(() => {
    const fetchFestivity = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/festivals/detail/${festivityId}`
        );
        setFestivity(response.data);
      } catch (error) {
        console.error("Error fetching festivity detail:", error);
      }
    };
    fetchFestivity();
  }, [festivityId]);

  // Fetch de los eventos asociados a la festividad
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/events/byFestival?festivityId=${festivityId}`
        );
        // Si la respuesta es un arreglo, se asigna directamente; de lo contrario, se verifica la propiedad "events"
        const eventsData = Array.isArray(response.data)
          ? response.data
          : response.data.events;
        setEvents(eventsData || []);
      } catch (error) {
        console.error("Error fetching events for festivity:", error);
        Alert.alert("Error", "Could not fetch events for festivity");
      }
    };
    fetchEvents();
  }, [festivityId]);

  // Para cada evento, obtenemos la información del clima usando la localidad del evento
  useEffect(() => {
    const fetchWeatherForEvents = async () => {
      let newWeatherData: { [key: string]: any } = {};
      let newLoading: { [key: string]: boolean } = {};
      for (let event of events) {
        newLoading[event.id_event] = true;
        // Usamos event.location_name para la consulta del clima
        const weather = await fetchWeather(`${event.location_name}, Ecuador`);
        if (weather) {
          newWeatherData[event.id_event] = weather;
        }
        newLoading[event.id_event] = false;
      }
      setWeatherData(newWeatherData);
      setLoading(newLoading);
    };
    if (events.length > 0) {
      fetchWeatherForEvents();
    }
  }, [events]);

  return (
    <SafeAreaView style={MainStyles.safeAreaSS}>
      <ScrollView
        scrollEnabled={true}
        contentInsetAdjustmentBehavior="automatic"
        style={MainStyles.scrollViewSS}
      >
        <View style={MainStyles.containerSS}>
          <Text style={MainStyles.greetingTextSS}>Good morning</Text>
          <Text style={MainStyles.mainTitleSS}>Hello, {nickname}</Text>
          <ImageBackground
            style={MainStyles.headerImageSS}
            source={
              userProfileImage
                ? { uri: `data:image/jpeg;base64,${userProfileImage}` }
                : require("../assets/images/profile.jpg")
            }
          />

          {/* Cabecera de la festividad */}
          <Text style={MainStyles.sectionTitleSS}>
            {festivity ? festivity.name_Festival : "Loading festivity..."}
          </Text>
          <ImageBackground
            style={MainStyles.mainImageSS}
            source={
              festivity && festivity.image
                ? { uri: `data:image/jpeg;base64,${festivity.image}` }
                : require("../assets/images/oficial_festiapp.png")
            }
            resizeMode="cover"
          >
            <View style={MainStyles.overlayContainerSS}>
              <Icon name="location-dot" size={20} color="#fff" />
              <Text style={MainStyles.locationTextSS}>
                {festivity
                  ? `${festivity.city}, ${festivity.province}`
                  : "Pillaro/Tungurahua"}
              </Text>
              <View style={MainStyles.buttonContainerSS}>
                <TouchableOpacity onPress={() => navigation.navigate("Calendar", { festivityId })}>
                  <Icon name="calendar" size={20} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>

          <View style={MainStyles.dragIndicatorSS} />

          {/* Sección de eventos (Schedule) */}
          <View style={MainStyles.scheduleContainerSS}>
            <View style={MainStyles.scheduleHeaderSS}>
              <Text style={MainStyles.scheduleTitleSS}>Schedule</Text>
            </View>

            {events.length > 0 ? (
              events.map((event, index) => (
                <View key={event.id_event} style={MainStyles.scheduleItemSS}>
                  {/* Hora */}
                  <Text style={MainStyles.timeTextSS}>{event.event_time}</Text>

                  {/* Línea de tiempo */}
                  <View style={MainStyles.timelineSS}>
                    <View
                      style={
                        index === 0
                          ? MainStyles.timelineActiveSS
                          : MainStyles.timelineInactiveSS
                      }
                    />
                  </View>

                  {/* Nombre de la localidad (para la UI) */}
                  <Text style={MainStyles.locationNameSS}>
                    {event.location_name}
                  </Text>

                  {/* Fecha */}
                  <Text style={MainStyles.dateTextSS}>
                    {new Date(event.event_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric"
                    })}
                  </Text>

                  {/* Icono del clima y temperatura */}
                  {loading[event.id_event] ? (
                    <ActivityIndicator size="small" color="#0373f3" />
                  ) : weatherData[event.id_event] ? (
                    <>
                      <Icon
                        name={getWeatherIcon(
                          weatherData[event.id_event].condition.text
                        )}
                        size={20}
                        color="#00CEC9"
                        style={MainStyles.weatherIconSS}
                      />
                      <Text style={MainStyles.weatherTextSS}>
                        {weatherData[event.id_event].temp_c}°C
                      </Text>
                    </>
                  ) : (
                    <Text style={MainStyles.errorTextSS}>N/A</Text>
                  )}
                </View>
              ))
            ) : (
              <Text style={MainStyles.noEventsTextSS}>No events found.</Text>
            )}
          </View>
        </View>
      </ScrollView>

      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default ScheduleScreen;
