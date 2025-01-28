import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "../hooks/ThemeContext"; // Importa el ThemeContext

const TermsScreen: React.FC = () => {
  const { isDarkMode } = useTheme(); // Obtiene el estado del modo oscuro

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#000" : "#fff" }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Título centrado */}
        <Text style={[styles.title, { color: isDarkMode ? "#fff" : "#000", textAlign: "center" }]}>
          Terms and Conditions
        </Text>

        {/* Contenido de términos y condiciones */}
        <Text style={[styles.text, { color: isDarkMode ? "#aaa" : "#333" }]}>
          This application was developed by students of the Mobile Devices course
          at the Central University of Ecuador.
        </Text>

        <Text style={[styles.text, { color: isDarkMode ? "#aaa" : "#333" }]}>
          The purpose of this app is to demonstrate skills acquired in
          mobile application development. The data collected is used
          exclusively for educational purposes.
        </Text>

        <Text style={[styles.text, { color: isDarkMode ? "#aaa" : "#333" }]}>
          By using this application, you agree that it is an academic
          and non-commercial project.
        </Text>
      </ScrollView>
    </View>
  );
};

// 📌 **Estilos **
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
});

export default TermsScreen;
