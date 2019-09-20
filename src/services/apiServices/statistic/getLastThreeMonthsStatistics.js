import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const getLastThreeMonthsStatistics = async (
    userToken,
    userId,
    params
) => {
    try {
        const response = await axios.get(
            API_ENDPOINT + 'statistics/threeMonths/' + userId,
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
