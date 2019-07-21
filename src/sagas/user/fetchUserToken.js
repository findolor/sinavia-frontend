import { put, call } from 'redux-saga/effects'
import { userTypes } from '../../redux/user/actions'
import { getUserToken } from '../../services/apiServices/user/getUserToken'
import { deviceStorage } from '../../services/deviceStorage'

export function* fetchUserToken(action) {
    try {
        const token = yield call(getUserToken, action.payload)

        deviceStorage.saveItemToStorage('JWT', token)

        yield put({ type: userTypes.GET_USER_TOKEN_SUCCESS, payload: token })
    } catch (error) {
        // TODO Remove console.log later
        console.log(error)
    }
}
