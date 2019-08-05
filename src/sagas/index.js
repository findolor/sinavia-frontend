import { takeLatest, all } from 'redux-saga/effects'
import { userTypes } from '../redux/user/actions'
import { userSagas } from './user'

export default function* root() {
    yield all([
        // User Sagas
        takeLatest(userTypes.CREATE_USER, userSagas.createUser),
        takeLatest(userTypes.FETCH_USER, userSagas.fetchUser),
        takeLatest(userTypes.GET_USER_TOKEN, userSagas.fetchUserToken),
        takeLatest(userTypes.CHECK_USER_TOKEN, userSagas.loginUser)
    ])
}
