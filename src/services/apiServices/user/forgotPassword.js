import axios from 'axios'
import { API_ENDPOINT, APP_VERSION } from '../../../config/index'
import { flashMessages } from '../../flashMessageBuilder'

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
        if (
            err.response !== undefined &&
            err.response.data.error === 'Invalid User'
        ) {
            flashMessages.emailError()
            throw err
        }
        if (err.message === 'Network Error') {
            flashMessages.networkError()
            throw err
        }
    }
}
