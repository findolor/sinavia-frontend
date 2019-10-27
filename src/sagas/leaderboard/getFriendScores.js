import { apiServicesTree, makeGetRequest } from '../../services/apiServices'

export const getFriendScoresService = async (
    clientToken,
    userIdList,
    clientId,
    params
) => {
    return makeGetRequest(apiServicesTree.leaderboardApi.getUserScores, {
        clientToken: clientToken,
        userIdList: userIdList,
        clientId: clientId,
        params: params
    })
}
