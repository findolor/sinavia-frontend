import { getUserScores } from '../../services/apiServices/leaderboard/getUserScores'

export const getFriendScoresService = async (
    clientToken,
    userIdList,
    clientId,
    params
) => {
    return getUserScores(clientToken, userIdList, clientId, params)
}
