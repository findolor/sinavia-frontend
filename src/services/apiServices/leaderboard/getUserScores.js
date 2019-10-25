import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'
import { renewToken } from '../token/renewToken'

export const getUserScores = async (
    userToken,
    userIdList,
    clientId,
    params
) => {
    try {
        let response = await axios.get(API_ENDPOINT + 'leaderboards/friends/', {
            headers: {
                Authorization: 'Bearer ' + userToken
            },
            params: {
                userIdList: userIdList,
                clientId: clientId,
                examId: params.examId,
                courseId: params.courseId,
                subjectId: params.subjectId
            }
        })
        return response.data.data
    } catch (err) {
        if (err.response.status === 401) {
            let res = await renewToken()
            response = await axios.get(API_ENDPOINT + 'leaderboards/friends/', {
                headers: {
                    Authorization: 'Bearer ' + res.token
                },
                params: {
                    userIdList: userIdList,
                    clientId: clientId,
                    examId: params.examId,
                    courseId: params.courseId,
                    subjectId: params.subjectId
                }
            })
            return response.data.data
        } else return err.response
    }
}
