import firebase from 'react-native-firebase'

const getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken()
    if (fcmToken) {
        return fcmToken
    } else {
        console.log('no token')
    }
}

const checkPermissions = async () => {
    const enabled = await firebase.messaging().hasPermission()
    if (enabled) {
        console.log('User has permission')
    } else {
        firebase
            .messaging()
            .requestPermission()
            .then(() => {
                console.log('Got permissions')
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const fcmService = {
    getFcmToken: getFcmToken,
    checkPermissions: checkPermissions
}
