import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'
import { renewToken } from '../token/renewToken'

export const getOpponentFullInformation = async (
    userToken,
    userId,
    clientId
) => {
    try {
        let response = await axios.get(
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
        if (err.response.status === 401) {
            let res = await renewToken()
            response = await axios.get(
                API_ENDPOINT + 'users/opponent/' + userId,
                {
                    headers: {
                        Authorization: 'Bearer ' + res.token
                    },
                    params: {
                        clientId: clientId
                    }
                }
            )
            return response.data.data
        } else return err.response
    }
}
