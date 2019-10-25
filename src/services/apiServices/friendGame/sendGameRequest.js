import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'
import { renewToken } from '../token/renewToken'

export const sendGameRequest = async (
    userToken,
    userId,
    username,
    roomCode,
    requestedUserFCMToken,
    matchInformation
) => {
    try {
        let response = await axios.post(
            API_ENDPOINT + 'friendGames/request',
            {
                id: userId,
                username: username,
                roomCode: roomCode,
                requestedUserFCMToken: requestedUserFCMToken,
                matchInformation: matchInformation
            },
            {
                headers: {
                    Authorization: 'Bearer ' + userToken
                }
            }
        )

        return response.data.success
    } catch (err) {
        if (err.response.status === 401) {
            let res = await renewToken()
            response = await axios.post(
                API_ENDPOINT + 'friendGames/request',
                {
                    id: userId,
                    username: username,
                    roomCode: roomCode,
                    requestedUserFCMToken: requestedUserFCMToken,
                    matchInformation: matchInformation
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + res.token
                    }
                }
            )
            return response.data.success
        } else throw new Error(err.message)
    }
}
