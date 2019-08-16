import { getFriendMatches } from '../../services/apiServices/friendship/getFriendMatches'
import { deviceStorage } from '../../services/deviceStorage'

export async function getFriendMatchesService(friendId) {
    const userToken = await deviceStorage.getItemFromStorage('JWT')
    const userId = await deviceStorage.getItemFromStorage('userId')

    const res = getFriendMatches(userToken, userId, friendId)

    return res
}
