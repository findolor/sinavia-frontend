import axios from 'axios'
import { API_ENDPOINT, APP_VERSION } from '../../../config/index'
import { renewToken } from '../token/renewToken'
import { flashMessages } from '../../flashMessageBuilder'

export const purchasePremium = async (headers, params) => {
    try {
        let response = await axios.put(
            API_ENDPOINT + APP_VERSION + '/users/purchase/premium/' + params.id,
            {
                premiumTime: params.premiumTime
            },
            {
                headers: headers
            }
        )
        return response.data.data
    } catch (err) {
        if (err.message === 'Network Error') {
            flashMessages.networkError()
            throw err
        }
        if (err.response.status === 401) {
            let res = await renewToken()
            headers.Authorization = 'Bearer ' + res.token
            response = await axios.put(
                API_ENDPOINT +
                    APP_VERSION +
                    '/users/purchase/premium/' +
                    params.id,
                {
                    premiumTime: params.premiumTime
                },
                {
                    headers: headers
                }
            )
            return response.data.data
        } else throw err
    }
}
