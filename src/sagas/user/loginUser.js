import { put, call } from 'redux-saga/effects'
import { getToken } from '../../services/apiServices/token/getToken'
import { getUser } from '../../services/apiServices/user/getUser'
import { deviceStorage } from '../../services/deviceStorage'
import {
    navigationReset,
    navigationReplace
} from '../../services/navigationService'
import { clientTypes } from '../../redux/client/actions'
import { friendTypes } from '../../redux/friends/actions'
import { fcmService } from '../../services/fcmService'
import { postFCMToken } from '../../services/apiServices/fcmToken/postToken'
import { getFriends } from '../../services/apiServices/friendship/getFriends'
import { getFavouriteQuestions } from '../../services/apiServices/favouriteQuestion/getFavouriteQuestions'
import { getUserJokers } from '../../services/apiServices/userJoker/getUserJokers'
import { gameContentTypes } from '../../redux/gameContent/actions'
import DeviceInfo from 'react-native-device-info'
import firebase from 'react-native-firebase'
import { Alert } from 'react-native'

function firebaseSignIn() {
    return Promise.resolve().then(async () => {
        const credentials = await deviceStorage.getItemFromStorage(
            'clientCredentials'
        )
        return firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
    })
}

export function* loginUser(action) {
    try {
        this.email = action.payload.email
        this.password = action.payload.password

        try {
            const firebaseResponse = yield call(firebaseSignIn)

            if (!firebaseResponse.user.emailVerified) {
                Alert.alert('Lütfen e-postana gelen linki onayla.')
            } else {
                const deviceId = yield call(DeviceInfo.getUniqueId)

                try {
                    // We get our token from the api
                    // action.payload is our email and password
                    const res = yield call(getToken, action.payload, deviceId)
                    // Saving the api token to redux state
                    yield put({
                        type: clientTypes.SAVE_API_TOKEN,
                        payload: res.token
                    })
                    // We save the token to storage
                    deviceStorage.saveItemToStorage('clientToken', res.token)

                    // TODO THINK ABOUT CONTETT LATER IMPORTRRANT
                    // Saving the game content to redux state
                    yield put({
                        type: gameContentTypes.GET_ALL_CONTENT,
                        clientToken: res.token
                    })

                    // We save our user credentials
                    deviceStorage.saveItemToStorage(
                        'clientCredentials',
                        action.payload
                    )
                    // Save credential state to redux
                    yield put({
                        type: clientTypes.SAVE_CLIENT_CREDENTIALS,
                        payload: action.payload
                    })

                    // We save user favourite questions
                    const favouriteQuestions = yield call(
                        getFavouriteQuestions,
                        res.token,
                        res.id
                    )
                    // Saving to device storage
                    deviceStorage.saveItemToStorage(
                        'favouriteQuestions',
                        favouriteQuestions
                    )
                    // Saving the favs to redux state
                    yield put({
                        type: clientTypes.SAVE_FAVOURITE_QUESTIONS,
                        payload: favouriteQuestions
                    })

                    // Then we get our user information
                    const clientInformation = yield call(
                        getUser,
                        res.token,
                        res.id
                    )
                    // We save the user information
                    deviceStorage.saveItemToStorage(
                        'clientInformation',
                        clientInformation
                    )
                    // Then we save it as redux state
                    yield put({
                        type: clientTypes.SAVE_CLIENT_INFORMATION,
                        payload: clientInformation
                    })

                    // We save the user id storage and redux state
                    deviceStorage.saveItemToStorage('clientDBId', res.id)
                    yield put({
                        type: clientTypes.SAVE_CLIENT_DB_ID,
                        payload: res.id
                    })

                    // We check if client has permissions for fcm
                    yield call(fcmService.checkPermissions)
                    // We get our fcm token and save it
                    const fcmToken = yield call(fcmService.getFcmToken)
                    deviceStorage.saveItemToStorage('fcmToken', fcmToken)
                    // We add the token to our client info
                    clientInformation.fcmToken = fcmToken
                    // We send a request to api to save our fcm token
                    yield call(postFCMToken, res.token, clientInformation)

                    // We get all of our friend ids
                    const friendsList = yield call(
                        getFriends,
                        res.token,
                        res.id
                    )
                    deviceStorage.saveItemToStorage(
                        'clientFriends',
                        friendsList
                    )
                    // We save clients friends ids to redux state
                    yield put({
                        type: friendTypes.SAVE_FRIEND_IDS,
                        payload: friendsList
                    })

                    // Getting the user joker info from db
                    const userJokers = yield call(
                        getUserJokers,
                        action.payload,
                        res.id
                    )
                    // Saving it to redux state
                    yield put({
                        type: clientTypes.SAVE_USER_JOKERS,
                        payload: userJokers
                    })

                    // Going to the main screen
                    navigationReset('main')
                } catch (error) {
                    navigationReplace('getInfo', {
                        email: this.email,
                        password: this.password
                    })
                }
            }
        } catch (error) {
            console.log(error)
            console.log(error.code)
            if (error.code === 'auth/wrong-password')
                Alert.alert('Lütfen şifrenini kontrol et.')
            if (error.code === 'auth/user-not-found')
                Alert.alert('Lüften e-posta adresini kontrol et.')
        }
    } catch (error) {
        console.log(error)
    }
}
