import messaging from '@react-native-firebase/messaging';
import AsyncStorageService from '../services/AsyncStorageService';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFCMToken();
  }
}

export async function GetFCMToken() {
  //   let fcmtoken = await AsyncStorageService?.getData('fcmtoken');
  //   if (fcmtoken === null) {
  try {
    let fcmtoken = await messaging().getToken();
    if (fcmtoken) {
      console.log('Fcmtoken: ', fcmtoken);

      await AsyncStorageService.setData('fcmtoken', fcmtoken);
    }
  } catch (error) {
    console.log('FcmToken', error);
  }
}
// }

export const NotificationListener = () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        //   setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log('Notification on foreground state: ', remoteMessage);
  });
};
