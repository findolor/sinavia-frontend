import axios from 'axios'

export const postUser = async userInformation => {
    try {
        const response = await axios.post(
            'http://localhost:4000/api/users',
            userInformation
        )
        return response.data.data
    } catch (err) {
        return err.response.data
    }
}
