import { getUserScores } from '../../services/apiServices/leaderboard/getUserScores'

export const getFriendScoresService = async (
    clientToken,
    userIdList,
    clientId
) => {
    userIdList.push(clientId)
    return getUserScores(clientToken, userIdList)
}
