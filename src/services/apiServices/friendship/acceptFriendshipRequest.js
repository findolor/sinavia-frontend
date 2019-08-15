import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const acceptFriendshipRequest = async (userToken, userId, friendId) => {
    try {
        const response = await axios.put(
            API_ENDPOINT + 'friendships/',
            {
                userId: friendId,
                friendId: userId,
                friendshipStatus: 'approved'
            },
            {
                headers: {
                    Authorization: 'Bearer ' + userToken
                }
            }
        )
        return response.data.data
    } catch (err) {
        console.log(err.response)
        return err.response
    }
}
