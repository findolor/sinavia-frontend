import { put, call } from 'redux-saga/effects'
import { postUser } from '../../services/apiServices/user/postUser'
import { getToken } from '../../services/apiServices/token/getToken'
import { deviceStorage } from '../../services/deviceStorage'
import { clientTypes } from '../../redux/client/actions'
import { gameContentTypes } from '../../redux/gameContent/actions'
import DeviceInfo from 'react-native-device-info'

export function* createUser(action) {
    try {
        // We get the unique device id
        const deviceId = yield call(DeviceInfo.getUniqueId)

        action.payload.deviceId = deviceId

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

        yield put({
            type: gameContentTypes.GET_ALL_CONTENT,
            clientToken: response.token
        })
    } catch (error) {
        // TODO remove console.log later
        console.log(error)
    }
}
