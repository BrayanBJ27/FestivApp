import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../hooks/ThemeContext"; // Importa el ThemeContext
import HelpCenterStyles from "../styles/MainStyles"; // Importa los estilos

const HelpCenterScreen: React.FC = () => {
  const { isDarkMode } = useTheme(); // Obtiene el estado del modo oscuro

  return (
    <View style={[HelpCenterStyles.containerHC, { backgroundColor: isDarkMode ? "#000" : "#fff" }]}>
      <Text style={[HelpCenterStyles.title, { color: isDarkMode ? "#fff" : "#000" }]}>
        Help Center
      </Text>

      <TouchableOpacity
        style={[HelpCenterStyles.buttonHC, { backgroundColor: isDarkMode ? "#444" : "#007AFF" }]}
      >
        <Text style={[HelpCenterStyles.buttonTextHC, { color: isDarkMode ? "#fff" : "#fff" }]}>
          How to use the app?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[HelpCenterStyles.buttonHC, { backgroundColor: isDarkMode ? "#444" : "#007AFF" }]}
      >
        <Text style={[HelpCenterStyles.buttonTextHC, { color: isDarkMode ? "#fff" : "#fff" }]}>
          Developer Contact
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[HelpCenterStyles.buttonHC, { backgroundColor: isDarkMode ? "#444" : "#007AFF" }]}
      >
        <Text style={[HelpCenterStyles.buttonTextHC, { color: isDarkMode ? "#fff" : "#fff" }]}>
          Acknowledgements
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HelpCenterScreen;
