import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'
import { renewToken } from '../token/renewToken'

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
        if (err.response.status === 401) {
            renewToken().then(res => {
                axios
                    .get(API_ENDPOINT + 'gameEnergies/' + clientId, {
                        headers: {
                            Authorization: 'Bearer ' + res.token
                        }
                    })
                    .then(response => {
                        return response.data.data
                    })
            })
        } else return err.response
    }
}
