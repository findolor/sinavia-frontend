import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'
import { renewToken } from '../token/renewToken'

export const acceptFriendshipRequest = async (
    userToken,
    userId,
    friendId,
    clientUsername
) => {
    try {
        let response = await axios.put(
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
        if (err.response.status === 401) {
            let res = await renewToken()
            response = await axios.put(
                API_ENDPOINT + 'friendships/',
                {
                    userId: friendId,
                    friendId: userId,
                    friendshipStatus: 'approved',
                    username: clientUsername
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + res.token
                    }
                }
            )
            return response.data
        } else return err.response
    }
}
