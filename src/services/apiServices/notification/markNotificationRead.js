import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'
import { renewToken } from '../token/renewToken'

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
        if (err.response.status === 401) {
            renewToken().then(res => {
                axios
                    .put(API_ENDPOINT + 'notifications/', notification, {
                        headers: {
                            Authorization: 'Bearer ' + res.token
                        }
                    })
                    .then(response => {
                        return response.data.data
                    })
            })
        } else return err.response
    }
}
