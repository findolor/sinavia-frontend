import { sendFriendshipRequest } from '../../services/apiServices/friendship/sendFriendshipRequest'

export async function sendFriendshipRequestService(
    clientToken,
    clientDBId,
    friendId,
    clientUsername
) {
    const res = sendFriendshipRequest(
        clientToken,
        clientDBId,
        friendId,
        clientUsername
    )

    return res
}
