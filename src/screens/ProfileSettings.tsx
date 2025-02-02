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
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker"; // Para tomar fotos y subir imágenes
import Icon from "react-native-vector-icons/FontAwesome6";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../hooks/AppNavigator";
import { useTheme } from "../hooks/ThemeContext";
import MainStyles from '../styles/MainStyles';

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
    <SafeAreaView style={[MainStyles.containerPS, isDarkMode && MainStyles.darkContainerPS]}>
      <ScrollView style={MainStyles.scrollViewPS}>
        <View style={MainStyles.profileHeaderPS}>
          {/* Imagen de perfil con botón de selección */}
          <TouchableOpacity onPress={() => pickImage(false)} style={MainStyles.profileImageContainerPS}>
            <ImageBackground
              source={profileImage ? { uri: profileImage } : { uri: "https://i.imgur.com/1tMFzp8.png" }}
              style={MainStyles.profileImagePS}
            />
            <View style={MainStyles.cameraIconContainerPS}>
              <TouchableOpacity onPress={() => pickImage(true)}>
                <Icon name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <View style={MainStyles.profileInfoPS}>
            <Text style={[MainStyles.profileNamePS, isDarkMode && MainStyles.darkTextPS]}>{nickname}</Text>
          </View>
        </View>

        {/* Nickname Input */}
        <Text style={[MainStyles.labelPS, isDarkMode && MainStyles.darkTextPS]}>Nick name</Text>
        <View style={[MainStyles.inputContainerPS, isDarkMode && MainStyles.darkInputContainerPS]}>
          <TextInput
            placeholder="Edit Nickname"
            value={newNickname}
            onChangeText={setNewNickname}
            style={[MainStyles.inputPS, isDarkMode && MainStyles.darkTextPS]}
            placeholderTextColor={isDarkMode ? "#bbb" : "#000"}
          />
        </View>

        {/* Email Input */}
        <Text style={[MainStyles.labelPS, isDarkMode && MainStyles.darkTextPS]}>E-mail address</Text>
        <View style={[MainStyles.inputContainerPS, isDarkMode && MainStyles.darkInputContainerPS]}>
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            style={[MainStyles.inputPS, isDarkMode && MainStyles.darkTextPS]}
            placeholderTextColor={isDarkMode ? "#bbb" : "#000"}
          />
        </View>

        {/* Password Input */}
        <Text style={[MainStyles.labelPS, isDarkMode && MainStyles.darkTextPS]}>Password</Text>
        <View style={[MainStyles.inputContainerPS, isDarkMode && MainStyles.darkInputContainerPS]}>
          <TextInput
            secureTextEntry={!isPasswordVisible}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            style={[MainStyles.inputPS, isDarkMode && MainStyles.darkTextPS]}
            placeholderTextColor={isDarkMode ? "#bbb" : "#000"}
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon name={isPasswordVisible ? "eye-slash" : "eye"} size={20} color={isDarkMode ? "#bbb" : "#000"} />
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={[MainStyles.saveButtonPS, isDarkMode && MainStyles.darkButtonPS]} onPress={saveSettings}>
          <Text style={[MainStyles.saveButtonTextPS, isDarkMode && MainStyles.darkButtonTextPS]}>Save Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileSettings;
