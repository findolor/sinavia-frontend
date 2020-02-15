import axios from 'axios'
import { API_ENDPOINT, APP_VERSION } from '../../../config/index'
import { flashMessages } from '../../flashMessageBuilder'

export const checkUserWithIdentityToken = async params => {
    try {
        let response = await axios.get(
            API_ENDPOINT + APP_VERSION + '/users/check/identityToken',
            {
                params: {
                    identityToken: params.identityToken
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
