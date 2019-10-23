import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const subtractGameEnergy = async (clientToken, clientId) => {
    try {
        const response = await axios.put(
            API_ENDPOINT + 'gameEnergies/remove/',
            {
                userId: clientId
            },
            {
                headers: {
                    Authorization: 'Bearer ' + clientToken
                }
            }
        )
        return response.data.data
    } catch (err) {
        throw new Error(err)
    }
}
