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
    Alert,
    FlatList,
    AppState
} from 'react-native'
import { connect } from 'react-redux'
import { gameContentActions } from '../../../redux/gameContent/actions'
import { friendActions } from '../../../redux/friends/actions'
import { appActions } from '../../../redux/app/actions'
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
import styles from './style'
import premiumStyles from '../purchaseScreen/style'
import { showMessage } from 'react-native-flash-message'

import DropDown from '../../../components/mainScreen/dropdown/dropdown'
import AuthButton from '../../../components/authScreen/authButton'
// Colyseus imports
import { Buffer } from 'buffer'
window.localStorage = AsyncStorage
global.Buffer = Buffer
import * as Colyseus from 'colyseus.js'

// FCM imports
import firebase from 'react-native-firebase'

import { friendGameServices } from '../../../sagas/friendGame/'
import { userScoreServices } from '../../../sagas/userScore'
import { userServices } from '../../../sagas/user/'
import { apiServices } from '../../../sagas/api'
import { GAME_ENGINE_ENDPOINT } from '../../../config'

import NOTIFICATION_LOGO from '../../../assets/mainScreens/notification.png'
import ON_NOTIFICATION_LOGO from '../../../assets/mainScreens/onNotification.png'
import BACK_BUTTON from '../../../assets/backButton.png'

import CreateGroupRoomView from './groupRoomScreens/createRoomScreen/createGroupRoom'
import JoinGroupRoomView from './groupRoomScreens/joinRoomScreen/joinGroupRoom'

import {
    navigationPush,
    navigationReset,
    SCENE_KEYS,
    navigationReplace,
    getCurrentScreen
} from '../../../services/navigationService'

import { levelFinder } from '../../../services/userLevelFinder'

import SWORD from '../../../assets/sword.png'
import LinearGradient from 'react-native-linear-gradient'

const carouselFirstItem = 0

const SELECTED_MODE_COLOR = '#00D9EF'
const EMPTY_MODE_COLOR = '#A8A8A8'

const CLOSE_BUTTON = require('../../../assets/closeButton.png')

const RANKED_IMAGE = require('../../../assets/sword.png')
const FRIENDS_IMAGE = require('../../../assets/mainScreens/arkadas_siyah.png')
const GROUP_IMAGE = require('../../../assets/mainScreens/group_siyah.png')
const SOLO_IMAGE = require('../../../assets/mainScreens/tek.png')
const SOLO_PREMIUM = require('../../../assets/soloPremium.png')

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // Dropdown default value
            defaultExam: this.props.choosenExam,
            // Dropdown exam list
            examList: [],
            // Carousel course data
            carouselCourseData: [],
            subject: '',
            isModalVisible: false,
            // Mode button variables
            rankedModeButtonBorderColor: SELECTED_MODE_COLOR,
            soloModeButtonBorderColor: EMPTY_MODE_COLOR,
            // Carousel slide item
            carouselActiveSlide: carouselFirstItem,
            // On change text for the group room code
            groupCodeOnChangeText: '',
            // Modal visible view variable
            visibleView: '',
            // Variable for making start button when pressed ranked
            friendSelected: false,
            opponentUserPic: null,
            opponentName: '',
            opponentUsername: '',
            opponentInformation: {},
            friendList: [],
            originalFriends: [],
            // Selected game mode variable
            selectedGameMode: 'ranked',
            // Selected content total score
            selectedContentTotalPoints: 0,
            // Friend game modal variable
            isFriendGameRequestModalVisible: false,
            // Current app state (foreground, active, ...)
            appState: AppState.currentState,
            // Friend game request notification variables
            requestingUserUsername: null,
            requestedGameExamId: 1,
            requestedGameCourseId: 1,
            requestedGameSubjectId: 1,
            requestedGameRoomCode: null,
            requestedGameOpponentId: null,
            // Variable to check if group game is initiated
            isGroupGameInitiated: false,
            // Notification related
            isNotificationReceived: false
        }
    }

    async componentDidMount() {
        // Fills the lists
        await this.fillGameContent()
        // Set up a listener for detecting the app state
        AppState.addEventListener('change', this.handleAppStateChange)

        if (global.messageListener !== undefined) {
            global.messageListener()
            global.notificationListener()
            global.notificationOpenedListener()
        }
        global.messageListener = firebase.messaging().onMessage(message => {
            console.log(message, 'mes')
            this.fcmMessagePicker(message)
        })
        global.notificationListener = firebase
            .notifications()
            .onNotification(notification => {
                this.setState({ isNotificationReceived: true })
                console.log(notification, 'not')
                if (this.state.appState === 'active') {
                    if (
                        getCurrentScreen() !== 'rankedGame' &&
                        getCurrentScreen() !== 'loading' &&
                        getCurrentScreen() !== 'rankedMatchingScreen' &&
                        getCurrentScreen() !== 'friendMatchingScreen' &&
                        getCurrentScreen() !== 'groupGame' &&
                        getCurrentScreen() !== 'groupLoading' &&
                        getCurrentScreen() !== 'friendGame' &&
                        getCurrentScreen() !== 'soloFriendGameScreen' &&
                        getCurrentScreen() !== 'soloModeLoadingScreen' &&
                        getCurrentScreen() !== 'soloModeGameScreen' &&
                        !this.state.isGroupGameInitiated
                    ) {
                        if (
                            notification.data.type === 'friendRequest' ||
                            notification.data.type === 'friendMatchResult'
                        )
                            return
                        if (this.state.isModalVisible) {
                            this.setState({ isModalVisible: false }, () => {
                                this.fcmMessagePicker(notification)
                            })
                        } else this.fcmMessagePicker(notification)
                    }
                } else {
                    // Create the channel
                    const channel = new firebase.notifications.Android.Channel(
                        'notification-channel',
                        'Notification Channel',
                        firebase.notifications.Android.Importance.Max
                    ).setDescription('Sinavia notification channel')
                    firebase.notifications().android.createChannel(channel)

                    const tempNotification = new firebase.notifications.Notification()
                        .setNotificationId(notification.notificationId)
                        .setTitle(notification.title)
                        .setBody(notification.body)
                        .setData(notification.data)
                    tempNotification.android.setChannelId('channelId')
                    tempNotification.android.setSmallIcon('ic_launcher')
                    tempNotification.ios.setBadge(2)

                    firebase
                        .notifications()
                        .displayNotification(tempNotification)
                }
            })

        // If the app was in foreground or background
        // This func fires up
        global.notificationOpenedListener = firebase
            .notifications()
            .onNotificationOpened(notificationOpen => {
                // Get information about the notification that was opened
                const notification = notificationOpen.notification

                this.fcmMessagePicker(notification)
                this.props.saveNotificationOpen(null)
            })
        // If the app was closed when the notification is opened
        // This func fires up
        if (this.props.notificationOpen) {
            // App was opened by a notification
            // Get information about the notification that was opened
            const notification = this.props.notificationOpen.notification
            if (notification === undefined) return

            this.fcmMessagePicker(notification)
            this.props.saveNotificationOpen(null)
        }
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange)
    }

    handleAppStateChange = nextAppState => {
        this.setState({ appState: nextAppState })
    }

    fillGameContent = () => {
        new Promise.resolve().then(() => {
            const examNames = []
            this.props.examList.forEach((exam, index) => {
                examNames.push(exam.name)
            })
            this.carouselMaker(this.props.choosenExam)
            this.setState({ examList: examNames })
        })
    }

    fcmMessagePicker = message => {
        switch (message.data.type) {
            case 'friendRequest':
                navigationPush(SCENE_KEYS.mainScreens.notifications, {
                    shouldGoToFriendRequests: true
                })
                break
            case 'friendApproved':
                this.friendRequestAccepted({
                    opponentId: message.data.userId
                })
                break
            case 'friendGameRequest':
                this.setState(
                    {
                        requestingUserUsername: message.data.username,
                        requestedGameExamId: parseInt(message.data.examId, 10),
                        requestedGameCourseId: parseInt(
                            message.data.courseId,
                            10
                        ),
                        requestedGameSubjectId: parseInt(
                            message.data.subjectId,
                            10
                        ),
                        requestedGameRoomCode: message.data.roomCode,
                        requestedGameOpponentId: message.data.userId
                    },
                    () =>
                        this.setState({
                            isFriendGameRequestModalVisible: true
                        })
                )
                break
            case 'friendDeleted':
                this.friendDeleted({ opponentId: message.data.userId })
                break
            case 'friendMatchResult':
                navigationPush(SCENE_KEYS.mainScreens.notifications)
                break
        }
    }

    tryJoiningFriendRoom = params => {
        let room
        const client = new Colyseus.Client(GAME_ENGINE_ENDPOINT)
        client.onOpen.add(() => {
            // TODO PUT A MODAL HERE FOR WAITING
            Alert.alert('Bekleniyor...')

            room = client.join('friendRoom', {
                databaseId: this.props.clientDBId,
                roomCode: params.roomCode,
                create: false
            })

            // We set a timeout for the time passed since join initiation
            // TODO THINK ABOUT THE TIMEOUT NUMBER IN HERE
            const timeout = setTimeout(() => {
                Alert.alert('Üznügüm ama oda aktif değil')
                room.leave()
                client.close()
            }, 5000)

            // If room onJoin doesn't trigger we don't do anything
            room.onJoin.add(() => {
                // We clear the timeout as we don't need it anymore
                clearTimeout(timeout)
                // Getting the opponent information and navigatiing
                userServices
                    .getUser(this.props.clientToken, params.opponentId)
                    .then(opponentInformation => {
                        room.removeAllListeners()
                        navigationReset('game', { isHardReset: true })
                        navigationReplace(
                            SCENE_KEYS.gameScreens.friendMatchingScreen,
                            {
                                isFriendJoining: true,
                                room: room,
                                client: client,
                                opponentInformation: opponentInformation,
                                examId: params.examId,
                                courseId: params.courseId,
                                subjectId: params.subjectId
                            }
                        )
                    })
            })
        })
    }

    playFriendGame = async params => {
        const opponentInformation = await userServices.getUser(
            this.props.clientToken,
            params.opponentId
        )

        navigationReset('game', { isHardReset: true })
        navigationReplace(SCENE_KEYS.gameScreens.friendMatchingScreen, {
            roomCode: params.roomCode,
            opponentInformation: opponentInformation,
            isCreateRoom: false,
            examId: params.examId,
            courseId: params.courseId,
            subjectId: params.subjectId
        })
    }

    rejectFriendGame = params => {
        const client = new Colyseus.Client(GAME_ENGINE_ENDPOINT)
        client.onOpen.add(() => {
            const room = client.join('friendRoom', {
                roomCode: params.roomCode,
                // Because we are joining a game, we don't want to create a new room
                create: false,
                rejectGame: true
            })
            setTimeout(() => {
                room.leave()
                client.close()
            }, 3000)
        })
    }

    friendRequestAccepted = params => {
        const friends = this.props.friendIds
        friends.push(params.opponentId)

        this.props.saveFriendIdList(friends)
    }

    friendDeleted = params => {
        const friends = this.props.friendIds
        const index = friends.indexOf(params.opponentId)

        friends.splice(index, 1)
        this.props.saveFriendIdList(friends)
    }

    _renderItemWithParallax({ item }) {
        return <SliderEntry data={item} />
    }

    async pickerSelect(idx, value) {
        this.setState({
            defaultExam: value
        })
        await deviceStorage.saveItemToStorage('choosenExam', value)
        this.props.saveChoosenExam(value)

        this.carouselMaker(value)
    }

    carouselIndexToCourseName = () => {
        let index = this.props.examList.findIndex(
            x => x.name === this.state.defaultExam
        )

        return this.props.examList[index].courseEntities[
            this.state.carouselActiveSlide
        ].name
    }

    onPressCard(title) {
        this.setState(
            {
                isModalVisible: true,
                subject: title,
                visibleView: 'GAME_MODES',
                selectedContentTotalPoints: 0
            },
            () => {
                const contentIds = this.calculateContentIds()

                userScoreServices
                    .getUserScore(
                        this.props.clientToken,
                        this.props.clientDBId,
                        contentIds.examId,
                        contentIds.courseId,
                        contentIds.subjectId
                    )
                    .then(userScore => {
                        this.setState({
                            selectedContentTotalPoints:
                                userScore !== null ? userScore.totalPoints : 0
                        })
                    })
            }
        )
    }

    // TODO THINK ABOUT CONTENT LATER IMPORTRRANT
    carouselMaker = examName => {
        let index = this.props.examList.findIndex(x => x.name === examName)

        const courseList = []

        this.props.examList[index].courseEntities.forEach(course => {
            courseList.push({
                courseName: course.name,
                illustration: course.imageLink
            })
        })

        this.setState({
            carouselCourseData: courseList
        })
    }

    subjectCardsMaker = (examName, carouselActiveSlide) => {
        let examIndex
        let subjectList = []
        examIndex = this.props.examList.findIndex(x => x.name === examName)
        /* if (!this.props.clientInformation.isPremium)
            subjectList.push(
                <View style={styles.card}>
                    <Text style={styles.cardText}>
                        Kalan enerji sayısı: {this.props.energyAmount}
                    </Text>
                </View>
            ) */
        this.props.examList[examIndex].courseEntities[
            carouselActiveSlide
        ].subjectEntities.forEach((subject, index) => {
            subjectList.push(
                <TouchableOpacity
                    onPress={() => {
                        this.onPressCard(subject.name)
                    }}
                    key={index}
                >
                    <View style={styles.card}>
                        <Text style={styles.cardText}>{subject.name}</Text>
                    </View>
                </TouchableOpacity>
            )
        })

        return subjectList
    }

    closeModalButtonOnPress = () => {
        this.setState({
            isModalVisible: false,
            friendSelected: false,
            opponentUserPic: null,
            opponentName: '',
            opponentUsername: '',
            opponentInformation: {},
            rankedModeButtonBorderColor: SELECTED_MODE_COLOR,
            soloModeButtonBorderColor: EMPTY_MODE_COLOR,
            visibleRankedGameStartPress: false,
            selectedGameMode: 'ranked'
        })
    }

    rankedGameModeOnPress = () => {
        this.setState({
            visibleRankedGameStartPress: true,
            rankedModeButtonBorderColor: SELECTED_MODE_COLOR,
            soloModeButtonBorderColor: EMPTY_MODE_COLOR,
            selectedGameMode: 'ranked'
        })
    }

    soloModeOnPress = () => {
        this.setState({
            visibleRankedGameStartPress: true,
            soloModeButtonBorderColor: SELECTED_MODE_COLOR,
            rankedModeButtonBorderColor: EMPTY_MODE_COLOR,
            selectedGameMode: 'solo'
        })
    }

    groupGameModeOnPress = () => {
        apiServices
            .checkOnline()
            .then(() => {
                this.setState({
                    visibleView: 'GROUP_MODES',
                    visibleRankedGameStartPress: false,
                    rankedModeButtonBorderColor: EMPTY_MODE_COLOR,
                    soloModeButtonBorderColor: EMPTY_MODE_COLOR
                })
            })
            .catch(error => {})
    }

    gameModesView() {
        return (
            <View style={styles.modal}>
                <TouchableOpacity
                    onPress={this.closeModalButtonOnPress}
                    style={{
                        height: hp(120),
                        width: wp(100)
                    }}
                />
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
                    <View style={styles.gameModeContainer}>
                        <View style={styles.gameModeButtonContainer}>
                            <TouchableOpacity
                                onPress={this.rankedGameModeOnPress}
                                style={[
                                    styles.gameModeLogoContainer,
                                    {
                                        borderColor: this.state
                                            .rankedModeButtonBorderColor
                                    }
                                ]}
                            >
                                <Image
                                    source={RANKED_IMAGE}
                                    style={styles.gameModeImage}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.gameModeContextContainer}>
                            <Text
                                style={[
                                    styles.gameModeContextText,
                                    { fontSize: hp(1.7) }
                                ]}
                            >
                                Dereceli - Sınavia Puanı'nı artır, Türkiye
                                sıralamanı yükselt
                            </Text>
                        </View>
                    </View>
                    <View style={styles.scoreContainer}>
                        <Text style={styles.scoreTextInModal}>
                            Sınavia Puanı:
                        </Text>
                        <Text style={styles.scoreInModal}>
                            {this.state.selectedContentTotalPoints}
                        </Text>
                    </View>
                    <View style={styles.levelProgressBarContainer}>
                        <View style={styles.progressBarView}>
                            <Text style={styles.levelText}>
                                Seviye{' '}
                                {Math.floor(
                                    levelFinder(
                                        this.state.selectedContentTotalPoints
                                    ).level
                                )}
                            </Text>
                            <View
                                style={[
                                    styles.instantProgressView,
                                    {
                                        width: wp(
                                            (Math.floor(
                                                levelFinder(
                                                    this.state
                                                        .selectedContentTotalPoints
                                                ).levelProgressScore
                                            ) /
                                                Math.floor(
                                                    levelFinder(
                                                        this.state
                                                            .selectedContentTotalPoints !==
                                                            0
                                                            ? this.state
                                                                  .selectedContentTotalPoints
                                                            : 1
                                                    ).levelProgressLimit
                                                )) *
                                                65
                                        )
                                    }
                                ]}
                            />
                            <View style={styles.progressScoreView}>
                                <Text style={styles.levelInProgressText}>
                                    {Math.floor(
                                        levelFinder(
                                            this.state
                                                .selectedContentTotalPoints
                                        ).levelProgressScore
                                    )}
                                    /
                                    {Math.floor(
                                        levelFinder(
                                            this.state
                                                .selectedContentTotalPoints !==
                                                0
                                                ? this.state
                                                      .selectedContentTotalPoints
                                                : 1000
                                        ).levelProgressLimit
                                    )}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.separatorContainer}>
                        <View style={styles.separatorLine} />
                    </View>
                    <View style={styles.gameModeContainer}>
                        <View style={styles.gameModeButtonContainer}>
                            <TouchableOpacity
                                onPress={this.friendRoomOnPress}
                                style={styles.gameModeLogoContainer}
                            >
                                <Image
                                    source={FRIENDS_IMAGE}
                                    style={styles.gameModeImage}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.gameModeContextContainer}>
                            <Text style={styles.gameModeContextText}>
                                Arkadaşın ile yarış
                            </Text>
                        </View>
                    </View>
                    <View style={styles.gameModeContainer}>
                        <View style={styles.gameModeButtonContainer}>
                            <TouchableOpacity
                                onPress={this.groupGameModeOnPress}
                                style={styles.gameModeLogoContainer}
                            >
                                <Image
                                    source={GROUP_IMAGE}
                                    style={styles.gameModeImage}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.gameModeContextContainer}>
                            <Text style={styles.gameModeContextText}>
                                Arkadaş grubun ile yarış
                            </Text>
                        </View>
                    </View>
                    <View style={styles.gameModeContainer}>
                        <View style={styles.gameModeButtonContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.gameModeLogoContainer,
                                    {
                                        borderColor: this.state
                                            .soloModeButtonBorderColor
                                    }
                                ]}
                                onPress={this.soloModeOnPress}
                            >
                                <Image
                                    source={SOLO_IMAGE}
                                    style={styles.gameModeImage}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.gameModeContextContainer}>
                            <Text style={styles.gameModeContextText}>
                                Tek başına soru çöz
                            </Text>
                        </View>
                    </View>
                </View>
                <AuthButton
                    marginTop={hp(83.5)}
                    height={hp(7)}
                    width={wp(87.5)}
                    color="#00D9EF"
                    buttonText="Başlat"
                    fontSize={hp(3)}
                    borderRadius={hp(1.5)}
                    position={'absolute'}
                    onPress={this.playButtonOnPress}
                />
            </View>
        )
    }

    createGroupRoomOnPress = () => {
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
        this.setState({
            visibleView: 'CREATE_ROOM',
            isGroupGameInitiated: true
        })
    }

    friendRoomOnPress = async () => {
        if (Object.keys(this.props.friendIds).length === 0) return
        this.setState({
            rankedModeButtonBorderColor: EMPTY_MODE_COLOR,
            soloModeButtonBorderColor: EMPTY_MODE_COLOR
        })
        const friends = await userServices.getUsers(
            this.props.clientToken,
            this.props.friendIds
        )
        this.setState({
            visibleView: 'FRIEND_ROOM',
            friendList: friends,
            originalFriends: friends
        })
    }

    friendRoomAndGameModesBackButtonOnPress = () => {
        this.setState({
            visibleView: 'GAME_MODES',
            friendSelected: false,
            opponentUserPic: null,
            opponentName: '',
            opponentUsername: '',
            opponentInformation: {},
            rankedModeButtonBorderColor: SELECTED_MODE_COLOR,
            selectedGameMode: 'ranked'
        })
    }

    groupModesView() {
        return (
            <View style={styles.modal}>
                <TouchableOpacity
                    onPress={this.closeModalButtonOnPress}
                    style={{
                        height: hp(120),
                        width: wp(100)
                    }}
                />
                <View style={styles.backAndCloseButtonsContainer}>
                    <TouchableOpacity
                        onPress={this.friendRoomAndGameModesBackButtonOnPress}
                    >
                        <Image source={BACK_BUTTON} style={styles.backLogo} />
                    </TouchableOpacity>
                </View>
                <View style={styles.modalView}>
                    <View style={styles.createOrJoinRoomButtonsContainer}>
                        <AuthButton
                            height={hp(12)}
                            width={wp(60)}
                            color="#00D9EF"
                            buttonText="Oyun kur"
                            fontSize={hp(3)}
                            borderRadius={hp(1.5)}
                            onPress={this.createGroupRoomOnPress}
                        />
                        <AuthButton
                            height={hp(12)}
                            width={wp(60)}
                            color="#00D9EF"
                            buttonText="Oyuna katıl"
                            fontSize={hp(3)}
                            borderRadius={hp(1.5)}
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
        if (text === '') {
            this.setState({ friendList: this.state.originalFriends })
            return
        }
        const newData = this.state.friendList.filter(item => {
            const itemData = `${item.name.toUpperCase() +
                ' ' +
                item.lastname.toUpperCase()} ${item.username.toUpperCase()}`
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            friendList: newData
        })
    }
    userOnPress(user) {
        this.setState({
            opponentUserPic: user.profilePicture,
            opponentName: user.name + ' ' + user.lastname,
            opponentUsername: user.username,
            opponentInformation: user,
            friendSelected: true
        })
    }

    randomCodeGenerator() {
        var result = ''
        var characters = 'ABCDEF0123456789'
        var charactersLength = characters.length
        for (var i = 0; i < 6; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            )
        }
        return result
    }

    friendGameModeOnPress = () => {
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
        apiServices
            .checkOnline()
            .then(() => {
                if (!this.state.friendSelected) return
                const randomNumber = this.randomCodeGenerator()
                const Ids = this.calculateContentIds()
                navigationReset('game', { isHardReset: true })
                navigationReplace(SCENE_KEYS.gameScreens.friendMatchingScreen, {
                    roomCode: randomNumber,
                    opponentInformation: this.state.opponentInformation,
                    isCreateRoom: true,
                    examId: Ids.examId,
                    courseId: Ids.courseId,
                    subjectId: Ids.subjectId,
                    invitedFriendId: this.state.opponentInformation.id
                })
                friendGameServices
                    .sendFriendGameRequest(
                        this.props.clientToken,
                        this.props.clientInformation,
                        randomNumber,
                        this.state.opponentInformation.fcmToken,
                        {
                            examId: Ids.examId,
                            courseId: Ids.courseId,
                            subjectId: Ids.subjectId
                        }
                    )
                    .then(data => console.log(data))
            })
            .catch(error => {})
    }

    friendRoomView() {
        return (
            <View style={styles.modal}>
                <TouchableOpacity
                    onPress={this.closeModalButtonOnPress}
                    style={{ height: hp(120), width: wp(100) }}
                />
                <View style={styles.backAndCloseButtonsContainer}>
                    <TouchableOpacity
                        onPress={this.friendRoomAndGameModesBackButtonOnPress}
                    >
                        <Image source={BACK_BUTTON} style={styles.backLogo} />
                    </TouchableOpacity>
                </View>
                <View style={styles.modalView}>
                    <View style={styles.usersContainer}>
                        <View style={styles.userContainer}>
                            <View style={styles.userPicContainer}>
                                <Image
                                    source={{
                                        uri: this.props.clientInformation
                                            .profilePicture
                                    }}
                                    style={styles.userPic}
                                />
                            </View>
                            <View style={styles.nameAndUsernameContainer}>
                                <Text style={styles.nameAndSurnameText}>
                                    {this.props.clientInformation.name +
                                        '  ' +
                                        this.props.clientInformation.lastname}
                                </Text>
                                <Text style={styles.userNameText}>
                                    @{this.props.clientInformation.username}
                                </Text>
                            </View>
                        </View>
                        <Image source={SWORD} style={styles.sword} />
                        <View style={styles.userContainer}>
                            <View style={styles.userPicContainer}>
                                <Image
                                    source={{ uri: this.state.opponentUserPic }}
                                    style={styles.userPic}
                                />
                            </View>
                            <View style={styles.nameAndUsernameContainer}>
                                <Text style={styles.nameAndSurnameText}>
                                    {this.state.opponentName}
                                </Text>
                                <Text style={styles.userNameText}>
                                    {this.state.opponentUsername === ''
                                        ? ''
                                        : '@' + this.state.opponentUsername}
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
                            data={this.state.friendList}
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
                                                    source={{
                                                        uri: item.profilePicture
                                                    }}
                                                    style={styles.userPicInRow}
                                                />
                                            </View>
                                            <View style={styles.nameContainer}>
                                                <Text style={styles.nameText}>
                                                    {item.name +
                                                        ' ' +
                                                        item.lastname}
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
                    marginTop={hp(83.5)}
                    height={hp(7)}
                    width={wp(87.5)}
                    color="#00D9EF"
                    buttonText="Başla"
                    fontSize={hp(3)}
                    borderRadius={hp(1.5)}
                    position={'absolute'}
                    onPress={this.friendGameModeOnPress}
                />
            </View>
        )
    }

    joinGroupRoomOnPress = () => {
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
        this.room = this.client.join('groupRoom', {
            databaseId: this.props.clientDBId,
            roomCode: this.state.groupCodeOnChangeText.toString(),
            // Because we are joining a game, we don't want to create a new room
            create: false
        })

        this.room.onJoin.add(() => {
            this.room.removeAllListeners()
            this.setState({
                visibleView: 'JOINED_ROOM',
                isGroupGameInitiated: true
            })
        })
    }

    joinGameParams = () => {
        return {
            client: this.client,
            room: this.room,
            roomCode: this.state.groupCodeOnChangeText
        }
    }

    joinRoomBackButtonOnPress = () => {
        this.setState({ visibleView: 'GROUP_MODES' })
    }

    joinRoomView() {
        return (
            <View style={styles.modal}>
                <TouchableOpacity
                    onPress={this.closeModalButtonOnPress}
                    style={{ height: hp(120), width: wp(100) }}
                />
                <View style={styles.backAndCloseButtonsContainer}>
                    <TouchableOpacity onPress={this.joinRoomBackButtonOnPress}>
                        <Image source={BACK_BUTTON} style={styles.backLogo} />
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
                    position={'absolute'}
                    marginTop={hp(83.5)}
                    height={hp(7)}
                    width={wp(87.5)}
                    color="#00D9EF"
                    buttonText="Onayla"
                    fontSize={hp(3)}
                    borderRadius={hp(1.5)}
                    onPress={this.joinGroupRoomOnPress}
                />
            </View>
        )
    }

    friendGameRequestModal() {
        return (
            <View
                style={{
                    height: hp(120),
                    width: wp(100),
                    backgroundColor: '#000000DE'
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.gameRequestView}>
                        <Text style={styles.gameRequestText}>
                            <Text
                                style={[
                                    {
                                        color: '#FF9900',
                                        fontFamily: 'Averta-SemiboldItalic'
                                    }
                                ]}
                            >
                                {this.state.requestingUserUsername}
                            </Text>{' '}
                            kişisi sana
                        </Text>
                        <Text
                            style={[
                                styles.gameRequestText,
                                { color: '#00D9EF', fontFamily: 'Averta-Bold' }
                            ]}
                        >
                            {
                                this.props.gameContentMap.exams[
                                    this.state.requestedGameExamId - 1
                                ].name
                            }{' '}
                            -{' '}
                            {
                                this.props.gameContentMap.courses[
                                    this.state.requestedGameCourseId - 1
                                ].name
                            }
                        </Text>
                        <Text
                            style={[
                                styles.gameRequestText,
                                { color: '#00D9EF', fontFamily: 'Averta-Bold' }
                            ]}
                        >
                            {
                                this.props.gameContentMap.subjects[
                                    this.state.requestedGameSubjectId - 1
                                ].name
                            }
                        </Text>
                        <Text style={styles.gameRequestText}>
                            konusunda oyun isteği gönderdi
                        </Text>
                    </View>
                    <View style={styles.yesOrNoButtonsContainer}>
                        <AuthButton
                            height={hp(7)}
                            width={wp(42)}
                            color="#B72A2A"
                            buttonText="Reddet"
                            fontSize={hp(3)}
                            borderRadius={hp(1.5)}
                            onPress={() => {
                                apiServices
                                    .checkOnline()
                                    .then(() => {
                                        friendGameServices
                                            .checkOngoingMatch(
                                                this.props.clientToken,
                                                this.state
                                                    .requestedGameOpponentId,
                                                this.state.requestedGameRoomCode
                                            )
                                            .then(data => {
                                                this.setState(
                                                    {
                                                        isFriendGameRequestModalVisible: false
                                                    },
                                                    () => {
                                                        if (!data)
                                                            this.rejectFriendGame(
                                                                {
                                                                    roomCode: this
                                                                        .state
                                                                        .requestedGameRoomCode
                                                                }
                                                            )
                                                        else {
                                                            // TODO MAKE A MODAL HERE
                                                            Alert.alert(
                                                                'Arkadaşın önden başladı!'
                                                            )
                                                            navigationPush(
                                                                SCENE_KEYS
                                                                    .mainScreens
                                                                    .notifications
                                                            )
                                                        }
                                                    }
                                                )
                                            })
                                    })
                                    .catch(error =>
                                        this.setState({
                                            isFriendGameRequestModalVisible: false
                                        })
                                    )
                            }}
                        />
                        <AuthButton
                            height={hp(7)}
                            width={wp(42)}
                            color="#FF9900"
                            buttonText="Daha Sonra"
                            fontSize={hp(3)}
                            borderRadius={hp(1.5)}
                            onPress={() =>
                                this.setState({
                                    isFriendGameRequestModalVisible: false
                                })
                            }
                        />
                    </View>
                    <AuthButton
                        height={hp(7)}
                        width={wp(87.5)}
                        color="#3EBB29"
                        buttonText="Şimdi Oyna"
                        fontSize={hp(3)}
                        borderRadius={hp(1.5)}
                        onPress={() => {
                            apiServices
                                .checkOnline()
                                .then(() => {
                                    friendGameServices
                                        .checkOngoingMatch(
                                            this.props.clientToken,
                                            this.state.requestedGameOpponentId,
                                            this.state.requestedGameRoomCode
                                        )
                                        .then(data => {
                                            this.setState(
                                                {
                                                    isFriendGameRequestModalVisible: false
                                                },
                                                () => {
                                                    // If the data is false we can play synchronized game
                                                    // If it is true other user either pressed play ahead or still waiting
                                                    if (!data)
                                                        this.tryJoiningFriendRoom(
                                                            {
                                                                opponentId: this
                                                                    .state
                                                                    .requestedGameOpponentId,
                                                                roomCode: this
                                                                    .state
                                                                    .requestedGameRoomCode,
                                                                examId: this
                                                                    .state
                                                                    .requestedGameExamId,
                                                                courseId: this
                                                                    .state
                                                                    .requestedGameCourseId,
                                                                subjectId: this
                                                                    .state
                                                                    .requestedGameSubjectId
                                                            }
                                                        )
                                                    else {
                                                        Alert.alert(
                                                            'Arkadaşın önden başladı!'
                                                        )
                                                        navigationPush(
                                                            SCENE_KEYS
                                                                .mainScreens
                                                                .notifications
                                                        )
                                                    }
                                                }
                                            )
                                        })
                                })
                                .catch(error =>
                                    this.setState({
                                        isFriendGameRequestModalVisible: false
                                    })
                                )
                        }}
                    />
                </View>
            </View>
        )
    }

    premiumForSoloView() {
        return (
            <View style={premiumStyles.premiumModal}>
                <TouchableOpacity
                    onPress={this.closeModalButtonOnPress}
                    style={{ height: hp(120), width: wp(100) }}
                />
                <View
                    style={[premiumStyles.premiumModalView, { height: hp(33) }]}
                >
                    <LinearGradient
                        colors={['white', '#FFE6BB', '#FFA800']}
                        style={[
                            premiumStyles.linearGradientPremiumModalView,
                            { height: hp(33) }
                        ]}
                    >
                        <View style={premiumStyles.premiumModalHeaderView}>
                            <Text style={premiumStyles.premiumModalHeaderText}>
                                ELİT ÖĞRENCİ PAKETİ
                            </Text>
                        </View>
                        <View style={premiumStyles.premiumModalSwiperContainer}>
                            <View style={premiumStyles.premiumModalSwiperView}>
                                <View
                                    style={
                                        premiumStyles.premiumModalSwiperImgView
                                    }
                                >
                                    <Image
                                        source={SOLO_PREMIUM}
                                        style={premiumStyles.premiumModalImg}
                                    />
                                </View>
                                <View
                                    style={[
                                        premiumStyles.premiumModalSwiperHeaderView,
                                        { height: hp(5.5) }
                                    ]}
                                >
                                    <Text
                                        style={
                                            premiumStyles.premiumModalHeaderText
                                        }
                                    >
                                        Tek Başına Soru Çözme!
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        premiumStyles.premiumModalSwiperInfoView,
                                        {
                                            justifyContent: 'flex-start',
                                            height: hp(9.5)
                                        }
                                    ]}
                                >
                                    <Text
                                        style={[
                                            premiumStyles.premiumModalInfoText,
                                            { marginTop: hp(1.5) }
                                        ]}
                                    >
                                        Tek Kişilik Soru Çözme Modu şimdi Elit
                                        Öğrenci Paketi'nde
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </View>
        )
    }

    playButtonOnPress = () => {
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

        switch (this.state.selectedGameMode) {
            case 'ranked':
                apiServices
                    .checkOnline()
                    .then(() => {
                        navigationReset('game', this.calculateContentIds())
                    })
                    .catch(error => {})
                break
            case 'solo':
                if (this.props.clientInformation.isPremium) {
                    apiServices
                        .checkOnline()
                        .then(() => {
                            navigationReset('game', { isHardReset: true })
                            navigationReplace(
                                SCENE_KEYS.gameScreens.soloModeLoadingScreen,
                                this.calculateContentIds()
                            )
                        })
                        .catch(error => {})
                    break
                } else {
                    this.setState({
                        visibleRankedGameStartPress: false,
                        soloModeButtonBorderColor: EMPTY_MODE_COLOR,
                        rankedModeButtonBorderColor: SELECTED_MODE_COLOR,
                        selectedGameMode: 'ranked',
                        isModalVisible: true,
                        visibleView: 'PREMIUM_MODAL_FOR_SOLO'
                    })
                }
                break
        }
    }

    // Gets the exam/content/subject ids based on selected subject
    calculateContentIds = () => {
        let examIndex
        let subjectIndex

        examIndex = this.props.examList.findIndex(
            x => x.name === this.state.defaultExam
        )
        subjectIndex = this.props.examList[examIndex].courseEntities[
            this.state.carouselActiveSlide
        ].subjectEntities.findIndex(x => x.name === this.state.subject)

        return {
            examId: this.props.examList[examIndex].id,
            courseId: this.props.examList[examIndex].courseEntities[
                this.state.carouselActiveSlide
            ].id,
            subjectId: this.props.examList[examIndex].courseEntities[
                this.state.carouselActiveSlide
            ].subjectEntities[subjectIndex].id
        }
    }

    profilePicOnPress = () => {
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

        navigationPush(SCENE_KEYS.mainScreens.profile)
    }

    notificationPicOnPress = () => {
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
        this.setState({ isNotificationReceived: false })
        navigationPush(SCENE_KEYS.mainScreens.notifications)
    }

    render() {
        const subjectCards = this.subjectCardsMaker(
            this.state.defaultExam,
            this.state.carouselActiveSlide
        )
        return (
            <View style={styles.container}>
                <Modal
                    visible={this.state.isModalVisible}
                    transparent={true}
                    animationType={'fade'}
                >
                    {this.state.visibleView === 'GAME_MODES' &&
                        this.gameModesView()}
                    {this.state.visibleView === 'FRIEND_ROOM' &&
                        this.friendRoomView()}
                    {this.state.visibleView === 'GROUP_MODES' &&
                        this.groupModesView()}
                    {this.state.visibleView === 'JOIN_ROOM' &&
                        this.joinRoomView()}
                    {this.state.visibleView === 'CREATE_ROOM' && (
                        <CreateGroupRoomView
                            calculateContentIds={this.calculateContentIds()}
                        />
                    )}
                    {this.state.visibleView === 'JOINED_ROOM' && (
                        <JoinGroupRoomView
                            joinGameParams={this.joinGameParams()}
                        />
                    )}
                    {this.state.visibleView === 'PREMIUM_MODAL_FOR_SOLO' &&
                        this.premiumForSoloView()}
                </Modal>
                <Modal
                    visible={this.state.isFriendGameRequestModalVisible}
                    transparent={true}
                    animationType={'fade'}
                >
                    {this.friendGameRequestModal()}
                </Modal>
                <View style={styles.header}>
                    <View style={styles.profilePicContainer}>
                        <TouchableOpacity onPress={this.profilePicOnPress}>
                            <Image
                                source={{
                                    uri: this.props.clientInformation
                                        .profilePicture
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
                            options={this.state.examList}
                            defaultValue={this.state.defaultExam}
                            onSelect={(idx, value) =>
                                this.pickerSelect(idx, value)
                            }
                        />
                    </View>
                    <View style={styles.notificationLogoContainer}>
                        <TouchableOpacity onPress={this.notificationPicOnPress}>
                            <Image
                                source={
                                    this.state.isNotificationReceived === true
                                        ? ON_NOTIFICATION_LOGO
                                        : NOTIFICATION_LOGO
                                }
                                style={styles.notificationLogo}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.carouselContainer}>
                    <Carousel
                        zIndex={1}
                        ref={c => (this._slider1Ref = c)}
                        data={this.state.carouselCourseData}
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
                <View style={styles.scrollViewContainer}>
                    <ScrollView
                        style={styles.cardsScrollView}
                        showsVerticalScrollIndicator={false}
                    >
                        {subjectCards}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    choosenExam: state.gameContent.choosenExam,
    clientInformation: state.client.clientInformation,
    clientDBId: state.client.clientDBId,
    clientToken: state.client.clientToken,
    friendIds: state.friends.friendIds,
    examList: state.gameContent.examList,
    isNetworkConnected: state.app.isNetworkConnected,
    notificationOpen: state.app.notificationOpen,
    gameContentMap: state.gameContent.gameContentMap
})

const mapDispatchToProps = dispatch => ({
    saveChoosenExam: choosenExam =>
        dispatch(gameContentActions.saveChoosenExam(choosenExam)),
    saveFriendIdList: friendList =>
        dispatch(friendActions.saveFriendIds(friendList)),
    //removeOneEnergy: () => dispatch(appActions.removeOneEnergy()),
    saveNotificationOpen: notificationOpen =>
        dispatch(appActions.saveNotificationOpen(notificationOpen))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
