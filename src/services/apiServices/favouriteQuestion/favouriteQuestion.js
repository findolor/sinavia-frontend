import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const favouriteQuestion = async (userToken, userId, questionId) => {
    try {
        const response = await axios.post(
            API_ENDPOINT + 'favouriteQuestions/',
            {
                userId: userId,
                questionId: questionId
            },
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
