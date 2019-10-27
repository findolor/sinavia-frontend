import axios from 'axios'
import { API_ENDPOINT, APP_VERSION } from '../../../config/index'
import { renewToken } from '../token/renewToken'

export const sendGameRequest = async (headers, params) => {
    try {
        let response = await axios.post(
            API_ENDPOINT + APP_VERSION + '/friendGames/request',
            {
                id: params.userId,
                username: params.username,
                roomCode: params.roomCode,
                requestedUserFCMToken: params.requestedUserFCMToken,
                matchInformation: params.matchInformation
            },
            {
                headers: headers
            }
        )

        return response.data.success
    } catch (err) {
        if (err.response.status === 401) {
            let res = await renewToken()
            headers.Authorization = 'Bearer ' + res.token
            response = await axios.post(
                API_ENDPOINT + APP_VERSION + '/friendGames/request',
                {
                    id: params.userId,
                    username: params.username,
                    roomCode: params.roomCode,
                    requestedUserFCMToken: params.requestedUserFCMToken,
                    matchInformation: params.matchInformation
                },
                {
                    headers: headers
                }
            )
            return response.data.success
        } else throw new Error(err.message)
    }
}
