import { apiServicesTree, makeGetRequest } from '../../services/apiServices'

export const getLeaderboardService = async (clientToken, params) => {
    return makeGetRequest(apiServicesTree.leaderboardApi.getLeaderboard, {
        clientToken: clientToken,
        params: params
    })
}
