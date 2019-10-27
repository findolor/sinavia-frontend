import axios from 'axios'
import { API_ENDPOINT, APP_VERSION } from '../../../config/index'
import { renewToken } from '../token/renewToken'

export const getFavouriteQuestions = async (headers, params) => {
    try {
        let response = await axios.get(
            API_ENDPOINT + APP_VERSION + '/favouriteQuestions/' + params.userId,
            {
                headers: headers
            }
        )
        return response.data.data
    } catch (err) {
        if (err.response.status === 401) {
            let res = await renewToken()
            headers.Authorization = 'Bearer ' + res.token
            response = await axios.get(
                API_ENDPOINT +
                    APP_VERSION +
                    '/favouriteQuestions/' +
                    params.userId,
                {
                    headers: headers
                }
            )
            return response.data.data
        } else throw new Error(err.message)
    }
}
