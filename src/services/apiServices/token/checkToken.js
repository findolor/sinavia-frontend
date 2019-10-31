import axios from 'axios'
import { API_ENDPOINT, APP_VERSION } from '../../../config/index'

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
        console.log(err.response)
        throw new Error(err.message)
    }
}
