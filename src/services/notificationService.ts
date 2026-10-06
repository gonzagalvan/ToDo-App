import { Platform } from 'react-native';
import { AndroidImportance } from 'expo-notifications/build/NotificationChannelManager.types';
import { SchedulableTriggerInputTypes } from 'expo-notifications/build/Notifications.types';
import { cancelScheduledNotificationAsync } from 'expo-notifications/build/cancelScheduledNotificationAsync';
import { getPermissionsAsync, requestPermissionsAsync } from 'expo-notifications/build/NotificationPermissions';
import { scheduleNotificationAsync } from 'expo-notifications/build/scheduleNotificationAsync';
import { setNotificationChannelAsync } from 'expo-notifications/build/setNotificationChannelAsync';
import { setNotificationHandler } from 'expo-notifications/build/NotificationsHandler';

setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

async function requestPermissions(): Promise<boolean> {
    if (Platform.OS === 'android') {
        try {
            await setNotificationChannelAsync('default', {
                name: 'Notificaciones generales',
                importance: AndroidImportance.HIGH,
            });
        } catch (err) {
            console.warn('No se pudo crear el canal:', err);
        }
    }

    const { status: existing } = await getPermissionsAsync();
    let finalStatus = existing;

    if (existing !== 'granted') {
        const { status } = await requestPermissionsAsync();
        finalStatus = status;
    }
    return finalStatus === 'granted';
}

async function scheduleNotification(title: string, body: string, seconds = 10): Promise<string | null> {
    if (!(await requestPermissions())) return null;

    return scheduleNotificationAsync({
        content: { title, body },
        trigger: {
            type: SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds,
            channelId: 'default',
        },
    });
}

/** Muestra una notificación al instante (trigger null = inmediata). */
async function notifyNow(title: string, body: string): Promise<string | null> {
    if (!(await requestPermissions())) return null;

    return scheduleNotificationAsync({
        content: { title, body },
        trigger: null,
    });
}

async function scheduleNotificationAtDate(
    title: string,
    body: string,
    date: Date,
): Promise<string | null> {
    if (!(await requestPermissions())) {
        return null;
    }

    if (date.getTime() <= Date.now()) {
        return null;
    }

    return scheduleNotificationAsync({
        content: {
            title,
            body,
        },
        trigger: {
            type: SchedulableTriggerInputTypes.DATE,
            date,
            channelId: 'default',
        },
    });
}

async function cancelNotification(id: string | null): Promise<void> {
    if (id) await cancelScheduledNotificationAsync(id);
}

async function init(): Promise<boolean> {
    return requestPermissions();
}

export const notificationService = {
    init,
    scheduleNotification,
    notifyNow,
    scheduleNotificationAtDate,
    cancelNotification,
};