import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const postUser = async userInformation => {
    try {
        const response = await axios.post(
            API_ENDPOINT + 'users/',
            userInformation
        )

        return response.data.data
    } catch (error) {
        throw new Error(error)
    }
}
