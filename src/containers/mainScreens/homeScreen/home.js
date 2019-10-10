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
    FlatList
} from 'react-native'
import { connect } from 'react-redux'
import { gameContentActions } from '../../../redux/gameContent/actions'
import { friendActions } from '../../../redux/friends/actions'
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

import { friendshipServices } from '../../../sagas/friendship/'
import { friendGameServices } from '../../../sagas/friendGame/'
import { userServices } from '../../../sagas/user/'
import { GAME_ENGINE_ENDPOINT } from '../../../config'

import NOTIFICATION_LOGO from '../../../assets/mainScreens/notification.png'
import BACK_BUTTON from '../../../assets/backButton.png'

import {
    navigationPush,
    navigationReset,
    SCENE_KEYS
} from '../../../services/navigationService'

import SWORD from '../../../assets/sword.png'
const carouselFirstItem = 0

const SELECTED_MODE_COLOR = '#00D9EF'
const EMPTY_MODE_COLOR = '#A8A8A8'

const CLOSE_BUTTON = require('../../../assets/closeButton.png')
const RANKED_EMPTY_IMAGE = require('../../../assets/mainScreens/tek.png')
const FRIENDS_EMPTY_IMAGE = require('../../../assets/mainScreens/arkadas_siyah.png')
const GROUP_EMPTY_IMAGE = require('../../../assets/mainScreens/group_siyah.png')

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
            friendSelected: false,
            opponentUserPic: '',
            opponentName: '',
            opponentUsername: '',
            opponentInformation: {},
            friendList: [],
            originalFriends: []
        }
    }

    async componentDidMount() {
        await fcmService.checkPermissions()
        await this.fillGameContent()
        this.messageListener = firebase.messaging().onMessage(message => {
            console.log(message, 'mes')
            this.fcmMessagePicker(message)
        })
        this.NotificationListener = firebase
            .notifications()
            .onNotification(notification => {
                console.log(notification, 'not')
            })
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

    componentWillUnmount() {
        this.messageListener()
    }

    fcmMessagePicker = message => {
        switch (message.data.type) {
            case 'friendRequest':
                this.customAlert(
                    false,
                    'Arkadaşlık isteği!',
                    message.data.body,
                    this.acceptFriendRequest,
                    {
                        opponentId: message.data.userId
                    }
                )
                break
            case 'friendApproved':
                this.friendRequestAccepted({
                    opponentId: message.data.userId
                })
                break
            case 'friendGameRequest':
                this.customAlert(
                    false,
                    'Oyun İsteği!',
                    message.data.body,
                    this.playFriendGame,
                    {
                        opponentId: message.data.userId,
                        roomCode: message.data.roomCode,
                        examId: parseInt(message.data.examId, 10),
                        courseId: parseInt(message.data.courseId, 10),
                        subjectId: parseInt(message.data.subjectId, 10)
                    }
                )
                break
            case 'friendDeleted': {
                this.friendDeleted({ opponentId: message.data.userId })
                break
            }
        }
    }

    playFriendGame = async params => {
        const opponentInformation = await userServices.getUser(
            this.props.clientToken,
            params.opponentId
        )

        navigationReset('game', { isHardReset: true })
        navigationPush(SCENE_KEYS.gameScreens.friendMatchingScreen, {
            roomCode: params.roomCode,
            opponentInformation: opponentInformation,
            isCreateRoom: false,
            examId: params.examId,
            courseId: params.courseId,
            subjectId: params.subjectId
        })
    }

    friendRequestAccepted = params => {
        const friends = this.props.friendIds
        friends.push(params.opponentId)

        this.props.saveFriendIdList(friends)
    }

    acceptFriendRequest = params => {
        const friends = this.props.friendIds
        friends.push(params.opponentId)

        this.props.saveFriendIdList(friends)

        friendshipServices.acceptFriendshipRequest(
            this.props.clientToken,
            this.props.clientDBId,
            params.opponentId,
            this.props.clientInformation.username
        )
    }

    friendDeleted = params => {
        const friends = this.props.friendIds
        const index = friends.indexOf(params.opponentId)

        friends.splice(index, 1)
        this.props.saveFriendIdList(friends)
    }

    customAlert = (
        isTwoButtoned,
        alertTitle,
        alertBody,
        onPressFunction,
        params
    ) => {
        if (isTwoButtoned) {
            Alert.alert(
                alertTitle,
                alertBody,
                [
                    {
                        text: 'Tamam',
                        onPress: () => onPressFunction(params)
                    }
                ],
                { cancelable: false }
            )
        } else {
            Alert.alert(
                alertTitle,
                alertBody,
                [
                    {
                        text: 'Reddet',
                        onPress: () => {
                            return
                        }
                    },
                    {
                        text: 'Kabul et',
                        onPress: () => onPressFunction(params)
                    }
                ],
                { cancelable: false }
            )
        }
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
        this.setState({
            isModalVisible: true,
            subject: title,
            visibleView: 'GAME_MODES'
        })
    }

    // TODO THINK ABOUT CONTETT LATER IMPORTRRANT
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
            opponentUserPic: '',
            opponentName: '',
            opponentUsername: '',
            opponentInformation: {},
            rankedModeButtonBorderColor: EMPTY_MODE_COLOR
        })
    }

    rankedGameModeOnPress = () => {
        this.setState({
            visibleRankedGameStartPress: true,
            rankedModeButtonBorderColor: SELECTED_MODE_COLOR
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
        if (!this.props.isNetworkConnected) {
            Alert.alert('Lütfen internet bağlantınızı kontrol ediniz!')
            return
        }

        this.setState({
            isModalVisible: false
        })
        navigationPush(
            SCENE_KEYS.mainScreens.createGroupRoom,
            this.calculateContentIds()
        )
    }

    friendRoomOnPress = async () => {
        this.setState({ rankedModeButtonBorderColor: EMPTY_MODE_COLOR })

        if (Object.keys(this.props.friendIds).length === 0) return
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
            opponentUserPic: '',
            opponentName: '',
            opponentUsername: '',
            opponentInformation: {}
        })
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
            Alert.alert('Lütfen internet bağlantınızı kontrol ediniz!')
            return
        }

        if (!this.state.friendSelected) return

        const randomNumber = this.randomCodeGenerator()

        const Ids = this.calculateContentIds()

        navigationReset('game', { isHardReset: true })
        navigationPush(SCENE_KEYS.gameScreens.friendMatchingScreen, {
            roomCode: randomNumber,
            opponentInformation: this.state.opponentInformation,
            isCreateRoom: true,
            examId: Ids.examId,
            courseId: Ids.courseId,
            subjectId: Ids.subjectId,
            invitedFriendId: this.state.opponentInformation.id
        })

        friendGameServices.sendFriendGameRequest(
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
                    marginTop={hp(2)}
                    height={hp(7)}
                    width={wp(87.5)}
                    color="#00D9EF"
                    buttonText="Başla"
                    onPress={this.friendGameModeOnPress}
                />
            </View>
        )
    }

    joinGroupRoomOnPress = () => {
        if (!this.props.isNetworkConnected) {
            Alert.alert('Lütfen internet bağlantınızı kontrol ediniz!')
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
        if (!this.props.isNetworkConnected) {
            Alert.alert('Lütfen internet bağlantınızı kontrol ediniz!')
            return
        }

        navigationReset('game', this.calculateContentIds())
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
            Alert.alert('Lütfen internet bağlantınızı kontrol ediniz!')
            return
        }

        navigationPush(SCENE_KEYS.mainScreens.profile)
    }

    notificationPicOnPress = () => {
        if (!this.props.isNetworkConnected) {
            Alert.alert('Lütfen internet bağlantınızı kontrol ediniz!')
            return
        }

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
    isNetworkConnected: state.app.isNetworkConnected
})

const mapDispatchToProps = dispatch => ({
    saveChoosenExam: choosenExam =>
        dispatch(gameContentActions.saveChoosenExam(choosenExam)),
    saveFriendIdList: friendList =>
        dispatch(friendActions.saveFriendIds(friendList))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
