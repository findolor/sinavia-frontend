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
        const res = yield call(checkToken, action.payload)

        if (res) goToMainScreen()
    } catch (error) {
        try {
            const info = yield call(getUserInformation, 'userCredentials')

            const userInformation = JSON.parse(info)

            const response = yield call(getToken, {
                email: userInformation.email,
                password: userInformation.password
            })

            deviceStorage.saveItemToStorage('JWT', response.token)

            deviceStorage.saveItemToStorage('userId', response.id)

            goToMainScreen()
        } catch (error) {
            console.log(error)
        }
    }
}
