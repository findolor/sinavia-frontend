import { takeLatest, all } from 'redux-saga/effects'
import { clientTypes } from '../redux/client/actions'
import { userSagas } from './user'
import { questionSagas } from './question'

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
        )
    ])
}
