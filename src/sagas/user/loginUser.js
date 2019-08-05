import { put, call } from 'redux-saga/effects'
import { getToken } from '../../services/apiServices/token/getToken'
import { deviceStorage } from '../../services/deviceStorage'
import { navigationReset } from '../../services/navigationService'

export function* loginUser(action) {
    try {
        const token = yield call(getToken, action.payload)

        deviceStorage.saveItemToStorage('JWT', token)

        deviceStorage.saveItemToStorage(
            'userCredentials',
            JSON.stringify(action.payload)
        )

        navigationReset('main')
    } catch (error) {
        console.log(error)
    }
}
