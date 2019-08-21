import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const postFCMToken = async (userToken, userInformation) => {
    try {
        const response = await axios.put(
            API_ENDPOINT + 'users/' + userInformation.id,
            userInformation,
            {
                headers: {
                    Authorization: 'Bearer ' + userToken
                }
            }
        )

        return response.data.success
    } catch (err) {
        throw new Error(err.message)
    }
}
