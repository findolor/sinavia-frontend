import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'
import { renewToken } from '../token/renewToken'

export const markNotificationRead = async (userToken, notification) => {
    try {
        let response = await axios.put(
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
        if (err.response.status === 401) {
            let res = await renewToken()
            response = await axios.put(
                API_ENDPOINT + 'notifications/',
                notification,
                {
                    headers: {
                        Authorization: 'Bearer ' + res.token
                    }
                }
            )
            return response.data.data
        } else return err.response
    }
}
