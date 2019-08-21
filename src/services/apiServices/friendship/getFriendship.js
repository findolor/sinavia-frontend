import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const getFriendship = async (userToken, userId, opponentId) => {
    try {
        const response = await axios.get(API_ENDPOINT + 'friendships/', {
            headers: {
                Authorization: 'Bearer ' + userToken
            },
            params: {
                userId: userId,
                opponentId: opponentId
            }
        })
        return response.data.data
    } catch (err) {
        console.log(err)
        return err.response
    }
}
