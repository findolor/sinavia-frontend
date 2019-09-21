import { put, call } from 'redux-saga/effects'
import { putUser } from '../../services/apiServices/user/updateUser'
import { deviceStorage } from '../../services/deviceStorage'
import { navigationPop } from '../../services/navigationService'
import { clientTypes } from '../../redux/client/actions'

export function* updateUserSaga(action) {
    try {
        console.log(action)
        const response = yield call(
            putUser,
            action.clientToken,
            action.clientId,
            action.clientInformation
        )
        console.log(response)

        if (action.isPasswordChange) {
            // First save the credentials to storage
            deviceStorage.saveItemToStorage('clientCredentials', {
                email: action.clientInformation.email,
                password: action.clientInformation.password
            })
            //
            yield put({
                type: clientTypes.SAVE_CLIENT_CREDENTIALS,
                payload: {
                    email: action.clientInformation.email,
                    password: action.clientInformation.password
                }
            })

            delete action.clientInformation.password
        }

        deviceStorage.saveItemToStorage(
            'clientInformation',
            action.clientInformation
        )
        yield put({
            type: clientTypes.SAVE_CLIENT_INFORMATION,
            payload: action.clientInformation
        })

        navigationPop()
    } catch (error) {
        // TODO remove console.log later
        console.log(error)
    }
}
