import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const searchUsers = async (userToken, keyword, userId) => {
    try {
        const response = await axios.get(API_ENDPOINT + 'searchUsers/', {
            headers: {
                Authorization: 'Bearer ' + userToken
            },
            params: {
                keyword: keyword,
                userId: userId
            }
        })

        return response.data.data
    } catch (err) {
        throw err
    }
}
