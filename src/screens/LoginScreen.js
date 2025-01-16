import React from "react";

import { ScrollView, View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';

import MainStyles from "../styles/MainStyles"; 

export default function LoginScreen() {
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
          />
        </View>

        {/* Password Input */}
        <View style={MainStyles.inputContainer}>
          <Icon name="key" size={20} color="#adadad" style={MainStyles.inputIcon} />
          <TextInput
            style={MainStyles.textInput}
            placeholder="Enter password"
            placeholderTextColor="#adadad"
            secureTextEntry={true} // Oculta el texto para contraseñas
          />
        </View>

        {/* Divider */}
        <View style={MainStyles.dividerContainer}>
          <View style={MainStyles.divider} />
          <Text style={MainStyles.orText}>Or continue with</Text>
          <View style={MainStyles.divider} />
        </View>

        {/* Buttons */}
        <TouchableOpacity style={MainStyles.appleButton}>
          <Icon name="envelope" size={20} color="#fff" style={MainStyles.buttonIcon} />
          <Text style={MainStyles.buttonText}>Continue with E-mail</Text>
        </TouchableOpacity>

        <TouchableOpacity style={MainStyles.appleButton}>
          <Icon name="apple" size={20} color="#fff" style={MainStyles.buttonIcon} />
          <Text style={MainStyles.buttonText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={MainStyles.facebookButton}>
          <Icon name="facebook" size={20} color="#fff" style={MainStyles.buttonIcon} />
          <Text style={MainStyles.buttonText}>Continue with Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity style={MainStyles.googleButton}>
          <Image
            source={require("../assets/images/google-icon.png")}
            style={MainStyles.buttonIcon}
          />
          <Text style={MainStyles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={MainStyles.continueButton}>
          <Text style={MainStyles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
