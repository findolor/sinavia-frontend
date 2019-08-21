import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const deleteFriendship = async (userToken, userId) => {
    try {
        const response = await axios.delete(
            API_ENDPOINT + 'friendships/' + userId,
            {
                headers: {
                    Authorization: 'Bearer ' + userToken
                }
            }
        )
        return response.data.data
    } catch (err) {
        console.log(err)
        return err.response
    }
}
