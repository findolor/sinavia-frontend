import { getFriends } from '../../services/apiServices/friendship/getFriends'

export async function getFriendsService(clientToken, clientDBId) {
    const res = getFriends(clientToken, clientDBId)

    return res
}
