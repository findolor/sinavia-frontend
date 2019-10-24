import { put, call } from 'redux-saga/effects'
import { navigationReset } from '../../services/navigationService'

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
            Alert.alert('Lütfen e-postanızı onaylayınız.')
            navigationReset('auth')
        })
    } catch (error) {
        console.log(error.code)
        console.log(error)
        if (error.code === 'auth/email-already-in-use')
            Alert.alert('Bu e-posta başka bir kullanıcıya aittir.')
        return
    }
}
