import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const getOpponentFullInformation = async (
    userToken,
    userId,
    clientId
) => {
    try {
        const response = await axios.get(
            API_ENDPOINT + 'users/opponent/' + userId,
            {
                headers: {
                    Authorization: 'Bearer ' + userToken
                },
                params: {
                    clientId: clientId
                }
            }
        )
        return response.data.data
    } catch (err) {
        console.log(err)
        return err.response
    }
}
