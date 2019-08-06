import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const getToken = async userInformation => {
    try {
        const response = await axios.post(
            API_ENDPOINT + 'token/',
            userInformation
        )

        return { token: response.data.data.token, id: response.data.data.id }
    } catch (err) {
        throw new Error(err.message)
    }
}
