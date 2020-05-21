import { put, call } from 'redux-saga/effects'
import { navigationReset } from '../../services/navigationService'
import { flashMessages } from '../../services/flashMessageBuilder'
import firebase from 'react-native-firebase'
import { Alert } from 'react-native'

function firebaseSignUp() {
    return Promise.resolve().then(async () => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
    })
}

export function* userSignUp(action) {
    this.email = action.payload.email
    this.password = action.payload.password

    try {
        const firebaseResponse = yield call(firebaseSignUp)
        firebaseResponse.user.sendEmailVerification().then(() => {
            flashMessages.generalMessage(
                'Lütfen e-postanı onayla. (Gereksiz/Spam) kutunu da kontrol etmeyi unutma'
            )
            navigationReset('auth')
        })
    } catch (error) {
        if (error.code === 'auth/invalid-email')
            flashMessages.emailError('Lütfen e-postanı kontrol et')
        if (error.code === 'auth/email-already-in-use')
            flashMessages.emailError('Bu e-posta başka bir kullanıcıya aittir')
    }
}
