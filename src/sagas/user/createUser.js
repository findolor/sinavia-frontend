import { put, call } from 'redux-saga/effects'
import { postUser } from '../../services/apiServices/user/postUser'
import { getToken } from '../../services/apiServices/token/getToken'
import { deviceStorage } from '../../services/deviceStorage'
import { navigationReset } from '../../services/navigationService'

export function* createUser(action) {
    try {
        const res = yield call(postUser, action.payload)

        deviceStorage.saveItemToStorage(
            'userInformation',
            JSON.stringify(action.payload)
        )

        deviceStorage.saveItemToStorage(
            'userCredentials',
            JSON.stringify({
                email: action.payload.email,
                password: action.payload.password
            })
        )

        deviceStorage.saveItemToStorage('userId', res.id)

        const response = yield call(getToken, {
            email: action.payload.email,
            password: action.payload.password
        })

        deviceStorage.saveItemToStorage('JWT', response.token)

        navigationReset('main')
    } catch (error) {
        // TODO remove console.log later
        console.log(error)
    }
}
