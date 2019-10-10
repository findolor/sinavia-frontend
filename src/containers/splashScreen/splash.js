import React from 'react'
import { View, Image, Text, Alert } from 'react-native'
import styles, { hp, wp } from './style'
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
import { AuthButton } from '../../components/authScreen'
import { showMessage } from 'react-native-flash-message'

class SplashScreen extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            shouldTryAgain: false,
            clientToken: null
        }
        // We add a listener for monitoring internet connection
        NetInfo.addEventListener(netInfo => {
            this.props.setNetworkConnectionInfo(netInfo.isConnected)
            if (
                getCurrentScreen() !== 'splash' &&
                getCurrentScreen() !== 'register' &&
                getCurrentScreen() !== 'login' &&
                getCurrentScreen() !== 'opening' &&
                getCurrentScreen() !== 'resetPassword' &&
                !netInfo.isConnected
            ) {
                showMessage({
                    message: 'Lütfen internet bağlantınızı kontrol ediniz',
                    type: 'danger',
                    duration: 2000,
                    titleStyle: styles.networkErrorStyle,
                    icon: 'auto'
                })
                if (getCurrentScreen() !== 'main') navigationReset('main')
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
                this.setState({ clientToken: token })
                if (!this.props.isNetworkConnected) {
                    this.setState({ shouldTryAgain: true })
                    return
                }
                this.props.authenticateUser(token)
                this.loginInterval = setTimeout(() => {
                    this.setState({ shouldTryAgain: true })
                }, 10000)
            }
        })
    }

    componentWillUnmount() {
        clearInterval(this.loginInterval)
    }

    // This is the button for trying the connection again
    tryConnectingAgain = () => {
        this.setState({ shouldTryAgain: false })
        if (!this.props.isNetworkConnected) {
            this.setState({ shouldTryAgain: true })
            return
        }
        this.props.authenticateUser(this.state.clientToken)
        this.loginInterval = setTimeout(() => {
            this.setState({ shouldTryAgain: true })
        }, 10000)
    }

    render() {
        return (
            <View style={styles.container}>
                {!this.state.shouldTryAgain && (
                    <LottieView
                        source={require('../../assets/splashScreen/sinavia.json')}
                        autoPlay
                        loop
                    />
                )}
                {this.state.shouldTryAgain && (
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1.2 }}></View>
                        <View style={styles.tryAgainTextContainer}>
                            <Text style={styles.tryAgainText}>:(</Text>
                            <Text
                                style={[
                                    styles.tryAgainText,
                                    { fontSize: hp(4) }
                                ]}
                            >
                                Bağlantı problemi
                            </Text>
                        </View>
                        <View style={styles.tryAgainButtonContainer}>
                            <AuthButton
                                height={hp(8)}
                                width={wp(50)}
                                color="#2E313C"
                                buttonText="Yeniden Dene"
                                borderRadius={50}
                                fontSize={hp(3)}
                                onPress={this.tryConnectingAgain}
                            />
                        </View>
                    </View>
                )}
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
