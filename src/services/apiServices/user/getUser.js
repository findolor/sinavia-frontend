import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const getUser = async (userToken, id) => {
    try {
        const response = await axios.get(API_ENDPOINT + 'users/' + id, {
            headers: {
                Authorization: 'Bearer ' + userToken
            }
        })
        return response.data.data
    } catch (err) {
        console.log(err)
        return err.response
    }
}
