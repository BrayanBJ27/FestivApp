import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Importa tus pantallas según los nombres de archivo
import LoginScreen from "../screens/LoginScreen";
import SingInScreen from "../screens/SingInScreen";
import HomeScreen from "../screens/HomeScreen";
import EventScreen from "../screens/EventScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import CalendarScreen from "../screens/CalendarScreen";
import MapScreen from "../screens/MapScreen";
import AccountScreen from "../screens/AccountScreen";
import NotificationScreen from "../screens/NotificationScreen";

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
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

        {/* Pantalla de Calendario */}
        <Stack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{ headerShown: true, title: "Calendar" }}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
