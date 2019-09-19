import { acceptFriendshipRequest } from '../../services/apiServices/friendship/acceptFriendshipRequest'
import { put, call } from 'redux-saga/effects'
import { friendTypes } from '../../redux/friends/actions'
import { opponentTypes } from '../../redux/opponents/actions'

export async function acceptFriendshipRequestService(
    clientToken,
    clientDBId,
    friendId,
    clientUsername
) {
    const res = acceptFriendshipRequest(
        clientToken,
        clientDBId,
        friendId,
        clientUsername
    )

    return res
}

export function* acceptFriendshipRequestSaga(action) {
    const response = yield call(
        acceptFriendshipRequest,
        action.clientToken,
        action.clientDBId,
        action.friendId,
        action.clientUsername
    )

    if (response.success) {
        yield put({
            type: friendTypes.CHANGE_FRIENDSHIP_STATUS,
            friendshipStatus: 'alreadyFriend'
        })
        yield put({
            type: friendTypes.CHANGE_IS_FRIEND_REQUEST_SENT,
            isFriendRequestSent: false
        })
        action.friendIds.push(action.friendId)
        yield put({
            type: friendTypes.SAVE_FRIEND_IDS,
            payload: action.friendIds
        })
    }
}
