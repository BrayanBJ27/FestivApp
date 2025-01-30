import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/types";
import BottomNavbar from "../components/BottomNavbar";
import MainStyles from "../styles/MainStyles";
import { useTheme } from "../hooks/ThemeContext";

// Definir interfaz para las festividades
interface Festivity {
  id: number;
  name: string;
  date: string;
  image: any;
  rating?: number; 
}

// Lista de festividades separadas
const popularFestivities: Festivity[] = [
  { id: 1, name: "Carnaval Guaranda", date: "March 3rd & 4th", rating: 4.9, image: require("../assets/images/guranda.jpg") },
  { id: 2, name: "Diablada Pillareña", date: "January 6th", rating: 4.8, image: require("../assets/images/diablada.jpg") },
  { id: 3, name: "Mamá Negra", date: "November 30th", rating: 4.7, image: require("../assets/images/mamanegra.jpg") },
];

const otherFestivities: Festivity[] = [
  { id: 4, name: "Independencia de Quito", date: "December 6th", image: require("../assets/images/QUITO.jpg") },
  { id: 5, name: "Fiestas de Guayaquil", date: "November 30th", image: require("../assets/images/guayaquil.jpg") },
  { id: 6, name: "Fiesta del Sol", date: "June 21st", image: require("../assets/images/fiestasol.jpg") },
  { id: 7, name: "Inti Raymi", date: "June 24th", image: require("../assets/images/intiraymi.jpg") },
];

// Función para normalizar texto 
const normalizeText = (text: string) => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

const HomeScreen: React.FC = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("Home");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  // Combinar todas las festividades en una sola lista para la búsqueda
  const allFestivities: Festivity[] = [...popularFestivities, ...otherFestivities];

  // Filtrar festividades ignorando tildes y mayúsculas
  const normalizedSearch = normalizeText(searchQuery);
  const filteredFestivities = allFestivities.filter(festivity =>
    normalizeText(festivity.name).includes(normalizedSearch)
  );

  return (
    <SafeAreaView style={[{ backgroundColor: isDarkMode ? "#000" : "#fff" }, { flex: 1 }]}>
      <View style={[MainStyles.containerHS, { backgroundColor: isDarkMode ? "#000" : "#fff" }]}>

        {/* Header */}
        <View style={MainStyles.headerContainerHS}>
          <Text style={[MainStyles.headerTextHS, { color: isDarkMode ? "#fff" : "#000" }]}>
            Find your next trip and discover more about Ecuador
          </Text>
          <ImageBackground style={MainStyles.headerImageHS} source={require("../assets/images/oficial_festiapp.png")} />
        </View>

        <Text style={[MainStyles.titleTextHS, { color: isDarkMode ? "#fff" : "#000" }]}>
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
            <Icon name="magnifying-glass" size={18} color="#aaa" style={{ marginRight: 10 }} />
            <TextInput
              style={{
                flex: 1,
                color: "#000",
                fontSize: 16,
              }}
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
              marginLeft: 10,
            }}
          >
            <Icon name="sliders" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Si hay búsqueda, solo muestra los eventos filtrados */}
        {searchQuery ? (
          filteredFestivities.length > 0 ? (
            <View style={{ marginTop: 15, paddingHorizontal: 20 }}>
              {filteredFestivities.map((festivity) => (
                <TouchableOpacity
                  key={festivity.id}
                  onPress={() => navigation.navigate("Event", { eventId: festivity.id })}
                  style={{ marginBottom: 15 }} // Espacio entre eventos
                >
                  <ImageBackground
                    style={{
                      width: "100%",
                      height: 150,
                      borderRadius: 10,
                      overflow: "hidden",
                    }}
                    source={festivity.image}
                    resizeMode="cover"
                  >
                    <View style={{ padding: 10, backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 10 }}>
                      <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                        {festivity.name}
                      </Text>
                      <Text style={{ color: "#ddd", fontSize: 14 }}>{festivity.date}</Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text style={{ textAlign: "center", color: isDarkMode ? "#fff" : "#000", marginTop: 20 }}>
              No existe ningún evento.
            </Text>
          )
        ) : (
          <>
            {/* Popular Festivities */}
            <Text style={[MainStyles.sectionTitleHS, { color: isDarkMode ? "#fff" : "#000" }]}>
              Popular festivities
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={MainStyles.horizontalScrollHS}>
              {popularFestivities.map((festivity) => (
                <TouchableOpacity key={festivity.id} onPress={() => navigation.navigate("Event", { eventId: festivity.id })}>
                  <ImageBackground style={MainStyles.popularFestivityHS} source={festivity.image} resizeMode="cover">
                    <Text style={MainStyles.popularFestivityTextHS}>{festivity.name}</Text>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Other Festivities */}
            <Text style={[MainStyles.sectionTitleOtherHS, { color: isDarkMode ? "#fff" : "#000" }]}>
              Other festivities
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={MainStyles.horizontalScrollHS}>
              {otherFestivities.map((festivity) => (
                <TouchableOpacity key={festivity.id} onPress={() => navigation.navigate("Event", { eventId: festivity.id })}>
                  <ImageBackground style={MainStyles.otherFestivityHS} source={festivity.image} resizeMode="cover">
                    <Text style={MainStyles.otherFestivityTitleHS}>{festivity.name}</Text>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}
      </View>

      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default HomeScreen;
