import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker"; // Para tomar fotos y subir imágenes
import Icon from "react-native-vector-icons/FontAwesome6";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../hooks/AppNavigator";
import { useTheme } from "../hooks/ThemeContext";

const ProfileSettings: React.FC = () => {
  const [nickname, setNickname] = useState("Brayan Davila");
  const [newNickname, setNewNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isDarkMode } = useTheme();

  // Cargar datos guardados en AsyncStorage
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const savedNickname = await AsyncStorage.getItem("nickname");
        const savedProfileImage = await AsyncStorage.getItem("profileImage");

        if (savedNickname) setNickname(savedNickname);
        if (savedProfileImage) setProfileImage(savedProfileImage);
      } catch (error) {
        console.error("Error al cargar los datos de perfil:", error);
      }
    };
    loadProfileData();
  }, []);

  // Guardar nickname y regresar a ScheduleScreen
  const saveSettings = async () => {
    if (newNickname) {
      try {
        await AsyncStorage.setItem("nickname", newNickname);
        setNickname(newNickname);
        setNewNickname(""); // Limpiar input después de guardar
        navigation.goBack(); // Regresar para actualizar
      } catch (error) {
        console.error("Error al guardar el nickname:", error);
      }
    }
  };

  // Función para abrir la cámara o galería y actualizar la imagen de perfil
  const pickImage = async (fromCamera: boolean) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso requerido", "Necesitas otorgar acceso a la galería y cámara.");
      return;
    }

    let result;
    if (fromCamera) {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
    }

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setProfileImage(imageUri);
      await AsyncStorage.setItem("profileImage", imageUri);
    }
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileHeader}>
          {/* Imagen de perfil con botón de selección */}
          <TouchableOpacity onPress={() => pickImage(false)} style={styles.profileImageContainer}>
            <Image
              source={profileImage ? { uri: profileImage } : { uri: "https://i.imgur.com/1tMFzp8.png" }}
              style={styles.profileImage}
            />
            <View style={styles.cameraIconContainer}>
              <TouchableOpacity onPress={() => pickImage(true)}>
                <Icon name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, isDarkMode && styles.darkText]}>{nickname}</Text>
          </View>
        </View>

        {/* Nickname Input */}
        <Text style={[styles.label, isDarkMode && styles.darkText]}>Nick name</Text>
        <View style={[styles.inputContainer, isDarkMode && styles.darkInputContainer]}>
          <TextInput
            placeholder="Edit Nickname"
            value={newNickname}
            onChangeText={setNewNickname}
            style={[styles.input, isDarkMode && styles.darkText]}
            placeholderTextColor={isDarkMode ? "#bbb" : "#000"}
          />
        </View>

        {/* Email Input */}
        <Text style={[styles.label, isDarkMode && styles.darkText]}>E-mail address</Text>
        <View style={[styles.inputContainer, isDarkMode && styles.darkInputContainer]}>
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            style={[styles.input, isDarkMode && styles.darkText]}
            placeholderTextColor={isDarkMode ? "#bbb" : "#000"}
          />
        </View>

        {/* Password Input */}
        <Text style={[styles.label, isDarkMode && styles.darkText]}>Password</Text>
        <View style={[styles.inputContainer, isDarkMode && styles.darkInputContainer]}>
          <TextInput
            secureTextEntry={!isPasswordVisible}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            style={[styles.input, isDarkMode && styles.darkText]}
            placeholderTextColor={isDarkMode ? "#bbb" : "#000"}
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon name={isPasswordVisible ? "eye-slash" : "eye"} size={20} color={isDarkMode ? "#bbb" : "#000"} />
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={[styles.saveButton, isDarkMode && styles.darkButton]} onPress={saveSettings}>
          <Text style={[styles.saveButtonText, isDarkMode && styles.darkButtonText]}>Save Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  darkContainer: { backgroundColor: "#000" },
  scrollView: { padding: 20 },
  profileHeader: { flexDirection: "column", alignItems: "center", marginBottom: 20 },
  profileImageContainer: { position: "relative", alignItems: "center", justifyContent: "center" },
  profileImage: { width: 100, height: 100, borderRadius: 50, resizeMode: "cover" },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#000",
    borderRadius: 15,
    padding: 5,
  },
  profileInfo: { marginTop: 10, alignItems: "center" },
  profileName: { fontSize: 20, fontWeight: "bold", color: "#000" },
  darkText: { color: "#fff" },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5, color: "#333" },
  inputContainer: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#ddd", borderRadius: 10, paddingHorizontal: 15, paddingVertical: 10, marginBottom: 15 },
  darkInputContainer: { borderColor: "#555", backgroundColor: "#222" },
  input: { flex: 1, fontSize: 16, color: "#000" },
  saveButton: { backgroundColor: "#28a745", padding: 15, borderRadius: 10, alignItems: "center" },
  darkButton: { backgroundColor: "#444" },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  darkButtonText: { color: "#ddd" },
});

export default ProfileSettings;
