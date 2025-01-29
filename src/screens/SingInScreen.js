import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import MainStyles from "../styles/MainStyles";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../hooks/UserContext"; // Importa el contexto del usuario

export default function SignUpScreen() {
  const { setUser, registeredUsers } = useUser(); // Accede al contexto del usuario
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isRepeatPasswordVisible, setRepeatPasswordVisible] = useState(false);
  const [isSelected, setSelection] = useState(false);

  const handleSignUp = () => {
    if (!email || !password || !repeatPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (password !== repeatPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    if (!isSelected) {
      Alert.alert("Error", "You must accept the Terms of Service");
      return;
    }

    const newUser = { email, password, role: "user" };
    registeredUsers.push(newUser); // Agrega el nuevo usuario al listado
    setUser(newUser); // Establece el usuario actual
    Alert.alert("Success", "Account created successfully!");
    navigation.navigate("Home");
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

        {/* Email Input */}
        <View style={MainStyles.inputContainer}>
          <Icon name="envelope" size={20} color="#adadad" style={MainStyles.inputIcon} />
          <TextInput
            style={MainStyles.textInput}
            placeholder="Enter e-mail address"
            placeholderTextColor="#adadad"
            value={email}
            onChangeText={(text) => setEmail(text)}
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
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            style={MainStyles.eyeIconContainer}
            onPress={() => setPasswordVisible(!isPasswordVisible)}
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
            onChangeText={(text) => setRepeatPassword(text)}
          />
          <TouchableOpacity
            style={MainStyles.eyeIconContainer}
            onPress={() => setRepeatPasswordVisible(!isRepeatPasswordVisible)}
          >
            <Icon
              name={isRepeatPasswordVisible ? "eye" : "eye-slash"}
              size={20}
              color="#adadad"
            />
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={MainStyles.continueButton} onPress={handleSignUp}>
          <Text style={MainStyles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
