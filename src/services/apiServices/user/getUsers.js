import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'
import { renewToken } from '../token/renewToken'

export const getUsers = async (userToken, idList) => {
    try {
        let response = await axios.get(API_ENDPOINT + 'users/', {
            headers: {
                Authorization: 'Bearer ' + userToken
            },
            params: {
                idList: idList
            }
        })
        return response.data.data
    } catch (err) {
        if (err.response.status === 401) {
            const res = await renewToken()
            response = await axios.get(API_ENDPOINT + 'users/', {
                headers: {
                    Authorization: 'Bearer ' + res.token
                },
                params: {
                    idList: idList
                }
            })
            return response.data.data
        } else return err.response
    }
}
