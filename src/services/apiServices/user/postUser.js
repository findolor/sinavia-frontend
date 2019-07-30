import axios from 'axios'
import Config from 'react-native-config'

export const postUser = async userInformation => {
    try {
        userInformation.profilePicture = 'some_profile_picture'
        userInformation.coverPicture = 'some_cover_picture'
        userInformation.isDeleted = 0

        const response = await axios.post(
            Config.SERVER_ENDPOINT + 'users/',
            userInformation
        )
        return response.data.data
    } catch (error) {
        throw new Error(error)
    }
}
