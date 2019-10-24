import React from 'react'
import {
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Alert,
    TouchableWithoutFeedback,
    KeyboardAvoidingView
} from 'react-native'
import { navigationPush } from '../../../services/navigationService'
import { SCENE_KEYS } from '../../../config/index'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { connect } from 'react-redux'
import { clientActions } from '../../../redux/client/actions'
import { AuthButton, AuthTextInput } from '../../../components/authScreen'
import styles from './style'
import NotchView from '../../../components/notchView'
import { showMessage } from 'react-native-flash-message'

import SINAVIA_LOGO from '../../../assets/sinavia_logo_cut.png'
import EYE from '../../../assets/eye.png'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showForgotPasswordText: true,
            showPasswordEye: false,
            hidePassword: true,
            email: '',
            password: ''
        }
    }

    forgotPasswordOnPress = () => {
        navigationPush(SCENE_KEYS.authScreens.resetPassword)
    }

    managePasswordVisibility = () => {
        this.setState({ hidePassword: !this.state.hidePassword })
    }

    emailOnChange = text => {
        this.setState({ email: text })
    }

    loginOnPress = () => {
        if (!this.props.isNetworkConnected) {
            showMessage({
                message: 'Lütfen internet bağlantınızı kontrol ediniz',
                type: 'danger',
                duration: 2000,
                titleStyle: styles.networkErrorStyle,
                icon: 'auto'
            })
            return
        }

        let userCredentials = {
            email: this.state.email,
            password: this.state.password
        }

        let userCredentialsKeys = Object.keys(userCredentials)
        let wrongCredentialList = []
        let wrongCredentialString = 'Yanlış alanlar! ->'

        userCredentialsKeys.forEach(element => {
            if (userCredentials[element] === '') {
                wrongCredentialList.push(element)
                wrongCredentialString += `${element}, `
            }
        })

        if (Object.keys(wrongCredentialList).length === 0)
            this.props.loginUser(userCredentials)
        else Alert.alert(wrongCredentialString)
    }

    render() {
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss()
                }}
            >
                <KeyboardAvoidingView
                    style={[styles.container]}
                    behavior={'position'}
                >
                    <NotchView color={'#fcfcfc'} />
                    <View style={styles.imageContainer}>
                        <Image
                            source={SINAVIA_LOGO}
                            style={[
                                {
                                    height: hp(45),
                                    resizeMode: 'contain',
                                    marginTop: hp(3)
                                }
                            ]}
                        />
                    </View>
                    <View style={styles.textInputsContainer}>
                        <AuthTextInput
                            placeholder="Kullanıcı Adı veya E-Posta"
                            placeholderTextColor="#8A8888"
                            onChangeText={email => this.emailOnChange(email)}
                        />
                        <View style={styles.textInputContainer}>
                            <TextInput
                                style={styles.textInput}
                                secureTextEntry={this.state.hidePassword}
                                placeholder="Şifre"
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
                                            showPasswordEye: true,
                                            password: text
                                        })
                                    }
                                }}
                            />
                            {this.state.showForgotPasswordText && (
                                <View style={styles.forgetPasswordContainer}>
                                    <TouchableOpacity
                                        onPress={this.forgotPasswordOnPress}
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
                                            source={EYE}
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
                            buttonText="Giriş Yap"
                            borderRadius={10}
                            onPress={this.loginOnPress}
                            disabled={this.props.buttonLock}
                        />
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        )
    }
}

const mapStateToProps = state => ({
    isNetworkConnected: state.app.isNetworkConnected,
    buttonLock: state.app.buttonLock
})

const mapDispatchToProps = dispatch => ({
    loginUser: userCredentials =>
        dispatch(clientActions.loginUser(userCredentials))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
