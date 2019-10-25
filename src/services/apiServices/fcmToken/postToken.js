import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'
import { renewToken } from '../token/renewToken'

export const postFCMToken = async (userToken, userInformation) => {
    try {
        const response = await axios.put(
            API_ENDPOINT + 'users/' + userInformation.id,
            userInformation,
            {
                headers: {
                    Authorization: 'Bearer ' + userToken
                }
            }
        )
        return response.data.success
    } catch (err) {
        if (err.response.status === 401) {
            renewToken().then(res => {
                axios
                    .put(
                        API_ENDPOINT + 'users/' + userInformation.id,
                        userInformation,
                        {
                            headers: {
                                Authorization: 'Bearer ' + res.token
                            }
                        }
                    )
                    .then(response => {
                        return response.data.success
                    })
            })
        } else throw new Error(err.message)
    }
}
