import axios from 'axios'
import { API_ENDPOINT, APP_VERSION } from '../../../config/index'
import { deviceStorage } from '../../deviceStorage'
import DeviceInfo from 'react-native-device-info'
import { flashMessages } from '../../flashMessageBuilder'

export const renewToken = async () => {
    try {
        const credentials = await deviceStorage.getItemFromStorage(
            'clientCredentials'
        )
        const signInMethod = await deviceStorage.getItemFromStorage(
            'signInMethod'
        )
        if (signInMethod === 'apple') {
            credentials.identityToken = await deviceStorage.getItemFromStorage(
                'appleIdentityToken'
            )
        }
        const deviceId = await DeviceInfo.getUniqueId()

        const response = await axios.post(
            API_ENDPOINT + APP_VERSION + '/token/',
            credentials,
            {
                params: {
                    deviceId: deviceId,
                    signInMethod: signInMethod
                }
            }
        )

        await deviceStorage.saveItemToStorage(
            'clientToken',
            response.data.data.token
        )

        return { token: response.data.data.token, id: response.data.data.id }
    } catch (err) {
        if (err.message === 'Network Error') {
            flashMessages.networkError()
            throw err
        }
    }
}
