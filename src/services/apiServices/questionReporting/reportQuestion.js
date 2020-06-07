import axios from 'axios'
import { API_ENDPOINT, APP_VERSION } from '../../../config/index'
import { renewToken } from '../token/renewToken'
import { flashMessages } from '../../flashMessageBuilder'

export const reportQuestion = async (headers, params) => {
    try {
        let response = await axios.post(
            API_ENDPOINT + APP_VERSION + '/report/question/',
            params,
            {
                headers: headers
            }
        )
        return response.data
    } catch (err) {
        if (err.message === 'Network Error') {
            flashMessages.networkError()
            throw err
        }
        if (err.response.status === 401) {
            let res = await renewToken()
            headers.Authorization = 'Bearer ' + res.token
            response = await axios.post(
                API_ENDPOINT + APP_VERSION + '/report/question/',
                params,
                {
                    headers: headers
                }
            )
            return response.data
        } else return err.response
    }
}
