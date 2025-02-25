import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configura el comportamiento de las notificaciones (esto determina cómo se muestran en primer plano)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Esta función configura los listeners y retorna una función de "unsubscribe" para limpiar al desmontar.
export function setupNotifications() {
  const notificationListener = Notifications.addNotificationReceivedListener(notification => {
    console.log("Notification received:", notification);
  });

  const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
    console.log("Notification response:", response);
  });

  // Retornamos una función para remover ambos listeners
  return () => {
    Notifications.removeNotificationSubscription(notificationListener);
    Notifications.removeNotificationSubscription(responseListener);
  };
}
