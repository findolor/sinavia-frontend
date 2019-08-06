import { put, call } from 'redux-saga/effects'
import { getToken } from '../../services/apiServices/token/getToken'
import { getUser } from '../../services/apiServices/user/getUser'
import { deviceStorage } from '../../services/deviceStorage'
import { navigationReset } from '../../services/navigationService'

export function* loginUser(action) {
    try {
        // We get our token from the api
        // action.payload is our email and password
        const res = yield call(getToken, action.payload)

        // We save the token
        deviceStorage.saveItemToStorage('JWT', res.token)

        // We save our user credentials
        deviceStorage.saveItemToStorage(
            'userCredentials',
            JSON.stringify(action.payload)
        )

        // Then we get our user information
        const userInformation = yield call(getUser, res.token, res.id)

        // We save the user information
        deviceStorage.saveItemToStorage(
            'userInformation',
            JSON.stringify(userInformation)
        )

        // Going to the main screen
        navigationReset('main')
    } catch (error) {
        console.log(error)
    }
}
