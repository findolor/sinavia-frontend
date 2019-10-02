import { getLeaderboard } from '../../services/apiServices/leaderboard/getLeaderboard'
import { put, call } from 'redux-saga/effects'
import { deviceStorage } from '../../services/deviceStorage'
import { appTypes } from '../../redux/app/actions'

export function* getLeaderboardSaga(action) {
    const response = yield call(
        getLeaderboard,
        action.clientToken,
        action.examId,
        action.courseId,
        action.subjectId
    )

    console.log(response)
}

export const getLeaderboardService = async (clientToken, params) => {
    return getLeaderboard(clientToken, params)
}
