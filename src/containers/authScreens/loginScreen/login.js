import React from 'react'
import {
    Image,
    View,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity
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

export default class Opening extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showForgotPasswordText: true,
            showPasswordEye: false,
            hidePassword: true
        }
    }

    managePasswordVisibility = () => {
        this.setState({ hidePassword: !this.state.hidePassword })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden />
                <View style={styles.imageContainer}>
                    <Image
                        source={sinaviaLogo}
                        style={{
                            height: hp(40),
                            resizeMode: 'contain',
                            marginTop: hp(10)
                        }}
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
            </View>
        )
    }
}
