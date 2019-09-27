import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const getToken = async (userInformation, deviceId) => {
    try {
        const response = await axios.post(
            API_ENDPOINT + 'token/',
            userInformation,
            {
                params: {
                    deviceId: deviceId
                }
            }
        )

        return { token: response.data.data.token, id: response.data.data.id }
    } catch (err) {
        console.log(err.response)
        throw new Error(err.message)
    }
}
