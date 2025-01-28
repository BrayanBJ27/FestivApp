import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Switch,
} from "react-native";
import MainStyles from "../styles/MainStyles";
import BottomNavbar from "../components/BottomNavbar";
import Icon from "react-native-vector-icons/FontAwesome6";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../hooks/AppNavigator";
import { useUser } from "../hooks/UserContext"; // Contexto del usuario
import { useTheme } from "../hooks/ThemeContext"; // Importa el contexto del tema

type AccountScreenProps = StackScreenProps<RootStackParamList, "Account">;

const AccountScreen: React.FC<AccountScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Account");
  const { setUser } = useUser(); // Obtiene la función para modificar el estado del usuario
  const { isDarkMode, toggleTheme } = useTheme(); // Obtiene el estado del tema y la función para alternarlo

  // Renderiza un botón con ícono, texto y separador
  const renderButton = (text: string, icon: string, onPress: () => void) => (
    <>
      <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
        <View style={styles.iconTextContainer}>
          <Icon name={icon} size={20} color={isDarkMode ? "#fff" : "#000"} />
          <Text style={[styles.buttonText, { color: isDarkMode ? "#fff" : "#000" }]}>{text}</Text>
        </View>
        <Icon name="chevron-right" size={20} color={isDarkMode ? "#fff" : "#000"} />
      </TouchableOpacity>
      <View style={styles.separator} />
    </>
  );

  // Renderiza el interruptor de modo oscuro
  const renderDarkModeToggle = () => (
    <>
      <View style={styles.buttonContainer}>
        <View style={styles.iconTextContainer}>
          <Icon name="moon" size={20} color={isDarkMode ? "#fff" : "#000"} />
          <Text style={[styles.buttonText, { color: isDarkMode ? "#fff" : "#000" }]}>Modo Oscuro</Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          thumbColor={isDarkMode ? "#fff" : "#000"}
          trackColor={{ false: "#ccc", true: "#555" }}
        />
      </View>
      <View style={styles.separator} />
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
          <Text style={[MainStyles.titleTextAS, { color: isDarkMode ? "#fff" : "#000" }]}>
            Settings
          </Text>

          {/* Buttons */}
          {renderButton("Notification", "bell", () => console.log("Navigate to Notification Screen"))}
          {renderButton("Country", "globe", () => console.log("Navigate to Country Screen"))}
          {renderButton("History", "history", () => navigation.navigate("Calendar"))}
          {renderButton("Terms of Services", "file-contract", () =>
            navigation.navigate("TermsScreen") // Navega a TermsScreen
          )}
          {renderButton("Help Center", "question-circle", () =>
            navigation.navigate("HelpCenterScreen") // Navega a HelpCenterScreen
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
                  setUser(null); // Limpia el usuario en el contexto
                  navigation.navigate("Login"); // Redirige a la pantalla de login
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

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    marginLeft: 16,
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 16,
  },
});

export default AccountScreen;
