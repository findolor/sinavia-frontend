import { deleteFriendship } from '../../services/apiServices/friendship/deleteFriendship'

export async function deleteFriendshipService(clientToken, userId) {
    const res = deleteFriendship(clientToken, userId)

    return res
}
