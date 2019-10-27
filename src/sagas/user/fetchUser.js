import { put, call } from 'redux-saga/effects'
import { clientTypes } from '../../redux/client/actions'
import { getUser } from '../../services/apiServices/user/getUser'
import { apiServicesTree, makeGetRequest } from '../../services/apiServices'

export function* fetchUser(action) {
    const res = yield call(getUser, action.payload)
    yield put({ type: clientTypes.FETCH_USER_SUCCESS, payload: res })
}

export async function getUserService(clientToken, userId) {
    return makeGetRequest(apiServicesTree.userApi.getUser, {
        clientToken: clientToken,
        id: userId
    })
}
