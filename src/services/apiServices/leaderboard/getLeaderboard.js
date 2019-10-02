import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const getLeaderboard = async (
    userToken,
    examId,
    courseId,
    subjectId
) => {
    try {
        const response = await axios.get(API_ENDPOINT + 'leaderboards/', {
            headers: {
                Authorization: 'Bearer ' + userToken
            },
            params: {
                examId: examId,
                courseId: courseId,
                subjectId: subjectId
            }
        })
        return response.data.data
    } catch (err) {
        console.log(err)
        return err.response
    }
}
