import React from 'react'
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    FlatList,
    KeyboardAvoidingView,
    Modal
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
import { flashMessages } from '../../../services/flashMessageBuilder'

import SINAVIA_LOGO from '../../../assets/sinavia_logo_cut.png'
import PROFILE_PIC from '../../../assets/profile2.jpg'

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

class GetInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // Register related stuff
            cityUI: 'Yaşadığın şehri seç',
            birthDateUI: 'Doğum tarihi seç',
            isDateTimePickerVisible: false,
            switchValue: false,
            dateColor: '#2E313C',
            // User Information
            username: null,
            name: null,
            lastname: null,
            city: null,
            email: '',
            password: '',
            birthDate: null,
            friendInviteCode: null,
            // Dark mode for date time picker
            isDarkModeEnabled: null,
            isModalVisible: false,
            citiesList: citiesList,
            nameBorderColor: '#989696',
            lastnameBorderColor: '#989696',
            usernameBorderColor: '#989696',
            inviteCodeBorderColor: '#989696'
        }
    }

    componentDidMount() {
        const isDarkModeEnabled = Appearance.getColorScheme() === 'dark'
        this.setState({ isDarkModeEnabled: isDarkModeEnabled })
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true })
    }

    cityOnPress = cityName => {
        this.setState({
            city: cityName,
            cityUI: cityName,
            isModalVisible: false
        })
    }

    cityPicker = () => {
        return (
            <View style={styles.modal}>
                <TouchableOpacity
                    onPress={this.closeModalButtonOnPress}
                    style={{
                        height: hp(120),
                        width: wp(100)
                    }}
                />
                <View style={styles.modalView}>
                    <Text style={styles.pickCityText}>Şehir Seç</Text>
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
                                        <Text style={styles.cityRowText}>
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

    closeModalButtonOnPress = () => {
        this.setState({
            isModalVisible: false
        })
    }

    openModalVisible = () => {
        this.setState({
            isModalVisible: true
        })
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
        lowercaseText = text.toLowerCase()
        const validCharacters = /[^a-z0-9ğüşıöç]/g
        if (validCharacters.test(lowercaseText)) {
            this.setState({ usernameBorderColor: 'red' })
        } else this.setState({ usernameBorderColor: '#989696' })
        if (lowercaseText === '') lowercaseText = null
        this.setState({ username: lowercaseText })
    }

    nameOnChange = text => {
        const validCharacters = /[^a-zA-Z\sğüşıöçĞÜŞİÖÇ]/g
        if (
            validCharacters.test(text) ||
            text.substr(-2) === '  ' ||
            text.charAt(0) === ' ' ||
            text.endsWith(' ')
        ) {
            this.setState({ nameBorderColor: 'red' })
        } else this.setState({ nameBorderColor: '#989696' })
        text = text.replace(/\s\s+/g, ' ')
        this.setState({ name: text })
    }

    lastnameOnChange = text => {
        const validCharacters = /[^a-zA-ZğüşıöçĞÜŞİÖÇ]/g
        if (validCharacters.test(text)) {
            this.setState({ lastnameBorderColor: 'red' })
        } else this.setState({ lastnameBorderColor: '#989696' })
        this.setState({ lastname: text })
    }

    inviteCodeChange = text => {
        const validCharacters = /[^a-zA-Z0-9]/g
        if (validCharacters.test(text)) {
            this.setState({ inviteCodeBorderColor: 'red' })
        } else this.setState({ inviteCodeBorderColor: '#989696' })
        this.setState({ friendInviteCode: text })
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
        if (this.state.nameBorderColor === 'red') {
            flashMessages.authInfosOrSettingsError(
                'Ad hatası',
                'Ad sadece harflerden oluşmalıdır',
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
        if (this.state.lastnameBorderColor === 'red') {
            flashMessages.authInfosOrSettingsError(
                'Soyad hatası',
                'Soyad sadece harflerden oluşmalıdır',
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
        if (this.state.usernameBorderColor === 'red') {
            flashMessages.authInfosOrSettingsError(
                'Kullanıcı adı hatası',
                'Kullanıcı adı sadece harf veya rakamlardan oluşabilir',
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
        if (this.state.inviteCodeBorderColor === 'red') {
            flashMessages.authInfosOrSettingsError(
                'Kod hatası',
                'Lütfen kodu doğru giriniz',
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
        if (
            this.state.username === null ||
            this.state.name === null ||
            this.state.lastname === null ||
            this.state.birthDate === null ||
            this.state.city === null
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
            return
        }
        this.props.createUser({
            username: this.state.username,
            name: this.state.name,
            lastname: this.state.lastname,
            birthDate: this.state.birthDate,
            city: this.state.city,
            email: this.props.email,
            password: this.props.password,
            signInMethod: this.props.signInMethod,
            friendInviteCode: this.state.friendInviteCode
        })
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
                    <Modal
                        visible={this.state.isModalVisible}
                        transparent={true}
                        animationType={'fade'}
                    >
                        {this.cityPicker()}
                    </Modal>
                    <View style={styles.imageContainer}>
                        <Image
                            source={SINAVIA_LOGO}
                            style={{
                                height: hp(25),
                                resizeMode: 'contain',
                                marginLeft: wp(4)
                            }}
                        />
                    </View>
                    <View style={styles.allTextInputsContainer}>
                        <AuthTextInput
                            placeholder="Kullanıcı adı"
                            placeholderTextColor="#8A8888"
                            maxLength={16}
                            borderColor={this.state.usernameBorderColor}
                            onChangeText={this.usernameOnChange}
                        />
                        <AuthTextInput
                            placeholder="Ad"
                            placeholderTextColor="#8A8888"
                            maxLength={16}
                            borderColor={this.state.nameBorderColor}
                            onChangeText={this.nameOnChange}
                        />
                        <AuthTextInput
                            placeholder="Soyad"
                            placeholderTextColor="#8A8888"
                            maxLength={16}
                            borderColor={this.state.lastnameBorderColor}
                            onChangeText={this.lastnameOnChange}
                        />
                        <TouchableOpacity onPress={this.showDateTimePicker}>
                            <View style={styles.textInputContainer}>
                                <Text
                                    style={[
                                        styles.textInput,
                                        {
                                            color:
                                                this.state.birthDate === null
                                                    ? '#8A8888'
                                                    : '#2E313C'
                                        }
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
                        <TouchableOpacity onPress={this.openModalVisible}>
                            <View style={styles.textInputContainer}>
                                <Text
                                    style={[
                                        styles.textInput,
                                        {
                                            color:
                                                this.state.city === null
                                                    ? '#8A8888'
                                                    : '#2E313C'
                                        }
                                    ]}
                                >
                                    {this.state.cityUI}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <AuthTextInput
                            placeholder="Arkadaş daveti kodu (zorunlu değil)"
                            placeholderTextColor="#8A8888"
                            maxLength={7}
                            borderColor={this.state.inviteCodeBorderColor}
                            onChangeText={this.inviteCodeChange}
                        />
                    </View>
                    <View style={styles.authButtonView}>
                        <AuthButton
                            height={hp(7)}
                            width={wp(85)}
                            color="#00D9EF"
                            buttonText="Onayla"
                            borderRadius={hp(1.5)}
                            marginTop={hp(3)}
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

export default connect(mapStateToProps, mapDispatchToProps)(GetInfo)
