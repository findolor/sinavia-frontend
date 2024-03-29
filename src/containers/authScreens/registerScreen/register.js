import React from 'react'
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Keyboard,
    Alert,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Modal,
    ScrollView
} from 'react-native'
import {
    navigationPop,
    navigationPush
} from '../../../services/navigationService'
import { SCENE_KEYS } from '../../../config/index'
import { connect } from 'react-redux'
import { clientActions } from '../../../redux/client/actions'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { AuthButton, AuthTextInput } from '../../../components/authScreen'
import styles from './style'
import SwitchToggle from 'react-native-switch-toggle'
import moment from 'moment'
import NotchView from '../../../components/notchView'
import { showMessage } from 'react-native-flash-message'

import SINAVIA_LOGO from '../../../assets/sinavia_logo_cut.png'
import OPENED_EYE from '../../../assets/openedEye.png'
import CLOSED_EYE from '../../../assets/closedEye.png'
import { flashMessages } from '../../../services/flashMessageBuilder'
import BACK_BUTTON from '../../../assets/return.png'

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
            secondPassword: '',
            birthDate: '',
            passwordBorderColor: '#989696',
            secondPasswordBorderColor: '#989696',
            isLicenceModalVisible: false,
            lisenceModalEverOpened: false,
            isAcceptButtonVisible: false
        }
    }

    managePasswordVisibility = () => {
        this.setState({ hidePasswordFirst: !this.state.hidePasswordFirst })
        console.log(this.state.password)
    }

    managePasswordVisibility2 = () => {
        this.setState({ hidePasswordSecond: !this.state.hidePasswordSecond })
    }

    toggleSwitch = () => {
        if (this.state.lisenceModalEverOpened === false) {
            this.onPressLicenceView()
        } else {
            this.setState({ switchValue: !this.state.switchValue })
        }
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

    passwordOnChange = text => {
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
    }

    secondPasswordOnChange = text => {
        if (text === '') {
            this.setState({
                showPasswordEyeSecond: false
            })
        } else {
            this.setState({
                showPasswordEyeSecond: true,
                secondPassword: text
            })
        }
    }

    registerOnPress = () => {
        if (
            this.state.email === '' ||
            this.state.password === '' ||
            this.state.secondPassword === ''
        ) {
            flashMessages.authInfosOrSettingsError(
                'Boş alan hatası',
                'Bütün alanları doldurmalısın',
                {
                    backgroundColor: '#FFFFFF',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderColor: '#00D9EF',
                    borderWidth: hp(0.25),
                    height: hp(10)
                }
            )
        } else if (this.state.password.length < 6) {
            flashMessages.authInfosOrSettingsError(
                'Şifre hatası',
                'Şifren en az 6, en fazla 16 karakterden oluşmalıdır',
                {
                    backgroundColor: '#FFFFFF',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderColor: '#00D9EF',
                    borderWidth: hp(0.25),
                    height: hp(10)
                }
            )
            this.setState({ passwordBorderColor: 'red' })
        } else if (this.state.secondPassword.length < 6) {
            flashMessages.authInfosOrSettingsError(
                'Şifre hatası',
                'Şifren en az 6, en fazla 16 karakterden oluşmalıdır',
                {
                    backgroundColor: '#FFFFFF',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderColor: '#00D9EF',
                    borderWidth: hp(0.25),
                    height: hp(10)
                }
            )
            this.setState({ secondPasswordBorderColor: 'red' })
        } else if (this.state.password.includes(' ')) {
            flashMessages.authInfosOrSettingsError(
                'Şifre hatası',
                'Şifren içerisinde boşluk bulunmamalıdır',
                {
                    backgroundColor: '#FFFFFF',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderColor: '#00D9EF',
                    borderWidth: hp(0.25),
                    height: hp(10)
                }
            )
            this.setState({ passwordBoderColor: 'red' })
        } else if (this.state.secondPassword.includes(' ')) {
            flashMessages.authInfosOrSettingsError(
                'Şifre hatası',
                'Şifren içerisinde boşluk bulunmamalıdır',
                {
                    backgroundColor: '#FFFFFF',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderColor: '#00D9EF',
                    borderWidth: hp(0.25),
                    height: hp(10)
                }
            )
            this.setState({ secondPasswordBoderColor: 'red' })
        } else if (this.state.password !== this.state.secondPassword) {
            flashMessages.authInfosOrSettingsError(
                'Şifre hatası',
                'Şifreler birbiriyle uyuşmamaktadır',
                {
                    backgroundColor: '#FFFFFF',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderColor: '#00D9EF',
                    borderWidth: hp(0.25),
                    height: hp(10)
                }
            )
            this.setState({
                passwordBorderColor: 'red',
                secondPasswordBorderColor: 'red'
            })
        } else if (this.state.switchValue === false) {
            flashMessages.authInfosOrSettingsError(
                'Son bir adım',
                'Kullanıcı sözleşmesini onaylamalısın',
                {
                    backgroundColor: '#FFFFFF',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderColor: '#00D9EF',
                    borderWidth: hp(0.25),
                    height: hp(10)
                }
            )
        } else {
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

            this.props.userSignUp({
                email: this.state.email.replace(/ /g, ''),
                password: this.state.password.replace(/ /g, '')
            })
        }
    }

    backButtonOnPress = () => {
        navigationPop()
    }

    onPressLicenceView = () => {
        this.setState({
            isLicenceModalVisible: true,
            lisenceModalEverOpened: true
        })
    }

    closeLicenceView = () => {
        this.setState({
            isLicenceModalVisible: false
        })
    }

    acceptLicenceOnPress = () => {
        this.setState({
            switchValue: true,
            isLicenceModalVisible: false,
            isAcceptButtonVisible: false
        })
    }

    showAcceptButton = () => {
        this.setState({
            isAcceptButtonVisible: true
        })
    }

    closeAcceptButton = () => {
        this.setState({
            isAcceptButtonVisible: false
        })
    }

    render() {
        const isCloseToBottom = ({
            layoutMeasurement,
            contentOffset,
            contentSize
        }) => {
            const paddingToBottom = 20
            return (
                layoutMeasurement.height + contentOffset.y >=
                contentSize.height - paddingToBottom
            )
        }

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
                    <Modal
                        visible={this.state.isLicenceModalVisible}
                        transparent={true}
                        animationType={'fade'}
                    >
                        <TouchableOpacity
                            onPress={this.closeLicenceView}
                            style={styles.shadowView}
                        />
                        <View style={styles.licenceView}>
                            <ScrollView
                                ref={view => {
                                    this.scrollView = view
                                }}
                                style={styles.licenceScrollView}
                                onScroll={({ nativeEvent }) => {
                                    if (isCloseToBottom(nativeEvent)) {
                                        this.showAcceptButton()
                                    } else {
                                        this.closeAcceptButton()
                                    }
                                }}
                                showsVerticalScrollIndicator={false}
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={styles.userAgreementText}
                                >
                                    {this.props.agreementText}
                                </Text>
                            </ScrollView>
                            {this.state.isAcceptButtonVisible === false && (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.scrollView.scrollToEnd({
                                            animated: true
                                        })
                                    }}
                                >
                                    <Image
                                        source={BACK_BUTTON}
                                        style={{
                                            height: hp(3.5),
                                            width: hp(3.5),
                                            marginTop: hp(1),
                                            transform: [{ rotate: '270deg' }]
                                        }}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                        {this.state.isAcceptButtonVisible === true && (
                            <TouchableOpacity
                                onPress={() => {
                                    this.acceptLicenceOnPress()
                                }}
                                style={styles.acceptLicenceButton}
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={styles.acceptLicenceText}
                                >
                                    Onaylıyorum
                                </Text>
                            </TouchableOpacity>
                        )}
                    </Modal>
                    <NotchView color={'#fcfcfc'} />
                    <View style={styles.backButtonContainer}>
                        <TouchableOpacity onPress={this.backButtonOnPress}>
                            <Image
                                source={BACK_BUTTON}
                                style={styles.backButton}
                            />
                        </TouchableOpacity>
                    </View>
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
                            borderColor={'#989696'}
                            onChangeText={this.emailOnChange}
                        />
                        <View
                            style={[
                                styles.textInputContainer,
                                { borderColor: this.state.passwordBorderColor }
                            ]}
                        >
                            <TextInput
                                allowFontScaling={false}
                                style={styles.textInput}
                                secureTextEntry={this.state.hidePasswordFirst}
                                placeholder="Şifre"
                                placeholderTextColor={'#8A8888'}
                                maxLength={16}
                                onChangeText={text =>
                                    this.passwordOnChange(text)
                                }
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
                        <View
                            style={[
                                styles.textInputContainer,
                                {
                                    borderColor: this.state
                                        .secondPasswordBorderColor
                                }
                            ]}
                        >
                            <TextInput
                                allowFontScaling={false}
                                style={styles.textInput}
                                secureTextEntry={this.state.hidePasswordSecond}
                                placeholder="Şifre (Tekrar)                                                                     "
                                placeholderTextColor={'#8A8888'}
                                maxLength={16}
                                onChangeText={text =>
                                    this.secondPasswordOnChange(text)
                                }
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
                            <SwitchToggle
                                containerStyle={{
                                    width: wp(12),
                                    height: hp(4),
                                    borderRadius: hp(5),
                                    padding: wp(0.5)
                                }}
                                backgroundColorOn="#a0e1e5"
                                backgroundColorOff="#e5e1e0"
                                circleStyle={{
                                    width: hp(4),
                                    height: hp(4),
                                    borderRadius: hp(5),
                                    backgroundColor: '#00D9EF'
                                }}
                                switchOn={this.state.switchValue}
                                onPress={this.toggleSwitch}
                                circleColorOff="#00D9EF"
                                circleColorOn="#00D9EF"
                                duration={500}
                            />
                        </View>
                        <View style={styles.licenseTextContainer}>
                            <Text
                                allowFontScaling={false}
                                style={styles.toggleText}
                            >
                                <Text
                                    allowFontScaling={false}
                                    onPress={this.onPressLicenceView}
                                    style={{
                                        textDecorationLine: 'underline',
                                        fontFamily: 'Averta-Semibold'
                                    }}
                                >
                                    Kullanıcı Sözleşmesi, Açık Rıza Beyanı ve
                                    Aydınlatma Metni
                                </Text>
                                'ni okudum ve kabul ediyorum.
                            </Text>
                        </View>
                    </View>
                    <View style={styles.authButtonView}>
                        <AuthButton
                            height={hp(7)}
                            width={wp(85)}
                            color="#00D9EF"
                            buttonText="Kayıt Ol"
                            borderRadius={hp(1.5)}
                            fontSize={hp(3)}
                            onPress={this.registerOnPress}
                        />
                    </View>
                    <View style={styles.gotoLoginContainer}>
                        <Text
                            allowFontScaling={false}
                            style={styles.gotoLoginTextFirst}
                        >
                            Zaten bir hesabın var mı?{' '}
                            <Text
                                allowFontScaling={false}
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)
