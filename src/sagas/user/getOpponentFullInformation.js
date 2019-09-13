import { put, call } from 'redux-saga/effects'
import { getOpponentFullInformation } from '../../services/apiServices/user/getOpponentFullInformation'
import { opponentTypes } from '../../redux/opponents/actions'
import { SCENE_KEYS, navigationPush } from '../../services/navigationService'

export async function getOpponentFullInformationService(
    clientToken,
    userId,
    clientId
) {
    const res = getOpponentFullInformation(clientToken, userId, clientId)

    return res
}

export function* getOpponentFullInformationSaga(action) {
    const res = yield call(
        getOpponentFullInformation,
        action.clientToken,
        action.opponentInformation.id,
        action.clientId
    )
    console.log(res)
    const opponentWinCount = Object.keys(res.friendGameWins).length
    const clientWinCount = Object.keys(res.friendGameDefeats).length
    const friendMatchDrawCount = Object.keys(res.friendGameDraws).length
    const totalFriendGames =
        opponentWinCount + clientWinCount + friendMatchDrawCount
    const wonGames = res.statistics.winCount
    const lostGames = res.statistics.loseCount
    const drawGames = res.statistics.drawCount
    const totalPlayedGames = wonGames + lostGames + drawGames
    const winPercentage = (wonGames / totalPlayedGames) * 100

    yield put({
        type: opponentTypes.SAVE_OPPONENT_INFORMATION,
        payload: action.opponentInformation
    })
    yield put({
        type: opponentTypes.SAVE_IS_FRIENDS,
        payload: res.isFriend
    })
    yield put({
        type: opponentTypes.SAVE_IS_REQUESTING,
        payload: res.isRequesting
    })
    yield put({
        type: opponentTypes.SAVE_IS_REQUESTED,
        payload: res.isRequested
    })
    yield put({
        type: opponentTypes.SAVE_OPPONENT_WIN_COUNT,
        payload: opponentWinCount
    })
    yield put({
        type: opponentTypes.SAVE_CLIENT_WIN_COUNT,
        payload: clientWinCount
    })
    yield put({
        type: opponentTypes.SAVE_TOTAL_FRIEND_GAMES,
        payload: totalFriendGames
    })
    yield put({
        type: opponentTypes.SAVE_FRIENDS_LIST,
        payload: res.friendships
    })
    yield put({
        type: opponentTypes.SAVE_GAMES_WON,
        payload: wonGames
    })
    yield put({
        type: opponentTypes.SAVE_GAMES_LOST,
        payload: lostGames
    })
    yield put({
        type: opponentTypes.SAVE_GAMES_DRAW,
        payload: drawGames
    })
    yield put({
        type: opponentTypes.SAVE_TOTAL_POINTS,
        payload: res.statistics.totalPoints
    })
    yield put({
        type: opponentTypes.SAVE_TOTAL_PLAYED_GAMES,
        payload: totalPlayedGames
    })
    yield put({
        type: opponentTypes.SAVE_WIN_PERCENTAGE,
        payload: winPercentage
    })
    navigationPush(SCENE_KEYS.mainScreens.opponentsProfile, {
        isWithSearchBar: true
    })
}
