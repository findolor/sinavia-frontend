import { put, call } from 'redux-saga/effects'
import { deviceStorage } from '../../services/deviceStorage'
import { clientTypes } from '../../redux/client/actions'
import { appTypes } from '../../redux/app/actions'
import { gameContentTypes } from '../../redux/gameContent/actions'
import DeviceInfo from 'react-native-device-info'
import { apiServicesTree, makePostRequest } from '../../services/apiServices'

export function* createUser(action) {
    yield put({
        type: appTypes.LOCK_UNLOCK_BUTTON
    })

    try {
        // We get the unique device id
        const deviceId = yield call(DeviceInfo.getUniqueId)

        action.payload.deviceId = deviceId

        // We send the client information to our server
        let res
        try {
            res = yield call(
                makePostRequest,
                apiServicesTree.userApi.postUser,
                { userInformation: action.payload }
            )
        } catch (error) {
            return
        }

        // Saving the credentials to storage
        deviceStorage.saveItemToStorage('clientCredentials', {
            email: action.payload.email,
            password: action.payload.password
        })
        // Saving credentials to redux state
        yield put({
            type: clientTypes.SAVE_CLIENT_CREDENTIALS,
            payload: {
                email: action.payload.email,
                password: action.payload.password
            }
        })

        // Saving the id to storage
        deviceStorage.saveItemToStorage('clientDBId', res.id)
        // Saving the id to redux state
        yield put({
            type: clientTypes.SAVE_CLIENT_DB_ID,
            payload: res.id
        })

        // Get token from server
        const response = yield call(
            makePostRequest,
            apiServicesTree.tokenApi.getToken,
            {
                userInformation: {
                    email: action.payload.email,
                    password: action.payload.password
                }
            }
        )
        // Save token to storage
        deviceStorage.saveItemToStorage('clientToken', response.token)
        // Save token to redux state
        yield put({
            type: clientTypes.SAVE_API_TOKEN,
            payload: response.token
        })

        // Saving information to storage
        delete res.password
        action.payload.id = response.id
        deviceStorage.saveItemToStorage('clientInformation', action.payload)
        // Saving client information to redux state
        yield put({
            type: clientTypes.SAVE_CLIENT_INFORMATION,
            payload: res
        })

        // This will be used later on
        /* // We get the user's game energy info
        let gameEnergy = yield call(
            makeGetRequest,
            apiServicesTree.gameEnergyApi.getGameEnergy,
            {
                clientId: response.id,
                clientToken: response.token
            }
        )
        // Saving the energy amount to redux
        yield put({
            type: appTypes.SAVE_ENERGY_AMOUNT,
            payload: gameEnergy.energyAmount
        }) */

        // Getting the user joker info from db
        const userJokers = yield call(
            makeGetRequest,
            apiServicesTree.userJokerApi.getUserJokers,
            {
                userId: res.id,
                clientToken: response.token
            }
        )
        // Saving it to redux state
        yield put({
            type: clientTypes.SAVE_USER_JOKERS,
            payload: userJokers
        })

        // This action will navigate to main screen
        yield put({
            type: gameContentTypes.GET_ALL_CONTENT,
            clientToken: response.token
        })

        deviceStorage.saveItemToStorage('isAppOpenedBefore', true)

        yield put({
            type: appTypes.LOCK_UNLOCK_BUTTON
        })
    } catch (error) {
        yield put({
            type: appTypes.LOCK_UNLOCK_BUTTON
        })
        // TODO remove console.log later
        console.log(error)
    }
}
