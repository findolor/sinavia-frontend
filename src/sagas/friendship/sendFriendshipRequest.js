import { sendFriendshipRequest } from '../../services/apiServices/friendship/sendFriendshipRequest'
import { deviceStorage } from '../../services/deviceStorage'

export async function sendFriendshipRequestService(friendId) {
    const userToken = await deviceStorage.getItemFromStorage('JWT')
    const userId = await deviceStorage.getItemFromStorage('userId')

    const res = sendFriendshipRequest(userToken, userId, friendId)

    return res
}
