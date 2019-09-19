import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const sendFriendshipRequest = async (
    userToken,
    userId,
    friendId,
    clientUsername
) => {
    try {
        const response = await axios.post(
            API_ENDPOINT + 'friendships/',
            {
                userId: userId,
                friendId: friendId,
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
