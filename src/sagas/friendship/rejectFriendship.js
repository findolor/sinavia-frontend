import { makeDeleteRequest, apiServicesTree } from '../../services/apiServices'
import { put, call } from 'redux-saga/effects'

export async function rejectFriendshipService(clientToken, userId, friendId) {
    return makeDeleteRequest(
        apiServicesTree.friendshipApi.rejectFriendshipRequest,
        {
            clientToken: clientToken,
            userId: userId,
            friendId: friendId
        }
    )
}

export function* rejectFriendshipSaga(action) {
    const response = yield call(
        makeDeleteRequest,
        apiServicesTree.friendshipApi.rejectFriendshipRequest,
        {
            clientToken: action.clientToken,
            userId: action.userId,
            friendId: action.friendId
        }
    )

    /* if (response.success) {
        let index = action.friendshipRequests.findIndex(
            x => x.id === action.userId
        )
        action.friendshipRequests.splice(index, 1)

        yield put({
            type: friendTypes.SAVE_FRIEND_REQUESTS,
            payload: action.friendshipRequests
        })
    } */
}
