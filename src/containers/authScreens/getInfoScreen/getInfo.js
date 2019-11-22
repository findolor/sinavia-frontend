import React from 'react'
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    Keyboard,
    Alert,
    TouchableWithoutFeedback,
    KeyboardAvoidingView
} from 'react-native'
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
import { Appearance } from 'react-native-appearance'

import SINAVIA_LOGO from '../../../assets/sinavia_logo_cut.png'

class GetInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // Register related stuff
            birthDateUI: 'Doğum Tarihi',
            isDateTimePickerVisible: false,
            switchValue: false,
            showPasswordEyeFirst: false,
            showPasswordEyeSecond: false,
            hidePasswordFirst: true,
            hidePasswordSecond: true,
            dateColor: '#2E313C',
            // User Information
            username: '',
            name: '',
            lastname: '',
            city: null,
            email: '',
            password: '',
            birthDate: null,
            // Dark mode for date time picker
            isDarkModeEnabled: null
        }
    }

    componentDidMount() {
        const isDarkModeEnabled = Appearance.getColorScheme() === 'dark'
        this.setState({ isDarkModeEnabled: isDarkModeEnabled })
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
            email: this.props.email,
            city: this.state.city,
            birthDate: this.state.birthDate,
            password: this.props.password
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
                                resizeMode: 'contain',
                                marginLeft: wp(6.5)
                            }}
                        />
                    </View>
                    <View style={styles.compulsoryTextContainer}>
                        <Text style={styles.compulsoryText}>
                            *Doldurulması zorunlu alanlar
                        </Text>
                    </View>
                    <View style={styles.allTextInputsContainer}>
                        <AuthTextInput
                            placeholder="Kullanıcı Adı*"
                            placeholderTextColor="#8A8888"
                            onChangeText={this.usernameOnChange}
                        />
                        <AuthTextInput
                            placeholder="Ad Soyad*"
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
                            isDarkModeEnabled={this.state.isDarkModeEnabled}
                        />
                        <AuthTextInput
                            placeholder="Şehir"
                            placeholderTextColor="#8A8888"
                            onChangeText={this.cityOnChange}
                        />
                    </View>
                    <View style={styles.authButtonView}>
                        <AuthButton
                            height={hp(7)}
                            width={wp(85)}
                            color="#00D9EF"
                            buttonText="Onayla"
                            borderRadius={hp(1.5)}
                            marginTop={hp(2)}
                            fontSize={hp(3)}
                            onPress={this.registerOnPress}
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
    createUser: userInformation =>
        dispatch(clientActions.createUser(userInformation))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GetInfo)
