import React, { useEffect } from "react";
import { UserProvider } from "./src/hooks/UserContext";
import { setupNotifications } from './src/hooks/notificationSetup';
import { ThemeProvider } from "./src/hooks/ThemeContext";
import AppNavigator from "./src/hooks/AppNavigator";

const App: React.FC = () => {

  useEffect(() => {
    const unsubscribe = setupNotifications();
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ThemeProvider>
      <UserProvider>
        <AppNavigator />
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;