import { takeLatest, all } from 'redux-saga/effects'
import { clientTypes } from '../redux/client/actions'
import { userSagas } from './user'

export default function* root() {
    yield all([
        // User Sagas
        takeLatest(clientTypes.CREATE_USER, userSagas.createUser),
        takeLatest(clientTypes.FETCH_USER, userSagas.fetchUser),
        takeLatest(clientTypes.CHECK_USER_TOKEN, userSagas.authenticateUser),
        takeLatest(clientTypes.LOGIN_USER, userSagas.loginUser)
    ])
}
