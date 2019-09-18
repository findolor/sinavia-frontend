import { sendGameRequest } from '../../services/apiServices/friendGame/sendGameRequest'

export async function sendFriendGameRequestService(
    clientToken,
    clientInformation,
    roomCode,
    requestedUserFCMToken
) {
    const res = sendGameRequest(
        clientToken,
        clientInformation.id,
        clientInformation.username,
        roomCode,
        requestedUserFCMToken
    )

    return res
}
