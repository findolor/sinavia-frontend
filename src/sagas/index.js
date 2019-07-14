import { takeLatest, all, take } from 'redux-saga/effects'
import { exampleTypes } from '../redux/example/actions'
import { userTypes } from '../redux/user/actions'
import { exampleSaga } from './exampleSaga'
import { userSagas } from './user'

export default function* root() {
    yield all([
        takeLatest(exampleTypes.SOME_TYPE_REQUEST, exampleSaga),
        // We fill this function with all of our sagas
        takeLatest(userTypes.CREATE_USER, userSagas.createUser),
        takeLatest(userTypes.FETCH_USER, userSagas.fetchUser),
        takeLatest(userTypes.GET_USER_TOKEN, userSagas.fetchUserToken)
    ])
}
