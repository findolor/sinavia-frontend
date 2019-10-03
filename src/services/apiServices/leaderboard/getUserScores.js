import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const getUserScores = async (userToken, userIdList) => {
    try {
        const response = await axios.get(
            API_ENDPOINT + 'leaderboards/friends/',
            {
                headers: {
                    Authorization: 'Bearer ' + userToken
                },
                params: {
                    userIdList: userIdList
                }
            }
        )
        return response.data.data
    } catch (err) {
        console.log(err)
        return err.response
    }
}
