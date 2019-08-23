import React from 'react'
import { View, Image, Text, Alert } from 'react-native'
import styles from './style'
import { navigationReset, SCENE_KEYS } from '../../services/navigationService'
import { deviceStorage } from '../../services/deviceStorage'
import { connect } from 'react-redux'
import { clientActions } from '../../redux/client/actions'
import LottieView from 'lottie-react-native'

const APP_LOGO = require('../../assets/sinavia_logo_cut.png')

class SplashScreen extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            retryCount: 0
        }
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
        let token = await this.getJWTToken()

        // If we don't have any token saved, we go to the auth screen
        if (token === null) {
            setTimeout(() => {
                navigationReset('auth')
            }, 3000)
            return
        }

        // We check if the token is valid. If not we get a new token
        this.props.authenticateUser(token)

        // After 8 seconds we logout the user and go to the auth screen
        this.loginInterval = setInterval(async () => {
            if (++this.state.retryCount === 4) {
                Alert.alert('Lütfen tekrar giriş yapınız!')
                //await deviceStorage.clearDeviceStorage()
                navigationReset('auth')
            }
        }, 2000)
    }

    componentWillUnmount() {
        clearInterval(this.loginInterval)
    }

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

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    authenticateUser: token => dispatch(clientActions.checkUserToken(token))
})

export default connect(
    null,
    mapDispatchToProps
)(SplashScreen)
