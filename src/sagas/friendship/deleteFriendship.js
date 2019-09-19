import { deleteFriendship } from '../../services/apiServices/friendship/deleteFriendship'
import { put, call } from 'redux-saga/effects'
import { opponentTypes } from '../../redux/opponents/actions'
import { friendTypes } from '../../redux/friends/actions'

export async function deleteFriendshipService(
    clientToken,
    userId,
    friendId,
    isClientUser
) {
    const res = deleteFriendship(clientToken, userId, friendId, isClientUser)

    return res
}

export function* deleteFriendshipRequestSaga(action) {
    const response = yield call(
        deleteFriendship,
        action.clientToken,
        action.clientDBId,
        action.friendId,
        action.isClientUser
    )

    if (response.success) {
        yield put({
            type: friendTypes.CHANGE_FRIENDSHIP_STATUS,
            friendshipStatus: 'addFriend'
        })

        let index = action.friendIds.indexOf(action.friendId)
        action.friendIds.splice(index, 1)

        yield put({
            type: friendTypes.SAVE_FRIEND_IDS,
            payload: action.friendIds
        })
    }
}
