import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const searchUsers = async (userToken, keyword) => {
    try {
        const response = await axios.get(
            API_ENDPOINT + 'searchUsers/' + keyword,
            {
                headers: {
                    Authorization: 'Bearer ' + userToken
                }
            }
        )

        return response.data.data
    } catch (err) {
        console.log(err.response)
        return err.response
    }
}
