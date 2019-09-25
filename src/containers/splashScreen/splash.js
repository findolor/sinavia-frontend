import React from 'react'
import { View, Image, Text, Alert } from 'react-native'
import styles from './style'
import {
    navigationReset,
    getCurrentScreen,
    SCENE_KEYS
} from '../../services/navigationService'
import NetInfo from '@react-native-community/netinfo'
import { deviceStorage } from '../../services/deviceStorage'
import { connect } from 'react-redux'
import { clientActions } from '../../redux/client/actions'
import LottieView from 'lottie-react-native'
import { appActions } from '../../redux/app/actions'

const APP_LOGO = require('../../assets/sinavia_logo_cut.png')

class SplashScreen extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            retryCount: 0
        }
        // We add a listener for monitoring internet connection
        NetInfo.addEventListener(netInfo => {
            this.props.setNetworkConnectionInfo(netInfo.isConnected)
            if (
                getCurrentScreen() !== 'splash' &&
                getCurrentScreen() !== 'main' &&
                getCurrentScreen() !== 'register' &&
                getCurrentScreen() !== 'login' &&
                getCurrentScreen() !== 'opening' &&
                getCurrentScreen() !== 'resetPassword' &&
                !netInfo.isConnected
            ) {
                Alert.alert('Lütfen internet bağlantınızı kontrol ediniz!')
                navigationReset('main')
            }
        })
    }

    getJWTToken = async () => {
        try {
            const token = await deviceStorage.getItemFromStorage('clientToken')
            return token
        } catch (error) {
            console.log(error)
        }
    }

    async componentDidMount() {
        this.getJWTToken().then(async token => {
            // If we don't have any token saved, we go to the auth screen
            if (token === null) {
                await deviceStorage.clearDeviceStorage()
                setTimeout(() => {
                    navigationReset('auth')
                }, 1700)
                return
            }
            // We check if the token is valid. If not we get a new token
            else {
                if (!this.props.isNetworkConnected) {
                    Alert.alert('Lütfen internet bağlantınızı kontrol ediniz!')
                    return
                }
                this.props.authenticateUser(token)
            }
        })
    }

    componentWillUnmount() {
        clearInterval(this.loginInterval)
    }

    // This will be the button for trying the connection again
    tryConnectingAgain = () => {}

    render() {
        return (
            <View style={styles.container}>
                {/* <View style={styles.logoContainer}>
                    <Image source={APP_LOGO} style={styles.appLogo} />
                </View>
                <Text style={styles.sinaviaText}>Sınavia</Text> */}
                <LottieView
                    source={require('../../assets/splashScreen/sinavia.json')}
                    autoPlay
                    loop
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    isNetworkConnected: state.app.isNetworkConnected
})

const mapDispatchToProps = dispatch => ({
    authenticateUser: token => dispatch(clientActions.checkUserToken(token)),
    setNetworkConnectionInfo: networkConnectionInfo =>
        dispatch(appActions.setNetworkConnectionInfo(networkConnectionInfo))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SplashScreen)
