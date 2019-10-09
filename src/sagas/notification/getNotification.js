import { getNotifications } from '../../services/apiServices/notification/getNotifications'
import { put, call } from 'redux-saga/effects'
import { appTypes } from '../../redux/app/actions'

export function* getNotificationsSaga(action) {
    const notifications = yield call(
        getNotifications,
        action.clientToken,
        action.clientId
    )

    if (notifications === undefined || Object.keys(notifications).length === 0)
        return

    notifications.forEach(notification => {
        notification.notificationData = JSON.parse(
            notification.notificationData
        )
    })

    yield put({
        type: appTypes.SAVE_NOTIFICATIONS,
        payload: notifications
    })
}

export const getNotificationsService = async (clientToken, clientId) => {
    return getNotifications(clientToken, clientId)
}
