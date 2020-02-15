import React from 'react'
import {
    Image,
    View,
    Text,
    Modal,
    TouchableOpacity,
    Platform,
    Alert,
    ActivityIndicator
} from 'react-native'
import {
    navigationPush,
    navigationReplace
} from '../../../services/navigationService'
import { SCENE_KEYS } from '../../../config/index'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { AuthButton } from '../../../components/authScreen'
import styles from './style'
import NotchView from '../../../components/notchView'
import { fcmService } from '../../../services/fcmService'
import {
    GoogleSignin,
    statusCodes
} from '@react-native-community/google-signin'
import SINAVIA_LOGO from '../../../assets/sinavia_logo_cut.png'
import { apiServicesTree, makeGetRequest } from '../../../services/apiServices'
import { flashMessages } from '../../../services/flashMessageBuilder'
import { connect } from 'react-redux'
import { clientActions } from '../../../redux/client/actions'
import { deviceStorage } from '../../../services/deviceStorage'
import appleAuth, {
    AppleAuthRequestOperation,
    AppleAuthRequestScope,
    AppleAuthCredentialState,
    AppleButton
} from '@invertase/react-native-apple-authentication'
import APPLE_LOGO from '../../../assets/apple_logo.png'
import GOOGLE_LOGO from '../../../assets/google_logo.png'

class Opening extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLicenceModalVisible: false
        }
    }
    async componentDidMount() {
        await fcmService.checkPermissions()
    }

    signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn()

            // Getting the user from our db
            makeGetRequest(apiServicesTree.userApi.checkUserWithEmail, {
                email: userInfo.user.email
            }).then(async response => {
                // If the user doesn't exist we create one
                if (response === null) {
                    navigationReplace(SCENE_KEYS.authScreens.getInfo, {
                        email: userInfo.user.email,
                        password: 'null',
                        signInMethod: 'google'
                    })
                } else {
                    if (response === 'normal') {
                        flashMessages.generalErrorWithProps(
                            'Giriş hatası',
                            "Lütfen 'Giriş Yap' ile giriş yapınız.",
                            {
                                backgroundColor: '#FFFFFF',
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                borderColor: '#00D9EF',
                                borderWidth: hp(0.25),
                                height: hp(10)
                            }
                        )
                        //await GoogleSignin.revokeAccess()
                        await GoogleSignin.signOut()
                        return
                    }
                    if (response === 'apple') {
                        flashMessages.generalErrorWithProps(
                            'Giriş hatası',
                            "Lütfen 'Apple' ile giriş yapınız.",
                            {
                                backgroundColor: '#FFFFFF',
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                borderColor: '#00D9EF',
                                borderWidth: hp(0.25),
                                height: hp(10)
                            }
                        )
                        //await GoogleSignin.revokeAccess()
                        await GoogleSignin.signOut()
                        return
                    }
                    // Saving the sign-in method
                    await deviceStorage.saveItemToStorage(
                        'signInMethod',
                        'google'
                    )
                    this.props.loginUser({
                        email: userInfo.user.email,
                        password: 'null'
                    })
                }
            })
        } catch (error) {
            console.log(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }

    logoutFromApple = async () => {
        try {
            // performs logout request
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: AppleAuthRequestOperation.LOGOUT
            })

            // get current authentication state for user
            const credentialState = await appleAuth.getCredentialStateForUser(
                appleAuthRequestResponse.user
            )

            // use credentialState response to ensure the user credential's have been revoked
            if (credentialState === AppleAuthCredentialState.REVOKED) {
                // user is unauthenticated
            }
        } catch (error) {
            console.log(error)
        }
    }

    signInWithApple = () => {
        if (!appleAuth.isSupported) {
            flashMessages.generalErrorWithProps(
                'Hata!',
                'Lütfen telefonunuzu güncelleyiniz.',
                {
                    backgroundColor: '#FFFFFF',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderColor: '#00D9EF',
                    borderWidth: hp(0.25),
                    height: hp(10)
                }
            )
            return
        }
        Alert.alert(
            'Apple ile giriş',
            'Lütfen çıkan ekranda e-postamı paylaş seçeneğini seçiniz.',
            [
                {
                    text: 'Tamam',
                    onPress: async () => {
                        try {
                            // performs login request
                            const appleAuthRequestResponse = await appleAuth.performRequest(
                                {
                                    requestedOperation:
                                        AppleAuthRequestOperation.LOGIN,
                                    requestedScopes: [
                                        AppleAuthRequestScope.EMAIL,
                                        AppleAuthRequestScope.FULL_NAME
                                    ]
                                }
                            )

                            // get current authentication state for user
                            const credentialState = await appleAuth.getCredentialStateForUser(
                                appleAuthRequestResponse.user
                            )

                            // use credentialState response to ensure the user is authenticated
                            if (
                                credentialState ===
                                AppleAuthCredentialState.AUTHORIZED
                            ) {
                                if (appleAuthRequestResponse.email !== null) {
                                    makeGetRequest(
                                        apiServicesTree.userApi
                                            .checkUserWithEmail,
                                        {
                                            email:
                                                appleAuthRequestResponse.email
                                        }
                                    ).then(async response => {
                                        // If the user doesn't exist we create one
                                        if (response === null) {
                                            await deviceStorage.saveItemToStorage(
                                                'appleIdentityToken',
                                                appleAuthRequestResponse.user
                                            )
                                            navigationReplace(
                                                SCENE_KEYS.authScreens.getInfo,
                                                {
                                                    email:
                                                        appleAuthRequestResponse.email,
                                                    password: 'null',
                                                    signInMethod: 'apple'
                                                }
                                            )
                                        } else {
                                            if (response === 'normal') {
                                                flashMessages.generalErrorWithProps(
                                                    'Giriş hatası',
                                                    "Lütfen 'Giriş Yap' ile giriş yapınız.",
                                                    {
                                                        backgroundColor:
                                                            '#FFFFFF',
                                                        borderBottomLeftRadius: 10,
                                                        borderBottomRightRadius: 10,
                                                        borderColor: '#00D9EF',
                                                        borderWidth: hp(0.25),
                                                        height: hp(10)
                                                    }
                                                )
                                                await this.logoutFromApple()
                                                return
                                            }
                                            if (response === 'google') {
                                                flashMessages.generalErrorWithProps(
                                                    'Giriş hatası',
                                                    "Lütfen 'Google' ile giriş yapınız.",
                                                    {
                                                        backgroundColor:
                                                            '#FFFFFF',
                                                        borderBottomLeftRadius: 10,
                                                        borderBottomRightRadius: 10,
                                                        borderColor: '#00D9EF',
                                                        borderWidth: hp(0.25),
                                                        height: hp(10)
                                                    }
                                                )
                                                await this.logoutFromApple()
                                                return
                                            }
                                        }
                                    })
                                }
                                // Getting the user from our db
                                else
                                    makeGetRequest(
                                        apiServicesTree.userApi
                                            .checkUserWithIdentityToken,
                                        {
                                            identityToken:
                                                appleAuthRequestResponse.user
                                        }
                                    ).then(async response => {
                                        // If the user doesn't exist we create one
                                        if (response === null) {
                                            await deviceStorage.saveItemToStorage(
                                                'appleIdentityToken',
                                                appleAuthRequestResponse.user
                                            )
                                            navigationReplace(
                                                SCENE_KEYS.authScreens.getInfo,
                                                {
                                                    email: 'email',
                                                    password: 'null',
                                                    signInMethod: 'apple'
                                                }
                                            )
                                        } else {
                                            if (response === 'normal') {
                                                flashMessages.generalErrorWithProps(
                                                    'Giriş hatası',
                                                    "Lütfen 'Giriş Yap' ile giriş yapınız.",
                                                    {
                                                        backgroundColor:
                                                            '#FFFFFF',
                                                        borderBottomLeftRadius: 10,
                                                        borderBottomRightRadius: 10,
                                                        borderColor: '#00D9EF',
                                                        borderWidth: hp(0.25),
                                                        height: hp(10)
                                                    }
                                                )
                                                await this.logoutFromApple()
                                                return
                                            }
                                            if (response === 'google') {
                                                flashMessages.generalErrorWithProps(
                                                    'Giriş hatası',
                                                    "Lütfen 'Google' ile giriş yapınız.",
                                                    {
                                                        backgroundColor:
                                                            '#FFFFFF',
                                                        borderBottomLeftRadius: 10,
                                                        borderBottomRightRadius: 10,
                                                        borderColor: '#00D9EF',
                                                        borderWidth: hp(0.25),
                                                        height: hp(10)
                                                    }
                                                )
                                                await this.logoutFromApple()
                                                return
                                            }
                                            // Saving the sign-in method and token
                                            await deviceStorage.saveItemToStorage(
                                                'signInMethod',
                                                'apple'
                                            )
                                            await deviceStorage.saveItemToStorage(
                                                'appleIdentityToken',
                                                appleAuthRequestResponse.user
                                            )
                                            this.props.loginUser({
                                                identityToken:
                                                    appleAuthRequestResponse.user,
                                                password: 'null'
                                            })
                                        }
                                    })
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    }
                }
            ]
        )
    }

    onPressLicenceView = () => {
        this.setState({
            isLicenceModalVisible: true
        })
    }

    closeLicenceView = () => {
        this.setState({
            isLicenceModalVisible: false
        })
    }

    render() {
        if (this.state.isLogging) {
            return (
                <View style={[styles.container, { justifyContent: 'center' }]}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Modal
                    visible={this.state.isLicenceModalVisible}
                    transparent={true}
                    animationType={'fade'}
                >
                    <TouchableOpacity
                        onPress={this.closeLicenceView}
                        style={styles.shadowView}
                    >
                        <View style={styles.licenceView}></View>
                    </TouchableOpacity>
                </Modal>
                <NotchView color={'#fcfcfc'} />
                <View style={styles.imageContainer}>
                    <Image
                        source={SINAVIA_LOGO}
                        style={{
                            height: hp(33),
                            resizeMode: 'contain',
                            marginTop: hp(3),
                            marginLeft: wp(6)
                        }}
                    />
                    <Text style={styles.sinaviaText}>Sınavia</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <AuthButton
                        height={hp(7)}
                        width={wp(85)}
                        color="#00D9EF"
                        underlayColor="#1a5d63"
                        buttonText="Giriş Yap"
                        borderRadius={hp(1.5)}
                        fontSize={hp(3)}
                        onPress={() => {
                            navigationPush(SCENE_KEYS.authScreens.login)
                        }}
                    />
                    <AuthButton
                        height={hp(7)}
                        width={wp(85)}
                        color="#00D9EF"
                        underlayColor="#1a5d63"
                        buttonText="Kayıt Ol"
                        borderRadius={hp(1.5)}
                        fontSize={hp(3)}
                        onPress={() => {
                            navigationPush(SCENE_KEYS.authScreens.register)
                        }}
                    />
                </View>
                <View style={styles.separatorContainer}>
                    <View style={styles.separatorLine} />
                </View>
                <View style={styles.buttonContainer}>
                    {Platform.OS === 'ios' && (
                        <AuthButton
                            height={hp(7)}
                            width={wp(85)}
                            color="black"
                            fontSize={hp(3)}
                            buttonText="Apple ile Bağlan"
                            borderRadius={hp(1.5)}
                            onPress={this.signInWithApple}
                            image={APPLE_LOGO}
                            imageStyle={{
                                width: wp(8),
                                resizeMode: 'contain'
                            }}
                        />
                    )}
                    <AuthButton
                        height={hp(7)}
                        width={wp(85)}
                        color="#a11202"
                        fontSize={hp(3)}
                        buttonText="Google ile Bağlan"
                        borderRadius={hp(1.5)}
                        onPress={this.signInWithGoogle}
                        image={GOOGLE_LOGO}
                        imageStyle={{
                            width: wp(8),
                            resizeMode: 'contain'
                        }}
                    />
                </View>
                <View style={styles.spaceView}>
                    <Text style={styles.oauthInfoText}>
                        {Platform.OS === 'ios'
                            ? 'Apple veya Google ile Bağlan seçeneklerini kullanarak '
                            : 'Google ile bağlan seçeneğini kullanarak '}
                        <Text
                            onPress={this.onPressLicenceView}
                            style={{
                                textDecorationLine: 'underline',
                                fontFamily: 'Averta-Semibold'
                            }}
                        >
                            Kullanıcı Sözleşmesi
                        </Text>
                        'ni kabul etmiş sayılırsın.
                    </Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    loginUser: userCredentials =>
        dispatch(clientActions.loginUser(userCredentials))
})

export default connect(mapStateToProps, mapDispatchToProps)(Opening)
