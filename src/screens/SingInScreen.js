import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native"; // Importa el hook de navegación
import MainStyles from "../styles/MainStyles";

export default function SingInScreen() {
  const [isSelected, setSelection] = useState(false);
  const navigation = useNavigation(); // Hook para la navegación

  return (
    <View style={MainStyles.mainContainer}>
      {/* Logo */}
      <View style={MainStyles.logoContainer}>
        <Image
          source={require("../assets/images/oficial_festiapp.png")}
          style={MainStyles.logoIcon}
        />
      </View>

      {/* Title */}
      <Text style={MainStyles.signUpTitle}>Sign up FestivApp</Text>

      {/* Email Input */}
      <View style={MainStyles.inputContainer}>
        <Icon
          name="envelope"
          size={20}
          color="#adadad"
          style={MainStyles.inputIcon}
        />
        <TextInput
          style={MainStyles.textInput}
          placeholder="Enter e-mail address"
          placeholderTextColor="#adadad"
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
          secureTextEntry={true}
        />
      </View>

      {/* Repeat Password Input */}
      <View style={MainStyles.inputContainer}>
        <Icon
          name="key"
          size={20}
          color="#adadad"
          style={MainStyles.inputIcon}
        />
        <TextInput
          style={MainStyles.textInput}
          placeholder="Repeat password"
          placeholderTextColor="#adadad"
          secureTextEntry={true}
        />
      </View>

      {/* Terms of Service */}
      <View style={MainStyles.termsContainer}>
        <TouchableOpacity
          onPress={() => setSelection(!isSelected)}
          style={[
            MainStyles.checkbox,
            isSelected && MainStyles.checkboxSelected,
          ]}
        >
          {isSelected && <Icon name="check" size={14} color="white" />}
        </TouchableOpacity>
        <Text style={MainStyles.termsText}>
          I have read the{" "}
          <Text style={MainStyles.termsLink}>Terms of Service</Text>
        </Text>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={MainStyles.continueSIButton}
        onPress={() => navigation.navigate("Login")} // Navega a la pantalla de inicio de sesión
      >
        <Text style={MainStyles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
