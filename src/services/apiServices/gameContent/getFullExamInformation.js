import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'
import { renewToken } from '../token/renewToken'

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
        if (err.response.status === 401) {
            renewToken().then(res => {
                axios
                    .get(API_ENDPOINT + 'examEntities/' + examId + '/full', {
                        headers: {
                            Authorization: 'Bearer ' + res.token
                        }
                    })
                    .then(response => {
                        return response.data.data
                    })
            })
        } else return err.response
    }
}
