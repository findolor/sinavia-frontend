import { apiServicesTree, makeGetRequest } from '../../services/apiServices'

export async function checkOngoingMatchService(clientToken, userId, roomCode) {
    return makeGetRequest(apiServicesTree.friendGameApi.checkOngoingMatch, {
        clientToken: clientToken,
        userId: userId,
        roomCode: roomCode
    })
}
