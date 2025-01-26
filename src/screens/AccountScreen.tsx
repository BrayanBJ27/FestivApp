import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import MainStyles from "../styles/MainStyles";
import BottomNavbar from "../components/BottomNavbar";
import Icon from "react-native-vector-icons/FontAwesome6";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../hooks/AppNavigator";
import { useUser } from "../hooks/UserContext"; // Contexto del usuario

type AccountScreenProps = StackScreenProps<RootStackParamList, "Account">;

const AccountScreen: React.FC<AccountScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Account");
  const { setUser } = useUser(); // Obtiene la función para modificar el estado del usuario

  // Renderiza un botón con ícono y texto
  const renderButton = (text: string, onPress: () => void) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 16,
        paddingVertical: 8,
      }}
    >
      <Text style={MainStyles.opTextAS}>{text}</Text>
      <Icon
        name="arrow-right"
        size={20}
        color="#000"
        style={{
          marginRight: 6,
        }}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <ScrollView
        scrollEnabled={true}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={MainStyles.containerAS}>
          {/* Header */}
          <View style={MainStyles.headerAS}>
            <TouchableOpacity
              style={MainStyles.backButtonAS}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-left" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Title */}
          <Text style={MainStyles.titleTextAS}>Settings</Text>
          <Text style={MainStyles.subTitleTextAS}>Edit profile</Text>

          {/* Buttons */}
          {renderButton("Notification", () =>
            console.log("Navigate to Notification Screen")
          )}
          <View style={[MainStyles.separator, { marginVertical: 4 }]}></View>

          {renderButton("Country", () =>
            console.log("Navigate to Country Screen")
          )}
          <View style={[MainStyles.separator, { marginVertical: 4 }]}></View>

          {renderButton("History", () => navigation.navigate("Calendar"))}
          <View style={[MainStyles.separator, { marginVertical: 4 }]}></View>

          {renderButton("Terms of Services", () =>
            console.log("Navigate to Terms of Services")
          )}
          <View style={[MainStyles.separator, { marginVertical: 4 }]}></View>

          {renderButton("Help Center", () =>
            console.log("Navigate to Help Center")
          )}
          <View style={[MainStyles.separator, { marginVertical: 4 }]}></View>

          {renderButton("Profile", () =>
            console.log("Navigate to Profile Screen")
          )}
          <View style={[MainStyles.separator, { marginVertical: 4 }]}></View>

          {renderButton("Log Out", () =>
            Alert.alert(
              "Salir",
              "¿Estás seguro de que quieres cerrar sesión?",
              [
                {
                  text: "No",
                  onPress: () => console.log("Acción cancelada"),
                  style: "cancel",
                },
                {
                  text: "Sí",
                  onPress: () => {
                    setUser(null); // Limpia el usuario en el contexto
                    navigation.navigate("Login"); // Redirige a la pantalla de login
                  },
                },
              ],
              { cancelable: false }
            )
          )}
        </View>
      </ScrollView>

      {/* Footer Navigation */}
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default AccountScreen;
