import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'
import { renewToken } from '../token/renewToken'

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
        if (err.response.status === 401) {
            renewToken().then(res => {
                axios
                    .post(
                        API_ENDPOINT + 'friendships/',
                        {
                            userId: userId,
                            friendId: friendId,
                            username: clientUsername
                        },
                        {
                            headers: {
                                Authorization: 'Bearer ' + res.token
                            }
                        }
                    )
                    .then(response => {
                        return response.data
                    })
            })
        } else return err.response
    }
}
