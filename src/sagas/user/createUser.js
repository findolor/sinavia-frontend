import { put, call } from 'redux-saga/effects'
import { postUser } from '../../services/apiServices/user/postUser'
import { getToken } from '../../services/apiServices/token/getToken'
import { deviceStorage } from '../../services/deviceStorage'
import { navigationReset } from '../../services/navigationService'
import { clientTypes } from '../../redux/client/actions'

export function* createUser(action) {
    try {
        // We send the client information to our server
        const res = yield call(postUser, action.payload)

        // Saving the credentials to storage
        deviceStorage.saveItemToStorage('clientCredentials', {
            email: action.payload.email,
            password: action.payload.password
        })
        // Saving credentials to redux state
        yield put({
            type: clientTypes.SAVE_CLIENT_CREDENTIALS,
            payload: {
                email: action.payload.email,
                password: action.payload.password
            }
        })

        // Saving the id to storage
        deviceStorage.saveItemToStorage('clientDBId', res.id)
        // Saving the id to redux state
        yield put({
            type: clientTypes.SAVE_CLIENT_DB_ID,
            payload: res.id
        })

        // Get token from server
        const response = yield call(getToken, {
            email: action.payload.email,
            password: action.payload.password
        })
        // Save token to storage
        deviceStorage.saveItemToStorage('clientToken', response.token)
        // Save token to redux state
        yield put({
            type: clientTypes.SAVE_API_TOKEN,
            payload: response.token
        })

        // Saving information to storage
        delete action.payload.password
        action.payload.id = response.id
        deviceStorage.saveItemToStorage('clientInformation', action.payload)
        // Saving client information to redux state
        yield put({
            type: clientTypes.SAVE_CLIENT_INFORMATION,
            payload: action.payload
        })

        navigationReset('main')
    } catch (error) {
        // TODO remove console.log later
        console.log(error)
    }
}
