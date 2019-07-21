import { put, call } from 'redux-saga/effects'
import { userTypes } from '../../redux/user/actions'
import { postUser } from '../../services/apiServices/user/postUser'

export function* createUser(action) {
    try {
        const res = yield call(postUser, action.payload)

        yield put({ type: userTypes.CREATE_USER_SUCCESS, payload: res })
    } catch (error) {
        // TODO remove console.log later
        console.log(error)
    }
}
