import { deleteFriendship } from '../../services/apiServices/friendship/deleteFriendship'
import { deviceStorage } from '../../services/deviceStorage'

export async function deleteFriendshipService(userId) {
    const userToken = await deviceStorage.getItemFromStorage('JWT')

    const res = deleteFriendship(userToken, userId)

    return res
}
