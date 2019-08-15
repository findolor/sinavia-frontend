import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const getUser = async (userToken, idList) => {
    try {
        const response = await axios.get(API_ENDPOINT + 'users/', {
            headers: {
                Authorization: 'Bearer ' + userToken
            },
            params: {
                idList: idList
            }
        })
        return response.data.data
    } catch (err) {
        console.log(err)
        return err.response
    }
}
