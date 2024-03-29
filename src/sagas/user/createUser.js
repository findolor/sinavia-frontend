import { put, call } from 'redux-saga/effects'
import { deviceStorage } from '../../services/deviceStorage'
import { clientTypes } from '../../redux/client/actions'
import { appTypes } from '../../redux/app/actions'
import { gameContentTypes } from '../../redux/gameContent/actions'
import DeviceInfo from 'react-native-device-info'
import {
    apiServicesTree,
    makePostRequest,
    makeGetRequest,
    makePutRequest
} from '../../services/apiServices'
import { fcmService } from '../../services/fcmService'
import firebase from 'react-native-firebase'

export function* createUser(action) {
    yield put({
        type: appTypes.LOCK_UNLOCK_BUTTON
    })

    try {
        let tokenRequestUserInfo = {
            email: action.payload.email,
            password: action.payload.password,
            identityToken: null
        }

        // We get the unique device id
        const deviceId = yield call(DeviceInfo.getUniqueId)
        action.payload.deviceId = deviceId

        // Saving the choosen method for sign-in
        deviceStorage.saveItemToStorage(
            'signInMethod',
            action.payload.signInMethod
        )
        if (action.payload.signInMethod !== 'normal') {
            firebase
                .auth()
                .signInAnonymously()
                .catch(error => {
                    console.log(error)
                })
        } else delete tokenRequestUserInfo.identityToken
        if (action.payload.signInMethod === 'apple') {
            const identityToken = yield call(
                deviceStorage.getItemFromStorage,
                'appleIdentityToken'
            )
            action.payload.identityToken = identityToken
            tokenRequestUserInfo.identityToken = identityToken
        }

        // We send the client information to our server
        let res
        try {
            res = yield call(
                makePostRequest,
                apiServicesTree.userApi.postUser,
                { userInformation: action.payload }
            )
        } catch (error) {
            throw error
        }

        // Saving the credentials to storage
        deviceStorage.saveItemToStorage(
            'clientCredentials',
            tokenRequestUserInfo
        )
        // Saving credentials to redux state
        yield put({
            type: clientTypes.SAVE_CLIENT_CREDENTIALS,
            payload: tokenRequestUserInfo
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
                userInformation: tokenRequestUserInfo,
                signInMethod: action.payload.signInMethod
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

        // We check if client has permissions for fcm
        yield call(fcmService.checkPermissions)
        // We get our fcm token and save it
        const fcmToken = yield call(fcmService.getFcmToken)
        deviceStorage.saveItemToStorage('fcmToken', fcmToken)
        // We add the token to our client info
        action.payload.fcmToken = fcmToken
        delete action.payload.password
        // We send a request to api to save our fcm token
        yield call(makePutRequest, apiServicesTree.fcmTokenApi.updateFCMToken, {
            userInformation: action.payload,
            clientToken: response.token
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
    }
}
