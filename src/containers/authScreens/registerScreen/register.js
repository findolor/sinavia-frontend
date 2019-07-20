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
            birthDate: '',
            birthDateUI: 'Doğum Tarihi  ',
            isDateTimePickerVisible: false,
            switchValue: false,
            showPasswordEye1: false,
            showPasswordEye2: false,
            hidePassword: true,
            hidePassword2: true
        }

        this.keyboardHeight = new Animated.Value(0)
    }

    componentWillMount() {
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
                toValue: event.endCoordinates.height
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
        this.setState({ hidePassword: !this.state.hidePassword })
    }

    managePasswordVisibility2 = () => {
        this.setState({ hidePassword2: !this.state.hidePassword2 })
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
            )
        })
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
                        />
                    </View>
                    <View style={styles.textInputBorderContainer}>
                        <AuthTextInput
                            placeholder="Ad Soyad                                                                               "
                            placeholderTextColor="#8A8888"
                        />
                    </View>
                    <View style={styles.textInputBorderContainer}>
                        <TouchableOpacity onPress={this.showDateTimePicker}>
                            <View style={styles.textInputContainer}>
                                <Text style={styles.textInput}>
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
                        />
                    </View>
                    <View style={styles.textInputBorderContainer}>
                        <AuthTextInput
                            placeholder="E-Posta                                                                                "
                            placeholderTextColor="#8A8888"
                        />
                    </View>
                    <View style={styles.textInputBorderContainer}>
                        <View style={styles.textInputContainer}>
                            <TextInput
                                style={styles.textInput}
                                secureTextEntry={this.state.hidePassword}
                                placeholder="Şifre                                                                              "
                                placeholderTextColor={'#8A8888'}
                                onChangeText={text => {
                                    if (text === '') {
                                        this.setState({
                                            showPasswordEye1: false
                                        })
                                    } else {
                                        this.setState({
                                            showPasswordEye1: true
                                        })
                                    }
                                }}
                            />
                            {this.state.showPasswordEye1 && (
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
                                secureTextEntry={this.state.hidePassword2}
                                placeholder="Şifre (Tekrar)                                                                     "
                                placeholderTextColor={'#8A8888'}
                                onChangeText={text => {
                                    if (text === '') {
                                        this.setState({
                                            showPasswordEye2: false
                                        })
                                    } else {
                                        this.setState({
                                            showPasswordEye2: true
                                        })
                                    }
                                }}
                            />
                            {this.state.showPasswordEye2 && (
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
                    onPress={() => {}}
                />
                <View style={styles.gotoLoginContainer}>
                    <Text style={styles.gotoLoginText1}>
                        Zaten bir hesabın var mı?
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigationPush(sceneKeys.login)
                        }}
                    >
                        <Text style={styles.gotoLoginText2}>Giriş Yap</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        )
    }
}
