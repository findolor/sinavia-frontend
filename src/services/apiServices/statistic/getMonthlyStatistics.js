import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const getMonthlyStatistics = async (userToken, userId, params) => {
    try {
        const response = await axios.get(
            API_ENDPOINT + 'statistics/monthly/' + userId,
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
