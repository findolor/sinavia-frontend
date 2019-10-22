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
        console.log(userInformation)
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
                                resizeMode: 'contain'
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
                            borderRadius={10}
                            marginTop={hp(2)}
                            onPress={this.registerOnPress}
                        />
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
    createUser: userInformation =>
        dispatch(clientActions.createUser(userInformation))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GetInfo)
