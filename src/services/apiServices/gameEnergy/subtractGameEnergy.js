import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'
import { renewToken } from '../token/renewToken'

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
        if (err.response.status === 401) {
            renewToken().then(res => {
                axios
                    .put(
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
                    .then(response => {
                        return response.data.data
                    })
            })
        } else throw new Error(err)
    }
}
