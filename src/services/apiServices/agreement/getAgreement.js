import axios from 'axios'
import { API_ENDPOINT, APP_VERSION } from '../../../config/index'
import { flashMessages } from '../../flashMessageBuilder'

export default getAgreement = async () => {
    try {
        let response = await axios.get(
            API_ENDPOINT + APP_VERSION + '/agreement'
        )
        return response.data.data
    } catch (err) {
        if (err.message === 'Network Error') {
            flashMessages.networkError()
            throw err
        }
        throw new Error(err.message)
    }
}
