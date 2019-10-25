import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'
import { renewToken } from '../token/renewToken'

export const getWeeklyStatistics = async (userToken, userId, params) => {
    try {
        const response = await axios.get(
            API_ENDPOINT + 'statistics/weekly/' + userId,
            {
                headers: {
                    Authorization: 'Bearer ' + userToken
                },
                params: params
            }
        )
        return response.data.data
    } catch (err) {
        console.log(err)
        if (err.response.status === 401) {
            renewToken().then(res => {
                axios
                    .get(API_ENDPOINT + 'statistics/weekly/' + userId, {
                        headers: {
                            Authorization: 'Bearer ' + res.token
                        },
                        params: params
                    })
                    .then(response => {
                        return response.data.data
                    })
            })
        } else return err.response
    }
}
