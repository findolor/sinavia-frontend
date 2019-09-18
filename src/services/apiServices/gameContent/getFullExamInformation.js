import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const getFullExamInformation = async (userToken, examId) => {
    try {
        const response = await axios.get(
            API_ENDPOINT + 'examEntities/' + examId + '/full',
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
