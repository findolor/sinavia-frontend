import React from 'react'
import { View, Image, ImageBackground, Text, Alert } from 'react-native'
import styles, { hp, wp } from './style'
import {
    navigationReset,
    getCurrentScreen
} from '../../services/navigationService'
import NetInfo from '@react-native-community/netinfo'
import { deviceStorage } from '../../services/deviceStorage'
import { connect } from 'react-redux'
import { clientActions } from '../../redux/client/actions'
import LottieView from 'lottie-react-native'
import { appActions } from '../../redux/app/actions'
import { AuthButton } from '../../components/authScreen'
import { showMessage } from 'react-native-flash-message'
import { GoogleSignin } from '@react-native-community/google-signin'

import CONNECTION_ERROR_COLORED from '../../assets/connection_error_colored.png'
import CONNECTION_ERROR_SHADOW from '../../assets/connection_error_shadow.png'

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
        GoogleSignin.configure()

        const isAppOpenedBefore = await deviceStorage.getItemFromStorage(
            'isAppOpenedBefore'
        )
        if (isAppOpenedBefore === null) {
            setTimeout(() => {
                navigationReset('tutorial')
            }, 3000)
            return
        }

        this.getJWTToken().then(async token => {
            // If we don't have any token saved, we go to the auth screen
            if (token === null) {
                await deviceStorage.clearDeviceStorage()
                setTimeout(() => {
                    navigationReset('auth')
                }, 3000)
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
                    // TODO CHANGE THIS TO SPLASH SCREEN
                    <LottieView
                        source={require('../../assets/splashScreen/sinavia_opening.json')}
                        autoPlay
                        loop={false}
                    />
                )}
                {this.state.shouldTryAgain && (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <View style={{ flex: 10 }} />
                        <View style={{ flex: 80, width: wp(100) }}>
                            <ImageBackground
                                source={CONNECTION_ERROR_SHADOW}
                                resizeMode={'stretch'}
                                style={{ flex: 1 }}
                            >
                                <View
                                    style={{
                                        flex: 80,
                                        justifyContent: 'flex-start',
                                        alignItems: 'center'
                                    }}
                                >
                                    <View style={styles.tryAgainImgContainer}>
                                        <Image
                                            source={CONNECTION_ERROR_COLORED}
                                            style={
                                                styles.connectionErrorColoredImg
                                            }
                                        />
                                    </View>
                                    <View style={styles.tryAgainTextContainer}>
                                        <Text style={styles.tryAgainText}>
                                            {this.props.connectionErrorMessage}
                                        </Text>
                                    </View>
                                    <View
                                        style={styles.tryAgainButtonContainer}
                                    >
                                        <AuthButton
                                            height={hp(7)}
                                            width={wp(50)}
                                            color="#00D9EF"
                                            buttonText="Yeniden Dene"
                                            borderRadius={50}
                                            fontSize={hp(3)}
                                            marginTop={hp(6.5)}
                                            onPress={this.tryConnectingAgain}
                                        />
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={{ flex: 10 }} />
                    </View>
                )}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    isNetworkConnected: state.app.isNetworkConnected,
    connectionErrorMessage: state.app.connectionErrorMessage
})

const mapDispatchToProps = dispatch => ({
    authenticateUser: token => dispatch(clientActions.checkUserToken(token)),
    setNetworkConnectionInfo: networkConnectionInfo =>
        dispatch(appActions.setNetworkConnectionInfo(networkConnectionInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
