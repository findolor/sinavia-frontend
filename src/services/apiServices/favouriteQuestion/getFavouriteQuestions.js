import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const getFavouriteQuestions = async (userToken, userId) => {
    try {
        const response = await axios.get(
            API_ENDPOINT + 'favouriteQuestions/' + userId,
            {
                headers: {
                    Authorization: 'Bearer ' + userToken
                }
            }
        )
        return response.data.data
    } catch (err) {
        throw new Error(err.message)
    }
}
