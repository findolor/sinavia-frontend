import axios from 'axios'
import { API_ENDPOINT, APP_VERSION } from '../../../config/index'
import { renewToken } from '../token/renewToken'

export const acceptFriendshipRequest = async (headers, params) => {
    try {
        let response = await axios.put(
            API_ENDPOINT + APP_VERSION + '/friendships/',
            {
                userId: params.friendId,
                friendId: params.userId,
                friendshipStatus: 'approved',
                username: params.clientUsername
            },
            {
                headers: headers
            }
        )
        return response.data
    } catch (err) {
        if (err.response.status === 401) {
            let res = await renewToken()
            headers.Authorization = 'Bearer ' + res.token
            response = await axios.put(
                API_ENDPOINT + APP_VERSION + '/friendships/',
                {
                    userId: params.friendId,
                    friendId: params.userId,
                    friendshipStatus: 'approved',
                    username: params.clientUsername
                },
                {
                    headers: headers
                }
            )
            return response.data
        } else return err.response
    }
}
