import axios from 'axios'
import { API_ENDPOINT, APP_VERSION } from '../../../config/index'

export const forgotPassword = async params => {
    try {
        const response = await axios.post(
            API_ENDPOINT + APP_VERSION + '/users/password/reset',
            {
                email: params.email
            }
        )
        return response.data.data
    } catch (err) {
        throw err
    }
}
