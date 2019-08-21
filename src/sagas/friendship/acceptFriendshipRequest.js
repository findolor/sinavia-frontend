import { acceptFriendshipRequest } from '../../services/apiServices/friendship/acceptFriendshipRequest'
import { deviceStorage } from '../../services/deviceStorage'

export async function acceptFriendshipRequestService(friendId) {
    const userToken = await deviceStorage.getItemFromStorage('JWT')
    const userId = await deviceStorage.getItemFromStorage('userId')

    const res = acceptFriendshipRequest(userToken, userId, friendId)

    return res
}
