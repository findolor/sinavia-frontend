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
    try {
        yield call(
            makeDeleteRequest,
            apiServicesTree.friendshipApi.rejectFriendshipRequest,
            {
                clientToken: action.clientToken,
                userId: action.userId,
                friendId: action.friendId
            }
        )
    } catch (err) {
        return
    }
}
