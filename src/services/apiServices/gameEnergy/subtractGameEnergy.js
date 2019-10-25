import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'
import { renewToken } from '../token/renewToken'

export const subtractGameEnergy = async (clientToken, clientId) => {
    try {
        let response = await axios.put(
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
        if (err.response.status === 401) {
            let res = await renewToken()
            response = await axios.put(
                API_ENDPOINT + 'gameEnergies/remove/',
                {
                    userId: clientId
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + res.token
                    }
                }
            )
            return response.data.data
        } else throw new Error(err)
    }
}
