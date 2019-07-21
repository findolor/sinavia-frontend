import { put, call } from 'redux-saga/effects'
import { userTypes } from '../../redux/user/actions'
import { getUser } from '../../services/apiServices/user/getUser'

export function* fetchUser(action) {
    const res = yield call(getUser, action.payload)
    console.log(res)
    yield put({ type: userTypes.FETCH_USER_SUCCESS, payload: res })
}
