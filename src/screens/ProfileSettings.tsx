import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Icon from "react-native-vector-icons/FontAwesome6";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../hooks/AppNavigator";
import { useTheme } from "../hooks/ThemeContext";
import MainStyles from "../styles/MainStyles";
import axios from "axios";

// URL base de tu backend
const BACKEND_URL = "http://192.168.121.213:3000";

const ProfileSettings: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [newNickname, setNewNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isDarkMode } = useTheme();
  const [userId, setUserId] = useState<string>("");

  // Función para obtener los datos del usuario desde el backend
  const fetchUserData = async (id: string) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/users/${id}`);
      if (response.data.success) {
        const user = response.data.user;
        setNickname(user.name_User);
        setEmail(user.email_User);
        setProfileImage(user.image);
        // Nota: Por seguridad, normalmente no se envía la contraseña, pero si se requiere, adapta según tu lógica.
      } else {
        Alert.alert("Error", "No se pudo cargar la información del usuario");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      Alert.alert("Error", "Error al obtener los datos del usuario");
    }
  };

  // Cargar datos guardados (incluyendo userId) y luego obtener datos del backend
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId);
          await fetchUserData(storedUserId);
        } else {
          console.error("UserId not found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error al cargar los datos de perfil:", error);
      }
    };
    loadProfileData();
  }, []);

  // Función para abrir la cámara o galería y actualizar la imagen de perfil
  const pickImage = async (fromCamera: boolean) => {
    // Solicitar permisos
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
      // Ruta local de la imagen seleccionada
      const imageUri = result.assets[0].uri;
      
      // Convertir a Base64
      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setProfileImage(base64);
      await AsyncStorage.setItem("profileImage", base64);
    }
  };

  // Función para guardar y actualizar los settings en el backend
  const saveSettings = async () => {
    if (!userId) {
      Alert.alert("Error", "No se encontró el ID del usuario.");
      return;
    }
    try {
      const updatedName = newNickname.trim() ? newNickname : nickname;
      
      // Preparamos los datos a actualizar
      const updatedData = {
        name: updatedName,
        email,
        password, 
        image: profileImage, // <-- Enviamos la cadena Base64
      };

      const response = await axios.put(`${BACKEND_URL}/users/update/${userId}`, updatedData);
      if (response.data.success) {
        const updatedUser = response.data.user;
        setNickname(updatedUser.name_User);
        setEmail(updatedUser.email_User);

        // Aquí, el backend ya habrá guardado la imagen en la BD. 
        // updatedUser.image contendrá la cadena Base64 retornada.
        setProfileImage(updatedUser.image);

        Alert.alert("Éxito", "Perfil actualizado correctamente.");
        setNewNickname("");
        navigation.goBack();
      } else {
        Alert.alert("Error", "No se pudo actualizar el perfil.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Ocurrió un error al actualizar el perfil.");
    }
  };

  return (
    <SafeAreaView style={[MainStyles.containerPS, isDarkMode && MainStyles.darkContainerPS]}>
      <ScrollView style={MainStyles.scrollViewPS}>
        <View style={MainStyles.profileHeaderPS}>
          {/* Imagen de perfil con botón de selección */}
          <TouchableOpacity onPress={() => pickImage(false)} style={MainStyles.profileImageContainerPS}>
            <ImageBackground
              source={
                profileImage
                  ? { uri: `data:image/jpeg;base64,${profileImage}` }
                  : require("../assets/images/profile.jpg")
              }
              style={MainStyles.profileImagePS}
            />
            <View style={MainStyles.cameraIconContainerPS}>
              <TouchableOpacity onPress={() => pickImage(true)}>
                <Icon name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <View style={MainStyles.profileInfoPS}>
            <Text style={[MainStyles.profileNamePS, isDarkMode && MainStyles.darkTextPS]}>
              {nickname}
            </Text>
          </View>
        </View>
        <Text style={[MainStyles.labelPS, isDarkMode && MainStyles.darkLabelPS]}>Nick name</Text>
        <View style={[MainStyles.inputContainerPS, isDarkMode && MainStyles.darkInputContainerPS]}>
          <TextInput
            placeholder="Edit Nickname"
            value={newNickname}
            onChangeText={setNewNickname}
            style={[MainStyles.inputPS, isDarkMode && MainStyles.darkInputPS]}
            placeholderTextColor={isDarkMode ? "#bbb" : "#000"}
          />
        </View>

        {/* Email Input */}
        <Text style={[MainStyles.labelPS, isDarkMode && MainStyles.darkLabelPS]}>E-mail address</Text>
        <View style={[MainStyles.inputContainerPS, isDarkMode && MainStyles.darkInputContainerPS]}>
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            style={[MainStyles.inputPS, isDarkMode && MainStyles.darkInputPS]}
            placeholderTextColor={isDarkMode ? "#bbb" : "#000"}
          />
        </View>

        {/* Password Input */}
        <Text style={[MainStyles.labelPS, isDarkMode && MainStyles.darkLabelPS]}>Password</Text>
        <View style={[MainStyles.inputContainerPS, isDarkMode && MainStyles.darkInputContainerPS]}>
          <TextInput
            secureTextEntry={!isPasswordVisible}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            style={[MainStyles.inputPS, isDarkMode && MainStyles.darkInputPS]}
            placeholderTextColor={isDarkMode ? "#bbb" : "#000"}
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon
              name={isPasswordVisible ? "eye-slash" : "eye"}
              size={20}
              color={isDarkMode ? "#bbb" : "#000"}
            />
          </TouchableOpacity>
        </View>
        {/* Save Button */}
        <TouchableOpacity
          style={[MainStyles.saveButtonPS, isDarkMode && MainStyles.darkButtonPS]}
          onPress={saveSettings}
        >
          <Text style={[MainStyles.saveButtonTextPS, isDarkMode && MainStyles.darkButtonTextPS]}>
            Save Settings
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileSettings;
