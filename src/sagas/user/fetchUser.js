import { put, call } from 'redux-saga/effects'
import { clientTypes } from '../../redux/client/actions'
import { getUser } from '../../services/apiServices/user/getUser'

export function* fetchUser(action) {
    const res = yield call(getUser, action.payload)
    console.log(res)
    yield put({ type: clientTypes.FETCH_USER_SUCCESS, payload: res })
}

export async function getUserService(clientToken, userId) {
    const res = getUser(clientToken, userId)

    return res
}
