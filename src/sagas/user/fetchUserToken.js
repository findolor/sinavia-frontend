import { put, call } from 'redux-saga/effects'
import { userTypes } from '../../redux/user/actions'
import { getUserToken } from '../../services/apiServices/user/getUserToken'

export function* fetchUserToken(action) {
    const res = yield call(getUserToken, action.payload)
    console.log(res)
    yield put({ type: userTypes.GET_USER_TOKEN_SUCCESS, payload: res })
}
