import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    TextInput
} from 'react-native'
import styles from './style'
import NotchView from '../../../components/notchView'
import {
    SCENE_KEYS,
    navigationPush,
    navigationPop,
    navigationReset
} from '../../../services/navigationService'
import { deviceStorage } from '../../../services/deviceStorage'
import { connect } from 'react-redux'
import { clientActions } from '../../../redux/client/actions'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
// Picture imports
import returnLogo from '../../../assets/return.png'
import EDIT from '../../../assets/edit.png'

class Settings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isDateTimePickerVisible: false,
            // User information variables
            name: null,
            lastname: null,
            city: null,
            birthDate: null,
            birthDateUI: moment(
                this.props.clientInformation.birthDate,
                'YYYY-MM-DD HH:mm'
            ).format('DD-MM-YYYY'),
            dateColor: '#7A7878'
        }
    }

    // TODO STILL NEED TO GET PHOTOS AND UPLOAD THOSE TO OUR SERVER
    componentDidMount() {
        if (this.props.clientInformation.birthDate === '')
            this.setState({ birthDateUI: '' })
    }

    backButtonOnPress = () => {
        navigationPop()
    }

    changePasswordOnPress = () => {
        navigationPush(SCENE_KEYS.mainScreens.changePassword)
    }

    logoutButtonOnPress = async () => {
        await deviceStorage.clearDeviceStorage()
        navigationReset('auth')
    }

    showHideDatePicker = () => {
        this.setState({
            isDateTimePickerVisible: !this.state.isDateTimePickerVisible
        })
    }

    datePickerHandler = date => {
        this.showHideDatePicker()
        this.setState({
            birthDate: date,
            birthDateUI: moment(new Date(date.toString().substr(0, 16))).format(
                'DD-MM-YYYY'
            ),
            dateColor: '#000'
        })
    }

    nameLastnameOnChange = text => {
        let splittedText = text.split(/[ ,]+/)
        let name = splittedText[0]
        let lastname = splittedText[1]
        if (name === '') {
            name = null
            lastname = null
        }
        if (lastname === undefined) lastname = null
        this.setState({ name: name, lastname: lastname })
    }

    cityOnChange = text => {
        if (text === '') text = null
        this.setState({ city: text })
    }

    checkNameLastname = () => {
        if (this.state.name !== null && this.state.lastname !== null) {
            if (this.state.lastname !== '') return true
            else return false
        } else false
    }

    checkCity = () => {
        if (this.state.city !== null) return true
        else false
    }

    checkBirthDate = () => {
        if (this.state.birthDate !== null) return true
        else false
    }

    saveButtonOnPress = () => {
        let shouldUpdate = false
        const clientInformation = this.props.clientInformation

        if (this.checkCity()) {
            clientInformation.city = this.state.city
            shouldUpdate = true
        }

        if (this.checkNameLastname()) {
            clientInformation.name = this.state.name
            clientInformation.lastname = this.state.lastname
            shouldUpdate = true
        }

        if (this.checkBirthDate()) {
            clientInformation.birthDate = this.state.birthDate
            shouldUpdate = true
        }

        if (shouldUpdate)
            this.props.updateUser(
                this.props.clientToken,
                this.props.clientDBId,
                clientInformation,
                false
            )
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView color={'#fcfcfc'} />
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.backButtonOnPress}>
                        <Image source={returnLogo} style={styles.returnLogo} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.saveButtonOnPress}>
                        <View style={styles.saveButton}>
                            <Text style={styles.saveText}>Kaydet</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.profileContainer}>
                    <ImageBackground
                        source={{
                            uri: this.props.clientInformation.coverPicture
                        }}
                        style={styles.coverPhoto}
                        imageStyle={{ borderRadius: 30 }}
                    >
                        <View style={styles.editImgView}>
                            <TouchableOpacity>
                                <Image source={EDIT} style={styles.editImg} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.profilePicView}>
                            <ImageBackground
                                source={{
                                    uri: this.props.clientInformation
                                        .profilePicture
                                }}
                                style={styles.profilePic}
                                imageStyle={{ borderRadius: 100 }}
                            >
                                <View style={styles.editProfilePicView}>
                                    <TouchableOpacity>
                                        <Image
                                            source={EDIT}
                                            style={styles.editImg}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.textInputsContainer}>
                    <View style={styles.textInputContainer}>
                        <View style={styles.textInputTitleContainer}>
                            <Text style={styles.textInputTitle}>Ad</Text>
                            <Text style={styles.textInputTitle}>Soyad</Text>
                        </View>
                        <View style={styles.textInputView}>
                            <TextInput
                                placeholder={
                                    this.props.clientInformation.name +
                                    ' ' +
                                    this.props.clientInformation.lastname
                                }
                                style={styles.textInputStyle}
                                placeholderTextColor="#8A8888"
                                autoCapitalize={'none'}
                                onChangeText={text =>
                                    this.nameLastnameOnChange(text)
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.textInputContainer}>
                        <View style={styles.textInputTitleContainer}>
                            <Text style={styles.textInputTitle}>Şehir</Text>
                        </View>
                        <View style={styles.textInputView}>
                            <TextInput
                                placeholder={this.props.clientInformation.city}
                                style={styles.textInputStyle}
                                placeholderTextColor="#8A8888"
                                autoCapitalize={'none'}
                                onChangeText={text => this.cityOnChange(text)}
                            />
                        </View>
                    </View>
                    <View style={styles.textInputContainer}>
                        <View style={styles.textInputTitleContainer}>
                            <Text style={styles.textInputTitle}>Doğum</Text>
                            <Text style={styles.textInputTitle}>Tarihi</Text>
                        </View>
                        <TouchableOpacity onPress={this.showHideDatePicker}>
                            <View style={styles.textInputView}>
                                <Text
                                    style={[
                                        styles.dateTimeTextStyle,
                                        { color: this.state.dateColor }
                                    ]}
                                >
                                    {this.state.birthDateUI}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.datePickerHandler}
                            onCancel={this.showHideDatePicker}
                        />
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={this.changePasswordOnPress}>
                        <View style={styles.changePasswordButton}>
                            <Text style={styles.changePasswordText}>
                                Şifre değiştir
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.logoutButtonOnPress}>
                        <View style={styles.logoutButton}>
                            <Text style={styles.logoutText}>Çıkış yap</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    clientToken: state.client.clientToken,
    clientDBId: state.client.clientDBId,
    clientInformation: state.client.clientInformation
})

const mapDispatchToProps = dispatch => ({
    updateUser: (clientToken, clientId, clientInformation, isPasswordChange) =>
        dispatch(
            clientActions.updateUser(
                clientToken,
                clientId,
                clientInformation,
                isPasswordChange
            )
        )
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings)
