import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'
import { renewToken } from '../token/renewToken'

export const getFriendMatches = async (userToken, userId, friendId) => {
    try {
        let response = await axios.get(API_ENDPOINT + 'friendsMatches/', {
            headers: {
                Authorization: 'Bearer ' + userToken
            },
            params: {
                userId: userId,
                friendId: friendId
            }
        })
        return response.data.data
    } catch (err) {
        if (err.response.status === 401) {
            let res = await renewToken()
            response = await axios.get(API_ENDPOINT + 'friendsMatches/', {
                headers: {
                    Authorization: 'Bearer ' + res.token
                },
                params: {
                    userId: userId,
                    friendId: friendId
                }
            })
            return response.data.data
        } else return err.response
    }
}
