import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'
import { renewToken } from '../token/renewToken'

export const getLeaderboard = async (userToken, params) => {
    try {
        let response = await axios.get(API_ENDPOINT + 'leaderboards/global/', {
            headers: {
                Authorization: 'Bearer ' + userToken
            },
            params: params
        })
        return response.data.data
    } catch (err) {
        if (err.response.status === 401) {
            let res = await renewToken()
            response = await axios.get(API_ENDPOINT + 'leaderboards/global/', {
                headers: {
                    Authorization: 'Bearer ' + res.token
                },
                params: params
            })
            return response.data.data
        } else return err.response
    }
}
