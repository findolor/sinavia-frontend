import axios from 'axios'
import { API_ENDPOINT, APP_VERSION } from '../../../config/index'

export const checkOnline = async () => {
    try {
        let response = await axios.get(API_ENDPOINT + APP_VERSION)
        console.log(response)
        return response.data.success
    } catch (err) {
        console.log(err)
    }
}
