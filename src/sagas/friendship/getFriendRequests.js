import { makeGetRequest, apiServicesTree } from '../../services/apiServices'
import { put, call } from 'redux-saga/effects'
import { friendTypes } from '../../redux/friends/actions'

export function* getFriendRequestsSaga(action) {
    // This is for activity indicator
    yield put({
        type: friendTypes.SAVE_FRIEND_REQUESTS,
        payload: null
    })

    let requestIds
    try {
        requestIds = yield call(
            makeGetRequest,
            apiServicesTree.friendshipApi.getFriendRequests,
            {
                clientToken: action.clientToken,
                userId: action.clientId
            }
        )
    } catch (err) {
        return
    }

    if (requestIds === undefined || Object.keys(requestIds).length === 0) {
        yield put({
            type: friendTypes.SAVE_FRIEND_REQUESTS,
            payload: []
        })
        return
    }

    const users = yield call(makeGetRequest, apiServicesTree.userApi.getUsers, {
        idList: requestIds,
        clientToken: action.clientToken
    })

    yield put({
        type: friendTypes.SAVE_FRIEND_REQUESTS,
        payload: users
    })
}

export async function getFriendRequestsService(clientToken, clientDBId) {
    return makeGetRequest(apiServicesTree.friendshipApi.getFriendRequests, {
        clientToken: clientToken,
        userId: clientDBId
    })
}
