import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'
import { renewToken } from '../token/renewToken'

export const searchUsers = async (userToken, keyword, userId) => {
    try {
        const response = await axios.get(API_ENDPOINT + 'searchUsers/', {
            headers: {
                Authorization: 'Bearer ' + userToken
            },
            params: {
                keyword: keyword,
                userId: userId
            }
        })
        return response.data.data
    } catch (err) {
        if (err.response.status === 401) {
            renewToken().then(res => {
                axios
                    .get(API_ENDPOINT + 'searchUsers/', {
                        headers: {
                            Authorization: 'Bearer ' + res.token
                        },
                        params: {
                            keyword: keyword,
                            userId: userId
                        }
                    })
                    .then(response => {
                        return response.data.data
                    })
            })
        } else throw err
    }
}
