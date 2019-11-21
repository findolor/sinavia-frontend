import { apiServicesTree, makeGetRequest } from '../../services/apiServices'
import { put, call } from 'redux-saga/effects'
import { appTypes } from '../../redux/app/actions'

export function* getNotificationsSaga(action) {
    let notifications
    try {
        notifications = yield call(
            makeGetRequest,
            apiServicesTree.notificationApi.getNotifications,
            {
                userId: action.clientId,
                clientToken: action.clientToken
            }
        )
    } catch (err) {
        return
    }

    if (
        notifications === undefined ||
        Object.keys(notifications).length === 0
    ) {
        yield put({
            type: appTypes.SAVE_NOTIFICATIONS,
            payload: null
        })
        return
    }

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
    return makeGetRequest(apiServicesTree.notificationApi.getNotifications, {
        userId: clientId,
        clientToken: clientToken
    })
}
