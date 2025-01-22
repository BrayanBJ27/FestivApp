import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MainStyles from "../styles/MainStyles";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../hooks/UserContext"; // Importa el contexto del usuario

export default function LoginScreen() {
  const { setUser, registeredUsers } = useUser(); // Obtén los usuarios registrados y la función para establecer el usuario actual
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    const foundUser = registeredUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      setUser(foundUser); // Guarda el usuario en el contexto
      navigation.navigate("Home"); // Navega a la pantalla Home
    } else {
      Alert.alert("Error", "Invalid email or password");
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

        <Text style={MainStyles.title}>Log in FestivApp</Text>

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
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        {/* Sign In Button */}
        <TouchableOpacity style={MainStyles.continueButton} onPress={handleSignIn}>
          <Text style={MainStyles.continueText}>Sign In</Text>
        </TouchableOpacity>

        {/* Create Account */}
        <TouchableOpacity
          style={MainStyles.continueButton}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={MainStyles.continueText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
