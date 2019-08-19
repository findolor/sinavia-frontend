import { getFriendRequests } from '../../services/apiServices/friendship/getFriendRequests'
import { deviceStorage } from '../../services/deviceStorage'

export async function getFriendRequestsService() {
    const userToken = await deviceStorage.getItemFromStorage('JWT')
    const userId = await deviceStorage.getItemFromStorage('userId')

    const res = getFriendRequests(userToken, userId)

    return res
}
