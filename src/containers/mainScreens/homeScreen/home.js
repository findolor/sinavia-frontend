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
import { clientActions } from '../../../redux/client/actions'
import { friendActions } from '../../../redux/friends/actions'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { deviceStorage } from '../../../services/deviceStorage'
import Carousel from 'react-native-snap-carousel'
import {
    sliderWidth,
    itemWidth
} from '../../../components/mainScreen/carousel/styles/SliderEntry.style'
import SliderEntry from '../../../components/mainScreen/carousel/components/SliderEntry'
import carouselStyle from '../../../components/mainScreen/carousel/styles/index.style'
import styles from './style'
import { LGS, YKS } from '../../../components/mainScreen/carousel/static/exams'
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
import NotchView from '../../../components/notchView'

import SWORD from '../../../assets/sword.png'
const carouselFirstItem = 0
const exams = [
    'YKS',
    'LGS',
    'KPSS',
    'ALES',
    'DGS',
    'Dil Sınavları',
    'TUS',
    'DUS',
    'EUS',
    'Ehliyet Sınavları'
]
const CLOSE_BUTTON = require('../../../assets/closeButton.png')
const examList = {
    YKS: YKS,
    LGS: LGS
}

const SELECTED_MODE_COLOR = '#00D9EF'
const EMPTY_MODE_COLOR = '#A8A8A8'

const RANKED_SELECTED_IMAGE = require('../../../assets/mainScreens/tek_beyaz.png')
const RANKED_EMPTY_IMAGE = require('../../../assets/mainScreens/tek.png')
const FRIENDS_SELECTED_IMAGE = require('../../../assets/mainScreens/arkadas.png')
const FRIENDS_EMPTY_IMAGE = require('../../../assets/mainScreens/arkadas_siyah.png')
const GROUP_SELECTED_IMAGE = require('../../../assets/mainScreens/group.png')
const GROUP_EMPTY_IMAGE = require('../../../assets/mainScreens/group_siyah.png')

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
            opponentUsername: '',
            opponentInformation: {},
            friendList: [],
            friendListNewData: [],
            originalFriends: []
        }
    }

    async componentDidMount() {
        await fcmService.checkPermissions()
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
                this.customAlert(
                    true,
                    'Arkadaşlık İsteği!',
                    message.data.body,
                    this.friendRequestAccepted,
                    {
                        opponentId: message.data.userId
                    }
                )
                break
            case 'friendGameRequest':
                this.customAlert(
                    false,
                    'Oyun İsteği!',
                    message.data.body,
                    this.playFriendGame,
                    {
                        opponentId: message.data.userId,
                        roomCode: message.data.roomCode
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
            isCreateRoom: false
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

    _renderItemWithParallax({ item, index }, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                parallax={true}
                parallaxProps={parallaxProps}
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
                    choosenSubject = courses.LGS.turkce
                    break
                case 1:
                    choosenSubject = courses.LGS.matematik
                    break
                case 2:
                    choosenSubject = courses.LGS.tarih
                    break
                case 3:
                    choosenSubject = courses.LGS.fen
                    break
                case 4:
                    choosenSubject = courses.LGS.ingilizce
                    break
                case 5:
                    choosenSubject = courses.LGS.din
                    break
            }
        } else if (sinav === 'YKS') {
            switch (index) {
                case 0:
                    choosenSubject = courses.yksTurkce
                    break
                case 1:
                    choosenSubject = courses.yksCog
                    break
                case 2:
                    choosenSubject = courses.yksTarih
                    break
                case 3:
                    choosenSubject = courses.yksMat
                    break
                case 4:
                    choosenSubject = courses.yksFizik
                    break
                case 5:
                    choosenSubject = courses.yksKimya
                    break
                default:
                    choosenSubject = courses.yksBiyo
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

    friendRoomOnPress = async () => {
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
        if (text === '')
            this.setState({ friendList: this.state.originalFriends })
        this.setState({
            value: text
        })

        const newData = this.state.friendList.filter(item => {
            const itemData = `${item.name.toUpperCase() +
                ' ' +
                item.lastname.toUpperCase()} ${item.username.toUpperCase()}`
            const textData = text.toUpperCase()

            return itemData.indexOf(textData) > -1
        })
        this.setState({
            friendList: newData,
            friendListNewData: newData
        })
    }

    userOnPress(user) {
        this.setState({
            opponentUserPic: user.profilePicture,
            opponentName: user.name + ' ' + user.lastname,
            opponentUsername: user.username,
            opponentInformation: user
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

    friendGameModeOnPress = async () => {
        const randomNumber = this.randomCodeGenerator()

        navigationReset('game', { isHardReset: true })
        navigationPush(SCENE_KEYS.gameScreens.friendMatchingScreen, {
            roomCode: randomNumber,
            opponentInformation: this.state.opponentInformation,
            isCreateRoom: true
        })

        await friendGameServices.sendFriendGameRequest(
            this.props.clientToken,
            this.props.clientInformation,
            randomNumber,
            this.state.opponentInformation.fcmToken
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
            // These will be props coming from home screen
            examName: 'LGS',
            courseName: 'Matematik',
            subjectName: 'Sayilar',
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
                            zIndex={-1}
                            ref={c => (this._slider1Ref = c)}
                            data={examList[this.state.exam]}
                            renderItem={this._renderItemWithParallax}
                            sliderWidth={sliderWidth}
                            itemWidth={itemWidth}
                            hasParallaxImages={true}
                            firstItem={carouselFirstItem}
                            inactiveSlideScale={0.8}
                            inactiveSlideOpacity={0.65}
                            // inactiveSlideShift={20}
                            containerCustomStyle={carouselStyle.slider}
                            contentContainerCustomStyle={
                                carouselStyle.sliderContentContainer
                            }
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
    choosenExam: state.client.choosenExam,
    clientInformation: state.client.clientInformation,
    clientDBId: state.client.clientDBId,
    clientToken: state.client.clientToken,
    friendIds: state.friends.friendIds
})

const mapDispatchToProps = dispatch => ({
    saveChoosenExam: choosenExam =>
        dispatch(clientActions.saveChoosenExam(choosenExam)),
    saveFriendIdList: friendList =>
        dispatch(friendActions.saveFriendIds(friendList))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
