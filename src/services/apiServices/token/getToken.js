import axios from 'axios'

export const getToken = async userInformation => {
    try {
        const response = await axios.post(
            Config.SERVER_ENDPOINT + 'token/',
            userInformation
        )
        return response.data.data.token
    } catch (err) {
        throw new Error(err)
    }
}
