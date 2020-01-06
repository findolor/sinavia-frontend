import axios from 'axios'
import { API_ENDPOINT, APP_VERSION } from '../../../config/index'
import { flashMessages } from '../../flashMessageBuilder'

export const checkUser = async params => {
    try {
        let response = await axios.get(
            API_ENDPOINT + APP_VERSION + '/users/check',
            {
                params: {
                    email: params.email
                }
            }
        )
        return response.data.data
    } catch (err) {
        if (err.message === 'Network Error') {
            flashMessages.networkError()
            throw err
        }
    }
}
