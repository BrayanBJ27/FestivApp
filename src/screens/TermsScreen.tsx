import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useTheme } from "../hooks/ThemeContext"; // Importa el ThemeContext
import MainStyles from "../styles/MainStyles"; // Importa los estilos

const TermsScreen: React.FC = () => {
  const { isDarkMode } = useTheme(); // Obtiene el estado del modo oscuro

  return (
    <View style={[MainStyles.containerTS, { backgroundColor: isDarkMode ? "#000" : "#fff" }]}>
      <ScrollView contentContainerStyle={MainStyles.scrollContainerTS}>
        {/* Título centrado */}
        <Text style={[MainStyles.title, { color: isDarkMode ? "#fff" : "#000" }]}>
          Terms and Conditions
        </Text>

        {/* Contenido de términos y condiciones */}
        <Text style={[MainStyles.text, { color: isDarkMode ? "#aaa" : "#333" }]}>
          This application was developed by students of the Mobile Devices course
          at the Central University of Ecuador.
        </Text>

        <Text style={[MainStyles.text, { color: isDarkMode ? "#aaa" : "#333" }]}>
          The purpose of this app is to demonstrate skills acquired in
          mobile application development. The data collected is used
          exclusively for educational purposes.
        </Text>

        <Text style={[MainStyles.text, { color: isDarkMode ? "#aaa" : "#333" }]}>
          By using this application, you agree that it is an academic
          and non-commercial project.
        </Text>
      </ScrollView>
    </View>
  );
};

export default TermsScreen;
