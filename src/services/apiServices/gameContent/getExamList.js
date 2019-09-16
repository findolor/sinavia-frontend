import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const getExamList = async userToken => {
    try {
        const response = await axios.get(API_ENDPOINT + 'examEntities/', {
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
