import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MainStyles from "../styles/MainStyles";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNavbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <View style={MainStyles.bottomNavContainer}>
      <TouchableOpacity
        style={MainStyles.navButton}
        onPress={() => setActiveTab("Home")}
      >
        <Icon
          name="home"
          size={24}
          style={
            activeTab === "Home"
              ? MainStyles.activeIcon
              : MainStyles.inactiveIcon
          }
        />
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
        onPress={() => setActiveTab("Notification")}
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
        onPress={() => setActiveTab("Map")}
      >
        <Icon
          name="map-marker"
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
        onPress={() => setActiveTab("Account")}
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
