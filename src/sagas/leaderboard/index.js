import { getLeaderboardSaga, getLeaderboardService } from './getLeaderboard'

export const leaderboardSagas = {
    getLeaderboard: getLeaderboardSaga
}

export const leaderboardServices = {
    getLeaderboard: getLeaderboardService
}
