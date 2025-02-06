import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, Image, Alert, ImageBackground } from "react-native";
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
const BACKEND_URL = "http://192.168.44.214:3000";

export default function LoginScreen() {
  const { setUser, registeredUsers } = useUser();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Google Auth con redirectUri
  const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    androidClientId: EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    redirectUri: makeRedirectUri({ useProxy: true })
  });

  // Facebook Auth con redirectUri
  const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: EXPO_PUBLIC_FACEBOOK_APP_ID,
    redirectUri: makeRedirectUri({ useProxy: true })
  });

  // Email/Password Sign In
  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa email y contraseña");
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, {
        email,
        password
      });
  
      if (response.data.success) {
        setUser(response.data.user);
        
        // Redirigir según el rol
        if (response.data.user.isAdmin) {
          navigation.navigate("AdminDashboard");
        } else {
          navigation.navigate("Home");
        }
      } else {
        Alert.alert("Error", "Credenciales inválidas");
      }
    } catch (error) {
      Alert.alert(
        "Error de inicio de sesión",
        error.response?.data?.error || 
        "Error al conectar con el servidor. Por favor intenta de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await googlePromptAsync();
      if (result.type === "success") {
        const { id_token } = result.params;
        const credential = GoogleAuthProvider.credential(id_token);
        const userCredential = await signInWithCredential(auth, credential);
        
        // Enviar el token al backend para verificación
        const response = await axios.post(`${BACKEND_URL}/auth/google`, {
          token: id_token,
          email: userCredential.user.email
        });

        if (response.data.success) {
          setUser(response.data.user);
          navigation.navigate("Home");
        } else {
          Alert.alert("Error", response.data.message || "Google sign in failed");
        }
      }
    } catch (error) {
      console.error("Google sign in error:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to sign in with Google"
      );
    } finally {
      setLoading(false);
    }
  };

  // Facebook Sign In
  const handleFacebookSignIn = async () => {
    setLoading(true);
    try {
      const result = await fbPromptAsync();
      if (result.type === "success") {
        const { access_token } = result.params;
        const credential = FacebookAuthProvider.credential(access_token);
        const userCredential = await signInWithCredential(auth, credential);
        
        // Enviar el token al backend para verificación
        const response = await axios.post(`${BACKEND_URL}/auth/facebook`, {
          token: access_token,
          email: userCredential.user.email
        });

        if (response.data.success) {
          setUser(response.data.user);
          navigation.navigate("Home");
        } else {
          Alert.alert("Error", response.data.message || "Facebook sign in failed");
        }
      }
    } catch (error) {
      console.error("Facebook sign in error:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to sign in with Facebook"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView scrollEnabled={true} contentInsetAdjustmentBehavior="automatic">
        <View style={MainStyles.mainContainer}>
          {/* Logo */}
          <View style={MainStyles.logoContainer}>
            <Image
              source={require("../assets/images/oficial_festiapp.png")}
              style={MainStyles.logoIcon}
            />
          </View>

          <Text style={MainStyles.titleL}>Log in FestivApp</Text>

          {/* Email Input */}
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

          {/* Password Input */}
          <View style={MainStyles.inputContainer}>
            <Icon name="key" size={20} color="#adadad" style={MainStyles.inputIcon} />
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
              <Icon
                name={isPasswordVisible ? "eye" : "eye-slash"}
                size={20}
                color="#adadad"
              />
            </TouchableOpacity>
          </View>

          {/* Sign In Buttons */}
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

          {/* Social Login Buttons */}
          <View style={MainStyles.socialLoginContainer}>
            {/* Apple Button */}
            <TouchableOpacity 
              style={[MainStyles.appleButton, loading && { opacity: 0.7 }]}
              disabled={loading}
            >
              <Icon name="apple" size={20} color="#fff" style={MainStyles.buttonIcon} />
              <Text style={MainStyles.buttonTextCwA}>Continue with Apple</Text>
            </TouchableOpacity>

            {/* Facebook Button */}
            <TouchableOpacity 
              style={[MainStyles.facebookButton, loading && { opacity: 0.7 }]}
              onPress={handleFacebookSignIn}
              disabled={loading}
            >
              <Icon name="facebook" size={20} color="#fff" style={MainStyles.buttonIcon} />
              <Text style={MainStyles.buttonTextCwF}>Continue with Facebook</Text>
            </TouchableOpacity>

            {/* Google Button */}
            <TouchableOpacity 
              style={[MainStyles.googleButton, loading && { opacity: 0.7 }]}
              onPress={handleGoogleSignIn}
              disabled={loading}
            >
              <ImageBackground
                style={MainStyles.buttonIcon}
                source={require('../assets/images/google-icon.png')}
              />
              <Text style={MainStyles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}