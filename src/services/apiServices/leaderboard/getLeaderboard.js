import axios from 'axios'
import { API_ENDPOINT, APP_VERSION } from '../../../config/index'
import { renewToken } from '../token/renewToken'

export const getLeaderboard = async (headers, params) => {
    try {
        let response = await axios.get(
            API_ENDPOINT + APP_VERSION + '/leaderboards/global/',
            {
                headers: headers,
                params: params.params
            }
        )
        return response.data.data
    } catch (err) {
        if (err.response.status === 401) {
            let res = await renewToken()
            headers.Authorization = 'Bearer ' + res.token
            response = await axios.get(
                API_ENDPOINT + APP_VERSION + '/leaderboards/global/',
                {
                    headers: headers,
                    params: params.params
                }
            )
            return response.data.data
        } else return err.response
    }
}
