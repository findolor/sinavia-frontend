import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const rejectOngoingMatch = async (userToken, ongoingMatchId) => {
    try {
        const response = await axios.delete(
            API_ENDPOINT + 'friendGames/' + ongoingMatchId,
            {
                headers: {
                    Authorization: 'Bearer ' + userToken
                }
            }
        )
        return response.data.data
    } catch (err) {
        console.log(err)
        return err.response
    }
}
