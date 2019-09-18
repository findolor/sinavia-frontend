import { getFriendMatches } from '../../services/apiServices/friendship/getFriendMatches'

export async function getFriendMatchesService(
    clientToken,
    clientDBId,
    friendId
) {
    const res = getFriendMatches(clientToken, clientDBId, friendId)

    return res
}
