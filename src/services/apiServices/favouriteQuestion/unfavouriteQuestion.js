import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'
import { renewToken } from '../token/renewToken'

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
        if (err.response.status === 401) {
            renewToken().then(res => {
                axios
                    .delete(API_ENDPOINT + 'favouriteQuestions/', {
                        headers: {
                            Authorization: 'Bearer ' + res.token
                        },
                        params: {
                            userId: userId,
                            questionId: questionId
                        }
                    })
                    .then(response => {
                        return response.data.success
                    })
            })
        } else throw new Error(err.message)
    }
}
