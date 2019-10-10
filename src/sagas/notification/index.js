import {
    getNotificationsService,
    getNotificationsSaga
} from './getNotification'
import { markNotificationReadService } from './markNotificationRead'

export const notificationServices = {
    getNotification: getNotificationsService,
    markNotificationRead: markNotificationReadService
}

export const notificationSagas = {
    getNotification: getNotificationsSaga
}
