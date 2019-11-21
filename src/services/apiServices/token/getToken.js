import axios from 'axios'
import { API_ENDPOINT, APP_VERSION } from '../../../config/index'
import { flashMessages } from '../../flashMessageBuilder'

export const getToken = async params => {
    try {
        const response = await axios.post(
            API_ENDPOINT + APP_VERSION + '/token/',
            params.userInformation,
            {
                params: {
                    deviceId: params.deviceId
                }
            }
        )

        return { token: response.data.data.token, id: response.data.data.id }
    } catch (err) {
        if (err.message === 'Network Error') {
            flashMessages.networkError()
            throw err
        }
    }
}
