import { makeGetRequest, apiServicesTree } from '../../services/apiServices'

export async function getFriendshipService(clientToken, clientDBId, friendId) {
    return makeGetRequest(apiServicesTree.friendshipApi.getFriendship, {
        clientToken: clientToken,
        userId: clientDBId,
        friendId: friendId
    })
}
