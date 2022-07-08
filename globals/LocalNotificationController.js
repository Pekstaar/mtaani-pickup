import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('LOCAL NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    //   notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  // onAction: function (notification) {
  //   console.log("ACTION:", notification.action);
  //   console.log("NOTIFICATION:", notification);

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: 'channel-id',
    channelName: 'pickup mtaani channel',
    channelDescription: 'pickup mtaani notification channel',
    playSound: true,
    soundName: 'default',
    importance: 10,
    vibrate: true,
    vibration: 1000,
  },
  created => console.log('channel created!', created),
);

export const LocalNotification = () => {
  PushNotification.localNotification({
    channelId: 'channel-id',
    channelName: 'pickup mtaani channel',
    channelDescription: 'pickup mtaani notification channel',
    playSound: true,
    soundName: 'default',
    importance: 10,
    vibrate: true,
    vibration: 1000,
    autoCancel: true,
    bigText: 'This is a local notification demo from react-native',
    subText: 'Pickup mtaani Notification Demo',
    title: 'Pickup mtaani Notification',
  });
};
