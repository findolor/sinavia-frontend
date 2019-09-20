import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const getLastSixMonthsStatistics = async (userToken, userId, params) => {
    try {
        const response = await axios.get(
            API_ENDPOINT + 'statistics/sixMonths/' + userId,
            {
                headers: {
                    Authorization: 'Bearer ' + userToken
                },
                params
            }
        )
        return response.data.data
    } catch (err) {
        console.log(err)
        return err.response
    }
}
