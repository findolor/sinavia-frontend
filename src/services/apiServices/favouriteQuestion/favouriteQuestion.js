import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'
import { renewToken } from '../token/renewToken'

export const favouriteQuestion = async (userToken, userId, questionId) => {
    try {
        let response = await axios.post(
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
        if (err.response.status === 401) {
            let res = await renewToken()
            response = await axios.post(
                API_ENDPOINT + 'favouriteQuestions/',
                {
                    userId: userId,
                    questionId: questionId
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + res.token
                    }
                }
            )
            return response.data.data
        } else throw new Error(err.message)
    }
}
