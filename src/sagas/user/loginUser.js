import { put, call } from 'redux-saga/effects'
import { getToken } from '../../services/apiServices/token/getToken'
import { getUser } from '../../services/apiServices/user/getUser'
import { deviceStorage } from '../../services/deviceStorage'
import { navigationReset } from '../../services/navigationService'

export function* loginUser(action) {
    try {
        const res = yield call(getToken, action.payload)

        deviceStorage.saveItemToStorage('JWT', res.token)

        deviceStorage.saveItemToStorage(
            'userCredentials',
            JSON.stringify(action.payload)
        )

        const userInformation = yield call(getUser, res.token, res.id)

        deviceStorage.saveItemToStorage(
            'userInformation',
            JSON.stringify(userInformation)
        )

        navigationReset('main')
    } catch (error) {
        console.log(error)
    }
}
