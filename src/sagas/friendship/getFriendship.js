import { getFriendship } from '../../services/apiServices/friendship/getFriendship'
import { deviceStorage } from '../../services/deviceStorage'

export async function getFriendshipService(friendId) {
    const userToken = await deviceStorage.getItemFromStorage('JWT')
    const userId = await deviceStorage.getItemFromStorage('userId')

    const res = getFriendship(userToken, userId, friendId)

    return res
}
