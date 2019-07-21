import { call } from 'redux-saga/effects'
import { getUserToken } from '../../services/apiServices/user/getUserToken'
import { deviceStorage } from '../../services/deviceStorage'

export function* fetchUserToken(action) {
    try {
        const token = yield call(getUserToken, action.payload)

        deviceStorage.saveItemToStorage('JWT', token)
    } catch (error) {
        // TODO Remove console.log later
        console.log(error)
    }
}
