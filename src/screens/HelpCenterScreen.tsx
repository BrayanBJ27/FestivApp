import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const HelpCenterScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Centro de Ayuda</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>¿Cómo usar la app?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Contacto de desarrolladores</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Agradecimientos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  button: {
    padding: 12,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default HelpCenterScreen;
