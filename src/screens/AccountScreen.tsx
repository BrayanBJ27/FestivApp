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
import AccountStyles from "../styles/MainStyles"; // Importa estilos separados
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

  // Renderiza un botón con ícono, texto y separador
  const renderButton = (text: string, icon: string, onPress: () => void) => (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={AccountStyles.buttonContainer}
      >
        <View style={AccountStyles.iconTextContainer}>
          <Icon name={icon} size={20} color={isDarkMode ? "#fff" : "#000"} />
          <Text style={[AccountStyles.buttonText, { color: isDarkMode ? "#fff" : "#000" }]}>
            {text}
          </Text>
        </View>
        <Icon name="chevron-right" size={20} color={isDarkMode ? "#fff" : "#000"} />
      </TouchableOpacity>
      <View style={AccountStyles.separator} />
    </>
  );

  // Renderiza el interruptor de modo oscuro
  const renderDarkModeToggle = () => (
    <>
      <View style={AccountStyles.buttonContainer}>
        <View style={AccountStyles.iconTextContainer}>
          <Icon name="moon" size={20} color={isDarkMode ? "#fff" : "#000"} />
          <Text style={[AccountStyles.buttonText, { color: isDarkMode ? "#fff" : "#000" }]}>
            Dark Mode
          </Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          thumbColor={isDarkMode ? "#fff" : "#000"}
          trackColor={{ false: "#ccc", true: "#555" }}
        />
      </View>
      <View style={AccountStyles.separator} />
    </>
  );

  return (
    <SafeAreaView style={{ backgroundColor: isDarkMode ? "#000" : "#fff", flex: 1 }}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={[MainStyles.containerAS, { backgroundColor: isDarkMode ? "#000" : "#fff" }]}>
          {/* Header */}
          <View style={MainStyles.headerAS}>
            <TouchableOpacity
              style={MainStyles.backButtonAS}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-left" size={20} color={isDarkMode ? "#fff" : "#000"} />
            </TouchableOpacity>
          </View>

          {/* Title */}
          <Text style={[MainStyles.titleTextAS, { color: isDarkMode ? "#fff" : "#000", textAlign: "center" }]}>
            Settings
          </Text>

          {/* Buttons */}
          {renderButton("Notification", "bell", () => console.log("Navigate to Notification Screen"))}
          {renderButton("Country", "globe", () => console.log("Navigate to Country Screen"))}
          {renderButton("History", "history", () => navigation.navigate("History"))         }
          {renderButton("Terms of Services", "file-contract", () =>
            navigation.navigate("TermsScreen")
          )}
          {renderButton("Help Center", "question-circle", () =>
            navigation.navigate("HelpCenterScreen")
          )}
          {renderButton("Profile", "user", () =>
            console.log("Navigate to Profile Screen")
          )}
          {renderDarkModeToggle()}
          {renderButton("Log Out", "", () =>
            Alert.alert("Salir", "¿Estás seguro de que quieres cerrar sesión?", [
              { text: "No", onPress: () => console.log("Acción cancelada"), style: "cancel" },
              {
                text: "Sí",
                onPress: () => {
                  setUser(null);
                  navigation.navigate("Login");
                },
              },
            ])
          )}
        </View>
      </ScrollView>

      {/* Footer Navigation */}
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default AccountScreen;
