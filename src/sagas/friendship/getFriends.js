import { makeGetRequest, apiServicesTree } from '../../services/apiServices'

export async function getFriendsService(clientToken, clientDBId) {
    return makeGetRequest(apiServicesTree.friendshipApi.getFriends, {
        clientToken: clientToken,
        userId: clientDBId
    })
}
