import { sendFriendshipRequest } from '../../services/apiServices/friendship/sendFriendshipRequest'
import { put, call, delay } from 'redux-saga/effects'
import { friendTypes } from '../../redux/friends/actions'

export async function sendFriendshipRequestService(
    clientToken,
    clientDBId,
    friendId,
    clientUsername
) {
    const res = sendFriendshipRequest(
        clientToken,
        clientDBId,
        friendId,
        clientUsername
    )

    return res
}

export function* sendFriendshipRequestSaga(action) {
    const response = yield call(
        sendFriendshipRequest,
        action.clientToken,
        action.clientDBId,
        action.friendId,
        action.clientUsername
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
