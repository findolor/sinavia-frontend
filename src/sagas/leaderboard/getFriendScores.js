import { getUserScores } from '../../services/apiServices/leaderboard/getUserScores'

export const getFriendScoresService = async (clientToken, userIdList) => {
    return getUserScores(clientToken, userIdList)
}
