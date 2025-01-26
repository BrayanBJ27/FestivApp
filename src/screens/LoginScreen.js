import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, Image, Alert, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MainStyles from "../styles/MainStyles";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../hooks/UserContext"; // Importa el contexto del usuario

export default function LoginScreen() {
  const { setUser, registeredUsers } = useUser(); // Obtén los usuarios registrados y la función para establecer el usuario actual
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

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
            <Icon
              name="key"
              size={20}
              color="#adadad"
              style={MainStyles.inputIcon}
            />
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

          {/* Botones para iniciar sesión */}
          <View style={MainStyles.buttonRow}>
            <TouchableOpacity style={MainStyles.continueSIButton} onPress={handleSignIn}>
              <Text style={MainStyles.continueText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[MainStyles.continueSIButton, { backgroundColor: "#00BFFF" }]}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={MainStyles.continueText}>Create</Text>
            </TouchableOpacity>
          </View>

          {/* Botones de redes sociales */}
          <View style={MainStyles.socialLoginContainer}>
            {/* Botón para Apple */}
            <TouchableOpacity style={MainStyles.appleButton}>
              <Icon name="apple" size={20} color="#fff" style={MainStyles.buttonIcon} />
              <Text style={MainStyles.buttonText}>Continue with Apple</Text>
            </TouchableOpacity>

            {/* Botón para Facebook */}
            <TouchableOpacity style={MainStyles.facebookButton}>
              <Icon name="facebook" size={20} color="#fff" style={MainStyles.buttonIcon} />
              <Text style={MainStyles.buttonText}>Continue with Facebook</Text>
            </TouchableOpacity>

            {/* Botón para Google */}
            <TouchableOpacity style={MainStyles.googleButton}>
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
