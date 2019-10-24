import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const postUser = async userInformation => {
    try {
        userInformation.profilePicture =
            'https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png'
        userInformation.coverPicture =
            'https://assets.traveltriangle.com/blog/wp-content/uploads/2017/11/Hill-Stations-Near-Kolkata-cover1-400x267.jpg'
        userInformation.totalPoints = 0
        userInformation.isPremium = true

        const response = await axios.post(
            API_ENDPOINT + 'users/',
            userInformation
        )

        return response.data.data
    } catch (error) {
        throw new Error(error)
    }
}
