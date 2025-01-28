import React from "react";
import { UserProvider } from "./src/hooks/UserContext"; // Importa tu contexto de usuario

import { ThemeProvider } from "./src/hooks/ThemeContext";
// Importa tu contexto de tema
import AppNavigator from "./src/hooks/AppNavigator"; // Configuración de navegación principal

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppNavigator />
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
