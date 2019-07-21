import axios from 'axios'

export const getToken = async userInformation => {
    try {
        const response = await axios.post(
            'http://localhost:4000/api/token',
            userInformation
        )
        return response.data.data.token
    } catch (err) {
        throw new Error(err)
    }
}
