import React from 'react'
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    Switch,
    TextInput,
    Animated,
    Keyboard,
    Platform,
    Alert
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
import EYE from '../../../assets/eye.png'

const ANIMATION_DURATION = 100

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

        this.keyboardHeight = new Animated.Value(0)
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
                toValue: event.endCoordinates.height - hp(3)
            })
        ]).start()
    }

    keyboardHide = event => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: ANIMATION_DURATION,
                toValue: 0
            })
        ]).start()
    }

    managePasswordVisibility = () => {
        this.setState({ hidePasswordFirst: !this.state.hidePasswordFirst })
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
            username: this.state.username,
            name: this.state.name,
            lastname: this.state.lastname,
            email: this.state.email,
            city: this.state.city,
            birthDate: this.state.birthDate,
            password: this.state.password
        }

        let userInformationKeys = Object.keys(userInformation)
        let wrongInformationList = []
        let wrongInformationString = 'Yanlış alanlar! ->'

        userInformationKeys.forEach(element => {
            if (
                userInformation[element] === '' &&
                element !== 'birthDate' &&
                element !== 'city'
            ) {
                wrongInformationList.push(element)
                wrongInformationString += `${element}, `
            }
        })

        if (Object.keys(wrongInformationList).length === 0)
            this.props.createUser(userInformation)
        else Alert.alert(wrongInformationString)
    }

    render() {
        return (
            <Animated.View
                style={[
                    styles.container,
                    { paddingBottom: this.keyboardHeight }
                ]}
            >
                <NotchView color={'#fcfcfc'} />
                <View style={styles.imageContainer}>
                    <Image
                        source={SINAVIA_LOGO}
                        style={{
                            height: hp(15),
                            resizeMode: 'contain'
                        }}
                    />
                </View>
                <View style={styles.allTextInputsContainer}>
                    <AuthTextInput
                        placeholder="Kullanıcı Adı                                                                          "
                        placeholderTextColor="#8A8888"
                        onChangeText={this.usernameOnChange}
                    />
                    <AuthTextInput
                        placeholder="Ad Soyad                                                                               "
                        placeholderTextColor="#8A8888"
                        onChangeText={this.nameLastameOnChange}
                    />
                    <TouchableOpacity onPress={this.showDateTimePicker}>
                        <View style={styles.textInputContainer}>
                            <Text
                                style={[
                                    styles.textInput,
                                    { color: this.state.dateColor }
                                ]}
                            >
                                {this.state.birthDateUI}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                    />
                    <AuthTextInput
                        placeholder="Şehir  (Opsiyonel)                                                                         "
                        placeholderTextColor="#8A8888"
                        onChangeText={this.cityOnChange}
                    />
                    <AuthTextInput
                        placeholder="E-Posta                                                                                "
                        placeholderTextColor="#8A8888"
                        onChangeText={this.emailOnChange}
                    />
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            secureTextEntry={this.state.hidePasswordFirst}
                            placeholder="Şifre                                                                              "
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
                        {this.state.showPasswordEyeFirst && (
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
                    </View>
                </View>
                <View style={styles.toggleContainer}>
                    <Switch
                        style={{
                            marginLeft: wp(7.5),
                            transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]
                        }}
                        onValueChange={this.toggleSwitch}
                        value={this.state.switchValue}
                        trackColor="#00D9EF"
                        thumbColor="#00D9EF"
                    />
                    <View style={styles.licenseTextContainer}>
                        <Text style={styles.toggleText}>
                            Kullanıcı sözleşmesini okudum ve kabul ediyorum.
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
                        Zaten bir hesabın var mı?
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigationPush(SCENE_KEYS.authScreens.login)
                        }}
                    >
                        <Text style={styles.gotoLoginTextSecond}>
                            Giriş Yap
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        )
    }
}

const mapStateToProps = state => ({
    isNetworkConnected: state.app.isNetworkConnected
})

const mapDispatchToProps = dispatch => ({
    createUser: userInformation =>
        dispatch(clientActions.createUser(userInformation))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)
