import { put, call } from 'redux-saga/effects'
import { checkToken } from '../../services/apiServices/token/checkToken'
import { getToken } from '../../services/apiServices/token/getToken'
import { deviceStorage } from '../../services/deviceStorage'
import { userTypes } from '../../redux/user/actions'

export function* loginUser(action) {
    try {
        const res = yield call(checkToken, action.payload)

        if (res) {
            yield put({
                type: userTypes.CHECK_USER_TOKEN_SUCCESS,
                payload: true
            })
        }
    } catch (error) {
        try {
            const token = yield call(getToken, {
                email: 'test@lol.com',
                password: 'test'
            })

            deviceStorage.saveItemToStorage('JWT', token)

            yield put({
                type: userTypes.CHECK_USER_TOKEN_SUCCESS,
                payload: true
            })
        } catch (error) {
            console.log(error)
        }
    }
}
