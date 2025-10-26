import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { registerPushToken } from './api';

export async function registerForPush(): Promise<string | null> {
  try {
    // Request permission
    const { status } = await Notifications.requestPermissionsAsync();
    
    if (status !== 'granted') {
      console.warn('Notification permission denied');
      return null;
    }

    // Get push token
    const tokenData = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas?.projectId,
    });

    if (tokenData?.data) {
      // Register with backend
      await registerPushToken('ios', tokenData.data); // TODO: Detect actual platform
      console.log('Push token registered:', tokenData.data);
      return tokenData.data;
    }

    return null;
  } catch (error) {
    console.error('Failed to register for push:', error);
    return null;
  }
}

