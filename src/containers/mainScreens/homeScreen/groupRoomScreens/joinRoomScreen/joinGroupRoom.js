import React from 'react'
import { View, TouchableOpacity, Image, Text, FlatList } from 'react-native'
import AuthButton from '../../../../../components/authScreen/authButton'
import styles from './style'
import {
    navigationReplace,
    navigationReset,
    SCENE_KEYS
} from '../../../../../services/navigationService'
import { connect } from 'react-redux'
// Styling imports
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
// Image imports
const LEADER_LOGO = require('../../../../../assets/mainScreens/groupLeaderSword.png')
const COPY_IMAGE = require('../../../../../assets/mainScreens/copy.png')
const PEOPLE_COUNTER_IMG = require('../../../../../assets/mainScreens/peopleCounterImg.png')

class JoinGroupRoom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
            choosenQuestionAmount: 5,
            joinGamePlayerReady: true
        }
    }

    componentDidMount() {
        this.props.joinGameParams.room.onMessage.add(message => {
            switch (message.action) {
                case 'player-props':
                    const playerIds = Object.keys(message.playerProps)

                    playerList = []

                    playerIds.forEach(element => {
                        if (message.playerProps[element].readyStatus) {
                            playerList.push({
                                username: message.playerProps[element].username,
                                id: element,
                                profilePicture:
                                    message.playerProps[element].profilePicture,
                                status: 'Hazır',
                                isLeader: message.playerProps[element].isLeader
                            })
                        } else {
                            playerList.push({
                                username: message.playerProps[element].username,
                                id: element,
                                profilePicture:
                                    message.playerProps[element].profilePicture,
                                status: 'Bekleniyor',
                                isLeader: message.playerProps[element].isLeader
                            })
                        }
                        message.playerProps[this.props.joinGameParams.client.id]
                            .isLeader === true
                            ? this.setState({ isClientLeader: true })
                            : this.setState({ isClientLeader: false })
                    })

                    this.setState({ groupRoomPlayerList: playerList })
                    break
                case 'start-match':
                    this.props.joinGameParams.room.removeAllListeners()

                    navigationReset('game', { isHardReset: true })
                    navigationReplace(SCENE_KEYS.gameScreens.groupLoading, {
                        room: this.props.joinGameParams.room,
                        client: this.props.joinGameParams.client,
                        groupRoomPlayerList: this.state.groupRoomPlayerList,
                        courseName: this.props.gameContentMap.courses[
                            this.state.matchCourseId - 1
                        ].name,
                        subjectName: this.props.gameContentMap.subjects[
                            this.state.matchSubjectId - 1
                        ].name,
                        choosenQuestionAmount: this.state.choosenQuestionAmount
                    })
                    break
                case 'content-ids':
                    this.setState({
                        matchCourseId: message.courseId,
                        matchSubjectId: message.subjectId
                    })
                    break
                case 'set-question-number':
                    this.setState({
                        choosenQuestionAmount: message.questionAmount
                    })
                    break
            }
        })
    }

    // Selected question amount is sent to the server
    questionAmountPicker(questionNumber) {
        this.props.joinGameParams.room.send({
            action: 'set-question-number',
            questionAmount: questionNumber
        })
        this.setState({ choosenQuestionAmount: questionNumber })
    }

    groupGameReadyOnPress = () => {
        if (!this.state.isClientLeader) {
            this.props.joinGameParams.room.send({
                action: 'ready-status'
            })
            this.setState({
                joinGamePlayerReady: !this.state.joinGamePlayerReady
            })
        } else {
            this.startGroupGameOnPress()
        }
    }

    startGroupGameOnPress = () => {
        const playerListLenght = Object.keys(this.state.groupRoomPlayerList)
            .length

        let readyCount = 0

        this.state.groupRoomPlayerList.forEach(player => {
            if (player.status === 'Hazır') readyCount++
        })

        if (readyCount !== playerListLenght || playerListLenght === 1) return

        this.props.joinGameParams.room.send({
            action: 'start-match'
        })
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
        this.props.joinGameParams.room.leave()
        this.props.joinGameParams.client.close()
        navigationReset('main')
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.isQuitGameModalVisible === false && (
                    <View style={styles.modal}>
                        <TouchableOpacity
                            onPress={this.closeGroupGameOnPress}
                            style={{ height: hp(120), width: wp(100) }}
                        ></TouchableOpacity>
                        <View style={styles.modalView}>
                            {!this.state.isClientLeader && (
                                <View
                                    style={styles.isJoinedRoomSubjectContainer}
                                >
                                    <Text style={styles.modalSubjectText}>
                                        {this.state.matchSubjectId === null
                                            ? ''
                                            : this.props.gameContentMap
                                                  .subjects[
                                                  this.state.matchSubjectId - 1
                                              ].name}
                                    </Text>
                                </View>
                            )}
                            {this.state.isClientLeader && (
                                <View style={styles.isLeaderContainer}>
                                    <View style={styles.gameCodeContainer}>
                                        <View style={styles.gameCodeBox}>
                                            <View
                                                style={
                                                    styles.gameCodeBoxLeftView
                                                }
                                            />
                                            <View
                                                style={
                                                    styles.gameCodeBoxTextView
                                                }
                                            >
                                                <Text
                                                    style={styles.gameCodeText}
                                                    selectable={true}
                                                >
                                                    {
                                                        this.props
                                                            .joinGameParams
                                                            .roomCode
                                                    }
                                                </Text>
                                            </View>
                                            <View
                                                style={
                                                    styles.gameCodeBoxRightView
                                                }
                                            >
                                                <TouchableOpacity
                                                    onPress={
                                                        this.writeToClipboard
                                                    }
                                                >
                                                    <Image
                                                        source={COPY_IMAGE}
                                                        style={styles.copyImage}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    <View
                                        style={styles.gameCodeInfoTextContainer}
                                    >
                                        <Text style={styles.gameCodeInfoText}>
                                            Grup olarak oynamak için{' '}
                                        </Text>
                                        <Text style={styles.gameCodeInfoText}>
                                            yukarıdaki kodu arkadaşlarınla
                                            paylaş
                                        </Text>
                                    </View>
                                    <View
                                        style={styles.questionsNumberContainer}
                                    >
                                        <Text
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
                                                            .choosenQuestionAmount ===
                                                        5
                                                            ? '#FF9900'
                                                            : '#fff'
                                                }
                                            ]}
                                            onPress={() => {
                                                this.questionAmountPicker(5)
                                            }}
                                        >
                                            <Text
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
                                </View>
                            )}
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
                                                        uri: item.profilePicture
                                                    }}
                                                    style={styles.userPic}
                                                />
                                            </View>
                                            <View style={styles.nameContainer}>
                                                <Text style={styles.nameText}>
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
                                keyExtractor={(item, index) => index.toString()}
                            />
                            <View
                                style={styles.usersAndQuestionsCounterContainer}
                            >
                                <View style={styles.usersCounterContainer}>
                                    <Image
                                        source={PEOPLE_COUNTER_IMG}
                                        style={styles.peopleCounterImg}
                                    />
                                    <Text style={styles.usersCounterText}>
                                        {
                                            Object.keys(
                                                this.state.groupRoomPlayerList
                                            ).length
                                        }
                                        /30
                                    </Text>
                                </View>
                                {!this.state.isClientLeader && (
                                    <View
                                        style={styles.questionsCounterContainer}
                                    >
                                        <Text style={styles.usersCounterText}>
                                            Soru sayısı{' '}
                                            <Text style={{ color: '#FF9900' }}>
                                                {
                                                    this.state
                                                        .choosenQuestionAmount
                                                }
                                            </Text>
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                        <AuthButton
                            position={'absolute'}
                            marginTop={hp(83.5)}
                            marginLeft={wp(6.25)}
                            height={hp(7)}
                            width={wp(87.5)}
                            color={
                                this.state.isClientLeader === true
                                    ? '#00D9EF'
                                    : this.state.joinGamePlayerReady === true
                                    ? '#00E312'
                                    : '#FF9900'
                            }
                            buttonText={
                                this.state.isClientLeader === true
                                    ? 'Başlat'
                                    : this.state.joinGamePlayerReady === true
                                    ? 'Hazır'
                                    : 'Beklemeye al'
                            }
                            fontSize={hp(3)}
                            borderRadius={hp(1.5)}
                            onPress={this.groupGameReadyOnPress}
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
                                <Text style={styles.areYouSureText}>
                                    Odadan çıkış yapmak istediğine
                                </Text>
                                <Text style={styles.areYouSureText}>
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

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(JoinGroupRoom)
