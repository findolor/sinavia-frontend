import React from 'react'
import {
    Image,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    AsyncStorage,
    Platform,
    Alert,
    FlatList
} from 'react-native'
import { connect } from 'react-redux'
import { userActions } from '../../../redux/user/actions'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { deviceStorage } from '../../../services/deviceStorage'
import Carousel from 'react-native-snap-carousel'
import {
    sliderHeight,
    sliderWidth,
    itemHeight,
    itemWidth
} from '../../../components/mainScreen/carousel/styles/SliderEntry.style'
import SliderEntry from '../../../components/mainScreen/carousel/components/SliderEntry'
import carouselStyle from '../../../components/mainScreen/carousel/styles/index.style'
import styles from './style'
import { LGS, YKS, KPSS, ALES, DGS, YDS, TUS, DUS, EUS, Ehliyet } from '../../../components/mainScreen/carousel/static/exams'
import * as courses from '../../../components/mainScreen/carousel/static/courses'
import DropDown from '../../../components/mainScreen/dropdown/dropdown'
import AuthButton from '../../../components/authScreen/authButton'
// Colyseus imports
import { Buffer } from 'buffer'
window.localStorage = AsyncStorage
global.Buffer = Buffer
import * as Colyseus from 'colyseus.js'

// FCM imports
import firebase from 'react-native-firebase'
import { fcmService } from '../../../services/fcmService'

import { GAME_ENGINE_ENDPOINT } from '../../../config'

import NOTIFICATION_LOGO from '../../../assets/mainScreens/notification.png'
import BACK_BUTTON from '../../../assets/backButton.png'

import {
    navigationPush,
    navigationReset,
    SCENE_KEYS
} from '../../../services/navigationService'
import NotchView from '../../../components/notchView'

import PROFILE_PIC from '../../../assets/profile2.jpg'
import SWORD from '../../../assets/sword.png'
const carouselFirstItem = 0
const exams = [
    'YKS',
    'LGS',
    'KPSS',
    'ALES',
    'DGS',
    'YDS',
    'TUS',
    'DUS',
    'EUS',
    'Ehliyet'
]
const CLOSE_BUTTON = require('../../../assets/closeButton.png')
const examList = {
    YKS: YKS,
    LGS: LGS,
    KPSS: KPSS,
    ALES: ALES,
    DGS: DGS,
    YDS: YDS,
    TUS: TUS,
    DUS: DUS,
    EUS: EUS,
    Ehliyet: Ehliyet
}

const SELECTED_MODE_COLOR = '#00D9EF'
const EMPTY_MODE_COLOR = '#A8A8A8'

const RANKED_SELECTED_IMAGE = require('../../../assets/mainScreens/tek_beyaz.png')
const RANKED_EMPTY_IMAGE = require('../../../assets/mainScreens/tek.png')
const FRIENDS_SELECTED_IMAGE = require('../../../assets/mainScreens/arkadas.png')
const FRIENDS_EMPTY_IMAGE = require('../../../assets/mainScreens/arkadas_siyah.png')
const GROUP_SELECTED_IMAGE = require('../../../assets/mainScreens/group.png')
const GROUP_EMPTY_IMAGE = require('../../../assets/mainScreens/group_siyah.png')

const friendsListData = [
    {
        userPic: PROFILE_PIC,
        name: 'Nurettin Hakan Yılmaz',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Mehmet',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Nakışçı',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Arca Altunsu',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Orkun Külçe',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Ahmet',
        username: 'ahmetnakisci'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Burak',
        username: 'ruzgar'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan',
        username: 'haqotherage'
    }
]

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            exam: this.props.choosenExam,
            subject: '',
            isModalVisible: false,
            // Mode button variables
            rankedModeButtonBorderColor: EMPTY_MODE_COLOR,
            // Mode images
            rankedImage: RANKED_EMPTY_IMAGE,
            friendsImage: FRIENDS_EMPTY_IMAGE,
            groupImage: GROUP_EMPTY_IMAGE,
            // Carousel slide item
            carouselActiveSlide: carouselFirstItem,
            // On change text for the group room code
            groupCodeOnChangeText: '',
            // Modal visible view variable
            visibleView: '',
            // Variable for making start button when pressed ranked
            visibleRankedGameStartPress: false,
            opponentUserPic: '',
            opponentName: '',
            opponentUsername: ''
        }
    }

    async componentDidMount() {
        await fcmService.checkPermissions()
        /* if (Platform.OS === 'ios') {
            this.messageListener = firebase.messaging().onMessage(message => {
                console.log(message)
            })
        } else {
            this.messageListener = firebase
                .notifications()
                .onNotification(notification => {
                    console.log(notification)
                })
        } */
        this.messageListener = firebase.messaging().onMessage(message => {
            Alert.alert(message.data.body)
        })
        this.NotificationListener = firebase
            .notifications()
            .onNotification(notification => {
                console.log(notification)
                Alert.alert(notification.body)
            })
    }

    _renderItemWithParallax({ item }) {
        return (
            <SliderEntry
                data={item}
            />
        )
    }

    async pickerSelect(idx, value) {
        this.setState({
            exam: value
        })
        await deviceStorage.saveItemToStorage('choosenExam', value)
        this.props.saveChoosenExam(value)
    }

    carouselIndexToCourseName = () => {
        switch (this.state.exam) {
            case 'YKS':
                return YKS[this.state.carouselActiveSlide].courseName
            case 'LGS':
                return LGS[this.state.carouselActiveSlide].courseName
            case 'KPSS':
                return YKS[this.state.carouselActiveSlide].courseName
            case 'ALES':
                return LGS[this.state.carouselActiveSlide].courseName
            case 'DGS':
                return YKS[this.state.carouselActiveSlide].courseName
            case 'YDS':
                return LGS[this.state.carouselActiveSlide].courseName
            case 'TUS':
                return YKS[this.state.carouselActiveSlide].courseName
            case 'DUS':
                return LGS[this.state.carouselActiveSlide].courseName
            case 'EUS':
                return YKS[this.state.carouselActiveSlide].courseName
            case 'Ehliyet':
                return LGS[this.state.carouselActiveSlide].courseName
        }
    }

    onPressCard(title) {
        this.setState({
            isModalVisible: true,
            subject: title,
            visibleView: 'GAME_MODES'
        })
    }

    cards(sinav, index) {
        var choosenSubject
        var cardList = []
        if (sinav === 'LGS') {
            switch (index) {
                case 0:
                    choosenSubject = courses.LGS.lgsTurkce
                    break
                case 1:
                    choosenSubject = courses.LGS.lgsMatematik
                    break
                case 2:
                    choosenSubject = courses.LGS.lgsTarih
                    break
                case 3:
                    choosenSubject = courses.LGS.lgsFen
                    break
                case 4:
                    choosenSubject = courses.LGS.lgsIngilizce
                    break
                case 5:
                    choosenSubject = courses.LGS.lgsDin
                    break
            }
        } else if (sinav === 'YKS') {
            switch (index) {
                case 0:
                    choosenSubject = courses.YKS.yksTurkce
                    break
                case 1:
                    choosenSubject = courses.YKS.yksEdebiyat
                    break
                case 2:
                    choosenSubject = courses.YKS.yksCografya
                    break
                case 3:
                    choosenSubject = courses.YKS.yksTarih
                    break
                case 4:
                    choosenSubject = courses.YKS.yksMatematik
                    break
                case 5:
                    choosenSubject = courses.YKS.yksGeometri
                    break
                case 6:
                    choosenSubject = courses.YKS.yksFizik
                    break
                case 7:
                    choosenSubject = courses.YKS.yksKimya
                    break
                case 8:
                    choosenSubject = courses.YKS.yksBiyoloji
                    break
                case 9:
                    choosenSubject = courses.YKS.yksFelsefe
                    break
            }
        }
        else if (sinav === 'KPSS') {
            switch (index) {
                case 0:
                    choosenSubject = courses.KPSS.kpssSozelBolum
                    break
                case 1:
                    choosenSubject = courses.KPSS.kpssSayisalBolum
                    break
                case 2:
                    choosenSubject = courses.KPSS.kpssTarih
                    break
                case 3:
                    choosenSubject = courses.KPSS.kpssCografya
                    break
                case 4:
                    choosenSubject = courses.KPSS.kpssVatandaslik
                    break
                case 5:
                    choosenSubject = courses.KPSS.kpssEgitimBilimleri
                    break
                case 6:
                    choosenSubject = courses.KPSS.kpssOABT
                    break
                case 7:
                    choosenSubject = courses.KPSS.kpssIsletme
                    break
                case 8:
                    choosenSubject = courses.KPSS.kpssMuhasebe
                    break
                case 9:
                    choosenSubject = courses.KPSS.kpssHukuk
                    break
                case 10:
                    choosenSubject = courses.KPSS.kpssIktisat
                    break
                case 11:
                    choosenSubject = courses.KPSS.kpssMaliye
                    break
            }
        }
        else if (sinav === 'ALES') {
            switch (index) {
                case 0:
                    choosenSubject = courses.ALES.alesTurkce
                    break
                case 1:
                    choosenSubject = courses.ALES.alesMatematik
                    break
                case 2:
                    choosenSubject = courses.ALES.alesGeometri
                    break
            }
        }
        else if (sinav === 'DGS') {
            switch (index) {
                case 0:
                    choosenSubject = courses.DGS.dgsTurkce
                    break
                case 1:
                    choosenSubject = courses.DGS.dgsMatematik
                    break
                case 2:
                    choosenSubject = courses.DGS.dgsGeometri
                    break
            }
        }
        else if (sinav === 'YDS') {
            switch (index) {
                case 0:
                    choosenSubject = courses.YDS.ydsIngilizce
                    break
                case 1:
                    choosenSubject = courses.YDS.ydsAlmanca
                    break
                case 2:
                    choosenSubject = courses.YDS.ydsFransizca
                    break
                case 3:
                    choosenSubject = courses.YDS.ydsRusca
                    break
                case 4:
                    choosenSubject = courses.YDS.ydsArapca
                    break
            }
        }
        else if (sinav === 'TUS') {
            switch (index) {
                case 0:
                    choosenSubject = courses.TUS.tusTemelBilimler
                    break
                case 1:
                    choosenSubject = courses.TUS.tusKlinikBilimler
                    break
            }
        }
        else if (sinav === 'DUS') {
            switch (index) {
                case 0:
                    choosenSubject = courses.DUS.dusTemelBilimler
                    break
                case 1:
                    choosenSubject = courses.DUS.dusKlinikBilimler
                    break
            }
        }
        else if (sinav === 'EUS') {
            switch (index) {
                case 0:
                    choosenSubject = courses.EUS.eusTemelBilimler
                    break
                case 1:
                    choosenSubject = courses.EUS.eusEczacilikBilimleri
                    break
            }
        }
        else if (sinav === 'Ehliyet') {
            switch (index) {
                case 0:
                    choosenSubject = courses.EHLIYET.ehliyetCikmis
                    break
            }
        }

        for (let i = 0; i < choosenSubject.length; i++) {
            cardList.push(
                <TouchableOpacity
                    onPress={() => {
                        this.onPressCard(choosenSubject[i])
                    }}
                    key={i}
                >
                    <View style={styles.card}>
                        <Text style={styles.cardText}>{choosenSubject[i]}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return cardList
    }

    closeModalButtonOnPress = () => {
        this.setState({
            isModalVisible: false
        })
    }

    rankedGameModeOnPress = () => {
        this.setState({
            visibleRankedGameStartPress: true,
            rankedModeButtonBorderColor:
                this.state.rankedModeButtonBorderColor === EMPTY_MODE_COLOR
                    ? SELECTED_MODE_COLOR
                    : EMPTY_MODE_COLOR
        })
    }

    groupGameModeOnPress = () => {
        this.setState({
            visibleView: 'GROUP_MODES',
            visibleRankedGameStartPress: false,
            rankedModeButtonBorderColor: EMPTY_MODE_COLOR
        })
    }

    gameModesView() {
        return (
            <View style={styles.modal}>
                <View style={styles.onlyCloseButtonContainer}>
                    <TouchableOpacity onPress={this.closeModalButtonOnPress}>
                        <Image source={CLOSE_BUTTON} style={styles.xLogo} />
                    </TouchableOpacity>
                </View>
                <View style={styles.modalView}>
                    <Text style={styles.modalSubjectText}>
                        {this.state.subject}
                    </Text>
                    <View style={styles.separatorContainer}>
                        <View style={styles.separatorLine} />
                    </View>
                    <View style={styles.gameModesContainer}>
                        <View style={styles.gameModeContainer}>
                            <TouchableOpacity
                                onPress={this.rankedGameModeOnPress}
                            >
                                <View
                                    style={[
                                        styles.gameModeLogoContainer,
                                        {
                                            borderColor: this.state
                                                .rankedModeButtonBorderColor
                                        }
                                    ]}
                                >
                                    <Image
                                        source={this.state.rankedImage}
                                        style={styles.rankedModeImage}
                                    />
                                </View>
                            </TouchableOpacity>
                            <View style={styles.gameModeContextContainer}>
                                <Text style={styles.gameModeContextText}>
                                    Rastgele bir kullanıcı ile yarış
                                </Text>
                            </View>
                        </View>
                        <View style={styles.gameModeContainer}>
                            <TouchableOpacity onPress={this.friendRoomOnPress}>
                                <View style={styles.gameModeLogoContainer}>
                                    <Image
                                        source={this.state.friendsImage}
                                        style={styles.friendsModeImage}
                                    />
                                </View>
                            </TouchableOpacity>
                            <View style={styles.gameModeContextContainer}>
                                <Text style={styles.gameModeContextText}>
                                    Arkadaşın ile yarış
                                </Text>
                            </View>
                        </View>
                        <View style={styles.gameModeContainer}>
                            <TouchableOpacity
                                onPress={this.groupGameModeOnPress}
                            >
                                <View style={styles.gameModeLogoContainer}>
                                    <Image
                                        source={this.state.groupImage}
                                        style={styles.groupModeImage}
                                    />
                                </View>
                            </TouchableOpacity>
                            <View style={styles.gameModeContextContainer}>
                                <Text style={styles.gameModeContextText}>
                                    Arkadaş grubun ile yarış
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                {this.state.visibleRankedGameStartPress && (
                    <AuthButton
                        marginTop={hp(2)}
                        height={hp(7)}
                        width={wp(87.5)}
                        color="#00D9EF"
                        buttonText="Başlat"
                        onPress={this.playButtonOnPress}
                    />
                )}
            </View>
        )
    }

    createGroupRoomOnPress = () => {
        this.setState({
            isModalVisible: false
        })
        navigationPush(SCENE_KEYS.mainScreens.createGroupRoom)
    }

    friendRoomOnPress = () => {
        this.setState({ visibleView: 'FRIEND_ROOM' })
    }

    friendRoomAndGameModesBackButtonOnPress = () => {
        this.setState({ visibleView: 'GAME_MODES' })
    }

    groupModesView() {
        return (
            <View style={styles.modal}>
                <View style={styles.backAndCloseButtonsContainer}>
                    <TouchableOpacity
                        onPress={this.friendRoomAndGameModesBackButtonOnPress}
                    >
                        <Image source={BACK_BUTTON} style={styles.backLogo} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.closeModalButtonOnPress}>
                        <Image source={CLOSE_BUTTON} style={styles.xLogo} />
                    </TouchableOpacity>
                </View>
                <View style={styles.modalView}>
                    <View style={styles.createOrJoinRoomButtonsContainer}>
                        <AuthButton
                            height={hp(12)}
                            width={wp(60)}
                            color="#00D9EF"
                            buttonText="Oyun kur"
                            onPress={this.createGroupRoomOnPress}
                        />
                        <AuthButton
                            height={hp(12)}
                            width={wp(60)}
                            color="#00D9EF"
                            buttonText="Oyuna katıl"
                            onPress={() =>
                                this.setState({ visibleView: 'JOIN_ROOM' })
                            }
                        />
                    </View>
                </View>
            </View>
        )
    }

    searchFilterFunction = text => {
        this.setState({
            value: text
        })

        const newData = friendsListData.filter(item => {
            const itemData = `${item.name.toUpperCase()} ${item.username.toUpperCase()}`
            const textData = text.toUpperCase()

            return itemData.indexOf(textData) > -1
        })
        this.setState({
            data: newData
        })
    }

    userOnPress(user) {
        this.setState({
            opponentUserPic: user.userPic,
            opponentName: user.name,
            opponentUsername: user.username
        })
        console.log(this.state.opponentUserPic)
        console.log(this.state.opponentName)
        console.log(this.state.opponentUsername)
    }

    friendRoomView() {
        return (
            <View style={styles.modal}>
                <View style={styles.backAndCloseButtonsContainer}>
                    <TouchableOpacity
                        onPress={this.friendRoomAndGameModesBackButtonOnPress}
                    >
                        <Image source={BACK_BUTTON} style={styles.backLogo} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.closeModalButtonOnPress}>
                        <Image source={CLOSE_BUTTON} style={styles.xLogo} />
                    </TouchableOpacity>
                </View>
                <View style={styles.modalView}>
                    <View style={styles.usersContainer}>
                        <View style={styles.userContainer}>
                            <View style={styles.userPicContainer}>
                                <Image
                                    source={PROFILE_PIC}
                                    style={styles.userPic}
                                />
                            </View>
                            <View style={styles.nameAndUsernameContainer}>
                                <Text style={styles.nameAndSurnameText}>
                                    Nurettin Hakan Yılmaz
                                </Text>
                                <Text style={styles.userNameText}>
                                    @haqotherage
                                </Text>
                            </View>
                        </View>
                        <Image source={SWORD} style={styles.sword} />
                        <View style={styles.userContainer}>
                            <View style={styles.userPicContainer}>
                                <Image
                                    source={this.state.opponentUserPic}
                                    style={styles.userPic}
                                />
                            </View>
                            <View style={styles.nameAndUsernameContainer}>
                                <Text style={styles.nameAndSurnameText}>
                                    {this.state.opponentName}
                                </Text>
                                <Text style={styles.userNameText}>
                                    {this.state.opponentUsername}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.userListContainer}>
                        <View style={styles.searchBar}>
                            <View style={styles.textInputView}>
                                <TextInput
                                    style={styles.searchBarText}
                                    placeholder="Arkadaşını ara..."
                                    placeholderTextColor={'#7B7B7B'}
                                    autoCapitalize={'none'}
                                    onChangeText={text =>
                                        this.searchFilterFunction(text)
                                    }
                                    value={this.state.value}
                                />
                            </View>
                        </View>
                        <View style={styles.spaceView} />
                        <FlatList
                            data={this.state.data}
                            vertical={true}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => this.userOnPress(item)}
                                    >
                                        <View style={styles.userRow}>
                                            <View
                                                style={
                                                    styles.userPicContainerInRow
                                                }
                                            >
                                                <Image
                                                    source={item.userPic}
                                                    style={styles.userPicInRow}
                                                />
                                            </View>
                                            <View style={styles.nameContainer}>
                                                <Text style={styles.nameText}>
                                                    {item.name}
                                                </Text>
                                                <Text
                                                    style={styles.userNameText}
                                                >
                                                    @{item.username}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
                <AuthButton
                    marginTop={hp(2)}
                    height={hp(7)}
                    width={wp(87.5)}
                    color="#00D9EF"
                    buttonText="Başla"
                />
            </View>
        )
    }

    joinGroupRoomOnPress = () => {
        if (
            this.state.groupCodeOnChangeText === '' ||
            this.state.groupCodeOnChangeText.length !== 6
        )
            return
        this.client = new Colyseus.Client(GAME_ENGINE_ENDPOINT)
        this.client.onOpen.add(() => {
            this.tryJoiningRoom()
        })
    }

    tryJoiningRoom = async () => {
        const databaseId = await deviceStorage.getItemFromStorage('userId')

        this.room = this.client.join('groupRoom', {
            // These will be props coming from home screen
            examName: 'LGS',
            courseName: 'Matematik',
            subjectName: 'Sayilar',
            databaseId: databaseId,
            roomCode: this.state.groupCodeOnChangeText.toString(),
            // Because we are joining a game, we don't want to create a new room
            create: false
        })

        this.room.onJoin.add(() => {
            this.setState({ isModalVisible: false })
            this.room.removeAllListeners()
            navigationPush(SCENE_KEYS.mainScreens.joinGroupRoom, {
                client: this.client,
                room: this.room,
                roomCode: this.state.groupCodeOnChangeText
            })
        })
    }

    joinRoomBackButtonOnPress = () => {
        this.setState({ visibleView: 'GROUP_MODES' })
    }

    joinRoomView() {
        return (
            <View style={styles.modal}>
                <View style={styles.backAndCloseButtonsContainer}>
                    <TouchableOpacity onPress={this.joinRoomBackButtonOnPress}>
                        <Image source={BACK_BUTTON} style={styles.backLogo} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.closeModalButtonOnPress}>
                        <Image source={CLOSE_BUTTON} style={styles.xLogo} />
                    </TouchableOpacity>
                </View>
                <View style={styles.modalView}>
                    <View style={styles.joinGameCodeContainer}>
                        <View style={styles.gameCodeBox}>
                            <TextInput
                                style={styles.joinGameCodeTextInput}
                                maxLength={6}
                                placeholder="Oda Kodu  "
                                placeholderStyle={
                                    styles.joinGameCodeTextInputPlaceholder
                                }
                                placeholderTextColor="#A8A8A8"
                                autoCapitalize="characters"
                                onChangeText={text =>
                                    this.setState({
                                        groupCodeOnChangeText: text
                                    })
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.joinGameInfoContainer}>
                        <Text style={styles.joinGameInfoText}>
                            Aldığın oda kodunu
                        </Text>
                        <Text style={styles.joinGameInfoText}>
                            yukarıdaki alana girerek
                        </Text>
                        <Text style={styles.joinGameInfoText}>
                            oyuna dahil ol
                        </Text>
                    </View>
                </View>
                <AuthButton
                    marginTop={hp(2)}
                    height={hp(7)}
                    width={wp(87.5)}
                    color="#00D9EF"
                    buttonText="Onayla"
                    onPress={this.joinGroupRoomOnPress}
                />
            </View>
        )
    }

    playButtonOnPress = () => {
        navigationReset('game', {
            examName: this.state.exam,
            courseName: this.carouselIndexToCourseName(),
            subjectName: this.state.subject
        })
    }

    profilePicOnPress = () => {
        navigationPush(SCENE_KEYS.mainScreens.profile)
    }

    notificationPicOnPress = () => {
        navigationPush(SCENE_KEYS.mainScreens.notifications)
    }

    render() {
        const card = this.cards(this.state.exam, this.state.carouselActiveSlide)
        const visibleView = this.state.visibleView
        return (
            <View style={styles.container}>
                <NotchView color={'#fcfcfc'} />
                <Modal
                    visible={this.state.isModalVisible}
                    transparent={true}
                    animationType={'fade'}
                >
                    {visibleView === 'GAME_MODES' && this.gameModesView()}
                    {visibleView === 'FRIEND_ROOM' && this.friendRoomView()}
                    {visibleView === 'GROUP_MODES' && this.groupModesView()}
                    {visibleView === 'JOIN_ROOM' && this.joinRoomView()}
                </Modal>
                <View style={{ height: hp(60), marginTop: hp(0) }}>
                    <View style={styles.header}>
                        <View style={styles.profilePicContainer}>
                            <TouchableOpacity onPress={this.profilePicOnPress}>
                                <Image
                                    source={{
                                        uri: this.props.profilePicture
                                    }}
                                    style={styles.profilePic}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.pickerContainer}>
                            <DropDown
                                style={styles.picker}
                                textStyle={styles.pickerText}
                                dropdownTextStyle={styles.pickerDropdownText}
                                dropdownStyle={styles.pickerDropdown}
                                options={exams}
                                defaultValue={this.state.exam}
                                onSelect={(idx, value) =>
                                    this.pickerSelect(idx, value)
                                }
                            />
                        </View>
                        <View style={styles.notificationLogoContainer}>
                            <TouchableOpacity
                                onPress={this.notificationPicOnPress}
                            >
                                <Image
                                    source={NOTIFICATION_LOGO}
                                    style={styles.notificationLogo}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.carouselContainer}>
                        <Carousel
                            zIndex={1}
                            ref={c => (this._slider1Ref = c)}
                            data={examList[this.state.exam]}
                            renderItem={this._renderItemWithParallax}
                            sliderHeight={sliderHeight}
                            sliderWidth={sliderWidth}
                            itemHeight={itemHeight}
                            itemWidth={itemWidth}
                            firstItem={carouselFirstItem}
                            inactiveSlideScale={0.8}
                            inactiveSlideOpacity={0.65}
                            loop={false}
                            onSnapToItem={index =>
                                this.setState({ carouselActiveSlide: index })
                            }
                        />
                    </View>
                    <ScrollView
                        style={styles.cardsScrollView}
                        showsVerticalScrollIndicator={false}
                    >
                        {card}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    profilePicture: state.user.profilePicture,
    choosenExam: state.user.choosenExam
})

const mapDispatchToProps = dispatch => ({
    saveChoosenExam: choosenExam =>
        dispatch(userActions.saveChoosenExam(choosenExam))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
