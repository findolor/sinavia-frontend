import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const acceptFriendshipRequest = async (
    userToken,
    userId,
    friendId,
    clientUsername
) => {
    try {
        const response = await axios.put(
            API_ENDPOINT + 'friendships/',
            {
                userId: friendId,
                friendId: userId,
                friendshipStatus: 'approved',
                username: clientUsername
            },
            {
                headers: {
                    Authorization: 'Bearer ' + userToken
                }
            }
        )
        return response.data
    } catch (err) {
        console.log(err.response)
        return err.response
    }
}
