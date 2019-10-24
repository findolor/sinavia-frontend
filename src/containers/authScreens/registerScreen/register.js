import React from 'react'
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    Switch,
    TextInput,
    Keyboard,
    Alert,
    TouchableWithoutFeedback,
    KeyboardAvoidingView
} from 'react-native'
import { navigationPush } from '../../../services/navigationService'
import { SCENE_KEYS } from '../../../config/index'
import { connect } from 'react-redux'
import { clientActions } from '../../../redux/client/actions'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { AuthButton, AuthTextInput } from '../../../components/authScreen'
import styles from './style'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
import NotchView from '../../../components/notchView'
import { showMessage } from 'react-native-flash-message'

import SINAVIA_LOGO from '../../../assets/sinavia_logo_cut.png'
import OPENED_EYE from '../../../assets/openedEye.png'
import CLOSED_EYE from '../../../assets/closedEye.png'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // Register related stuff
            birthDateUI: 'Doğum Tarihi  (Opsiyonel)',
            isDateTimePickerVisible: false,
            switchValue: false,
            showPasswordEyeFirst: false,
            showPasswordEyeSecond: false,
            hidePasswordFirst: true,
            hidePasswordSecond: true,
            dateColor: '#7A7878',
            // User Information
            username: '',
            name: '',
            lastname: '',
            city: '',
            email: '',
            password: '',
            birthDate: ''
        }
    }

    managePasswordVisibility = () => {
        this.setState({ hidePasswordFirst: !this.state.hidePasswordFirst })
        console.log(this.state.password)
    }

    managePasswordVisibility2 = () => {
        this.setState({ hidePasswordSecond: !this.state.hidePasswordSecond })
    }

    toggleSwitch = value => {
        this.setState({ switchValue: value })
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true })
    }

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false })
    }

    goToLoginScreen = () => {
        navigationPush(SCENE_KEYS.authScreens.login)
    }

    handleDatePicked = date => {
        this.hideDateTimePicker()
        this.setState({
            birthDate: date,
            birthDateUI: moment(new Date(date.toString().substr(0, 16))).format(
                'DD-MM-YYYY'
            ),
            dateColor: '#000'
        })
    }

    usernameOnChange = text => {
        this.setState({ username: text })
    }

    nameLastameOnChange = text => {
        let splittedText = text.split(/[ ,]+/)
        let name = splittedText[0]
        let lastname = splittedText[1]
        this.setState({ name: name, lastname: lastname })
    }

    cityOnChange = text => {
        this.setState({ city: text })
    }

    emailOnChange = text => {
        this.setState({ email: text })
    }

    registerOnPress = () => {
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

        let userInformation = {
            //username: this.state.username,
            //name: this.state.name,
            //lastname: this.state.lastname,
            email: this.state.email,
            //city: this.state.city,
            //birthDate: this.state.birthDate,
            password: this.state.password
        }

        let userInformationKeys = Object.keys(userInformation)
        let wrongInformationList = []
        let wrongInformationString = 'Yanlış alanlar! ->'

        userInformationKeys.forEach(element => {
            if (userInformation[element] === '') {
                wrongInformationList.push(element)
                wrongInformationString += `${element}, `
            }
        })

        if (Object.keys(wrongInformationList).length === 0)
            this.props.userSignUp(userInformation)
        else Alert.alert(wrongInformationString)
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
                            style={{
                                height: hp(36),
                                marginBottom: hp(2),
                                resizeMode: 'contain'
                            }}
                        />
                    </View>
                    <View style={styles.allTextInputsContainer}>
                        <AuthTextInput
                            placeholder="E-Posta"
                            placeholderTextColor="#8A8888"
                            onChangeText={this.emailOnChange}
                        />
                        <View style={styles.textInputContainer}>
                            <TextInput
                                style={styles.textInput}
                                secureTextEntry={this.state.hidePasswordFirst}
                                placeholder="Şifre"
                                placeholderTextColor={'#8A8888'}
                                onChangeText={text => {
                                    if (text === '') {
                                        this.setState({
                                            showPasswordEyeFirst: false
                                        })
                                    } else {
                                        this.setState({
                                            showPasswordEyeFirst: true,
                                            password: text
                                        })
                                    }
                                }}
                            />
                            {this.state.showPasswordEyeFirst &&
                                this.state.showPasswordEyeFirst === true && (
                                    <View style={styles.eyeContainer}>
                                        <TouchableOpacity
                                            onPress={
                                                this.managePasswordVisibility
                                            }
                                        >
                                            {this.state.hidePasswordFirst ===
                                                true && (
                                                <Image
                                                    source={CLOSED_EYE}
                                                    style={{
                                                        height: hp(3),
                                                        width: hp(5)
                                                    }}
                                                />
                                            )}
                                            {this.state.hidePasswordFirst ===
                                                false && (
                                                <Image
                                                    source={OPENED_EYE}
                                                    style={{
                                                        height: hp(3),
                                                        width: hp(5)
                                                    }}
                                                />
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                )}
                        </View>
                        <View style={styles.textInputContainer}>
                            <TextInput
                                style={styles.textInput}
                                secureTextEntry={this.state.hidePasswordSecond}
                                placeholder="Şifre (Tekrar)                                                                     "
                                placeholderTextColor={'#8A8888'}
                                onChangeText={text => {
                                    if (text === '') {
                                        this.setState({
                                            showPasswordEyeSecond: false
                                        })
                                    } else {
                                        if (this.state.password !== text) {
                                        }
                                        this.setState({
                                            showPasswordEyeSecond: true,
                                            secondPassword: text
                                        })
                                    }
                                }}
                            />
                            {this.state.showPasswordEyeSecond &&
                                this.state.showPasswordEyeSecond === true && (
                                    <View style={styles.eyeContainer}>
                                        <TouchableOpacity
                                            onPress={
                                                this.managePasswordVisibility2
                                            }
                                        >
                                            {this.state.hidePasswordSecond ===
                                                true && (
                                                <Image
                                                    source={CLOSED_EYE}
                                                    style={{
                                                        height: hp(3),
                                                        width: hp(5)
                                                    }}
                                                />
                                            )}
                                            {this.state.hidePasswordSecond ===
                                                false && (
                                                <Image
                                                    source={OPENED_EYE}
                                                    style={{
                                                        height: hp(3),
                                                        width: hp(5)
                                                    }}
                                                />
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                )}
                        </View>
                    </View>
                    <View style={styles.toggleContainer}>
                        <View style={styles.switchView}>
                            <Switch
                                style={{
                                    transform: [
                                        { scaleX: 0.8 },
                                        { scaleY: 0.8 }
                                    ]
                                }}
                                onValueChange={this.toggleSwitch}
                                value={this.state.switchValue}
                                trackColor="#00D9EF"
                                thumbColor="#00D9EF"
                            />
                        </View>
                        <View style={styles.licenseTextContainer}>
                            <Text style={styles.toggleText}>
                                <Text
                                    onPress={() => {
                                        alert('Model gelecek')
                                    }}
                                    style={{ color: '#00D9EF' }}
                                >
                                    Kullanıcı sözleşmesi
                                </Text>
                                ni okudum ve kabul ediyorum.
                            </Text>
                        </View>
                    </View>
                    <View style={styles.authButtonView}>
                        <AuthButton
                            height={hp(7)}
                            width={wp(85)}
                            color="#00D9EF"
                            buttonText="Kayıt Ol"
                            borderRadius={10}
                            onPress={this.registerOnPress}
                        />
                    </View>
                    <View style={styles.gotoLoginContainer}>
                        <Text style={styles.gotoLoginTextFirst}>
                            Zaten bir hesabın var mı?{' '}
                            <Text
                                onPress={this.goToLoginScreen}
                                style={styles.gotoLoginTextSecond}
                            >
                                Giriş Yap
                            </Text>
                        </Text>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        )
    }
}

const mapStateToProps = state => ({
    isNetworkConnected: state.app.isNetworkConnected
})

const mapDispatchToProps = dispatch => ({
    userSignUp: userInformation =>
        dispatch(clientActions.userSignUp(userInformation))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)
