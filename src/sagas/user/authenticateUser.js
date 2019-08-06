import { put, call } from 'redux-saga/effects'
import { checkToken } from '../../services/apiServices/token/checkToken'
import { getToken } from '../../services/apiServices/token/getToken'
import { deviceStorage } from '../../services/deviceStorage'
import { navigationReset } from '../../services/navigationService'
import { userTypes } from '../../redux/user/actions'

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
        let res = yield call(checkToken, action.payload)

        // We get userInformation from storage
        let user = yield call(getUserInformation, 'userInformation')

        let userInformation = JSON.parse(user)

        // Then we save some attributes as redux state
        yield put({
            type: userTypes.AUTHENTICATE_USER_SUCCESS,
            payload: {
                username: userInformation.username,
                name: userInformation.name,
                lastname: userInformation.lastname,
                profilePicture: userInformation.profilePicture,
                coverPicture: userInformation.coverPicture
            }
        })

        if (res) goToMainScreen()
    } catch (error) {
        // If we get unauthorized from api
        try {
            // We get the user credentials from device storage
            const info = yield call(getUserInformation, 'userCredentials')

            const userCredentials = JSON.parse(info)

            // We send the credentials for getting the token and id
            let res = yield call(getToken, {
                email: userCredentials.email,
                password: userCredentials.password
            })

            // We save the token
            deviceStorage.saveItemToStorage('JWT', res.token)

            // We save the user id
            deviceStorage.saveItemToStorage('userId', res.id)

            // We get userInformation from storage
            let user = yield call(getUserInformation, 'userInformation')

            let userInformation = JSON.parse(user)

            // Then we save some attributes as redux state
            yield put({
                type: userTypes.AUTHENTICATE_USER_SUCCESS,
                payload: {
                    username: userInformation.username,
                    name: userInformation.name,
                    lastname: userInformation.lastname,
                    profilePicture: userInformation.profilePicture,
                    coverPicture: userInformation.coverPicture
                }
            })

            goToMainScreen()
        } catch (error) {
            console.log(error)
        }
    }
}
