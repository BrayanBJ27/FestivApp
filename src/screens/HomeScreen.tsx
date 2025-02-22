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

// Interfaz para festividades
interface Festivity {
  id: number;
  name: string;
  date: string;
  image: any;
  rating?: number;
}

// Listas de festividades
const popularFestivities: Festivity[] = [
  {
    id: 1,
    name: "Carnaval Guaranda",
    date: "March 3rd & 4th",
    rating: 4.9,
    image: require("../assets/images/guranda.jpg"),
  },
  {
    id: 2,
    name: "Diablada Pillareña",
    date: "January 6th",
    rating: 4.8,
    image: require("../assets/images/diablada.jpg"),
  },
  {
    id: 3,
    name: "Mamá Negra",
    date: "November 30th",
    rating: 4.7,
    image: require("../assets/images/mamanegra.jpg"),
  },
];

const otherFestivities: Festivity[] = [
  {
    id: 4,
    name: "Independencia de Quito",
    date: "December 6th",
    rating: 4.5,
    image: require("../assets/images/QUITO.jpg"),
  },
  {
    id: 5,
    name: "Fiestas de Guayaquil",
    date: "November 30th",
    rating: 4.7,
    image: require("../assets/images/guayaquil.jpg"),
  },
  {
    id: 6,
    name: "Fiesta del Sol",
    date: "June 21st",
    rating: 4.3,
    image: require("../assets/images/fiestasol.jpg"),
  },
  {
    id: 7,
    name: "Inti Raymi",
    date: "June 24th",
    rating: 4.8,
    image: require("../assets/images/intiraymi.jpg"),
  },
];

// Función para normalizar textos (quitar tildes y convertir a minúsculas)
const normalizeText = (text: string) => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

const HomeScreen: React.FC = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("Home");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  // Combina ambas listas para la búsqueda
  const allFestivities: Festivity[] = [...popularFestivities, ...otherFestivities];

  // Filtra las festividades ignorando acentos y mayúsculas
  const normalizedSearch = normalizeText(searchQuery);
  const filteredFestivities = allFestivities.filter((festivity) =>
    normalizeText(festivity.name).includes(normalizedSearch)
  );

  // Render para tarjetas de Popular Festivities (horizontal)
  const renderPopularFestivityCard = (
    title: string,
    date: string,
    rating: number | undefined,
    image: any,
    eventId: number
  ) => (
    <TouchableOpacity onPress={() => navigation.navigate("Event", { eventId })}>
      <ImageBackground
        style={MainStyles.popularFestivityADS} // estilo para popular
        source={image}
        resizeMode="cover"
      >
        <Text style={MainStyles.popularFestivityTextADS}>{title}</Text>
        <View style={MainStyles.popularFestivityDetailsHS}>
          <Text style={MainStyles.dateTextHS}>{date}</Text>
          <View style={MainStyles.ratingContainerHS}>
            {rating !== undefined && (
              <Text style={MainStyles.ratingTextHS}>{rating}</Text>
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

  // Render para tarjetas de Other Festivities (vertical, más alargadas)
  const renderOtherFestivityCard = (
    title: string,
    date: string,
    rating: number | undefined,
    image: any,
    eventId: number
  ) => (
    <TouchableOpacity onPress={() => navigation.navigate("Event", { eventId })}>
      <View style={{ marginHorizontal: 5 }}>
        <ImageBackground
          style={MainStyles.otherFestivityADS}
          source={image}
          resizeMode="cover"
        >
          <Text style={MainStyles.popularFestivityTextADS}>{title}</Text>
          <View style={MainStyles.popularFestivityDetailsHS}>
            <Text style={MainStyles.dateTextHSO}>{date}</Text>
            <View style={MainStyles.ratingContainerHSO}>
              {rating !== undefined && (
                <Text style={MainStyles.ratingTextHS}>{rating}</Text>
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
            source={require("../assets/images/oficial_festiapp.png")}
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

        {/* Muestra resultados de búsqueda o las secciones de festividades */}
        {searchQuery ? (
          filteredFestivities.length > 0 ? (
            <View style={{ marginTop: 15, paddingHorizontal: 20 }}>
              {filteredFestivities.map((festivity) => (
                <TouchableOpacity
                  key={festivity.id}
                  onPress={() =>
                    navigation.navigate("Event", { eventId: festivity.id })
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
                    source={festivity.image}
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
                        {festivity.name}
                      </Text>
                      <Text style={{ color: "#ddd", fontSize: 14 }}>
                        {festivity.date}
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
              No existe ningún evento.
            </Text>
          )
        ) : (
          <>
            {/* Popular Festivities (horizontal) */}
            <Text
              style={[
                MainStyles.sectionTitleHS,
                { color: isDarkMode ? "#fff" : "#000" },
              ]}
            >
              Popular festivities
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={MainStyles.horizontalScrollHS}
            >
              {popularFestivities.map((festivity) => (
                <View key={festivity.id} style={{ marginRight: 10 }}>
                  {renderPopularFestivityCard(
                    festivity.name,
                    festivity.date,
                    festivity.rating,
                    festivity.image,
                    festivity.id
                  )}
                </View>
              ))}
            </ScrollView>

            {/* Other Festivities (vertical) */}
            <Text
              style={[
                MainStyles.sectionTitleOtherHS,
                { color: isDarkMode ? "#fff" : "#000" },
              ]}
            >
              Other festivities
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={{ paddingHorizontal: 20 }}
            >
              {otherFestivities.map((festivity) => (
                <View key={festivity.id} style={{ marginBottom: 15 }}>
                  {renderOtherFestivityCard(
                    festivity.name,
                    festivity.date,
                    festivity.rating,
                    festivity.image,
                    festivity.id
                  )}
                </View>
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
