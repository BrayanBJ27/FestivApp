import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome6";
import MainStyles from "../styles/MainStyles";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../hooks/UserContext";
import axios from "axios";
import * as Notifications from "expo-notifications";
import { auth } from "../config/firebase";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithCredential } from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { makeRedirectUri } from "expo-auth-session";
import { EXPO_PUBLIC_GOOGLE_CLIENT_ID, EXPO_PUBLIC_FACEBOOK_APP_ID } from "@env";

// Configurar la URL del backend con tu IP local
const BACKEND_URL = "http://192.168.121.213:3000";

export default function LoginScreen() {
  const { setUser } = useUser();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Solicitar permisos y registrar el device token
  const registerForPushNotificationsAsync = async (userId = null) => {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        console.log("Failed to get push notification permissions");
        return;
      }
      
      // Obtener el token sin pasar projectId (Managed Workflow)
      const tokenResponse = await Notifications.getExpoPushTokenAsync();
      const token = tokenResponse.data;
      console.log("Push token:", token);
      
      // Guardar el token en AsyncStorage
      await AsyncStorage.setItem("devicePushToken", token);
      
      // Obtener el userId almacenado (si ya existe)
      const storedUserId = await AsyncStorage.getItem("userId");
      console.log(`Registering token with backend for user: ${userId || storedUserId || "anonymous"}`);
      
      // Probar la conexión al backend
      console.log(`Testing connection to: ${BACKEND_URL}`);
      await axios.get(`${BACKEND_URL}/health`, { timeout: 5000 });
      console.log("Backend connection test successful");
      
      // Realizar la solicitud principal
      const response = await axios.post(
        `${BACKEND_URL}/devices/register`,
        { token, userId: userId || storedUserId },
        { timeout: 30000 }
      );
      
      console.log("Token registration response:", response.data);
      return token;
    } catch (error) {
      console.error("Error registering for push notifications:", error);
      if (error.response) {
        console.error("Response error data:", error.response.data);
        console.error("Response error status:", error.response.status);
      } else if (error.request) {
        console.error("No response received:", error.request);
      }
      Alert.alert(
        "Notification Setup Issue",
        `Could not register for push notifications: ${error.message}. Please check your network connection.`,
        [{ text: "OK" }]
      );
      return null;
    }
  };  
  
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  // Google Auth con redirectUri
  const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    androidClientId: EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    redirectUri: makeRedirectUri({ useProxy: true }),
  });

  // Facebook Auth con redirectUri
  const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: EXPO_PUBLIC_FACEBOOK_APP_ID,
    redirectUri: makeRedirectUri({ useProxy: true }),
  });

  // Función para inicio de sesión con email/password
  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa email y contraseña");
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, { email, password });
  
      if (response.data.success) {
        // Guardar el userId en AsyncStorage
        await AsyncStorage.setItem("userId", response.data.user.id.toString());
        
        // Register push notification with user ID
        await registerForPushNotificationsAsync(response.data.user.id.toString());
        
        setUser(response.data.user);
        navigation.navigate(response.data.user.isAdmin ? "AdminDashboard" : "Home");
      } else {
        Alert.alert("Error", "Credenciales inválidas");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el servidor. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <ScrollView contentContainerStyle={MainStyles.scrollContainer}>
        <View style={MainStyles.mainContainerSIS}>
          <View style={MainStyles.logoContainer}>
            <Image
              source={require("../assets/images/oficial_festiapp.png")}
              style={MainStyles.logoIcon}
            />
          </View>

          <Text style={MainStyles.titleL}>Log in FestivApp</Text>

          {/* Input de Email */}
          <View style={MainStyles.inputContainer}>
            <Icon name="envelope" size={20} color="#adadad" style={MainStyles.inputIcon} />
            <TextInput
              style={MainStyles.textInput}
              placeholder="Enter e-mail address"
              placeholderTextColor="#adadad"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          {/* Input de Contraseña */}
          <View style={MainStyles.inputContainer}>
            <Icon name="lock" size={20} color="#adadad" style={MainStyles.inputIcon} />
            <TextInput
              style={MainStyles.textInput}
              placeholder="Enter password"
              placeholderTextColor="#adadad"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              editable={!loading}
            />
            <TouchableOpacity
              style={MainStyles.eyeIconContainer}
              onPress={() => setPasswordVisible(!isPasswordVisible)}
              disabled={loading}
            >
              <Icon name={isPasswordVisible ? "eye" : "eye-slash"} size={20} color="#adadad" />
            </TouchableOpacity>
          </View>

          {/* Botones de Inicio de Sesión */}
          <View style={MainStyles.buttonRow}>
            <TouchableOpacity
              style={[MainStyles.continueSIButton, loading && { opacity: 0.7 }]}
              onPress={handleSignIn}
              disabled={loading}
            >
              <Text style={MainStyles.continueText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[MainStyles.continueSIButton, { backgroundColor: "#00BFFF" }, loading && { opacity: 0.7 }]}
              onPress={() => navigation.navigate("SignUp")}
              disabled={loading}
            >
              <Text style={MainStyles.continueText}>Create</Text>
            </TouchableOpacity>
          </View>

          {/* Botones de Redes Sociales */}
          <View style={MainStyles.socialLoginContainer}>
            <TouchableOpacity style={[MainStyles.appleButton, loading && { opacity: 0.7 }]} disabled={loading}>
              <Icon name="apple" size={20} color="#fff" style={MainStyles.buttonIcon} />
              <Text style={MainStyles.buttonTextCwA}>Continue with Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[MainStyles.facebookButton, loading && { opacity: 0.7 }]}
              onPress={() => fbPromptAsync()}
              disabled={loading}
            >
              <Icon name="facebook" size={20} color="#fff" style={MainStyles.buttonIcon} />
              <Text style={MainStyles.buttonTextCwF}>Continue with Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[MainStyles.googleButton, loading && { opacity: 0.7 }]}
              onPress={() => googlePromptAsync()}
              disabled={loading}
            >
              <Image source={require("../assets/images/google-icon.png")} style={MainStyles.buttonIcon} />
              <Text style={MainStyles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
  );
}
