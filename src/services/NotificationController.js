import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

PushNotification.createChannel(
  {
    channelId: 'channel-id',
    channelName: 'Pickup mtaani channel',
    importance: 5,
    vibrate: true,
  },

  created => console.log('Create Channel returned', created),
);

const NotificationController = props => {
  useEffect(() => {
    PushNotification.getChannels(function (channel_ids) {
      console.log(channel_ids);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        message: remoteMessage.notification?.body,
        title: remoteMessage.notification.title,
        bigPictureUrl: remoteMessage?.notification?.android?.imageUrl,
        smallIcon: remoteMessage.notification.android.imageUrl,
        channelId: true,
        vibrate: true,
      });
    });

    return unsubscribe;
  }, []);

  return null;
};

export default NotificationController;
