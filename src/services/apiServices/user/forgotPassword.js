import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const forgotPassword = async email => {
    try {
        const response = await axios.post(
            API_ENDPOINT + 'users/password/reset',
            {
                email: email
            }
        )
        return response.data.data
    } catch (err) {
        throw err
    }
}
