import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    FlatList,
    TouchableWithoutFeedback,
    Keyboard
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
import moment from 'moment'
import firebase from 'react-native-firebase'
import ImagePicker from 'react-native-image-crop-picker'
import { Appearance } from 'react-native-appearance'
import { showMessage } from 'react-native-flash-message'
import { flashMessages } from '../../../services/flashMessageBuilder'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
// Picture imports
import returnLogo from '../../../assets/return.png'
import CHANGE_PHOTO from '../../../assets/changePhoto.png'
import { GoogleSignin } from '@react-native-community/google-signin'
import appleAuth, {
    AppleAuthRequestOperation
} from '@invertase/react-native-apple-authentication'

const citiesList = [
    { cityName: 'Adana' },
    { cityName: 'Adıyaman' },
    { cityName: 'Afyonkarahisar' },
    { cityName: 'Ağrı' },
    { cityName: 'Aksaray' },
    { cityName: 'Amasya' },
    { cityName: 'Ankara' },
    { cityName: 'Antalya' },
    { cityName: 'Ardahan' },
    { cityName: 'Artvin' },
    { cityName: 'Aydın' },
    { cityName: 'Balıkesir' },
    { cityName: 'Bartın' },
    { cityName: 'Batman' },
    { cityName: 'Bayburt' },
    { cityName: 'Bilecik' },
    { cityName: 'Bingöl' },
    { cityName: 'Bitlis' },
    { cityName: 'Bolu' },
    { cityName: 'Burdur' },
    { cityName: 'Bursa' },
    { cityName: 'Çanakkale' },
    { cityName: 'Çankırı' },
    { cityName: 'Çorum' },
    { cityName: 'Denizli' },
    { cityName: 'Diyarbakır' },
    { cityName: 'Düzce' },
    { cityName: 'Edirne' },
    { cityName: 'Elazığ' },
    { cityName: 'Erzincan' },
    { cityName: 'Erzurum' },
    { cityName: 'Eskişehir' },
    { cityName: 'Gaziantep' },
    { cityName: 'Giresun' },
    { cityName: 'Gümüşhane' },
    { cityName: 'Hakkari' },
    { cityName: 'Hatay' },
    { cityName: 'Iğdır' },
    { cityName: 'Isparta' },
    { cityName: 'İstanbul' },
    { cityName: 'İzmir' },
    { cityName: 'Kahramanmaraş' },
    { cityName: 'Karabük' },
    { cityName: 'Karaman' },
    { cityName: 'Kars' },
    { cityName: 'Kastamonu' },
    { cityName: 'Kayseri' },
    { cityName: 'Kırıkkale' },
    { cityName: 'Kırklareli' },
    { cityName: 'Kırşehir' },
    { cityName: 'Kilis' },
    { cityName: 'Kocaeli' },
    { cityName: 'Konya' },
    { cityName: 'Kütahya' },
    { cityName: 'Malatya' },
    { cityName: 'Manisa' },
    { cityName: 'Mardin' },
    { cityName: 'Mersin' },
    { cityName: 'Muğla' },
    { cityName: 'Muş' },
    { cityName: 'Nevşehir' },
    { cityName: 'Niğde' },
    { cityName: 'Ordu' },
    { cityName: 'Osmaniye' },
    { cityName: 'Rize' },
    { cityName: 'Sakarya' },
    { cityName: 'Samsun' },
    { cityName: 'Siirt' },
    { cityName: 'Sinop' },
    { cityName: 'Sivas' },
    { cityName: 'Şanlıurfa' },
    { cityName: 'Şırnak' },
    { cityName: 'Tekirdağ' },
    { cityName: 'Tokat' },
    { cityName: 'Trabzon' },
    { cityName: 'Tunceli' },
    { cityName: 'Uşak' },
    { cityName: 'Van' },
    { cityName: 'Yalova' },
    { cityName: 'Yozgat' },
    { cityName: 'Zonguldak' }
]

class Settings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isDateTimePickerVisible: false,
            // User information variables
            name: null,
            lastname: null,
            username: null,
            city: this.props.clientInformation.city,
            birthDate: null,
            birthDateUI:
                this.props.clientInformation.birthDate === null
                    ? ''
                    : moment(
                          this.props.clientInformation.birthDate,
                          'YYYY-MM-DD HH:mm'
                      ).format('DD-MM-YYYY'),
            dateColor: '#8A8888',
            // User pictures
            profilePicture: null,
            coverPicture: null,
            isCoverPictureChoosen: false,
            isProfilePictureChoosen: false,
            isDarkModeEnabled: null,
            citiesList: citiesList,
            isCityModalVisible: false,
            nameBorderColor: '#C8C8C8',
            lastnameBorderColor: '#C8C8C8',
            usernameBorderColor: '#C8C8C8',
            cityBorderColor: '#C8C8C8'
        }
    }

    componentDidMount() {
        const isDarkModeEnabled = Appearance.getColorScheme() === 'dark'
        this.setState({ isDarkModeEnabled: isDarkModeEnabled })

        if (this.props.clientInformation.birthDate === '')
            this.setState({ birthDateUI: '' })
    }

    backButtonOnPress = () => {
        navigationPop()
    }

    changePasswordOnPress = () => {
        navigationPush(SCENE_KEYS.mainScreens.changePassword)
    }

    logoutFromApple = async () => {
        try {
            // performs logout request
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: AppleAuthRequestOperation.LOGOUT
            })

            // get current authentication state for user
            const credentialState = await appleAuth.getCredentialStateForUser(
                appleAuthRequestResponse.user
            )

            // use credentialState response to ensure the user credential's have been revoked
            if (credentialState === AppleAuthCredentialState.REVOKED) {
                // user is unauthenticated
            }
        } catch (error) {
            console.log(error)
        }
    }

    logoutButtonOnPress = async () => {
        switch (this.props.clientInformation.signInMethod) {
            case 'normal':
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
                break
            case 'google':
                try {
                    //await GoogleSignin.revokeAccess()
                    await GoogleSignin.signOut()
                    // This is because we log in as anonymous for photo upload
                    firebase.auth().signOut()
                    deviceStorage.clearDeviceStorage()
                    navigationReset('auth')
                } catch (error) {
                    console.log(error)
                }
                break
            case 'apple':
                //await this.logoutFromApple()
                firebase.auth().signOut()
                deviceStorage.clearDeviceStorage()
                navigationReset('auth')
                break
        }
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

    showSimpleMessage(errorName, restriction, props = {}) {
        const message = {
            message: errorName + ' hatası',
            description: restriction,
            duration: 5000,
            titleStyle: {
                fontFamily: 'Averta-SemiboldItalic',
                color: '#FF9900'
            },
            textStyle: { fontFamily: 'Averta-Regular', color: '#00D9EF' },
            ...props
        }

        showMessage(message)
    }

    nameOnChange = text => {
        const validCharacters = /[^a-zA-Z\sğüşıöçĞÜŞİÖÇ]/g
        if (
            validCharacters.test(text) ||
            text.substr(-2) === '  ' ||
            text.charAt(0) === ' ' ||
            text.endsWith(' ') ||
            text.length < 2
        ) {
            this.setState({ nameBorderColor: '#B72A2A' })
        } else if (text === '' || text === this.props.clientInformation.name) {
            this.setState({ nameBorderColor: '#C8C8C8' })
            text = null
        } else this.setState({ nameBorderColor: '#3EBB29' })
        if (text !== null) text = text.replace(/\s\s+/g, ' ')
        if (text === '') text = null
        this.setState({ name: text })
    }

    lastnameOnChange = text => {
        const validCharacters = /[^a-zA-ZğüşıöçĞÜŞİÖÇ]/g
        if (validCharacters.test(text) || text.length < 2) {
            this.setState({ lastnameBorderColor: '#B72A2A' })
        } else if (
            text === '' ||
            text === this.props.clientInformation.lastname
        ) {
            this.setState({ lastnameBorderColor: '#C8C8C8' })
            text = null
        } else this.setState({ lastnameBorderColor: '#3EBB29' })
        if (text === '') text = null
        this.setState({ lastname: text })
    }

    usernameOnChange = text => {
        const validCharacters = /[^a-z0-9ğüşıöç]/g
        if (validCharacters.test(text) || text.length < 3) {
            this.setState({ usernameBorderColor: '#B72A2A' })
        } else if (
            text === '' ||
            text === this.props.clientInformation.username
        ) {
            this.setState({ usernameBorderColor: '#C8C8C8' })
            text = null
        } else this.setState({ usernameBorderColor: '#3EBB29' })
        if (text === '') text = null
        this.setState({ username: text })
    }

    checkName = () => {
        if (this.state.name !== null) return true
        else false
    }

    checkLastname = () => {
        if (this.state.lastname !== null) return true
        else false
    }

    checkCity = () => {
        if (this.state.city !== this.props.clientInformation.city) return true
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
        try {
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
            if (this.state.usernameBorderColor === '#B72A2A') {
                flashMessages.authInfosOrSettingsError(
                    'Kullanıcı adı hatası',
                    'Kullanıcı adı(en az 3 karakter) sadece harf veya rakamlardan oluşabilir',
                    {
                        backgroundColor: '#FFFFFF',
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        borderColor: '#00D9EF',
                        borderWidth: hp(0.25),
                        height: hp(10)
                    }
                )
                return
            }
            if (this.state.nameBorderColor === '#B72A2A') {
                flashMessages.authInfosOrSettingsError(
                    'Ad hatası',
                    'Ad(en az 2 karakter) sadece harflerden oluşmalıdır',
                    {
                        backgroundColor: '#FFFFFF',
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        borderColor: '#00D9EF',
                        borderWidth: hp(0.25),
                        height: hp(10)
                    }
                )
                return
            }
            if (this.state.lastnameBorderColor === '#B72A2A') {
                flashMessages.authInfosOrSettingsError(
                    'Soyad hatası',
                    'Soyad(en az 2 karakter) sadece harflerden oluşmalıdır',
                    {
                        backgroundColor: '#FFFFFF',
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        borderColor: '#00D9EF',
                        borderWidth: hp(0.25),
                        height: hp(10)
                    }
                )
                return
            }
            const firebaseStorage = firebase.storage()

            let shouldUpdate = false
            let isProfilePictureChanged = false
            let isCoverPictureChanged = false

            // This is for shallow copying
            // If we don't do object.assing, as we change the values in clientInformation it changes the original object
            let clientInformation = Object.assign(
                {},
                this.props.clientInformation
            )

            if (this.checkCity()) {
                clientInformation.city = this.state.city
                shouldUpdate = true
            }

            if (this.checkUsername()) {
                clientInformation.username = this.state.username
                shouldUpdate = true
            }

            if (this.checkName()) {
                clientInformation.name = this.state.name
                shouldUpdate = true
            }

            if (this.checkLastname()) {
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
        } catch (error) {
            console.log(error)
        }
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
                this.setState({
                    profilePicture: {
                        uri: image.path,
                        width: image.width,
                        height: image.height,
                        mime: image.mime,
                        path: image.path
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
                this.setState({
                    coverPicture: {
                        uri: image.path,
                        width: image.width,
                        height: image.height,
                        mime: image.mime,
                        path: image.path
                    },
                    isCoverPictureChoosen: true
                })
            })
            .catch(e => {
                console.log(e)
            })
    }

    openCityModalVisible = () => {
        this.setState({
            isCityModalVisible: true
        })
    }

    closeCityModalButtonOnPress = () => {
        this.setState({
            isCityModalVisible: false
        })
    }

    cityOnPress = cityName => {
        if (cityName === this.props.clientInformation.city) {
            this.setState({
                city: cityName,
                isCityModalVisible: false,
                cityBorderColor: '#C8C8C8'
            })
        } else
            this.setState({
                city: cityName,
                isCityModalVisible: false,
                cityBorderColor: '#3EBB29'
            })
    }

    cityPicker = () => {
        return (
            <View style={styles.modal}>
                <TouchableOpacity
                    onPress={this.closeCityModalButtonOnPress}
                    style={{
                        height: hp(120),
                        width: wp(100)
                    }}
                />
                <View style={styles.modalView}>
                    <Text allowFontScaling={false} style={styles.pickCityText}>
                        Şehir Seç
                    </Text>
                    <FlatList
                        data={this.state.citiesList}
                        vertical={true}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.cityRow}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            this.cityOnPress(item.cityName)
                                        }
                                    >
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.cityRowText}
                                        >
                                            {item.cityName}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        )
    }

    render() {
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss()
                }}
            >
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={'position'}
                >
                    <NotchView color={'#fcfcfc'} />
                    <Modal
                        visible={this.state.isCityModalVisible}
                        transparent={true}
                        animationType={'fade'}
                    >
                        {this.cityPicker()}
                    </Modal>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={this.backButtonOnPress}>
                            <Image
                                source={returnLogo}
                                style={styles.returnLogo}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.saveButtonOnPress}>
                            <View style={styles.saveButton}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.saveText}
                                >
                                    Kaydet
                                </Text>
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
                            imageStyle={{ borderRadius: hp(3) }}
                        >
                            <View style={styles.shadowCoverView} />
                            <View style={styles.editImgView}>
                                <TouchableOpacity
                                    onPress={() =>
                                        this.pickCoverImage(true, false)
                                    }
                                >
                                    <Image
                                        source={CHANGE_PHOTO}
                                        style={styles.editImg}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.profilePicView}>
                                <Image
                                    source={
                                        this.state.isProfilePictureChoosen
                                            ? this.state.profilePicture
                                            : {
                                                  uri: this.props
                                                      .clientInformation
                                                      .profilePicture
                                              }
                                    }
                                    style={styles.profilePic}
                                />
                                <View style={styles.editProfilePicView}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            this.pickProfileImage(true, true)
                                        }
                                    >
                                        <Image
                                            source={CHANGE_PHOTO}
                                            style={styles.editImg}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.textInputsContainer}>
                        <View style={styles.textInputContainer}>
                            <View style={styles.textInputTitleContainer}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.textInputTitle}
                                >
                                    Kullanıcı Adı
                                </Text>
                            </View>
                            <View
                                style={[
                                    styles.textInputView,
                                    {
                                        borderColor: this.state
                                            .usernameBorderColor
                                    }
                                ]}
                            >
                                <TextInput
                                    allowFontScaling={false}
                                    placeholder={
                                        this.props.clientInformation.username
                                    }
                                    style={styles.textInputStyle}
                                    placeholderTextColor="#8A8888"
                                    autoCapitalize={'none'}
                                    maxLength={16}
                                    onChangeText={text =>
                                        this.usernameOnChange(
                                            text.toLowerCase()
                                        )
                                    }
                                />
                            </View>
                        </View>
                        <View style={styles.textInputContainer}>
                            <View style={styles.textInputTitleContainer}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.textInputTitle}
                                >
                                    Ad
                                </Text>
                            </View>
                            <View
                                style={[
                                    styles.textInputView,
                                    { borderColor: this.state.nameBorderColor }
                                ]}
                            >
                                <TextInput
                                    allowFontScaling={false}
                                    placeholder={
                                        this.props.clientInformation.name
                                    }
                                    style={styles.textInputStyle}
                                    placeholderTextColor="#8A8888"
                                    autoCapitalize={'none'}
                                    maxLength={16}
                                    onChangeText={text =>
                                        this.nameOnChange(text)
                                    }
                                />
                            </View>
                        </View>
                        <View style={styles.textInputContainer}>
                            <View style={styles.textInputTitleContainer}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.textInputTitle}
                                >
                                    Soyad
                                </Text>
                            </View>
                            <View
                                style={[
                                    styles.textInputView,
                                    {
                                        borderColor: this.state
                                            .lastnameBorderColor
                                    }
                                ]}
                            >
                                <TextInput
                                    allowFontScaling={false}
                                    placeholder={
                                        this.props.clientInformation.lastname
                                    }
                                    style={styles.textInputStyle}
                                    placeholderTextColor="#8A8888"
                                    autoCapitalize={'none'}
                                    maxLength={16}
                                    onChangeText={text =>
                                        this.lastnameOnChange(text)
                                    }
                                />
                            </View>
                        </View>
                        <View style={styles.textInputContainer}>
                            <View style={styles.textInputTitleContainer}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.textInputTitle}
                                >
                                    Şehir
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={this.openCityModalVisible}
                            >
                                <View
                                    style={[
                                        styles.cityInputView,
                                        {
                                            borderColor: this.state
                                                .cityBorderColor
                                        }
                                    ]}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.cityTextInputStyle}
                                    >
                                        {this.state.city}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.buttonsContainer}>
                        {this.props.clientInformation.signInMethod ===
                            'normal' && (
                            <TouchableOpacity
                                onPress={this.changePasswordOnPress}
                            >
                                <View style={styles.changePasswordButton}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.changePasswordText}
                                    >
                                        Şifre değiştir
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={this.logoutButtonOnPress}>
                            <View style={styles.logoutButton}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.logoutText}
                                >
                                    Çıkış yap
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        )
    }
}

const mapStateToProps = state => ({
    clientToken: state.client.clientToken,
    clientDBId: state.client.clientDBId,
    clientInformation: state.client.clientInformation,
    isNetworkConnected: state.app.isNetworkConnected
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
