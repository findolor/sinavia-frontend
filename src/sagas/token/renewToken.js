import { getToken } from '../../services/apiServices/token/getToken'
import { deviceStorage } from '../../services/deviceStorage'
import { store } from '../../redux/createStore'
import { clientTypes } from '../../redux/client/actions'

export async function renewTokenService(clientCredentials) {
    const userToken = getToken({
        email: clientCredentials.email,
        password: clientCredentials.password
    })

    await deviceStorage.saveItemToStorage('clientToken', userToken)
    store.dispatch({
        type: clientTypes.SAVE_API_TOKEN,
        payload: userToken
    })

    return userToken
}
