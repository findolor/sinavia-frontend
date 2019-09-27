import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const checkToken = async (userToken, clientId, deviceId) => {
    try {
        const response = await axios.get(API_ENDPOINT + 'token/' + clientId, {
            headers: {
                Authorization: 'Bearer ' + userToken
            },
            params: {
                deviceId: deviceId
            }
        })

        return response.data.success
    } catch (err) {
        console.log(err)
        throw new Error(err.message)
    }
}
