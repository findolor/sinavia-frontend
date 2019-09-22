import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const putUser = async (clientToken, clientId, clientInformation) => {
    try {
        const response = await axios.put(
            API_ENDPOINT + 'users/' + clientId,
            clientInformation,
            {
                headers: {
                    Authorization: 'Bearer ' + clientToken
                }
            }
        )

        return response.data.data
    } catch (error) {
        throw new Error(error)
    }
}
