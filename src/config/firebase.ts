import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, indexedDBLocalPersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXPO_PUBLIC_FIREBASE_API_KEY, EXPO_PUBLIC_FIREBASE_PROJECT_ID } from "@env";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: `${EXPO_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: EXPO_PUBLIC_FIREBASE_PROJECT_ID,
};

// Inicializar Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Implementar persistencia manualmente usando AsyncStorage
const reactNativePersistence = {
  type: "LOCAL",
  async getItem(key: string) {
    return await AsyncStorage.getItem(key);
  },
  async setItem(key: string, value: string) {
    await AsyncStorage.setItem(key, value);
  },
  async removeItem(key: string) {
    await AsyncStorage.removeItem(key);
  }
};

// ✅ Inicializar Firebase Auth con persistencia en AsyncStorage
const auth = initializeAuth(app, {
  persistence: indexedDBLocalPersistence, // Para compatibilidad con Firebase 11+
});

export { auth };
