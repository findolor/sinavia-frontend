import { makePostRequest, apiServicesTree } from '../../services/apiServices'
import { put, call } from 'redux-saga/effects'
import { friendTypes } from '../../redux/friends/actions'

export async function sendFriendshipRequestService(
    clientToken,
    clientDBId,
    friendId,
    clientUsername
) {
    return makePostRequest(
        apiServicesTree.friendshipApi.sendFriendshipRequest,
        {
            clientToken: clientToken,
            userId: clientDBId,
            friendId: friendId,
            clientUsername: clientUsername
        }
    )
}

export function* sendFriendshipRequestSaga(action) {
    const response = yield call(
        makePostRequest,
        apiServicesTree.friendshipApi.sendFriendshipRequest,
        {
            clientToken: action.clientToken,
            userId: action.clientDBId,
            friendId: action.friendId,
            clientUsername: action.clientUsername
        }
    )

    if (response.success) {
        yield put({
            type: friendTypes.CHANGE_FRIENDSHIP_STATUS,
            friendshipStatus: 'friendRequestSent'
        })
        yield put({
            type: friendTypes.CHANGE_IS_FRIEND_REQUEST_SENT,
            isFriendRequestSent: true
        })
    }
}
