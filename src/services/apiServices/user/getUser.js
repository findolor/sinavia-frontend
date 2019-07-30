import axios from 'axios'
import Config from 'react-native-config'

export const getUser = async userToken => {
    try {
        const response = await axios.get(Config.SERVER_ENDPOINT + 'users/', {
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
