import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const getWeeklyStatistics = async (userToken, userId, params) => {
    try {
        console.log(params)
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
        return err.response
    }
}
