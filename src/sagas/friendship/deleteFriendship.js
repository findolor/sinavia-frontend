import { makeDeleteRequest, apiServicesTree } from '../../services/apiServices'
import { put, call } from 'redux-saga/effects'
import { friendTypes } from '../../redux/friends/actions'

export async function deleteFriendshipService(
    clientToken,
    userId,
    friendId,
    isClientUser
) {
    return makeDeleteRequest(apiServicesTree.friendshipApi.deleteFriendship, {
        clientToken: clientToken,
        userId: userId,
        friendId: friendId,
        isClientUser: isClientUser
    })
}

export function* deleteFriendshipRequestSaga(action) {
    let response
    try {
        response = yield call(
            makeDeleteRequest,
            apiServicesTree.friendshipApi.deleteFriendship,
            {
                clientToken: action.clientToken,
                userId: action.clientDBId,
                friendId: action.friendId,
                isClientUser: action.isClientUser
            }
        )
    } catch (err) {
        return
    }

    if (response.success) {
        let index = action.friendIds.indexOf(action.friendId)
        action.friendIds.splice(index, 1)

        yield put({
            type: friendTypes.SAVE_FRIEND_IDS,
            payload: action.friendIds
        })
    }
}
