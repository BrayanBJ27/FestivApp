import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, browserLocalPersistence } from "firebase/auth";
import * as SecureStore from "expo-secure-store";
import { EXPO_PUBLIC_FIREBASE_API_KEY, EXPO_PUBLIC_FIREBASE_PROJECT_ID } from "@env";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: `${EXPO_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: EXPO_PUBLIC_FIREBASE_PROJECT_ID,
};

// Inicializar la app de Firebase
const app = initializeApp(firebaseConfig);

// Función para manejar el almacenamiento seguro
const secureStorePersistence = {
  type: "LOCAL",
  async getItem(key: string) {
    return await SecureStore.getItemAsync(key);
  },
  async setItem(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  },
  async removeItem(key: string) {
    await SecureStore.deleteItemAsync(key);
  },
};

// Inicializar Auth con persistencia en SecureStore
const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
});

export { auth };
