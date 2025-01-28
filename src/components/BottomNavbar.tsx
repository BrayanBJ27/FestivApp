import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import MainStyles from "../styles/MainStyles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/types";
import { useTheme } from "../hooks/ThemeContext"; // Importa el contexto de tema

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
type NavigationProp = StackNavigationProp<RootStackParamList>;

const BottomNavbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navigation = useNavigation<NavigationProp>(); // Hook de navegación
  const { isDarkMode } = useTheme(); // Obtiene el estado del tema

  return (
    <View
      style={[
        MainStyles.bottomNavContainer,
        { backgroundColor: isDarkMode ? "#000" : "#fff" }, // Fondo cambia según el modo oscuro
      ]}
    >
      {/* Home */}
      <TouchableOpacity
        style={MainStyles.navButton}
        onPress={() => {
          setActiveTab("Home");
          navigation.navigate("Home");
        }}
      >
        <Icon
          name="house-user"
          size={24}
          color={activeTab === "Home" ? (isDarkMode ? "#fff" : "#007AFF") : "#bcbcbc"}
        />
        <Text
          style={{
            color: activeTab === "Home" ? (isDarkMode ? "#fff" : "#007AFF") : "#bcbcbc",
          }}
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* Notification */}
      <TouchableOpacity
        style={MainStyles.navButton}
        onPress={() => {
          setActiveTab("Notification");
          navigation.navigate("Notification");
        }}
      >
        <Icon
          name="bell"
          size={24}
          color={activeTab === "Notification" ? (isDarkMode ? "#fff" : "#007AFF") : "#bcbcbc"}
        />
        <Text
          style={{
            color: activeTab === "Notification" ? (isDarkMode ? "#fff" : "#007AFF") : "#bcbcbc",
          }}
        >
          Notification
        </Text>
      </TouchableOpacity>

      {/* Map */}
      <TouchableOpacity
        style={MainStyles.navButton}
        onPress={() => {
          setActiveTab("Map");
          navigation.navigate("Map");
        }}
      >
        <Icon
          name="map-location-dot"
          size={24}
          color={activeTab === "Map" ? (isDarkMode ? "#fff" : "#007AFF") : "#bcbcbc"}
        />
        <Text
          style={{
            color: activeTab === "Map" ? (isDarkMode ? "#fff" : "#007AFF") : "#bcbcbc",
          }}
        >
          Map
        </Text>
      </TouchableOpacity>

      {/* Account */}
      <TouchableOpacity
        style={MainStyles.navButton}
        onPress={() => {
          setActiveTab("Account");
          navigation.navigate("Account");
        }}
      >
        <Icon
          name="user"
          size={24}
          color={activeTab === "Account" ? (isDarkMode ? "#fff" : "#007AFF") : "#bcbcbc"}
        />
        <Text
          style={{
            color: activeTab === "Account" ? (isDarkMode ? "#fff" : "#007AFF") : "#bcbcbc",
          }}
        >
          Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavbar;
