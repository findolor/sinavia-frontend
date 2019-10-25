import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'
import { renewToken } from '../token/renewToken'

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
        if (err.response.status === 401) {
            renewToken().then(res => {
                axios
                    .put(
                        API_ENDPOINT + 'users/' + clientId,
                        clientInformation,
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
        } else throw new Error(error)
    }
}
