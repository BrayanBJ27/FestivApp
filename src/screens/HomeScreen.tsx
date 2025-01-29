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
import { useTheme } from "../hooks/ThemeContext"; // Importa el contexto del tema

const HomeScreen: React.FC = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("Home");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isDarkMode } = useTheme(); // Accede al estado del modo oscuro

  return (
    <SafeAreaView
      style={[
        { backgroundColor: isDarkMode ? "#000" : "#fff" },
        { flex: 1 },
      ]}
    >
      <ScrollView contentInsetAdjustmentBehavior="automatic">
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
              style={[
                MainStyles.searchBoxHS,
                {
                  backgroundColor: isDarkMode ? "#333" : "#f5f5f5",
                  borderColor: isDarkMode ? "#555" : "#ccc",
                },
              ]}
            >
              <Icon
                name="magnifying-glass"
                size={20}
                color={isDarkMode ? "#bbb" : "#adadad"}
                style={MainStyles.inputIcon}
              />
              <TextInput
                style={[
                  MainStyles.textInputHS,
                  { color: isDarkMode ? "#fff" : "#000" },
                ]}
                placeholder="Search..."
                placeholderTextColor={isDarkMode ? "#555" : "#adadad"}
              />
            </View>
            <TouchableOpacity
              style={[
                MainStyles.filterButtonHS,
                { backgroundColor: isDarkMode ? "#555" : "#007AFF" },
              ]}
            >
              <Icon name="sliders" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Popular Festivities */}
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
            {/* Carnaval Guaranda */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Event", { eventId: 1 })}
            >
              <ImageBackground
                style={MainStyles.popularFestivityHS}
                source={require("../assets/images/guranda.jpg")}
                resizeMode="cover"
              >
                <Text style={MainStyles.popularFestivityTextHS}>
                  Carnaval Guaranda
                </Text>
                <View style={MainStyles.popularFestivityDetailsHS}>
                  <Text style={MainStyles.dateTextHS}>March 3rd & 4th</Text>
                  <View style={MainStyles.ratingContainerHS}>
                    <Text style={MainStyles.ratingTextHS}>4.9</Text>
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

            {/* Diablada Pillareña */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Event", { eventId: 2 })}
            >
              <ImageBackground
                style={MainStyles.popularFestivityHS}
                source={require("../assets/images/diablada.jpg")}
                resizeMode="cover"
              >
                <Text style={MainStyles.popularFestivityTextHS}>
                  Diablada Pillareña
                </Text>
                <View style={MainStyles.popularFestivityDetailsHS}>
                  <Text style={MainStyles.dateTextHS}>January 6th</Text>
                  <View style={MainStyles.ratingContainerHS}>
                    <Text style={MainStyles.ratingTextHS}>4.8</Text>
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

            {/* Mama Negra */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Event", { eventId: 3 })}
            >
              <ImageBackground
                style={MainStyles.popularFestivityHS}
                source={require("../assets/images/mamanegra.jpg")}
                resizeMode="cover"
              >
                <Text style={MainStyles.popularFestivityTextHS}>
                  Mama Negra
                </Text>
                <View style={MainStyles.popularFestivityDetailsHS}>
                  <Text style={MainStyles.dateTextHS}>November 30th</Text>
                  <View style={MainStyles.ratingContainerHS}>
                    <Text style={MainStyles.ratingTextHS}>4.7</Text>
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
          </ScrollView>

          {/* Other Festivities */}
          <Text style={[MainStyles.sectionTitleOtherHS, { color: isDarkMode ? "#fff" : "#000" },]}>
            Other festivities
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={MainStyles.horizontalScrollHS}
          >
            {/* Independencia de Quito */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Event", { eventId: 5 })}
            >
              <ImageBackground
                style={MainStyles.otherFestivityHS}
                source={require("../assets/images/QUITO.jpg")}
                resizeMode="cover"
              >
                <Text style={MainStyles.otherFestivityTitleHS}>
                  Independencia de Quito
                </Text>
                <Text style={MainStyles.otherFestivityDateHS}>
                  December 6th
                </Text>
              </ImageBackground>
            </TouchableOpacity>

            {/* Fiestas de Guayaquil */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Event", { eventId: 6 })}
            >
              <ImageBackground
                style={MainStyles.otherFestivityHS}
                source={require("../assets/images/guayaquil.jpg")}
                resizeMode="cover"
              >
                <Text style={MainStyles.otherFestivityTitleHS}>
                  Fiestas de Guayaquil
                </Text>
                <Text style={MainStyles.otherFestivityDateHS}>
                  November 30th
                </Text>
              </ImageBackground>
            </TouchableOpacity>

            {/* Fiesta del Sol */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Event", { eventId: 7 })}
            >
              <ImageBackground
                style={MainStyles.otherFestivityHS}
                source={require("../assets/images/fiestasol.jpg")}
                resizeMode="cover"
              >
                <Text style={MainStyles.otherFestivityTitleHS}>
                  Fiesta del Sol
                </Text>
                <Text style={MainStyles.otherFestivityDateHS}>
                  June 21st
                </Text>
              </ImageBackground>
            </TouchableOpacity>

            {/* Inti Raymi */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Event", { eventId: 8 })}
            >
              <ImageBackground
                style={MainStyles.otherFestivityHS}
                source={require("../assets/images/intiraymi.jpg")}
                resizeMode="cover"
              >
                <Text style={MainStyles.otherFestivityTitleHS}>
                  Inti Raymi
                </Text>
                <Text style={MainStyles.otherFestivityDateHS}>
                  June 24th
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default HomeScreen;
