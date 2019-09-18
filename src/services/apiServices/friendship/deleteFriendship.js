import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const deleteFriendship = async (
    userToken,
    userId,
    friendId,
    isClientUser
) => {
    try {
        const response = await axios.delete(API_ENDPOINT + 'friendships/', {
            headers: {
                Authorization: 'Bearer ' + userToken
            },
            params: {
                userId: userId,
                friendId: friendId,
                isClientUser: isClientUser
            }
        })
        return response.data.data
    } catch (err) {
        console.log(err)
        return err.response
    }
}
