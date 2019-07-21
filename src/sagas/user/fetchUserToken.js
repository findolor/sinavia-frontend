import { call } from 'redux-saga/effects'
import { getToken } from '../../services/apiServices/token/getToken'
import { deviceStorage } from '../../services/deviceStorage'

export function* fetchUserToken(action) {
    try {
        const token = yield call(getToken, action.payload)

        deviceStorage.saveItemToStorage('JWT', token)
    } catch (error) {
        // TODO Remove console.log later
        console.log(error)
    }
}
