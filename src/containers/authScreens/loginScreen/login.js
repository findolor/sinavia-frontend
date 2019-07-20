import React from 'react'
import {
    Image,
    View,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Animated
} from 'react-native'
import { sceneKeys, navigationPush } from '../../../services/navigationService'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { AuthButton, AuthTextInput } from '../../../components/authScreen'
import sinaviaLogo from '../../../assets/sinavia_logo_cut.png'
import eye from '../../../assets/eye.png'
import styles from './style'

const IMAGE_HEIGHT = hp(40)
const IMAGE_HEIGHT_SMALL = hp(30)

export default class Opening extends React.Component {
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
        this.keyboardWillShowSub = Keyboard.addListener(
            'keyboardWillShow',
            this.keyboardWillShow
        )
        this.keyboardWillHideSub = Keyboard.addListener(
            'keyboardWillHide',
            this.keyboardWillHide
        )
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove()
        this.keyboardWillHideSub.remove()
    }

    keyboardWillShow = event => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: event.endCoordinates.height - hp(20)
            }),
            Animated.timing(this.imageHeight, {
                duration: event.duration,
                toValue: IMAGE_HEIGHT_SMALL
            })
        ]).start()
    }

    keyboardWillHide = event => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: 0
            }),
            Animated.timing(this.imageHeight, {
                duration: event.duration,
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
                <View style={styles.imageContainer}>
                    <Animated.Image
                        source={sinaviaLogo}
                        style={[
                            {
                                height: hp(45),
                                resizeMode: 'contain',
                                marginTop: hp(7)
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
                                        navigationPush(sceneKeys.resetPassword)
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
                        marginBottom={hp(6)}
                        color="#00D9EF"
                        underlayColor="#1a5d63"
                        buttonText="Giriş Yap"
                    />
                </View>
            </Animated.View>
        )
    }
}
