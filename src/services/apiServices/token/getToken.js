import axios from 'axios'
import { API_ENDPOINT, APP_VERSION } from '../../../config/index'

export const getToken = async params => {
    try {
        const response = await axios.post(
            API_ENDPOINT + APP_VERSION + '/token/',
            params.userInformation,
            {
                params: {
                    deviceId: params.deviceId,
                    signInMethod: params.signInMethod
                }
            }
        )

        return { token: response.data.data.token, id: response.data.data.id }
    } catch (err) {
        console.log(err)
        throw err
    }
}
