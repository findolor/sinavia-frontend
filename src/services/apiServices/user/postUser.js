import axios from 'axios'
import { API_ENDPOINT } from '../../../config/index'

export const postUser = async userInformation => {
    try {
        userInformation.profilePicture = 'some_profile_picture'
        userInformation.coverPicture = 'some_cover_picture'
        userInformation.isDeleted = 0

        const response = await axios.post(
            API_ENDPOINT + 'users/',
            userInformation
        )
        return response.data.data
    } catch (error) {
        throw new Error(error)
    }
}
