import axios from 'axios'

export const getUserToken = async userInformation => {
    try {
        const response = await axios.post(
            'http://localhost:4000/api/token',
            userInformation
        )
        return response.data.data.token
    } catch (err) {
        return err
    }
}
