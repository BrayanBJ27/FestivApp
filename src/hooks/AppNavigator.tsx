import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { useUser } from "../hooks/UserContext";
import { useTheme } from "../hooks/ThemeContext";

// Importa tus pantallas
import LoginScreen from "../screens/LoginScreen";
import SingInScreen from "../screens/SingInScreen";
import HomeScreen from "../screens/HomeScreen";
import EventScreen from "../screens/EventScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import CalendarScreen from "../screens/CalendarScreen";
import HistoryScreen from "../screens/HistoryScreen";
import MapScreen from "../screens/MapScreen";
import AccountScreen from "../screens/AccountScreen";
import NotificationScreen from "../screens/NotificationScreen";
import TermsScreen from "../screens/TermsScreen";
import HelpCenterScreen from "../screens/HelpCenterScreen";
import ProfileSettings from "../screens/ProfileSettings";
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import AddFestivityScreen from '../screens/AddFestivityScreen';
import CurrencyScreen from "../screens/CurrencyScreen";
import EditFestivityScreen from "../screens/EditFestivityScreen";

// Define las rutas del stack navigator
export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  Event: undefined;
  Schedule: undefined;
  Calendar: undefined;
  History: undefined;
  Map: undefined;
  Account: undefined;
  Notification: undefined;
  TermsScreen: undefined;
  HelpCenterScreen: undefined;
  ProfileSettings: undefined;
  AdminDashboard: undefined;
  AddFestivityScreen: undefined;
  CurrencyScreen: undefined;
  EditFestivityScreen: {
    festivityId: number;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { user } = useUser();
  const { isDarkMode } = useTheme();

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName={user ? "Home" : "Login"}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SingInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} options={{ headerShown: true, title: "Admin Dashboard" }} />
        <Stack.Screen name="AddFestivityScreen" component={AddFestivityScreen} options={{ headerShown: true, title: "Add Festivity" }} />
        <Stack.Screen name="Event" component={EventScreen} options={{ headerShown: true, title: "Event Details" }} />
        <Stack.Screen name="Schedule" component={ScheduleScreen} options={{ headerShown: true, title: "Schedule" }} />
        <Stack.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: true, title: "Calendar" }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ headerShown: true, title: "Visited Destinations" }} />
        <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: true, title: "Map" }} />
        <Stack.Screen name="Account" component={AccountScreen} options={{ headerShown: true, title: "Account" }} />
        <Stack.Screen name="Notification" component={NotificationScreen} options={{ headerShown: true, title: "Notifications" }} />
        <Stack.Screen name="TermsScreen" component={TermsScreen} options={{ headerShown: true, title: "Terms of Services" }} />
        <Stack.Screen name="HelpCenterScreen" component={HelpCenterScreen} options={{ headerShown: true, title: "Help Center" }} />
        <Stack.Screen name="ProfileSettings" component={ProfileSettings} options={{ headerShown: true, title: "Profile Settings" }} />
        <Stack.Screen name="CurrencyScreen" component={CurrencyScreen} options={{ headerShown: true, title: "Currency" }} />
        <Stack.Screen name="EditFestivityScreen" component={EditFestivityScreen} options={{ headerShown: true, title: "Edit Festivity" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;