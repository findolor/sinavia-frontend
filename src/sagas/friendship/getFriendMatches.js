import { makeGetRequest, apiServicesTree } from '../../services/apiServices'

export async function getFriendMatchesService(
    clientToken,
    clientDBId,
    friendId
) {
    return makeGetRequest(apiServicesTree.friendshipApi.getFriendMatches, {
        clientToken: clientToken,
        userId: clientDBId,
        friendId: friendId
    })
}
