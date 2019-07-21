import axios from 'axios'

export const postUser = async userInformation => {
    try {
        userInformation.profilePicture = 'some_profile_picture'
        userInformation.coverPicture = 'some_cover_picture'
        userInformation.isDeleted = 0

        const response = await axios.post(
            'http://localhost:4000/api/users',
            userInformation
        )
        return response.data.data
    } catch (error) {
        throw new Error(error)
    }
}
