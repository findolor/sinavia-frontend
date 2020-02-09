import { put, call } from 'redux-saga/effects'
import { deviceStorage } from '../../services/deviceStorage'
import { navigationReset } from '../../services/navigationService'
import { clientTypes } from '../../redux/client/actions'
import { friendTypes } from '../../redux/friends/actions'
import { appTypes } from '../../redux/app/actions'
import { fcmService } from '../../services/fcmService'
import { gameContentTypes } from '../../redux/gameContent/actions'
import DeviceInfo from 'react-native-device-info'
import {
    apiServicesTree,
    makeGetRequest,
    makePostRequest,
    makePutRequest
} from '../../services/apiServices'
import firebase from 'react-native-firebase'
import { flashMessages } from '../../services/flashMessageBuilder'

async function getFromStorage(key) {
    const item = await deviceStorage.getItemFromStorage(key)
    return item
}

function firebaseSignIn() {
    return Promise.resolve().then(async () => {
        const credentials = await deviceStorage.getItemFromStorage(
            'clientCredentials'
        )
        return firebase
            .auth()
            .signInWithEmailAndPassword(credentials.email, credentials.password)
    })
}

function getNotificationOpened() {
    return Promise.resolve().then(async () => {
        // If we have a notification pressed we get it here
        const notificationOpen = await firebase
            .notifications()
            .getInitialNotification()
        return notificationOpen
    })
}

export function* authenticateUser(action) {
    try {
        const signInMethod = yield call(
            deviceStorage.getItemFromStorage,
            'signInMethod'
        )
        switch (signInMethod) {
            case 'normal':
                try {
                    yield call(firebaseSignIn)
                } catch (error) {
                    console.log(error)
                    return
                }
                break
            case 'google':
                const isSignedIn = yield call(GoogleSignin.isSignedIn)
                // This is for photo upload to storage
                // We need to be loged in somehow
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {
                        console.log(error)
                    })
                if (!isSignedIn) return
                break
            case 'apple':
                // This is for photo upload to storage
                // We need to be loged in somehow
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {
                        console.log(error)
                    })
                break
        }

        // We get the unique device id
        let deviceId = yield call(DeviceInfo.getUniqueId)

        // Get client id from storage
        let clientDBId = yield call(getFromStorage, 'clientDBId')
        // Save it to redux state
        yield put({
            type: clientTypes.SAVE_CLIENT_DB_ID,
            payload: clientDBId
        })

        // We first check if the token is valid.
        // If the response is true we continue to the main screen
        let res = yield call(
            makeGetRequest,
            apiServicesTree.tokenApi.checkToken,
            {
                clientToken: action.payload,
                deviceId: deviceId,
                clientId: clientDBId
            }
        )
        // If the response is false that means the user is logged in on another device
        // We dont log them in and reset to the auth screen
        if (!res) {
            flashMessages.generalMessage(
                'Başka bir cihazdan oturum açıldı. Tekrar giriş yapınız.'
            )
            yield call(deviceStorage.clearDeviceStorage)
            navigationReset('auth')
            return
        }
        // Saving the api token to redux state
        yield put({
            type: clientTypes.SAVE_API_TOKEN,
            payload: action.payload
        })

        // We get the client credentials from device storage
        const clientCredentials = yield call(
            getFromStorage,
            'clientCredentials'
        )
        // Save credential state to redux
        yield put({
            type: clientTypes.SAVE_CLIENT_CREDENTIALS,
            payload: clientCredentials
        })

        // Then we get our user information
        const clientInformation = yield call(
            makeGetRequest,
            apiServicesTree.userApi.getUser,
            { id: clientDBId, clientToken: action.payload }
        )
        // We save the user information
        deviceStorage.saveItemToStorage('clientInformation', clientInformation)
        /* // We get clientInformation from storage
        let clientInformation = yield call(getFromStorage, 'clientInformation') */
        // Then we save it as redux state
        yield put({
            type: clientTypes.SAVE_CLIENT_INFORMATION,
            payload: clientInformation
        })

        // Get favourited questions from storage
        let favouriteQuestions = yield call(
            getFromStorage,
            'favouriteQuestions'
        )
        let favouriteQuestionsList = yield call(
            makeGetRequest,
            apiServicesTree.favouriteQuestionApi.getFavouriteQuestions,
            {
                userId: clientDBId,
                clientToken: action.payload
            }
        )
        // Save it to redux state
        if (
            favouriteQuestions === null ||
            Object.keys(favouriteQuestionsList).length !==
                Object.keys(favouriteQuestions).length
        ) {
            deviceStorage.saveItemToStorage(
                'favouriteQuestions',
                favouriteQuestionsList
            )
            yield put({
                type: clientTypes.SAVE_FAVOURITE_QUESTIONS,
                payload: favouriteQuestionsList
            })
        } else
            yield put({
                type: clientTypes.SAVE_FAVOURITE_QUESTIONS,
                payload: favouriteQuestions
            })

        // TODO TAKE A LOOK HERE
        // We get all of our friend ids
        let friendsList = yield call(
            makeGetRequest,
            apiServicesTree.friendshipApi.getFriends,
            { userId: clientDBId, clientToken: action.payload }
        )
        // Get client friends from storage
        let friends = yield call(getFromStorage, 'clientFriends')
        // We check if cached friends is the same as db
        if (
            friends === null ||
            Object.keys(friendsList).length !== Object.keys(friends).length
        ) {
            deviceStorage.saveItemToStorage('clientFriends', friendsList)
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
        yield call(makePutRequest, apiServicesTree.fcmTokenApi.updateFCMToken, {
            userInformation: clientInformation,
            clientToken: action.payload
        })

        // Getting the user joker info from db
        const userJokers = yield call(
            makeGetRequest,
            apiServicesTree.userJokerApi.getUserJokers,
            {
                userId: clientDBId,
                clientToken: action.payload
            }
        )
        // Saving it to redux state
        yield put({
            type: clientTypes.SAVE_USER_JOKERS,
            payload: userJokers
        })

        /* // Getting the exam list from db
        const examList = yield call(getExamList, action.payload)
        // Saving it to redux state
        yield put({
            type: gameContentTypes.SAVE_EXAM_LIST,
            payload: examList
        }) */

        // We get the choosen exam from storage to show the last choosen exam
        let choosenExam = yield call(getFromStorage, 'choosenExam')
        // If it isn't null we save it to redux
        if (choosenExam !== null) {
            yield put({
                type: gameContentTypes.SAVE_CHOOSEN_EXAM,
                payload: choosenExam
            })

            /* let index = examList.findIndex(x => x.name === choosenExam)

            yield put({
                type: gameContentTypes.GET_FULL_EXAM_INFORMATION,
                clientToken: action.payload,
                examId: examList[index].id
            }) */
        }

        // This will be used later on
        /* // We get the user's game energy info
        let gameEnergy = yield call(
            makeGetRequest,
            apiServicesTree.gameEnergyApi.getGameEnergy,
            {
                clientToken: action.payload,
                clientId: clientDBId
            }
        )
        // Saving the energy amount to redux
        yield put({
            type: appTypes.SAVE_ENERGY_AMOUNT,
            payload: gameEnergy.energyAmount
        }) */

        const notificationOpen = yield call(getNotificationOpened)
        yield put({
            type: appTypes.SAVE_NOTIFICATION_OPEN,
            payload: notificationOpen
        })

        yield put({
            type: gameContentTypes.GET_ALL_CONTENT,
            clientToken: action.payload,
            notificationOpen: notificationOpen
        })

        deviceStorage.saveItemToStorage('isAppOpenedBefore', true)
    } catch (error) {
        // If we get unauthorized from api
        try {
            // We get the client credentials from device storage
            const clientCredentials = yield call(
                getFromStorage,
                'clientCredentials'
            )
            // Save credential state to redux
            yield put({
                type: clientTypes.SAVE_CLIENT_CREDENTIALS,
                payload: clientCredentials
            })

            // We get the unique device id
            deviceId = yield call(DeviceInfo.getUniqueId)

            // We send the credentials for getting the token and id
            /* let res = yield call(getToken, {
                email: clientCredentials.email,
                password: clientCredentials.password
            }) */

            let tokenObject = {
                email: clientCredentials.email,
                password: clientCredentials.password,
                identityToken: null
            }
            if (signInMethod === 'apple') {
                let idToken = yield call(
                    deviceStorage.getItemFromStorage,
                    'appleIdentityToken'
                )
                tokenObject.identityToken = idToken
            }

            let res = yield call(
                makePostRequest,
                apiServicesTree.tokenApi.getToken,
                {
                    userInformation: tokenObject,
                    deviceId: deviceId,
                    signInMethod: signInMethod
                }
            )
            // Saving the api token to redux state
            yield put({
                type: clientTypes.SAVE_API_TOKEN,
                payload: res.token
            })
            // We save the token to storage
            deviceStorage.saveItemToStorage('clientToken', res.token)
            // Save id to redux state
            yield put({
                type: clientTypes.SAVE_CLIENT_DB_ID,
                payload: res.id
            })

            // Then we get our user information
            const clientInformation = yield call(
                makeGetRequest,
                apiServicesTree.userApi.getUser,
                { id: res.id, clientToken: res.token }
            )
            // We save the user information
            deviceStorage.saveItemToStorage(
                'clientInformation',
                clientInformation
            )
            /* // We get clientInformation from storage
            let clientInformation = yield call(
                getFromStorage,
                'clientInformation'
            ) */
            // Then we save it as redux state
            yield put({
                type: clientTypes.SAVE_CLIENT_INFORMATION,
                payload: clientInformation
            })

            // Get favourited questions from storage
            let favouriteQuestions = yield call(
                getFromStorage,
                'favouriteQuestions'
            )
            // Save it to redux state
            if (favouriteQuestions !== null && favouriteQuestions !== []) {
                yield put({
                    type: clientTypes.SAVE_FAVOURITE_QUESTIONS,
                    payload: favouriteQuestions
                })
            }

            // We get all of our friend ids
            let friendsList = yield call(
                makeGetRequest,
                apiServicesTree.friendshipApi.getFriends,
                { userId: res.id, clientToken: res.token }
            )
            // Get client friends from storage
            let friends = yield call(getFromStorage, 'clientFriends')
            if (friends === null) friends = []
            // We check if cached friends is the same as db
            if (
                Object.keys(friendsList).length !== Object.keys(friends).length
            ) {
                deviceStorage.saveItemToStorage('clientFriends', friendsList)
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
            yield call(
                makePutRequest,
                apiServicesTree.fcmTokenApi.updateFCMToken,
                {
                    userInformation: clientInformation,
                    clientToken: res.token
                }
            )

            // Getting the user joker info from db
            const userJokers = yield call(
                makeGetRequest,
                apiServicesTree.userJokerApi.getUserJokers,
                {
                    userId: res.id,
                    clientToken: res.token
                }
            )
            // Saving it to redux state
            yield put({
                type: clientTypes.SAVE_USER_JOKERS,
                payload: userJokers
            })
            // TODO THINK ABOUT CONTETT LATER IMPORTRRANT
            /* // Getting the exam list from db
            const examList = yield call(getExamList, action.payload)
            // Saving it to redux state
            yield put({
                type: gameContentTypes.SAVE_EXAM_LIST,
                payload: examList
            }) */

            // We get the choosen exam from storage to show the last choosen exam
            choosenExam = yield call(getFromStorage, 'choosenExam')
            // If it isn't null we save it to redux
            if (choosenExam !== null) {
                yield put({
                    type: gameContentTypes.SAVE_CHOOSEN_EXAM,
                    payload: choosenExam
                })
            }

            // These will be used later on
            /* // We get the user's game energy info
            let gameEnergy = yield call(
                makeGetRequest,
                apiServicesTree.gameEnergyApi.getGameEnergy,
                {
                    clientToken: res.token,
                    clientId: res.id
                }
            )
            // Saving the energy amount to redux
            yield put({
                type: appTypes.SAVE_ENERGY_AMOUNT,
                payload: gameEnergy.energyAmount
            }) */

            const notificationOpen = yield call(getNotificationOpened)
            yield put({
                type: appTypes.SAVE_NOTIFICATION_OPEN,
                payload: notificationOpen
            })

            yield put({
                type: gameContentTypes.GET_ALL_CONTENT,
                clientToken: res.token,
                notificationOpen: notificationOpen
            })
        } catch (error) {
            if (
                error.response !== undefined &&
                error.response.data.includes('Cannot POST')
            )
                yield put({
                    type: appTypes.SET_CONNECTION_ERROR_MESSAGE,
                    payload: 'Lüften uygulamayı son versiyonuna güncelleyin'
                })
            else
                yield put({
                    type: appTypes.SET_CONNECTION_ERROR_MESSAGE,
                    payload: 'Sunucu bağlantı problemi'
                })
        }
    }
}
