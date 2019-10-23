import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const getGameEnergy = async (clientToken, clientId) => {
    try {
        const response = await axios.get(
            API_ENDPOINT + 'gameEnergies/' + clientId,
            {
                headers: {
                    Authorization: 'Bearer ' + clientToken
                }
            }
        )
        return response.data.data
    } catch (err) {
        console.log(err)
        return err.response
    }
}
