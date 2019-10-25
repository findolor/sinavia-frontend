import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'
import { renewToken } from '../token/renewToken'

export const getGameEnergy = async (clientToken, clientId) => {
    try {
        let response = await axios.get(
            API_ENDPOINT + 'gameEnergies/' + clientId,
            {
                headers: {
                    Authorization: 'Bearer ' + clientToken
                }
            }
        )
        return response.data.data
    } catch (err) {
        if (err.response.status === 401) {
            let res = await renewToken()
            response = await axios.get(
                API_ENDPOINT + 'gameEnergies/' + clientId,
                {
                    headers: {
                        Authorization: 'Bearer ' + res.token
                    }
                }
            )
            return response.data.data
        } else return err.response
    }
}
