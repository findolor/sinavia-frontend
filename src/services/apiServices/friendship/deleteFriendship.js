import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'
import { renewToken } from '../token/renewToken'

export const deleteFriendship = async (
    userToken,
    userId,
    friendId,
    isClientUser
) => {
    try {
        let response = await axios.delete(API_ENDPOINT + 'friendships/', {
            headers: {
                Authorization: 'Bearer ' + userToken
            },
            params: {
                userId: userId,
                friendId: friendId,
                isClientUser: isClientUser
            }
        })
        return response.data
    } catch (err) {
        if (err.response.status === 401) {
            let res = await renewToken()
            response = await axios.delete(API_ENDPOINT + 'friendships/', {
                headers: {
                    Authorization: 'Bearer ' + res.token
                },
                params: {
                    userId: userId,
                    friendId: friendId,
                    isClientUser: isClientUser
                }
            })
            return response.data
        } else return err.response
    }
}
