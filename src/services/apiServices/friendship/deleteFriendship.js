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
        return response.data
    } catch (err) {
        console.log(err)
        if (err.response.status === 401) {
            renewToken().then(res => {
                axios
                    .delete(API_ENDPOINT + 'friendships/', {
                        headers: {
                            Authorization: 'Bearer ' + res.token
                        },
                        params: {
                            userId: userId,
                            friendId: friendId,
                            isClientUser: isClientUser
                        }
                    })
                    .then(response => {
                        return response.data
                    })
            })
        } else return err.response
    }
}
