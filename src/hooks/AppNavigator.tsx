import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { useUser } from "../hooks/UserContext";
import { useTheme } from "../hooks/ThemeContext"; // 
// Importa tus pantallas
import LoginScreen from "../screens/LoginScreen";
import SingInScreen from "../screens/SingInScreen";
import HomeScreen from "../screens/HomeScreen";
import EventScreen from "../screens/EventScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import HistoryScreen from "../screens/HistoryScreen";
import MapScreen from "../screens/MapScreen";
import AccountScreen from "../screens/AccountScreen";
import NotificationScreen from "../screens/NotificationScreen";
import TermsScreen from "../screens/TermsScreen"; // 
import HelpCenterScreen from "../screens/HelpCenterScreen"; //

// Define las rutas del stack navigator
export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  Event: undefined;
  Schedule: undefined;
  History: undefined; //
  Map: undefined;
  Account: undefined;
  Notification: undefined;
  TermsScreen: undefined; //
  HelpCenterScreen: undefined; // 
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { user } = useUser(); // Obtén el estado del usuario autenticado
  const { isDarkMode } = useTheme(); // Obtén el estado del tema desde ThemeContext

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName={user ? "Home" : "Login"}>
        {/* Pantalla de Login */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        {/* Pantalla de Registro */}
        <Stack.Screen
          name="SignUp"
          component={SingInScreen}
          options={{ headerShown: false }}
        />

        {/* Pantalla Principal */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        {/* Pantalla de Eventos */}
        <Stack.Screen
          name="Event"
          component={EventScreen}
          options={{ headerShown: true, title: "Event Details" }}
        />

        {/* Pantalla de Horarios */}
        <Stack.Screen
          name="Schedule"
          component={ScheduleScreen}
          options={{ headerShown: true, title: "Schedule" }}
        />

        {/* Pantalla de Historial */}
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ headerShown: true, title: "Visited Destinations" }}
        />

        {/* Pantalla de Mapas */}
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ headerShown: true, title: "Map" }}
        />

        {/* Pantalla de Cuenta */}
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={{ headerShown: true, title: "Account" }}
        />

        {/* Pantalla de Notificaciones */}
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{ headerShown: true, title: "Notifications" }}
        />

        {/* Pantalla de Terms of Services */}
        <Stack.Screen
          name="TermsScreen"
          component={TermsScreen}
          options={{ headerShown: true, title: "Terms of Services" }}
        />

        {/* Pantalla de Help Center */}
        <Stack.Screen
          name="HelpCenterScreen"
          component={HelpCenterScreen}
          options={{ headerShown: true, title: "Help Center" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
