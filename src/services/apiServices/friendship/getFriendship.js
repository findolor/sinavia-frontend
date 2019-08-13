import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const getFriendship = async (userToken, userId, opponentId) => {
    try {
        const response = await axios.get(
            API_ENDPOINT + 'friendships/' + userId + '/' + opponentId,
            {
                headers: {
                    Authorization: 'Bearer ' + userToken
                }
            }
        )
        console.log(response)
        return response.data.data
    } catch (err) {
        console.log(err)
        return err.response
    }
}
