import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const unfavouriteQuestion = async (userToken, userId, questionId) => {
    try {
        const response = await axios.delete(
            API_ENDPOINT + 'favouriteQuestions/',
            {
                headers: {
                    Authorization: 'Bearer ' + userToken
                },
                params: {
                    userId: userId,
                    questionId: questionId
                }
            }
        )

        return response.data.success
    } catch (err) {
        throw new Error(err.message)
    }
}
