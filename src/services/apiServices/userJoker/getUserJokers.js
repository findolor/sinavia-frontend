import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const getUserJokers = async (userToken, userId) => {
    try {
        const response = await axios.get(
            API_ENDPOINT + 'userJokers/' + userId,
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
