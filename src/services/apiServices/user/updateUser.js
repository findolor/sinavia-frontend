import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'
import { renewToken } from '../token/renewToken'

export const putUser = async (clientToken, clientId, clientInformation) => {
    try {
        let response = await axios.put(
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
            let res = await renewToken()
            response = await axios.put(
                API_ENDPOINT + 'users/' + clientId,
                clientInformation,
                {
                    headers: {
                        Authorization: 'Bearer ' + res.token
                    }
                }
            )
            return response.data.data
        } else throw new Error(error)
    }
}
