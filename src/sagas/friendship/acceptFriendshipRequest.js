import { acceptFriendshipRequest } from '../../services/apiServices/friendship/acceptFriendshipRequest'

export async function acceptFriendshipRequestService(
    clientToken,
    clientDBId,
    friendId,
    clientUsername
) {
    const res = acceptFriendshipRequest(
        clientToken,
        clientDBId,
        friendId,
        clientUsername
    )

    return res
}
