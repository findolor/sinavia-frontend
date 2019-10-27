import axios from 'axios'
import { API_ENDPOINT, APP_VERSION } from '../../../config/index'

export const postUser = async params => {
    try {
        const response = await axios.post(
            API_ENDPOINT + APP_VERSION + '/users/',
            params.userInformation
        )

        return response.data.data
    } catch (error) {
        throw new Error(error)
    }
}
