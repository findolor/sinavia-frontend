import { apiServicesTree, makePostRequest } from '../../services/apiServices'

export async function sendFriendGameRequestService(
    clientToken,
    clientInformation,
    roomCode,
    requestedUserFCMToken,
    matchInformation
) {
    return makePostRequest(apiServicesTree.friendGameApi.sendGameRequest, {
        clientToken: clientToken,
        id: clientInformation.id,
        username: clientInformation.username,
        roomCode: roomCode,
        requestedUserFCMToken: requestedUserFCMToken,
        matchInformation: matchInformation
    })
}
