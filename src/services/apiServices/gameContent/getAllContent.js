import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'
import { renewToken } from '../token/renewToken'

export const getAllContent = async userToken => {
    try {
        let response = await axios.get(API_ENDPOINT + 'examEntities/', {
            headers: {
                Authorization: 'Bearer ' + userToken
            }
        })
        return response.data.data
    } catch (err) {
        if (err.response.status === 401) {
            let res = await renewToken()
            response = await axios.get(API_ENDPOINT + 'examEntities/', {
                headers: {
                    Authorization: 'Bearer ' + res.token
                }
            })
            return response.data.data
        } else return err.response
    }
}
