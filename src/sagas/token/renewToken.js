import { getToken } from '../../services/apiServices/token/getToken'
import { deviceStorage } from '../../services/deviceStorage'

export async function renewTokenService() {
    const info = await deviceStorage.getItemFromStorage('userCredentials')

    const userCredentials = JSON.parse(info)

    const userToken = getToken({
        email: userCredentials.email,
        password: userCredentials.password
    })

    await deviceStorage.saveItemToStorage('JWT', userToken)

    return userToken
}
