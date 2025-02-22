import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import MainStyles from "../styles/MainStyles";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../hooks/UserContext";
import { auth } from "../config/firebase";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithCredential } from "firebase/auth";
import axios from "axios";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { makeRedirectUri } from "expo-auth-session";
import { EXPO_PUBLIC_GOOGLE_CLIENT_ID, EXPO_PUBLIC_FACEBOOK_APP_ID } from "@env";

// Configurar la URL del backend con tu IP local
const BACKEND_URL = "http://192.168.100.11:3000";


export default function LoginScreen() {
  const { setUser } = useUser();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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
