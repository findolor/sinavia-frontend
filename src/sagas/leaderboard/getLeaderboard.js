import { getLeaderboard } from '../../services/apiServices/leaderboard/getLeaderboard'

export const getLeaderboardService = async (clientToken, params) => {
    return getLeaderboard(clientToken, params)
}
