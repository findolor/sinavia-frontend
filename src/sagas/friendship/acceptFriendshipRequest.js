import { put, call } from 'redux-saga/effects'
import { friendTypes } from '../../redux/friends/actions'
import { makePutRequest, apiServicesTree } from '../../services/apiServices'

export async function acceptFriendshipRequestService(
    clientToken,
    clientDBId,
    friendId,
    clientUsername
) {
    makePutRequest(apiServicesTree.friendshipApi.acceptFriendshipRequest, {
        clientToken: clientToken,
        userId: clientDBId,
        friendId: friendId,
        username: clientUsername
    })
}

export function* acceptFriendshipRequestSaga(action) {
    const response = yield call(
        makePutRequest,
        apiServicesTree.friendshipApi.acceptFriendshipRequest,
        {
            clientToken: action.clientToken,
            userId: action.clientDBId,
            friendId: action.friendId,
            clientUsername: action.clientUsername,
            clientProfilePicture: action.profilePicture
        }
    )

    if (response.success) {
        action.friendIds.push(action.friendId)
        yield put({
            type: friendTypes.SAVE_FRIEND_IDS,
            payload: action.friendIds
        })
    }
}
