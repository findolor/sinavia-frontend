import { rejectFriendshipRequest } from '../../services/apiServices/friendship/rejectFriendshipRequest'
import { put, call } from 'redux-saga/effects'
import { friendTypes } from '../../redux/friends/actions'

export async function rejectFriendshipService(clientToken, userId, friendId) {
    const res = await rejectFriendshipRequest(clientToken, userId, friendId)

    return res
}

export function* rejectFriendshipSaga(action) {
    const response = yield call(
        rejectFriendshipRequest,
        action.clientToken,
        action.userId,
        action.friendId
    )

    if (response.success) {
        let index = action.friendshipRequests.findIndex(
            x => x.id === action.userId
        )
        action.friendshipRequests.splice(index, 1)

        yield put({
            type: friendTypes.SAVE_FRIEND_REQUESTS,
            payload: action.friendshipRequests
        })
    }
}
