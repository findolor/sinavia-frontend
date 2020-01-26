import { takeLatest, all, take } from 'redux-saga/effects'
import { clientTypes } from '../redux/client/actions'
import { opponentTypes } from '../redux/opponents/actions'
import { gameContentTypes } from '../redux/gameContent/actions'
import { userSagas } from './user'
import { questionSagas } from './question'
import { gameContentSagas } from './gameContent'
import { friendTypes } from '../redux/friends/actions'
import { friendshipSagas } from './friendship'
import { appTypes } from '../redux/app/actions'
import { notificationSagas } from './notification'
import { userJokerSagas } from './userJoker'

export default function* root() {
    yield all([
        // User Sagas
        takeLatest(clientTypes.USER_SIGN_UP, userSagas.userSignUp),
        takeLatest(clientTypes.FETCH_USER, userSagas.fetchUser),
        takeLatest(clientTypes.CHECK_USER_TOKEN, userSagas.authenticateUser),
        takeLatest(clientTypes.LOGIN_USER, userSagas.loginUser),
        takeLatest(
            clientTypes.FAVOURITE_QUESTION,
            questionSagas.favouriteQuestion
        ),
        takeLatest(
            clientTypes.UNFAVOURITE_QUESTION,
            questionSagas.unfavouriteQuestion
        ),
        takeLatest(
            opponentTypes.GET_OPPONENT_FULL_INFORMATION,
            userSagas.getOpponentFullInformation
        ),
        takeLatest(
            gameContentTypes.GET_FULL_EXAM_INFORMATION,
            gameContentSagas.getFullExamInformation
        ),
        takeLatest(
            gameContentTypes.GET_ALL_CONTENT,
            gameContentSagas.getAllContent
        ),
        takeLatest(
            friendTypes.GET_FRIEND_REQUESTS,
            friendshipSagas.getFriendRequests
        ),
        takeLatest(
            friendTypes.ACCEPT_FRIENDSHIP_REQUEST,
            friendshipSagas.acceptFriendshipRequest
        ),
        takeLatest(
            friendTypes.SEND_FRIENDSHIP_REQUEST,
            friendshipSagas.sendFriendshipRequest
        ),
        takeLatest(
            friendTypes.DELETE_FRIENDSHIP_REQUEST,
            friendshipSagas.deleteFriendshipRequest
        ),
        takeLatest(
            friendTypes.REJECT_FRIENDSHIP_REQUEST,
            friendshipSagas.rejectFriendshipRequest
        ),
        takeLatest(clientTypes.UPDATE_USER, userSagas.updateUser),
        takeLatest(
            appTypes.GET_NOTIFICATIONS,
            notificationSagas.getNotification
        ),
        takeLatest(clientTypes.CREATE_USER, userSagas.createUser),
        takeLatest(
            clientTypes.REWARD_ALL_USER_JOKERS,
            userJokerSagas.rewardAllUserJoker
        ),
        takeLatest(
            clientTypes.REWARD_USER_JOKER,
            userJokerSagas.rewardUserJoker
        )
    ])
}
