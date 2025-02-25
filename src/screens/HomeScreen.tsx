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
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);

  // Estados para festividades
  const [latestFestivities, setLatestFestivities] = useState<Festivity[]>([]);
  // Por ahora, para "Other Festivities" podemos mantener datos hardcodeados o cargarlos dinámicamente si cuentas con un endpoint.
  const [otherFestivities, setOtherFestivities] = useState<Festivity[]>([
    {
      id_festival: 4,
      name_Festival: "Independencia de Quito",
      start_date: "2022-12-06",
      end_date: "2022-12-06",
      image: "", // Aquí podrías poner una imagen en base64 o dejar un placeholder
      rating: 4.5,
      description: "Celebration in Quito",
    },
    {
      id_festival: 5,
      name_Festival: "Fiestas de Guayaquil",
      start_date: "2022-11-30",
      end_date: "2022-11-30",
      image: "",
      rating: 4.7,
      description: "Celebration in Guayaquil",
    },
    // Puedes agregar más según convenga
  ]);

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

  // Combina las festividades (popular y otros) para la búsqueda
  const allFestivities: Festivity[] = [...latestFestivities, ...otherFestivities];

  const normalizedSearch = normalizeText(searchQuery);
  const filteredFestivities = allFestivities.filter((festivity) =>
    normalizeText(festivity.name_Festival).includes(normalizedSearch)
  );

  // Render para card de Latest Festivities (popular)
  const renderPopularFestivityCard = (festivity: Festivity) => {
    // Formatear fecha: por ejemplo, "January 6"
    const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
    const formattedDate = new Date(festivity.start_date).toLocaleDateString(
      "en-US",
      options
    );

    return (
      <TouchableOpacity
        key={festivity.id_festival}
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
    const formattedDate = new Date(festivity.start_date).toLocaleDateString(
      "en-US",
      options
    );
    return (
      <TouchableOpacity
        key={festivity.id_festival}
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
              {latestFestivities.map((festivity) =>
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
