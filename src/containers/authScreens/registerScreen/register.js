import React from 'react'
import {
    Image,
    View,
    StatusBar,
    Text,
    TouchableOpacity,
    Switch,
    TextInput,
    Animated,
    Keyboard,
    Platform
} from 'react-native'
import { navigationPush } from '../../../services/navigationService'
import { SCENE_KEYS } from '../../../config/index'
import { connect } from 'react-redux'
import { userActions } from '../../../redux/user/actions'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { AuthButton, AuthTextInput } from '../../../components/authScreen'
import sinaviaLogo from '../../../assets/sinavia_logo_cut.png'
import styles from './style'
import eye from '../../../assets/eye.png'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
import NotchView from '../../../components/notchView'

const ANIMATION_DURATION = 100

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // Register related stuff
            birthDateUI: 'Doğum Tarihi  ',
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
            birthDate: date.toISOString(),
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
        let userInformation = {
            username: this.state.username,
            name: this.state.name,
            lastname: this.state.lastname,
            email: this.state.email,
            city: this.state.city,
            birthDate: this.state.birthDate,
            password: this.state.password
        }
        this.props.createUser(userInformation)
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
                        source={sinaviaLogo}
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
                        placeholder="Şehir                                                                                  "
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
                                    this.setState({
                                        showPasswordEyeSecond: true,
                                        secondPassword: text
                                    })
                                }
                            }}
                        />
                        {this.state.showPasswordEyeSecond && (
                            <View style={styles.eyeContainer}>
                                <TouchableOpacity
                                    onPress={this.managePasswordVisibility2}
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
                <View style={styles.toggleContainer}>
                    <Switch
                        style={{ marginLeft: wp(7.5) }}
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
                <AuthButton
                    height={hp(7)}
                    width={wp(85)}
                    color="#00D9EF"
                    underlayColor="#1a5d63"
                    buttonText="Kayıt Ol"
                    onPress={this.registerOnPress}
                />
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

const mapStateToProps = state => {}

const mapDispatchToProps = dispatch => ({
    createUser: userInformation =>
        dispatch(userActions.createUser(userInformation))
})

export default connect(
    null,
    mapDispatchToProps
)(Register)
