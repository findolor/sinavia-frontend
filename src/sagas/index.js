import { takeLatest, all, take } from 'redux-saga/effects'
import { clientTypes } from '../redux/client/actions'
import { opponentTypes } from '../redux/opponents/actions'
import { gameContentTypes } from '../redux/gameContent/actions'
import { userSagas } from './user'
import { questionSagas } from './question'
import { gameContentSagas } from './gameContent'

export default function* root() {
    yield all([
        // User Sagas
        takeLatest(clientTypes.CREATE_USER, userSagas.createUser),
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
            clientTypes.SAVE_FAVOURITE_QUESTIONS,
            questionSagas.saveFavouriteQuestions
        )
    ])
}
