import axios from 'axios'
import { API_ENDPOINT, APP_VERSION } from '../../../config/index'
import { flashMessages } from '../../flashMessageBuilder'

export const postUser = async params => {
    try {
        const response = await axios.post(
            API_ENDPOINT + APP_VERSION + '/users/',
            params.userInformation
        )

        return response.data.data
    } catch (err) {
        if (err.message === 'Network Error') {
            flashMessages.networkError()
            throw err
        }
        if (err.response.data.error === 'existing-information') {
            flashMessages.generalMessage(
                'Bu kullanıcı ismi başka bir kullanıcıya aittir.'
            )
            throw err
        }
    }
}
