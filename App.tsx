import React, { useState, useEffect } from "react";
// import { Text, View, ActivityIndicator } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import SingInScreen from "./src/screens/SingInScreen";
import HomeScreen from "./src/screens/HomeScreen";
import EventScreen from "./src/screens/EventScreen";
import MapScreen from "./src/screens/MapScreen";
import ScheduleScreen from "./src/screens/ScheduleScreen";
import CalendarScreen from "./src/screens/CalendarScreen";

// import * as Font from "expo-font";

export default function App() {
    // const [fontsLoaded, setFontsLoaded] = useState(false);

    // useEffect(() => {
    //   async function loadFonts() {
    //     await Font.loadAsync({
    //       // Nombres personalizados para las fuentes
    //       "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    //       "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    //     });
    //     setFontsLoaded(true);
    //   }
    //   loadFonts();
    // }, []);
  
    // if (!fontsLoaded) {
    //   return (
    //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //       <ActivityIndicator size="large" />
    //     </View>
    //   );
    // }
    // return <LoginScreen />;
    // return <SingInScreen />;
    // return <HomeScreen />;
    // return <EventScreen />;
    // return <MapScreen />;
    // return <ScheduleScreen />;
    return <CalendarScreen />;
  }
