import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import EventScreen from "../screens/EventScreen";
import ScheduleScreen from "../screens/ScheduleScreen";

// Define las rutas esperadas en la navegación
export type RootStackParamList = {
  Home: undefined;
  Event: undefined;
  Schedule: undefined;
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
