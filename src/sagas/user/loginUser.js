import { put, call } from 'redux-saga/effects'
import { checkToken } from '../../services/apiServices/token/checkToken'
import { getToken } from '../../services/apiServices/token/getToken'
import { deviceStorage } from '../../services/deviceStorage'
import { navigationReset } from '../../services/navigationService'

async function getUserInformation(key) {
    const userInformation = await deviceStorage.getItemFromStorage(key)
    return userInformation
}

export function* loginUser(action) {
    try {
        const res = yield call(checkToken, action.payload)

        if (res) navigationReset('main')
    } catch (error) {
        try {
            const info = yield call(getUserInformation, 'userInformation')

            const userInformation = JSON.parse(info)

            const token = yield call(getToken, {
                email: userInformation.email,
                password: userInformation.password
            })

            deviceStorage.saveItemToStorage('JWT', token)

            navigationReset('main')
        } catch (error) {
            console.log(error)
        }
    }
}
