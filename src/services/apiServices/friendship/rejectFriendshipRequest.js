import axios from 'axios'
import { API_ENDPOINT, APP_VERSION } from '../../../config/index'
import { renewToken } from '../token/renewToken'

export const rejectFriendshipRequest = async (headers, params) => {
    try {
        let response = await axios.delete(
            API_ENDPOINT + APP_VERSION + '/friendships/reject/',
            {
                headers: headers,
                params: {
                    userId: params.userId,
                    friendId: params.friendId
                }
            }
        )
        return response.data
    } catch (err) {
        if (err.response.status === 401) {
            let res = await renewToken()
            headers.Authorization = 'Bearer ' + res.token
            response = await axios.delete(
                API_ENDPOINT + APP_VERSION + '/friendships/reject/',
                {
                    headers: headers,
                    params: {
                        userId: params.userId,
                        friendId: params.friendId
                    }
                }
            )
            return response.data
        } else return err.response
    }
}
