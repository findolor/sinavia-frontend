import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const getLeaderboard = async (userToken, params) => {
    try {
        const response = await axios.get(API_ENDPOINT + 'leaderboards/', {
            headers: {
                Authorization: 'Bearer ' + userToken
            },
            params: params
        })
        return response.data.data
    } catch (err) {
        console.log(err)
        return err.response
    }
}
