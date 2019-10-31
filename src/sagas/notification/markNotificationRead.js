import { apiServicesTree, makePutRequest } from '../../services/apiServices'

export const markNotificationReadService = async (
    clientToken,
    notification
) => {
    return makePutRequest(
        apiServicesTree.notificationApi.markNotificationRead,
        { clientToken: clientToken, notification: notification }
    )
}
