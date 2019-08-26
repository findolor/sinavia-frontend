import { getFriendship } from '../../services/apiServices/friendship/getFriendship'

export async function getFriendshipService(clientToken, clientDBId, friendId) {
    const res = getFriendship(clientToken, clientDBId, friendId)

    return res
}
