import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'
import { renewToken } from '../token/renewToken'

export const getUsers = async (userToken, idList) => {
    try {
        const response = await axios.get(API_ENDPOINT + 'users/', {
            headers: {
                Authorization: 'Bearer ' + userToken
            },
            params: {
                idList: idList
            }
        })
        return response.data.data
    } catch (err) {
        console.log(err)
        if (err.response.status === 401) {
            renewToken().then(res => {
                axios
                    .get(API_ENDPOINT + 'users/', {
                        headers: {
                            Authorization: 'Bearer ' + res.token
                        },
                        params: {
                            idList: idList
                        }
                    })
                    .then(response => {
                        return response.data.data
                    })
            })
        } else return err.response
    }
}
