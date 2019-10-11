import {
    getNotificationsService,
    getNotificationsSaga
} from './getNotification'
import { markNotificationReadService } from './markNotificationRead'
import { rejectOngoingMatchService } from './rejectOngingMatch'

export const notificationServices = {
    getNotification: getNotificationsService,
    markNotificationRead: markNotificationReadService,
    rejectOngingMatch: rejectOngoingMatchService
}

export const notificationSagas = {
    getNotification: getNotificationsSaga
}
