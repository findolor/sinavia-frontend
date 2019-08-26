import { deleteFriendship } from '../../services/apiServices/friendship/deleteFriendship'

export async function deleteFriendshipService(
    clientToken,
    userId,
    friendId,
    isClientUser
) {
    const res = deleteFriendship(clientToken, userId, friendId, isClientUser)

    return res
}
