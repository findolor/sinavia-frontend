import { getFriends } from '../../services/apiServices/friendship/getFriends'
import { deviceStorage } from '../../services/deviceStorage'

export async function getFriendsService() {
    const userToken = await deviceStorage.getItemFromStorage('JWT')
    const userId = await deviceStorage.getItemFromStorage('userId')

    const res = getFriends(userToken, userId)

    return res
}
