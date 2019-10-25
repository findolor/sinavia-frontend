import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'
import { renewToken } from '../token/renewToken'

export const getFriendship = async (userToken, userId, friendId) => {
    try {
        const response = await axios.get(API_ENDPOINT + 'friendships/', {
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
        console.log(err)
        if (err.response.status === 401) {
            renewToken().then(res => {
                axios
                    .get(API_ENDPOINT + 'friendships/', {
                        headers: {
                            Authorization: 'Bearer ' + res.token
                        },
                        params: {
                            userId: userId,
                            friendId: friendId
                        }
                    })
                    .then(response => {
                        return response.data.data
                    })
            })
        } else return err.response
    }
}
