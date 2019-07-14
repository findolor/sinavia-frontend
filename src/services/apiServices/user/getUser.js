import axios from 'axios'

export const getUser = async userToken => {
    try {
        const response = await axios.get('http://localhost:4000/api/users/', {
            headers: {
                Authorization: 'Bearer ' + userToken
            }
        })
        return response.data.data
    } catch (err) {
        console.log(err)
        return err.response
    }
}
