import axios from 'axios'
import { API_ENDPOINT, APP_VERSION } from '../../../config/index'
import { flashMessages } from '../../flashMessageBuilder'

export const checkToken = async (headers, params) => {
    try {
        const response = await axios.get(
            API_ENDPOINT + APP_VERSION + '/token/' + params.clientId,
            {
                headers: headers,
                params: {
                    deviceId: params.deviceId
                }
            }
        )

        return response.data.success
    } catch (err) {
        if (err.message === 'Network Error') {
            flashMessages.networkError()
            throw new Error(err.message)
        }
    }
}
