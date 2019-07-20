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
    Keyboard
} from 'react-native'
import { sceneKeys, navigationPush } from '../../../services/navigationService'
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

export default class Register extends React.Component {
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
                toValue: event.endCoordinates.height - hp(3)
            })
        ]).start()
    }

    keyboardWillHide = event => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
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
                    <Image
                        source={sinaviaLogo}
                        style={{
                            height: hp(15),
                            resizeMode: 'contain',
                            marginTop: hp(2.5)
                        }}
                    />
                </View>
                <View style={styles.allTextInputsContainer}>
                    <View style={styles.textInputBorderContainer}>
                        <AuthTextInput
                            placeholder="Kullanıcı Adı                                                                          "
                            placeholderTextColor="#8A8888"
                            onChangeText={this.usernameOnChange}
                        />
                    </View>
                    <View style={styles.textInputBorderContainer}>
                        <AuthTextInput
                            placeholder="Ad Soyad                                                                               "
                            placeholderTextColor="#8A8888"
                            onChangeText={this.nameLastameOnChange}
                        />
                    </View>
                    <View style={styles.textInputBorderContainer}>
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
                    </View>
                    <View style={styles.textInputBorderContainer}>
                        <AuthTextInput
                            placeholder="Şehir                                                                                  "
                            placeholderTextColor="#8A8888"
                            onChangeText={this.cityOnChange}
                        />
                    </View>
                    <View style={styles.textInputBorderContainer}>
                        <AuthTextInput
                            placeholder="E-Posta                                                                                "
                            placeholderTextColor="#8A8888"
                            onChangeText={this.emailOnChange}
                        />
                    </View>
                    <View style={styles.textInputBorderContainer}>
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
                    </View>
                    <View style={styles.textInputBorderContainer}>
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
                    color="#00D9EF"
                    underlayColor="#1a5d63"
                    buttonText="Kayıt Ol"
                    onPress={() => {
                        console.log(
                            this.state.username,
                            this.state.name,
                            this.state.lastname,
                            this.state.city,
                            this.state.email,
                            this.state.birthDate,
                            this.state.password
                        )
                    }}
                />
                <View style={styles.gotoLoginContainer}>
                    <Text style={styles.gotoLoginTextFirst}>
                        Zaten bir hesabın var mı?
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigationPush(sceneKeys.login)
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
