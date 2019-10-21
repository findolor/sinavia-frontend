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

    // Calculating friend matches
    const opponentWinCount = Object.keys(res.friendGameWins).length
    const clientWinCount = Object.keys(res.friendGameDefeats).length
    const friendMatchDrawCount = Object.keys(res.friendGameDraws).length
    const totalFriendMatchesCount =
        opponentWinCount + clientWinCount + friendMatchDrawCount

    // Calculating ranked statistics
    const totalRankedWin = res.statistics.rankedWinCount
    const totalRankedLose = res.statistics.rankedLoseCount
    const totalRankedDraw = res.statistics.rankedDrawCount
    const totalRankedGames = totalRankedWin + totalRankedLose + totalRankedDraw
    const rankedWinPercentage = (totalRankedWin / totalRankedGames) * 100

    // Calculating friend statistics
    const totalFriendWin = res.statistics.friendWinCount
    const totalFriendLose = res.statistics.friendLoseCount
    const totalFriendDraw = res.statistics.friendDrawCount
    const totalFriendGames = totalFriendWin + totalFriendLose + totalFriendDraw
    const friendWinPercentage = (totalFriendWin / totalFriendGames) * 100

    const friendsList = []
    res.friendships.forEach(friendship => {
        if (friendship.friendshipStatus !== 'requested')
            if (action.opponentInformation.id === friendship.userId)
                friendsList.push(friendship.friendId)
            else friendsList.push(friendship.userId)
    })

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
        type: opponentTypes.SAVE_TOTAL_FRIEND_MATCHES_COUNT,
        payload: totalFriendMatchesCount
    })
    yield put({
        type: opponentTypes.SAVE_FRIENDS_LIST,
        payload: friendsList
    })
    yield put({
        type: opponentTypes.SAVE_TOTAL_RANKED_WIN,
        payload: totalRankedWin
    })
    yield put({
        type: opponentTypes.SAVE_TOTAL_RANKED_LOSE,
        payload: totalRankedLose
    })
    yield put({
        type: opponentTypes.SAVE_TOTAL_RANKED_DRAW,
        payload: totalRankedDraw
    })
    yield put({
        type: opponentTypes.SAVE_TOTAL_RANKED_GAMES,
        payload: totalRankedGames
    })
    yield put({
        type: opponentTypes.SAVE_TOTAL_FRIEND_WIN,
        payload: totalFriendWin
    })
    yield put({
        type: opponentTypes.SAVE_TOTAL_FRIEND_LOSE,
        payload: totalFriendLose
    })
    yield put({
        type: opponentTypes.SAVE_TOTAL_FRIEND_DRAW,
        payload: totalFriendDraw
    })
    yield put({
        type: opponentTypes.SAVE_TOTAL_FRIEND_GAMES,
        payload: totalFriendGames
    })
    yield put({
        type: opponentTypes.SAVE_RANKED_WIN_PERCENTAGE,
        payload: rankedWinPercentage
    })
    yield put({
        type: opponentTypes.SAVE_FRIEND_WIN_PERCENTAGE,
        payload: friendWinPercentage
    })
    navigationPush(SCENE_KEYS.mainScreens.opponentsProfile, {
        isWithSearchBar: action.isWithSearchBar,
        isFromOpponentScreen: action.isFromOpponentScreen
    })
}
