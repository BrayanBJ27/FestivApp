import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import MainStyles from "../styles/MainStyles";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../hooks/UserContext";
import axios from "axios";

// Configure backend URL with your local IP
const BACKEND_URL = "http://192.168.100.11:3000";

export default function SignUpScreen() {
  const { setUser } = useUser();
  const navigation = useNavigation();
  const isPasswordMatch = () => password === repeatPassword;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isRepeatPasswordVisible, setRepeatPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!username || !email || !password || !repeatPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (password !== repeatPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/register`, {
        name: username,
        email,
        password,
      });

      if (response.data.success) {
        Alert.alert("Success", "Account created successfully!");
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", response.data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Alert.alert("Error", "Could not connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={MainStyles.scrollContainer}>
      <View style={MainStyles.mainContainer}>
        {/* Logo */}
        <View style={MainStyles.logoContainer}>
          <Image
            source={require("../assets/images/oficial_festiapp.png")}
            style={MainStyles.logoIcon}
          />
        </View>

        <Text style={MainStyles.signUpTitle}>Sign up FestivApp</Text>
        
        {/* Nickname Input */}
        <View style={MainStyles.inputContainer}>
          <Icon name="id-card-clip" size={20} color="#adadad" style={MainStyles.inputIcon} />
          <TextInput
            style={MainStyles.textInput}
            placeholder="Nickname"
            placeholderTextColor="#adadad"
            value={username}
            onChangeText={setUsername}
            editable={!loading}
          />
        </View>

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

        {/* Repeat Password Input */}
        <View style={MainStyles.inputContainer}>
          <Icon name="key" size={20} color="#adadad" style={MainStyles.inputIcon} />
          <TextInput
            style={MainStyles.textInput}
            placeholder="Repeat password"
            placeholderTextColor="#adadad"
            secureTextEntry={!isRepeatPasswordVisible}
            value={repeatPassword}
            onChangeText={setRepeatPassword}
            autoCapitalize="none"
            editable={!loading}
          />
          <TouchableOpacity
            style={MainStyles.eyeIconContainer}
            onPress={() => setRepeatPasswordVisible(!isRepeatPasswordVisible)}
            disabled={loading}
          >
            <Icon
              name={isRepeatPasswordVisible ? "eye" : "eye-slash"}
              size={20}
              color="#adadad"
            />
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <TouchableOpacity 
          style={[MainStyles.continueButton, (loading || !isPasswordMatch()) && { opacity: 0.7 }]} 
          onPress={handleSignUp}
          disabled={loading || !isPasswordMatch()}
        >
          <Text style={MainStyles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}