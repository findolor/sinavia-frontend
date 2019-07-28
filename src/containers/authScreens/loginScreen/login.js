import React from 'react'
import {
    Image,
    View,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Animated,
    Platform
} from 'react-native'
import {
    navigationPush,
    navigationReset
} from '../../../services/navigationService'
import { SCENE_KEYS } from '../../../config/index'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { AuthButton, AuthTextInput } from '../../../components/authScreen'
import sinaviaLogo from '../../../assets/sinavia_logo_cut.png'
import eye from '../../../assets/eye.png'
import styles from './style'
import NotchView from '../../../components/notchView'

const IMAGE_HEIGHT = hp(40)
const IMAGE_HEIGHT_SMALL = hp(25)
const ANIMATION_DURATION = 100

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showForgotPasswordText: true,
            showPasswordEye: false,
            hidePassword: true
        }

        this.keyboardHeight = new Animated.Value(0)
        this.imageHeight = new Animated.Value(IMAGE_HEIGHT)
    }

    componentDidMount() {
        let keyboardShowEvent =
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
        let keyboardHideEvent =
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'

        this.keyboardShowSub = Keyboard.addListener(
            keyboardShowEvent,
            this.keyboardShow
        )
        this.keyboardHideSub = Keyboard.addListener(
            keyboardHideEvent,
            this.keyboardHide
        )
    }

    componentWillUnmount() {
        this.keyboardShowSub.remove()
        this.keyboardHideSub.remove()
    }

    keyboardShow = event => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: ANIMATION_DURATION,
                toValue: event.endCoordinates.height - hp(12)
            }),
            Animated.timing(this.imageHeight, {
                duration: ANIMATION_DURATION,
                toValue: IMAGE_HEIGHT_SMALL
            })
        ]).start()
    }

    keyboardHide = event => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: ANIMATION_DURATION,
                toValue: 0
            }),
            Animated.timing(this.imageHeight, {
                duration: ANIMATION_DURATION,
                toValue: IMAGE_HEIGHT
            })
        ]).start()
    }

    managePasswordVisibility = () => {
        this.setState({ hidePassword: !this.state.hidePassword })
    }

    render() {
        return (
            <Animated.View
                style={[
                    styles.container,
                    { paddingBottom: this.keyboardHeight }
                ]}
            >
                <StatusBar hidden />
                <NotchView color={'#fcfcfc'} />
                <View style={styles.imageContainer}>
                    <Animated.Image
                        source={sinaviaLogo}
                        style={[
                            {
                                height: hp(45),
                                resizeMode: 'contain',
                                marginTop: hp(3)
                            },
                            { height: this.imageHeight }
                        ]}
                    />
                </View>
                <View style={styles.textInputsContainer}>
                    <AuthTextInput
                        placeholder="Kullanıcı Adı veya E-Posta                                                                 "
                        placeholderTextColor="#8A8888"
                    />
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            secureTextEntry={this.state.hidePassword}
                            placeholder="Şifre                                                                                  "
                            placeholderTextColor="#8A8888"
                            onChangeText={text => {
                                if (text === '') {
                                    this.setState({
                                        showForgotPasswordText: true,
                                        showPasswordEye: false
                                    })
                                } else {
                                    this.setState({
                                        showForgotPasswordText: false,
                                        showPasswordEye: true
                                    })
                                }
                            }}
                        />
                        {this.state.showForgotPasswordText && (
                            <View style={styles.forgetPasswordContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigationPush(
                                            SCENE_KEYS.authScreens.resetPassword
                                        )
                                    }}
                                >
                                    <Text style={styles.forgetPasswordText}>
                                        Şifremi Unuttum
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        {this.state.showPasswordEye && (
                            <View style={styles.eyeContainer}>
                                <TouchableOpacity
                                    onPress={this.managePasswordVisibility}
                                >
                                    <Image
                                        source={eye}
                                        style={{
                                            height: hp(3),
                                            width: wp(9)
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <AuthButton
                        height={hp(7)}
                        width={wp(85)}
                        marginBottom={hp(6)}
                        color="#00D9EF"
                        underlayColor="#1a5d63"
                        buttonText="Giriş Yap"
                        onPress={() => {
                            navigationReset('main')
                        }}
                    />
                </View>
            </Animated.View>
        )
    }
}
