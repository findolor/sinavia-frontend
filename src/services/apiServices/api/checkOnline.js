import axios from 'axios'
import { API_ENDPOINT, APP_VERSION } from '../../../config/index'
import { flashMessages } from '../../flashMessageBuilder'

export const checkOnline = async () => {
    try {
        let response = await axios.get(API_ENDPOINT + APP_VERSION)
        if (response.status === 200) return true
        return response.status
    } catch (err) {
        flashMessages.networkError()
        throw err
    }
}
