import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const markNotificationRead = async (userToken, notification) => {
    try {
        const response = await axios.put(
            API_ENDPOINT + 'notifications/',
            notification,
            {
                headers: {
                    Authorization: 'Bearer ' + userToken
                }
            }
        )
        return response.data.data
    } catch (err) {
        console.log(err)
        return err.response
    }
}
