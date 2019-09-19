import { getFriendRequests } from '../../services/apiServices/friendship/getFriendRequests'
import { getUsers } from '../../services/apiServices/user/getUsers'
import { put, call } from 'redux-saga/effects'
import { friendTypes } from '../../redux/friends/actions'

export function* getFriendRequestsSaga(action) {
    const requestIds = yield call(
        getFriendRequests,
        action.clientToken,
        action.clientId
    )

    if (Object.keys(requestIds).length === 0) return

    const users = yield call(getUsers, action.clientToken, requestIds)

    yield put({
        type: friendTypes.SAVE_FRIEND_REQUESTS,
        payload: users
    })
}

export async function getFriendRequestsService(clientToken, clientDBId) {
    const res = getFriendRequests(clientToken, clientDBId)

    return res
}
