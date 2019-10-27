import axios from 'axios'
import { API_ENDPOINT, APP_VERSION } from '../../../config/index'
import { renewToken } from '../token/renewToken'

export const updateFCMToken = async (headers, params) => {
    try {
        let response = await axios.put(
            API_ENDPOINT + APP_VERSION + '/users/' + params.userInformation.id,
            params.userInformation,
            {
                headers: headers
            }
        )
        return response.data.success
    } catch (err) {
        if (err.response.status === 401) {
            let res = await renewToken()
            headers.Authorization = 'Bearer ' + res.token
            response = await axios.put(
                API_ENDPOINT +
                    APP_VERSION +
                    '/users/' +
                    params.userInformation.id,
                params.userInformation,
                {
                    headers: headers
                }
            )
            return response.data.success
        } else throw new Error(err.message)
    }
}
