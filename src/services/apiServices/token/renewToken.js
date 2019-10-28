import axios from 'axios'
import { API_ENDPOINT, APP_VERSION } from '../../../config/index'
import { deviceStorage } from '../../deviceStorage'
import DeviceInfo from 'react-native-device-info'

export const renewToken = async () => {
    try {
        const credentials = await deviceStorage.getItemFromStorage(
            'clientCredentials'
        )
        const deviceId = await DeviceInfo.getUniqueId()

        const response = await axios.post(
            API_ENDPOINT + APP_VERSION + '/token/',
            credentials,
            {
                params: {
                    deviceId: deviceId
                }
            }
        )

        await deviceStorage.saveItemToStorage(
            'clientToken',
            response.data.data.token
        )

        return { token: response.data.data.token, id: response.data.data.id }
    } catch (err) {
        throw new Error(err.message)
    }
}
