import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const rejectFriendshipRequest = async (userToken, userId, friendId) => {
    try {
        const response = await axios.delete(
            API_ENDPOINT + 'friendships/reject/',
            {
                headers: {
                    Authorization: 'Bearer ' + userToken
                },
                params: {
                    userId: userId,
                    friendId: friendId
                }
            }
        )
        return response.data
    } catch (err) {
        console.log(err.response)
        return err.response
    }
}
