import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import MainStyles from "../styles/MainStyles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/types";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
type NavigationProp = StackNavigationProp<RootStackParamList>;

const BottomNavbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navigation = useNavigation<NavigationProp>(); // Hook de navegación

  return (
    <View style={MainStyles.bottomNavContainer}>
      <TouchableOpacity style={MainStyles.navButton}
        onPress={() => {
          setActiveTab("Home");
          navigation.navigate("Home"); // Navega a la pantalla Home
        }}>
        <Icon name="house-user" size={24}
          style={
            activeTab === "Home"
              ? MainStyles.activeIcon
              : MainStyles.inactiveIcon
          }/>
        <Text
          style={[
            MainStyles.navText,
            activeTab === "Home"
              ? MainStyles.activeNavText
              : MainStyles.inactiveNavText,
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

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
          style={
            activeTab === "Notification"
              ? MainStyles.activeIcon
              : MainStyles.inactiveIcon
          }
        />
        <Text
          style={[
            MainStyles.navText,
            activeTab === "Notification"
              ? MainStyles.activeNavText
              : MainStyles.inactiveNavText,
          ]}
        >
          Notification
        </Text>
      </TouchableOpacity>

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
          style={
            activeTab === "Map"
              ? MainStyles.activeIcon
              : MainStyles.inactiveIcon
          }
        />
        <Text
          style={[
            MainStyles.navText,
            activeTab === "Map"
              ? MainStyles.activeNavText
              : MainStyles.inactiveNavText,
          ]}
        >
          Map
        </Text>
      </TouchableOpacity>

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
          style={
            activeTab === "Account"
              ? MainStyles.activeIcon
              : MainStyles.inactiveIcon
          }
        />
        <Text
          style={[
            MainStyles.navText,
            activeTab === "Account"
              ? MainStyles.activeNavText
              : MainStyles.inactiveNavText,
          ]}
        >
          Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavbar;
