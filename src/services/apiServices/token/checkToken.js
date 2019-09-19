import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const checkToken = async userToken => {
    try {
        const response = await axios.get(API_ENDPOINT + 'token/', {
            headers: {
                Authorization: 'Bearer ' + userToken
            }
        })

        return response.data.success
    } catch (err) {
        console.log(err)
        throw new Error(err.message)
    }
}
