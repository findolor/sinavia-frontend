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
import { appActions } from '../../../redux/app/actions'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
import firebase from 'react-native-firebase'
import ImagePicker from 'react-native-image-crop-picker'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
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
            username: null,
            city: null,
            birthDate: null,
            birthDateUI:
                this.props.clientInformation.birthDate === null
                    ? ''
                    : moment(
                          this.props.clientInformation.birthDate,
                          'YYYY-MM-DD HH:mm'
                      ).format('DD-MM-YYYY'),
            dateColor: '#7A7878',
            // User pictures
            profilePicture: null,
            coverPicture: null,
            isCoverPictureChoosen: false,
            isProfilePictureChoosen: false
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

    logoutButtonOnPress = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                deviceStorage.clearDeviceStorage()
                navigationReset('auth')
            })
            .catch(error => {
                console.log(error)
            })
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

    usernameOnChange = text => {
        if (text === '') text = null
        this.setState({ username: text })
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

    checkUsername = () => {
        if (this.state.username !== null) return true
        else false
    }

    checkBirthDate = () => {
        if (this.state.birthDate !== null) return true
        else false
    }

    checkProfilePicture = () => {
        if (this.state.profilePicture !== null) return true
        else false
    }

    checkCoverPicture = () => {
        if (this.state.coverPicture !== null) return true
        else false
    }

    saveButtonOnPress = async () => {
        const firebaseStorage = firebase.storage()

        let shouldUpdate = false
        let isProfilePictureChanged = false
        let isCoverPictureChanged = false

        const clientInformation = this.props.clientInformation

        if (this.checkCity()) {
            clientInformation.city = this.state.city
            shouldUpdate = true
        }

        if (this.checkUsername()) {
            clientInformation.username = this.state.username
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

        if (this.checkCoverPicture()) {
            clientInformation.coverPicture = this.state.coverPicture
            shouldUpdate = true
            isCoverPictureChanged = true
        }

        if (this.checkProfilePicture()) {
            clientInformation.profilePicture = this.state.profilePicture
            shouldUpdate = true
            isProfilePictureChanged = true
        }

        if (shouldUpdate) this.props.lockUnlockButton()

        let response

        if (isProfilePictureChanged) {
            response = await firebaseStorage
                .ref(`profilePictures/${this.props.clientDBId}.jpg`)
                .putFile(this.state.profilePicture.path)

            clientInformation.profilePicture = response.downloadURL
        }

        if (isCoverPictureChanged) {
            response = await firebaseStorage
                .ref(`coverPictures/${this.props.clientDBId}.jpg`)
                .putFile(this.state.coverPicture.path)

            clientInformation.coverPicture = response.downloadURL
        }

        if (shouldUpdate)
            this.props.updateUser(
                this.props.clientToken,
                this.props.clientDBId,
                clientInformation,
                false
            )
    }

    pickProfileImage(cropit, circular = false, mediaType) {
        ImagePicker.openPicker({
            width: hp(18),
            height: hp(18),
            cropping: cropit,
            cropperCircleOverlay: circular,
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000,
            compressImageQuality: 1,
            includeExif: true,
            includeBase64: true
        })
            .then(image => {
                console.log('received image', image)
                this.setState({
                    profilePicture: {
                        uri: image.path,
                        width: image.width,
                        height: image.height,
                        mime: image.mime,
                        path: image.path,
                        fileExt: image.filename
                            .split('.')
                            .pop()
                            .toLowerCase()
                    },
                    isProfilePictureChoosen: true
                })
            })
            .catch(e => {
                console.log(e)
            })
    }

    pickCoverImage(cropit, circular = false, mediaType) {
        ImagePicker.openPicker({
            width: wp(90),
            height: hp(30),
            cropping: cropit,
            cropperCircleOverlay: circular,
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000,
            compressImageQuality: 1,
            includeExif: true
        })
            .then(image => {
                console.log('received image', image)
                this.setState({
                    coverPicture: {
                        uri: image.path,
                        width: image.width,
                        height: image.height,
                        mime: image.mime,
                        path: image.path,
                        fileExt: image.filename
                            .split('.')
                            .pop()
                            .toLowerCase()
                    },
                    isCoverPictureChoosen: true
                })
            })
            .catch(e => {
                console.log(e)
            })
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
                        source={
                            this.state.isCoverPictureChoosen
                                ? this.state.coverPicture
                                : {
                                      uri: this.props.clientInformation
                                          .coverPicture
                                  }
                        }
                        style={styles.coverPhoto}
                        imageStyle={{ borderRadius: 30 }}
                    >
                        <View style={styles.shadowCoverView} />
                        <View style={styles.editImgView}>
                            <TouchableOpacity
                                onPress={() => this.pickCoverImage(true, false)}
                            >
                                <Image source={EDIT} style={styles.editImg} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.profilePicView}>
                            <ImageBackground
                                source={
                                    this.state.isProfilePictureChoosen
                                        ? this.state.profilePicture
                                        : {
                                              uri: this.props.clientInformation
                                                  .profilePicture
                                          }
                                }
                                style={styles.profilePic}
                                imageStyle={{ borderRadius: 100 }}
                            >
                                <View style={styles.editProfilePicView}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            this.pickProfileImage(true, true)
                                        }
                                    >
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
                            <Text style={styles.textInputTitle}>
                                Kullanıcı Adı
                            </Text>
                        </View>
                        <View style={styles.textInputView}>
                            <TextInput
                                placeholder={
                                    this.props.clientInformation.username
                                }
                                style={styles.textInputStyle}
                                placeholderTextColor="#8A8888"
                                autoCapitalize={'none'}
                                onChangeText={text =>
                                    this.usernameOnChange(text)
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
        ),
    lockUnlockButton: () => dispatch(appActions.lockUnlockButton())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings)
