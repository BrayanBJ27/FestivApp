import React, { createContext, useContext, useState } from "react";

// Crear el contexto del usuario
const UserContext = createContext();

// Proveedor del contexto del usuario
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para el usuario actual
  const [registeredUsers] = useState([
   
    { email: "maribel@hotmail.com", password: "123", role: "user" },
  ]);

  return (
    <UserContext.Provider value={{ user, setUser, registeredUsers }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar el contexto del usuario
export const useUser = () => useContext(UserContext);
