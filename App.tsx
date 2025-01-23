import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { UserProvider } from "./src/hooks/UserContext"; // Importa el contexto

import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SingInScreen";
import HomeScreen from "./src/screens/HomeScreen";
import EventScreen from "./src/screens/EventScreen";
import MapScreen from "./src/screens/MapScreen";
import ScheduleScreen from "./src/screens/ScheduleScreen";
import CalendarScreen from "./src/screens/CalendarScreen";

const Stack = createStackNavigator();

export default function App() {

    // const [fontsLoaded, setFontsLoaded] = useState(false);
    // return (
    //   <UserProvider>
    //     <NavigationContainer>
    //       <Stack.Navigator initialRouteName="Login">
    //         <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    //         <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
    //         <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    //       </Stack.Navigator>
    //     </NavigationContainer>
    //   </UserProvider>
    // );

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
    return <HomeScreen />;
    // return <EventScreen />;
    // return <MapScreen />;
    // return <ScheduleScreen />;EAD
    // return <CalendarScreen />;
}
