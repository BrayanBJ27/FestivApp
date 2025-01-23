import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { UserProvider } from "./src/hooks/UserContext";
import AppNavigator from "./src/hooks/AppNavigator";

import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SingInScreen";
import HomeScreen from "./src/screens/HomeScreen";
import EventScreen from "./src/screens/EventScreen";
import MapScreen from "./src/screens/MapScreen";
import ScheduleScreen from "./src/screens/ScheduleScreen";
import CalendarScreen from "./src/screens/CalendarScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import AccountScreen from "./src/screens/AccountScreen";
import NotificationScreen from "./src/screens/NotificationScreen";

const Stack = createStackNavigator();

export default function App() {
    return (
        <UserProvider>
          <AppNavigator />
        </UserProvider>
      );
    }