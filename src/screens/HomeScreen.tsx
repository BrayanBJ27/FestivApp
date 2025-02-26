import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/types";
import BottomNavbar from "../components/BottomNavbar";
import MainStyles from "../styles/MainStyles";
import { useTheme } from "../hooks/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Notifications from "expo-notifications";
import useDebounce from "../hooks/useDebounce"; // Importamos el hook de debounce

// Interfaz para festividades (dinámica)
interface Festivity {
  id_festival: number;
  name_Festival: string;
  start_date: string;
  end_date: string;
  image: string; // en base64
  rating?: number;
  description?: string;
}

const BACKEND_URL = "http://192.168.100.11:3000";

const HomeScreen: React.FC = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("Home");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  // Usamos el debounce para evitar búsquedas constantes mientras se escribe
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);

  // Estado para festividades (todas las populares)
  const [latestFestivities, setLatestFestivities] = useState<Festivity[]>([]);
  // Eliminamos el estado de otherFestivities hardcodeado

  // Función para presentar notificaciones locales de inmediato
  const presentLocalNotification = async (title: string, body: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: "default",
      },
      trigger: null,
    });
  };

  // Función para obtener y presentar las notificaciones almacenadas en MongoDB
  const fetchAndPresentNotifications = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/notifications/list`);
      const notifications = response.data;
      console.log(`Found ${notifications.length} notifications`);
      notifications.forEach((notif: any) => {
        presentLocalNotification("Upcoming Festivity", notif.message);
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
      Alert.alert("Error", "Could not fetch notifications");
    }
  };

  useEffect(() => {
    fetchAndPresentNotifications();
  }, []);

  // Cargar imagen de perfil del usuario desde AsyncStorage
  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const storedImage = await AsyncStorage.getItem("profileImage");
        setUserProfileImage(storedImage || null);
      } catch (error) {
        console.error("Error loading profile image:", error);
        setUserProfileImage(null);
      }
    };
    loadProfileImage();
  }, []);

  // Invocar generación de notificaciones cuando se abra HomeScreen
  useEffect(() => {
    const generateNotifications = async () => {
      try {
        const response = await axios.post(`${BACKEND_URL}/notifications/generate`);
        console.log("Notifications generated:", response.data);
      } catch (error: any) {
        console.error("Error generating notifications:", error);
        console.error("Error details:", error.response?.data || error.message);
      }
    };
    generateNotifications();
  }, []);

  // Función para cargar las "Latest Festivities" (Popular) desde el backend
  const fetchLatestFestivities = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/festivals/latest`);
      // Se asume que el endpoint retorna { data: Festivity[] }
      setLatestFestivities(response.data.data);
    } catch (error) {
      console.error("Error fetching latest festivities:", error);
      Alert.alert("Error", "Could not fetch latest festivities");
    }
  };

  useEffect(() => {
    fetchLatestFestivities();
  }, []);

  // Función para normalizar texto (quitar tildes y pasar a minúsculas)
  const normalizeText = (text: string) =>
    text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  // Para búsqueda, combinamos todas las festividades (ahora solo latestFestivities)
  const allFestivities: Festivity[] = [...latestFestivities];

  const normalizedSearch = normalizeText(debouncedSearchQuery);
  const filteredFestivities = allFestivities.filter((festivity) =>
    normalizeText(festivity.name_Festival).includes(normalizedSearch)
  );

  // Derivamos las secciones:
  // Sección "Latest Festivities": aquellas con id_festival menor a 5 (puedes ajustar el criterio)
  const popularFestivities = latestFestivities.filter(
    (festivity) => festivity.id_festival < 5
  );
  // Sección "Other Festivities": aquellas con id_festival 5 en adelante
  const otherFestivities = latestFestivities.filter(
    (festivity) => festivity.id_festival >= 5
  );

  // Render para card de Latest Festivities (popular)
  const renderPopularFestivityCard = (festivity: Festivity) => {
    const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
    const formattedDate = new Date(festivity.start_date).toLocaleDateString("en-US", options);
    return (
      <TouchableOpacity
        key={`latest-${festivity.id_festival}`}
        onPress={() =>
          navigation.navigate("FestivityScreen", { festivityId: festivity.id_festival })
        }
      >
        <ImageBackground
          style={MainStyles.popularFestivityADS}
          source={
            festivity.image
              ? { uri: `data:image/jpeg;base64,${festivity.image}` }
              : require("../assets/images/oficial_festiapp.png")
          }
          resizeMode="cover"
        >
          <Text style={MainStyles.popularFestivityTextADS}>
            {festivity.name_Festival}
          </Text>
          <View style={MainStyles.popularFestivityDetailsHS}>
            <Text style={MainStyles.dateTextHS}>{formattedDate}</Text>
            <View style={MainStyles.ratingContainerHS}>
              {festivity.rating !== undefined && (
                <Text style={MainStyles.ratingTextHS}>{festivity.rating}</Text>
              )}
              <Icon
                name="star"
                size={20}
                color="#FFD700"
                style={MainStyles.ratingIconHS}
              />
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  // Render para card de Other Festivities
  const renderOtherFestivityCard = (festivity: Festivity) => {
    const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
    const formattedDate = new Date(festivity.start_date).toLocaleDateString("en-US", options);
    return (
      <TouchableOpacity
        key={`other-${festivity.id_festival}`}
        onPress={() =>
          navigation.navigate("FestivityScreen", { festivityId: festivity.id_festival })
        }
      >
        <View style={{ marginHorizontal: 5 }}>
          <ImageBackground
            style={MainStyles.otherFestivityADS}
            source={
              festivity.image
                ? { uri: `data:image/jpeg;base64,${festivity.image}` }
                : require("../assets/images/oficial_festiapp.png")
            }
            resizeMode="cover"
          >
            <Text style={MainStyles.popularFestivityTextADS}>
              {festivity.name_Festival}
            </Text>
            <View style={MainStyles.popularFestivityDetailsHS}>
              <Text style={MainStyles.dateTextHSO}>{formattedDate}</Text>
              <View style={MainStyles.ratingContainerHSO}>
                {festivity.rating !== undefined && (
                  <Text style={MainStyles.ratingTextHS}>{festivity.rating}</Text>
                )}
                <Icon
                  name="star"
                  size={20}
                  color="#FFD700"
                  style={MainStyles.ratingIconHS}
                />
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[
        { backgroundColor: isDarkMode ? "#000" : "#fff" },
        { flex: 1 },
      ]}
    >
      <View
        style={[
          MainStyles.containerHS,
          { backgroundColor: isDarkMode ? "#000" : "#fff" },
        ]}
      >
        {/* Header */}
        <View style={MainStyles.headerContainerHS}>
          <Text
            style={[
              MainStyles.headerTextHS,
              { color: isDarkMode ? "#fff" : "#000" },
            ]}
          >
            Find your next trip and discover more about Ecuador
          </Text>
          <ImageBackground
            style={MainStyles.headerImageHS}
            source={
              userProfileImage
                ? { uri: `data:image/jpeg;base64,${userProfileImage}` }
                : require("../assets/images/profile.jpg")
            }
          />
        </View>

        <Text
          style={[
            MainStyles.titleTextHS,
            { color: isDarkMode ? "#fff" : "#000" },
          ]}
        >
          The following holidays.
        </Text>

        {/* Search Box */}
        <View style={MainStyles.searchContainerHS}>
          <View
            style={{
              backgroundColor: isDarkMode ? "#fff" : "#f5f5f5",
              borderColor: "#ddd",
              borderRadius: 50,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 15,
              height: 40,
              flex: 1,
            }}
          >
            <Icon
              name="magnifying-glass"
              size={18}
              color="#aaa"
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={{ flex: 1, color: "#000", fontSize: 16 }}
              placeholder="Search..."
              placeholderTextColor="#aaa"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#007AFF",
              borderRadius: 50,
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 30,
              left: -20,
            }}
          >
            <Icon name="sliders" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Sección de festividades: si hay búsqueda, muestra filtrados; si no, muestra las secciones */}
        {searchQuery ? (
          filteredFestivities.length > 0 ? (
            <View style={{ marginTop: 15, paddingHorizontal: 20 }}>
              {filteredFestivities.map((festivity) => (
                <TouchableOpacity
                  key={festivity.id_festival}
                  onPress={() =>
                    navigation.navigate("FestivityScreen", { festivityId: festivity.id_festival })
                  }
                  style={{ marginBottom: 15 }}
                >
                  <ImageBackground
                    style={{
                      width: "100%",
                      height: 150,
                      borderRadius: 10,
                      overflow: "hidden",
                    }}
                    source={
                      festivity.image
                        ? { uri: `data:image/jpeg;base64,${festivity.image}` }
                        : require("../assets/images/oficial_festiapp.png")
                    }
                    resizeMode="cover"
                  >
                    <View
                      style={{
                        padding: 10,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        borderRadius: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        {festivity.name_Festival}
                      </Text>
                      <Text style={{ color: "#ddd", fontSize: 14 }}>
                        {new Date(festivity.start_date).toLocaleDateString()}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text
              style={{
                textAlign: "center",
                color: isDarkMode ? "#fff" : "#000",
                marginTop: 20,
              }}
            >
              No events found.
            </Text>
          )
        ) : (
          <>
            {/* Latest Festivities Section */}
            <Text
              style={[
                MainStyles.sectionTitleHS,
                { color: isDarkMode ? "#fff" : "#000" },
              ]}
            >
              Latest Festivities
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={MainStyles.horizontalScrollHS}
            >
              {popularFestivities.map((festivity) =>
                renderPopularFestivityCard(festivity)
              )}
            </ScrollView>

            {/* Other Festivities Section */}
            <Text
              style={[
                MainStyles.sectionTitleOtherHS,
                { color: isDarkMode ? "#fff" : "#000" },
              ]}
            >
              Other Festivities
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={{ paddingHorizontal: 20 }}
            >
              {otherFestivities.map((festivity) =>
                renderOtherFestivityCard(festivity)
              )}
            </ScrollView>
          </>
        )}
      </View>
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default HomeScreen;
