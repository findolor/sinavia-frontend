import { getFriendRequests } from '../../services/apiServices/friendship/getFriendRequests'

export async function getFriendRequestsService(clientToken, clientDBId) {
    const res = getFriendRequests(clientToken, clientDBId)

    return res
}
