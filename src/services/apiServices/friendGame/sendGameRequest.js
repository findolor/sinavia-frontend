import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const sendGameRequest = async (
    userToken,
    userId,
    username,
    roomCode,
    requestedUserFCMToken
) => {
    try {
        const response = await axios.post(
            API_ENDPOINT + 'friendGames/request',
            {
                id: userId,
                username: username,
                roomCode: roomCode,
                requestedUserFCMToken: requestedUserFCMToken
            },
            {
                headers: {
                    Authorization: 'Bearer ' + userToken
                }
            }
        )

        return response.data.success
    } catch (err) {
        throw new Error(err.message)
    }
}
