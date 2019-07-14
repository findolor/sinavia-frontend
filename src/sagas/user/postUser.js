import { put, call } from 'redux-saga/effects'
import { userTypes } from '../../redux/user/actions'
import { postUser } from '../../services/apiServices/user/postUser'

export function* createUser(action) {
    const res = yield call(postUser, action.payload)
    console.log(res)
    yield put({ type: userTypes.CREATE_USER_SUCCESS, payload: res })
}
