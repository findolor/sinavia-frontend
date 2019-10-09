import { markNotificationRead } from '../../services/apiServices/notification/markNotificationRead'

export const markNotificationReadService = async (
    clientToken,
    notification
) => {
    return markNotificationRead(clientToken, notification)
}
