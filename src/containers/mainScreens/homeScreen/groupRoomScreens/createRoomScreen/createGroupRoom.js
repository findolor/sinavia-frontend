import React from 'react'
import {
    View,
    TouchableOpacity,
    Image,
    Text,
    FlatList,
    Modal,
    Clipboard
} from 'react-native'
import DropDown from '../../../../../components/mainScreen/dropdown/dropdown'
import AuthButton from '../../../../../components/authScreen/authButton'
import styles from './style'
import {
    navigationReplace,
    navigationReset,
    SCENE_KEYS
} from '../../../../../services/navigationService'
import { connect } from 'react-redux'
// Colyseus game engine imports
import { Buffer } from 'buffer'
import { AsyncStorage } from 'react-native'
window.localStorage = AsyncStorage
global.Buffer = Buffer
import * as Colyseus from 'colyseus.js'
// Styling imports
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
// Image imports
const COPY_IMAGE = require('../../../../../assets/mainScreens/copy.png')
const LEADER_LOGO = require('../../../../../assets/mainScreens/groupLeaderSword.png')
const PEOPLE_COUNTER_IMG = require('../../../../../assets/mainScreens/peopleCounterImg.png')

// Game engine endpoint url
import { GAME_ENGINE_ENDPOINT } from '../../../../../config'
import { BannerAd } from '../../../../../services/admobService'

class CreateGroupRoom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // Room code
            groupCode: '',
            // Group player list
            groupRoomPlayerList: [],
            // Quit modal visible variable
            isQuitGameModalVisible: false,
            // Variable for checking leader status
            isClientLeader: false,
            // Match content ids
            matchCourseId: null,
            matchSubjectId: null,
            // choosen question amount
            choosenQuestionAmount: 5
        }
    }

    componentDidMount() {
        this.setState(
            {
                groupCode: this.randomCodeGenerator(6)
            },
            () => {
                this.client = new Colyseus.Client(GAME_ENGINE_ENDPOINT)
                this.joinRoom()
            }
        )
    }

    startGroupGameOnPress = () => {
        const playerListLenght = Object.keys(this.state.groupRoomPlayerList)
            .length

        let readyCount = 0

        this.state.groupRoomPlayerList.forEach(player => {
            if (player.status === 'Hazır') readyCount++
        })

        if (readyCount !== playerListLenght || playerListLenght === 1) return

        this.room.send({
            action: 'start-match'
        })
    }

    joinRoom = () => {
        this.client
            .create('groupRoom', {
                // These will be props coming from home screen
                examId: this.props.calculateContentIds.examId,
                courseId: this.props.calculateContentIds.courseId,
                subjectId: this.props.calculateContentIds.subjectId,
                databaseId: this.props.clientDBId,
                roomCode: this.state.groupCode
            })
            .then(room => {
                this.room = room

                this.room.onMessage(message => {
                    switch (message.action) {
                        case 'player-props':
                            const playerIds = Object.keys(message.playerProps)

                            playerList = []

                            playerIds.forEach(element => {
                                if (message.playerProps[element].readyStatus) {
                                    playerList.push({
                                        username:
                                            message.playerProps[element]
                                                .username,
                                        id: element,
                                        profilePicture:
                                            message.playerProps[element]
                                                .profilePicture,
                                        status: 'Hazır',
                                        isLeader:
                                            message.playerProps[element]
                                                .isLeader
                                    })
                                } else {
                                    playerList.push({
                                        username:
                                            message.playerProps[element]
                                                .username,
                                        id: element,
                                        profilePicture:
                                            message.playerProps[element]
                                                .profilePicture,
                                        status: 'Bekleniyor',
                                        isLeader:
                                            message.playerProps[element]
                                                .isLeader
                                    })
                                }
                                message.playerProps[element].isLeader === true
                                    ? this.setState({ isClientLeader: true })
                                    : this.setState({ isClientLeader: false })
                            })

                            this.setState({ groupRoomPlayerList: playerList })
                            break
                        case 'start-match':
                            this.room.removeAllListeners()

                            navigationReset('game', { isHardReset: true })
                            navigationReplace(
                                SCENE_KEYS.gameScreens.groupLoading,
                                {
                                    room: this.room,
                                    client: this.client,
                                    groupRoomPlayerList: this.state
                                        .groupRoomPlayerList,
                                    courseName: this.props.gameContentMap
                                        .courses[this.state.matchCourseId - 1]
                                        .name,
                                    subjectName: this.props.gameContentMap
                                        .subjects[this.state.matchSubjectId - 1]
                                        .name,
                                    choosenQuestionAmount: this.state
                                        .choosenQuestionAmount
                                }
                            )
                            break
                        case 'content-ids':
                            this.setState({
                                matchCourseId: message.courseId,
                                matchSubjectId: message.subjectId
                            })
                            break
                    }
                })

                this.room.onLeave(code => {
                    console.log(code)
                    this.shutdownRoutine()
                })

                this.room.onError(error => {
                    console.log(error)
                    this.shutdownRoutine()
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    randomCodeGenerator(lenght) {
        var result = ''
        var characters = 'ABCDEFGHIJKLMNOPQRSTVUXWYZ0123456789'
        var charactersLength = characters.length
        for (var i = 0; i < lenght; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            )
        }
        return result
    }

    writeToClipboard = async () => {
        await Clipboard.setString(this.state.groupCode)
    }

    // Selected question amount is sent to the server
    questionAmountPicker(questionNumber) {
        this.room.send({
            action: 'set-question-number',
            questionAmount: questionNumber
        })
        this.setState({ choosenQuestionAmount: questionNumber })
    }

    closeGroupGameOnPress = () => {
        this.setState({ isQuitGameModalVisible: true })
    }

    quitGameNo = () => {
        this.setState({ isQuitGameModalVisible: false })
    }

    quitGameYes = () => {
        this.shutdownRoutine()
    }

    shutdownRoutine = () => {
        this.room.leave()
        navigationReset('main')
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.isQuitGameModalVisible === false && (
                    <View style={styles.modal}>
                        {!this.props.clientInformation.isPremium && (
                            <BannerAd />
                        )}
                        <TouchableOpacity
                            onPress={this.closeGroupGameOnPress}
                            style={{ height: hp(120), width: wp(100) }}
                        ></TouchableOpacity>
                        <View style={styles.modalView}>
                            <View style={styles.gameCodeContainer}>
                                <View style={styles.gameCodeBox}>
                                    <View style={styles.gameCodeBoxLeftView} />
                                    <View style={styles.gameCodeBoxTextView}>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.gameCodeText}
                                            selectable={true}
                                        >
                                            {this.state.groupCode}
                                        </Text>
                                    </View>
                                    <View style={styles.gameCodeBoxRightView}>
                                        <TouchableOpacity
                                            onPress={this.writeToClipboard}
                                        >
                                            <Image
                                                source={COPY_IMAGE}
                                                style={styles.copyImage}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.gameCodeInfoTextContainer}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.gameCodeInfoText}
                                >
                                    Grup olarak oynamak için{' '}
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.gameCodeInfoText}
                                >
                                    yukarıdaki kodu arkadaşlarınla paylaş
                                </Text>
                            </View>
                            <View style={styles.questionsNumberContainer}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.questionsNumberText}
                                >
                                    Soru Sayısı
                                </Text>
                                <TouchableOpacity
                                    style={[
                                        styles.questionNumberCircle,
                                        {
                                            marginLeft: wp(1),
                                            backgroundColor:
                                                this.state
                                                    .choosenQuestionAmount === 5
                                                    ? '#FF9900'
                                                    : '#fff'
                                        }
                                    ]}
                                    onPress={() => {
                                        this.questionAmountPicker(5)
                                    }}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            styles.questionNumberText,
                                            {
                                                color:
                                                    this.state
                                                        .choosenQuestionAmount ===
                                                    5
                                                        ? 'white'
                                                        : '#FF9900',
                                                fontFamily:
                                                    this.state
                                                        .choosenQuestionAmount ===
                                                    5
                                                        ? 'Averta-Bold'
                                                        : 'Averta-Regular'
                                            }
                                        ]}
                                    >
                                        5
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.questionNumberCircle,
                                        {
                                            backgroundColor:
                                                this.state
                                                    .choosenQuestionAmount ===
                                                10
                                                    ? '#FF9900'
                                                    : '#fff'
                                        }
                                    ]}
                                    onPress={() => {
                                        this.questionAmountPicker(10)
                                    }}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            styles.questionNumberText,
                                            {
                                                color:
                                                    this.state
                                                        .choosenQuestionAmount ===
                                                    10
                                                        ? 'white'
                                                        : '#FF9900',
                                                fontFamily:
                                                    this.state
                                                        .choosenQuestionAmount ===
                                                    10
                                                        ? 'Averta-Bold'
                                                        : 'Averta-Regular'
                                            }
                                        ]}
                                    >
                                        10
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.usersListContainer}>
                                <FlatList
                                    data={this.state.groupRoomPlayerList}
                                    vertical={true}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => {
                                        return (
                                            <View style={styles.userRow}>
                                                <View
                                                    style={
                                                        styles.profilePicContainerinRow
                                                    }
                                                >
                                                    <Image
                                                        source={{
                                                            uri:
                                                                item.profilePicture
                                                        }}
                                                        style={styles.userPic}
                                                    />
                                                </View>
                                                <View
                                                    style={styles.nameContainer}
                                                >
                                                    <Text
                                                        allowFontScaling={false}
                                                        style={styles.nameText}
                                                    >
                                                        {item.username}
                                                    </Text>
                                                    <View
                                                        style={[
                                                            styles.playerStatusView,
                                                            {
                                                                backgroundColor:
                                                                    item.status ===
                                                                    'Hazır'
                                                                        ? '#00E312'
                                                                        : '#FF9900'
                                                            }
                                                        ]}
                                                    >
                                                        <Text
                                                            allowFontScaling={
                                                                false
                                                            }
                                                            style={
                                                                styles.playerStatusText
                                                            }
                                                        >
                                                            {'   '}
                                                            {item.status}
                                                            {'   '}
                                                        </Text>
                                                    </View>
                                                </View>
                                                {item.isLeader && (
                                                    <View
                                                        style={
                                                            styles.leaderContainer
                                                        }
                                                    >
                                                        <Image
                                                            source={LEADER_LOGO}
                                                            style={
                                                                styles.leaderLogo
                                                            }
                                                        />
                                                    </View>
                                                )}
                                            </View>
                                        )
                                    }}
                                    keyExtractor={(item, index) =>
                                        index.toString()
                                    }
                                />
                            </View>
                            <View style={styles.usersCounterContainer}>
                                <Image
                                    source={PEOPLE_COUNTER_IMG}
                                    style={styles.peopleCounterImg}
                                />
                                <Text
                                    allowFontScaling={false}
                                    style={styles.usersCounterText}
                                >
                                    {
                                        Object.keys(
                                            this.state.groupRoomPlayerList
                                        ).length
                                    }
                                    /30
                                </Text>
                            </View>
                        </View>
                        <AuthButton
                            marginTop={hp(83.5)}
                            marginLeft={wp(6.25)}
                            height={hp(7)}
                            width={wp(87.5)}
                            color={
                                Object.keys(this.state.groupRoomPlayerList)
                                    .length <
                                    3 ===
                                true
                                    ? '#c7c9c9'
                                    : '#00D9EF'
                            }
                            buttonText="Başlat"
                            fontSize={hp(3)}
                            borderRadius={hp(1.5)}
                            position={'absolute'}
                            onPress={this.startGroupGameOnPress}
                            disabled={
                                Object.keys(this.state.groupRoomPlayerList)
                                    .length < 3
                            }
                        />
                    </View>
                )}
                {this.state.isQuitGameModalVisible === true && (
                    <View style={styles.modal}>
                        <View
                            style={{ height: hp(120), width: wp(100) }}
                        ></View>
                        <View style={styles.modalContainer}>
                            <View style={styles.quitView}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.areYouSureText}
                                >
                                    Odadan çıkış yapmak istediğine
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.areYouSureText}
                                >
                                    emin misin?
                                </Text>
                            </View>
                            <View style={styles.yesOrNoButtonsContainer}>
                                <AuthButton
                                    height={hp(7)}
                                    width={wp(42)}
                                    color="#00D9EF"
                                    buttonText="Evet"
                                    fontSize={hp(3)}
                                    borderRadius={hp(1.5)}
                                    onPress={this.quitGameYes}
                                />
                                <AuthButton
                                    height={hp(7)}
                                    width={wp(42)}
                                    color="#00D9EF"
                                    buttonText="Hayır"
                                    fontSize={hp(3)}
                                    borderRadius={hp(1.5)}
                                    onPress={this.quitGameNo}
                                />
                            </View>
                        </View>
                    </View>
                )}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    clientDBId: state.client.clientDBId,
    clientToken: state.client.clientToken,
    clientInformation: state.client.clientInformation,
    gameContentMap: state.gameContent.gameContentMap
})

const mapDispatchToProps = dispatch => ({
    //removeOneEnergy: () => dispatch(appActions.removeOneEnergy())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupRoom)
