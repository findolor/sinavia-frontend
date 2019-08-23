import { put, call } from 'redux-saga/effects'
import { checkToken } from '../../services/apiServices/token/checkToken'
import { getToken } from '../../services/apiServices/token/getToken'
import { deviceStorage } from '../../services/deviceStorage'
import { navigationReset } from '../../services/navigationService'
import { clientTypes } from '../../redux/client/actions'
import { friendTypes } from '../../redux/friends/actions'
import { fcmService } from '../../services/fcmService'
import { postFCMToken } from '../../services/apiServices/fcmToken/postToken'
import { getFriends } from '../../services/apiServices/friendship/getFriends'

async function getFromStorage(key) {
    const item = await deviceStorage.getItemFromStorage(key)
    return item
}

function goToMainScreen() {
    setTimeout(() => {
        navigationReset('main')
    }, 3000)
}

export function* authenticateUser(action) {
    try {
        // We first check if the token is valid.
        // If the response is true we continue to the main screen
        let res = yield call(checkToken, action.payload)
        // Saving the api token to redux state
        yield put({
            type: clientTypes.SAVE_API_TOKEN,
            payload: action.payload
        })

        // We get clientInformation from storage
        let client = yield call(getFromStorage, 'clientInformation')
        let clientInformation = JSON.parse(client)
        // Then we save it as redux state
        yield put({
            type: clientTypes.SAVE_CLIENT_INFORMATION,
            payload: clientInformation
        })

        // We get the choosen exam from storage to show the last choosen exam
        let choosenExam = yield call(getFromStorage, 'choosenExam')
        // If it isn't null we save it to redux
        if (choosenExam !== null) {
            yield put({
                type: clientTypes.SAVE_CHOOSEN_EXAM,
                payload: choosenExam
            })
        }

        // Get client id from storage
        let clientDBId = yield call(getFromStorage, 'clientDBId')
        // Save it to redux state
        yield put({
            type: clientTypes.SAVE_CLIENT_DB_ID,
            payload: clientDBId
        })

        // We get all of our friend ids
        let friendsList = yield call(getFriends, action.payload, clientDBId)
        // Get client friends from storage
        let friends = yield call(getFromStorage, 'clientFriends')
        friends = JSON.parse(friends)
        // We check if cached friends is the same as db
        if (Object.keys(friendsList).length !== Object.keys(friends).length) {
            deviceStorage.saveItemToStorage(
                'clientFriends',
                JSON.stringify(friendsList)
            )
            // We save clients friends ids to redux state
            yield put({
                type: friendTypes.SAVE_FRIEND_IDS,
                payload: friendsList
            })
        } else {
            // We save clients friends ids to redux state
            yield put({
                type: friendTypes.SAVE_FRIEND_IDS,
                payload: friends
            })
        }

        // We get the token for fcm
        const fcmToken = yield call(fcmService.getFcmToken)
        // And save it to storage
        deviceStorage.saveItemToStorage('fcmToken', fcmToken)
        // We add the token to our client info
        clientInformation.fcmToken = fcmToken
        // We send a request to api to save our fcm token
        yield call(postFCMToken, action.payload, clientInformation)

        if (res) goToMainScreen()
    } catch (error) {
        // If we get unauthorized from api
        try {
            // We get the client credentials from device storage
            const info = yield call(getFromStorage, 'clientCredentials')
            const clientCredentials = JSON.parse(info)
            // Save credential state to redux
            yield put({
                type: clientTypes.SAVE_CLIENT_CREDENTIALS,
                payload: clientCredentials
            })

            // We send the credentials for getting the token and id
            let res = yield call(getToken, {
                email: clientCredentials.email,
                password: clientCredentials.password
            })
            // Saving the api token to redux state
            yield put({
                type: clientTypes.SAVE_API_TOKEN,
                payload: res.token
            })
            // We save the token to storage
            deviceStorage.saveItemToStorage('JWT', res.token)
            // Save id to redux state
            yield put({
                type: clientTypes.SAVE_CLIENT_DB_ID,
                payload: res.id
            })

            // We get clientInformation from storage
            let client = yield call(getFromStorage, 'clientInformation')
            let clientInformation = JSON.parse(client)
            // Then we save it as redux state
            yield put({
                type: clientTypes.SAVE_CLIENT_INFORMATION,
                payload: clientInformation
            })

            // We get the choosen exam from storage to show the last choosen exam
            choosenExam = yield call(getFromStorage, 'choosenExam')
            // If it isn't null we save it to redux
            if (choosenExam !== null) {
                yield put({
                    type: clientTypes.SAVE_CHOOSEN_EXAM,
                    payload: choosenExam
                })
            }

            // We get all of our friend ids
            let friendsList = yield call(getFriends, res.token, res.id)
            // Get client friends from storage
            let friends = yield call(getFromStorage, 'clientFriends')
            friends = JSON.parse(friends)
            // We check if cached friends is the same as db
            if (
                Object.keys(friendsList).length !== Object.keys(friends).length
            ) {
                deviceStorage.saveItemToStorage(
                    'clientFriends',
                    JSON.stringify(friendsList)
                )
                // We save clients friends ids to redux state
                yield put({
                    type: friendTypes.SAVE_FRIEND_IDS,
                    payload: friendsList
                })
            } else {
                // We save clients friends ids to redux state
                yield put({
                    type: friendTypes.SAVE_FRIEND_IDS,
                    payload: friends
                })
            }

            // We get the token for fcm
            const fcmToken = yield call(fcmService.getFcmToken)
            // And save it to storage
            deviceStorage.saveItemToStorage('fcmToken', fcmToken)
            // We add the token to our client info
            clientInformation.fcmToken = fcmToken
            // We send a request to api to save our fcm token
            yield call(postFCMToken, res.token, clientInformation)

            goToMainScreen()
        } catch (error) {
            console.log(error)
        }
    }
}
