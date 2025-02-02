import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  Switch,
} from "react-native";
import MainStyles from "../styles/MainStyles";
import BottomNavbar from "../components/BottomNavbar";
import Icon from "react-native-vector-icons/FontAwesome6";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../hooks/AppNavigator";
import { useUser } from "../hooks/UserContext";
import { useTheme } from "../hooks/ThemeContext";

type AccountScreenProps = StackScreenProps<RootStackParamList, "Account">;

const AccountScreen: React.FC<AccountScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Account");
  const { setUser } = useUser();
  const { isDarkMode, toggleTheme } = useTheme();

  const renderButton = (text: string, icon: string, onPress: () => void) => (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={MainStyles.buttonContainerASS}
      >
        <View style={MainStyles.iconTextContainerASS}>
          <Icon 
            name={icon} 
            size={24} 
            color={isDarkMode ? "#fff" : "#000"} 
            style={{ width: 30 }}
          />
          <Text 
            style={[
              MainStyles.buttonTextASS, 
              { color: isDarkMode ? "#fff" : "#000" }
            ]}
          >
            {text}
          </Text>
        </View>
        <Icon 
          name="chevron-right" 
          size={20} 
          color={isDarkMode ? "#666" : "#666"} 
        />
      </TouchableOpacity>
      <View style={MainStyles.separatorASS} />
    </>
  );

  const renderDarkModeToggle = () => (
    <>
      <View style={MainStyles.buttonContainerASS}>
        <View style={MainStyles.iconTextContainerASS}>
          <Icon 
            name="moon" 
            size={24} 
            color={isDarkMode ? "#fff" : "#000"} 
            style={{ width: 30 }}
          />
          <Text 
            style={[
              MainStyles.buttonTextASS, 
              { color: isDarkMode ? "#fff" : "#000" }
            ]}
          >
            Dark Mode
          </Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          thumbColor={isDarkMode ? "#fff" : "#fff"}
          trackColor={{ false: "#ccc", true: "#666" }}
        />
      </View>
      <View style={MainStyles.separatorASS} />
    </>
  );

  return (
    <SafeAreaView style={[MainStyles.safeAreaASS, { backgroundColor: isDarkMode ? "#000" : "#fff" }]}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={[MainStyles.containerASS, { backgroundColor: isDarkMode ? "#000" : "#fff" }]}>
          {/* Header */}
          <View style={MainStyles.headerASS}>
            <TouchableOpacity
              style={MainStyles.backButtonASS}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-left" size={24} color={isDarkMode ? "#fff" : "#000"} />
            </TouchableOpacity>
          </View>

          {/* Title */}
          <Text 
            style={[
              MainStyles.titleTextASS, 
              { 
                color: isDarkMode ? "#fff" : "#000", 
                textAlign: "center",
                fontSize: 24,
                fontWeight: "600"
              }
            ]}
          >
            Settings
          </Text>

          {/* Buttons */}
          {renderButton("Notification", "bell", () => console.log("Navigate to Notification Screen"))}
          {renderButton("Country", "earth-americas", () => console.log("Navigate to Country Screen"))}
          {renderButton("History", "clock-rotate-left", () => navigation.navigate("History"))}
          {renderButton("Terms of Services", "file-lines", () => navigation.navigate("TermsScreen"))}
          {renderButton("Help Center", "circle-question", () => navigation.navigate("HelpCenterScreen"))}
          {renderButton("Profile", "user", () => navigation.navigate("ProfileSettings"))}

          {renderDarkModeToggle()}
          {renderButton("Log Out", "right-from-bracket", () =>
            Alert.alert(
              "Log Out", 
              "Are you sure you want to log out?",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Log Out",
                  onPress: () => {
                    setUser(null);
                    navigation.navigate("Login");
                  },
                  style: "destructive"
                },
              ]
            )
          )}
        </View>
      </ScrollView>

      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default AccountScreen;