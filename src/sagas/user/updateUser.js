import { put, call } from 'redux-saga/effects'
import { deviceStorage } from '../../services/deviceStorage'
import { navigationPop, SCENE_KEYS } from '../../services/navigationService'
import { clientTypes } from '../../redux/client/actions'
import firebase from 'react-native-firebase'
import { apiServicesTree, makePutRequest } from '../../services/apiServices'

export function* updateUserSaga(action) {
    try {
        const totalPoints = action.clientInformation.totalPoints
        delete action.clientInformation.totalPoints
        const response = yield call(
            makePutRequest,
            apiServicesTree.userApi.updateUser,
            {
                clientToken: action.clientToken,
                clientInformation: action.clientInformation,
                clientId: action.clientId
            }
        )

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

            const firebaseUser = firebase.auth().currentUser
            firebaseUser
                .updatePassword(action.clientInformation.password)
                .then(() => {})
                .catch(error => {
                    console.log(error)
                })

            delete action.clientInformation.password
        }

        action.clientInformation.totalPoints = totalPoints
        deviceStorage.saveItemToStorage(
            'clientInformation',
            action.clientInformation
        )

        if (!action.isPasswordChange) {
            navigationPop(true, {
                popScreen: SCENE_KEYS.mainScreens.profile
            })
            yield put({
                type: clientTypes.SAVE_CLIENT_INFORMATION,
                payload: action.clientInformation
            })
        } else {
            yield put({
                type: clientTypes.SAVE_CLIENT_INFORMATION,
                payload: action.clientInformation
            })
            navigationPop()
        }
    } catch (error) {
        // TODO remove console.log later
        console.log(error)
    }
}
