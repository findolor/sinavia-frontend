import { put, call } from 'redux-saga/effects'
import { checkToken } from '../../services/apiServices/token/checkToken'
import { getToken } from '../../services/apiServices/token/getToken'
import { deviceStorage } from '../../services/deviceStorage'
import { navigationReset } from '../../services/navigationService'

async function getUserInformation(key) {
    const userInformation = await deviceStorage.getItemFromStorage(key)
    return userInformation
}

function goToMainScreen() {
    setTimeout(() => {
        navigationReset('main')
    }, 3000)
}

export function* authenticateUser(action) {
    try {
        // We first check if the token is valid.
        // If the res is true we continue to the main screen
        const res = yield call(checkToken, action.payload)

        if (res) goToMainScreen()
    } catch (error) {
        // If we get unauthorized from api
        try {
            // We get the user credentials from device storage
            const info = yield call(getUserInformation, 'userCredentials')

            const userCredentials = JSON.parse(info)

            // We send the credentials for getting the token and id
            const response = yield call(getToken, {
                email: userCredentials.email,
                password: userCredentials.password
            })

            // We save the token
            deviceStorage.saveItemToStorage('JWT', response.token)

            // We save the user id
            deviceStorage.saveItemToStorage('userId', response.id)

            goToMainScreen()
        } catch (error) {
            console.log(error)
        }
    }
}
