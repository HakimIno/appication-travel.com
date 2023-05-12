import { createContext, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

const appConfig = require('../app.json');

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

interface NotificationContextProps {
  registerForPushNotifications: () => Promise<void>;
}

export const NotificationContext = createContext<NotificationContextProps>({
  registerForPushNotifications: () => Promise.resolve(),
});

export const NotificationProvider = ({ children }: any) => {
  const [notification, setNotification] = useState<any>(null);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();


  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification: any) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }

      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        registerForPushNotifications: async () => {
          let token;
          if (Device.isDevice) {
            const { status: existingStatus } =
              await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
              const { status } = await Notifications.requestPermissionsAsync();
              finalStatus = status;
            }
            if (finalStatus !== "granted") {
              alert("Failed to get push token for push notification!");
              return;
            }
            const projectId = appConfig?.expo?.extra?.eas?.projectId;

            token = (await Notifications.getExpoPushTokenAsync({ projectId: projectId })).data;
            console.log(token);
          } else {
            alert("Must use physical device for Push Notifications");
          }

          if (Platform.OS === "android") {
            await Notifications.setNotificationChannelAsync("default", {
              name: "default",
              importance: Notifications.AndroidImportance.MAX,
              vibrationPattern: [0, 250, 250, 250],
              lightColor: "#FF231F7C",
            });
          }
        },
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
