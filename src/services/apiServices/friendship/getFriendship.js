import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const getFriendship = async (userToken, userId, friendId) => {
    try {
        const response = await axios.get(API_ENDPOINT + 'friendships/', {
            headers: {
                Authorization: 'Bearer ' + userToken
            },
            params: {
                userId: userId,
                friendId: friendId
            }
        })
        return response.data.data
    } catch (err) {
        console.log(err)
        return err.response
    }
}
