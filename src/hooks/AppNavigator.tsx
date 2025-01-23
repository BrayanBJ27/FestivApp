import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import EventScreen from "../screens/EventScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import MapScreen from "../screens/MapScreen";
import AccountScreen from "../screens/AccountScreen";
import NotificationScreen from "../screens/NotificationScreen";

// Define las rutas esperadas en la navegación
export type RootStackParamList = {
  Home: undefined;
  Event: undefined;
  Schedule: undefined;
  Map: undefined;
  Account: undefined;
  Notification: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Event"
          component={EventScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Schedule"
          component={ScheduleScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
