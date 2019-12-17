import React from 'react'
import {
    View,
    Text,
    Image,
    ImageBackground,
    AsyncStorage,
    TouchableOpacity,
    Alert
} from 'react-native'
import styles, { countdownProps } from './style'
import NotchView from '../../../components/notchView'
import CountDown from 'react-native-countdown-component'
import {
    navigationReplace,
    navigationReset
} from '../../../services/navigationService'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'

// Colyseus imports
import { Buffer } from 'buffer'
window.localStorage = AsyncStorage
global.Buffer = Buffer
import * as Colyseus from 'colyseus.js'

import { GAME_ENGINE_ENDPOINT, SCENE_KEYS } from '../../../config'

import SWORD from '../../../assets/sword.png'
import BACK_BUTTON from '../../../assets/backButton.png'
//import { gameEnergyServices } from '../../../sagas/gameEnergy'
import { levelFinder } from '../../../services/userLevelFinder'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

class FriendMatchingScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countDownTime: 30,
            isCoundownFinished: false,
            isCoundownActive: true,
            clientPoint: 0,
            friendPoint: 0,
            isFriendJoined: false,
            friendMatches: [],
            friendMatchClientWinCount: null,
            friendMatchOpponentWinCount: null
        }
    }

    componentDidMount() {
        if (this.props.isFriendJoining) {
            this.room = this.props.room
            this.client = this.props.client
            this.roomMessage()
            return
        }
        this.client = new Colyseus.Client(GAME_ENGINE_ENDPOINT)
        this.client.onOpen.add(() => {
            this.room = this.client.join('friendRoom', {
                examId: this.props.examId,
                courseId: this.props.courseId,
                subjectId: this.props.subjectId,
                databaseId: this.props.clientDBId,
                roomCode: this.props.roomCode,
                create: this.props.isCreateRoom,
                userId: this.props.clientDBId,
                friendId: this.props.invitedFriendId,
                userUsername: this.props.clientInformation.username,
                userProfilePicture: this.props.clientInformation.profilePicture,
                examName: this.convertSpacesToUnderscore(
                    this.props.gameContentMap.exams[this.props.examId - 1].name
                ),
                courseName: this.convertSpacesToUnderscore(
                    this.props.gameContentMap.courses[this.props.courseId - 1]
                        .name
                ),
                subjectName: this.convertSpacesToUnderscore(
                    this.props.gameContentMap.subjects[this.props.subjectId - 1]
                        .name
                )
            })

            this.room.onJoin.add(() => {
                this.roomMessage()
            })
        })
    }

    // If we dont convert the spaces we get an error from the wss uri
    convertSpacesToUnderscore = text => {
        return text.replace(' ', '_')
    }

    roomMessage = () => {
        // Opponent information
        let opponentUsername
        let opponentId
        let opponentProfilePicture
        // Client information
        let playerUsername
        let playerProfilePicture
        this.room.onMessage.add(message => {
            if (message.action === 'game-reject') {
                Alert.alert('Arkadaşın oyunu reddetti!')
                this.room.removeAllListeners()
                this.client.close()
                navigationReset('main')
                return
            }
            if (message.action === 'save-user-points') {
                message.userScores.forEach(userScore => {
                    if (this.props.clientInformation.id === userScore.userId) {
                        this.setState({ clientPoint: userScore.totalPoints })
                    } else this.setState({ friendPoint: userScore.totalPoints })
                })
                return
            }
            if (message.action === 'friend-matches') {
                let clientWinCount = 0,
                    opponentWinCount = 0

                message.friendMatches.forEach(friendMatch => {
                    if (!friendMatch.isMatchDraw) {
                        if (
                            this.props.clientInformation.id ===
                            friendMatch.winnerId
                        )
                            clientWinCount++
                        else opponentWinCount++
                    }
                })
                this.setState({
                    friendMatches: message.friendMatches,
                    friendMatchClientWinCount: clientWinCount,
                    friendMatchOpponentWinCount: opponentWinCount
                })
                return
            }
            // Message is playerProps
            const playerIds = Object.keys(message)

            playerIds.forEach(element => {
                if (this.client.id !== element) {
                    this.setState({ isFriendJoined: true })
                    opponentUsername = message[element].username
                    opponentId = element
                    opponentProfilePicture = message[element].profilePicture
                } else {
                    playerUsername = message[element].username
                    playerProfilePicture = message[element].profilePicture
                }
            })

            this.room.removeAllListeners()
            this.timeout = setTimeout(() => {
                navigationReplace(SCENE_KEYS.gameScreens.friendGame, {
                    // These are necessary for the game logic
                    room: this.room,
                    client: this.client,
                    // These can be used in both screens
                    playerUsername: playerUsername,
                    playerProfilePicture: playerProfilePicture,
                    opponentUsername: opponentUsername,
                    opponentId: opponentId,
                    opponentProfilePicture: opponentProfilePicture,
                    friendMatches: this.state.friendMatches
                })
            }, 3000)
        })

        this.room.onError.add(error => {
            console.log(error)
            this.backButtonOnPress()
        })

        this.room.onLeave.add(res => {
            if (res.code === 1001) return
            this.backButtonOnPress()
        })
    }

    countdownOnFinish = () => {
        this.setState({ isCoundownFinished: true })
    }

    playAheadOnPress = () => {
        this.room.send({
            action: 'start-ahead'
        })

        this.room.removeAllListeners()
        navigationReplace(SCENE_KEYS.gameScreens.soloFriendGameScreen, {
            // These are necessary for the game logic
            room: this.room,
            client: this.client,
            // These can be used in both screens
            playerUsername: this.props.clientInformation.username,
            playerProfilePicture: this.props.clientInformation.profilePicture
        })
    }

    backButtonOnPress = () => {
        this.setState({ isCoundownActive: false }, () => {
            this.room.leave()
            this.client.close()
            clearTimeout(this.timeout)
            navigationReset('main')
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView color={'#00D9EF'} />
                <View style={styles.contentContainer}>
                    <Text style={styles.courseText}>
                        {
                            this.props.gameContentMap.courses[
                                this.props.courseId - 1
                            ].name
                        }
                    </Text>
                    <Text style={styles.subjectText}>
                        {
                            this.props.gameContentMap.subjects[
                                this.props.subjectId - 1
                            ].name
                        }
                    </Text>
                </View>
                <View style={styles.coversContainer}>
                    <View style={styles.coverContainer}>
                        <ImageBackground
                            source={{
                                uri: this.props.clientInformation.coverPicture
                            }}
                            resizeMode={'stretch'}
                            style={styles.cover}
                        >
                            <View style={styles.playerView}>
                                <Animatable.View
                                    style={styles.userPicContainer}
                                    animation="slideInLeft"
                                    useNativeDriver={true}
                                    duration={800}
                                    delay={400}
                                >
                                    <Image
                                        source={{
                                            uri: this.props.clientInformation
                                                .profilePicture
                                        }}
                                        style={styles.userPic}
                                    />
                                </Animatable.View>
                                <Animatable.View
                                    style={styles.userInfoContainer}
                                    animation="slideInRight"
                                    useNativeDriver={true}
                                    duration={800}
                                    delay={800}
                                >
                                    <Text
                                        style={[
                                            styles.usernameText,
                                            { marginLeft: wp(3) }
                                        ]}
                                    >
                                        @{this.props.clientInformation.username}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.subjectBasedSinaviaScoreText,
                                            { marginLeft: wp(3) }
                                        ]}
                                    >
                                        Konu Seviyesi:{' '}
                                        {Math.floor(
                                            levelFinder(this.state.clientPoint)
                                                .level
                                        )}
                                    </Text>
                                </Animatable.View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.coverContainer}>
                        <ImageBackground
                            source={{
                                uri: this.props.opponentInformation.coverPicture
                            }}
                            resizeMode={'stretch'}
                            style={styles.cover}
                        >
                            <View style={styles.playerView}>
                                <Animatable.View
                                    style={styles.opponentInfoContainer}
                                    animation="slideInLeft"
                                    useNativeDriver={true}
                                    duration={800}
                                    delay={800}
                                >
                                    <Text
                                        style={[
                                            styles.usernameText,
                                            { marginRight: wp(3) }
                                        ]}
                                    >
                                        @
                                        {
                                            this.props.opponentInformation
                                                .username
                                        }
                                    </Text>
                                    <Text
                                        style={[
                                            styles.subjectBasedSinaviaScoreText,
                                            { marginRight: wp(3) }
                                        ]}
                                    >
                                        Konu Seviyesi:{' '}
                                        {Math.floor(
                                            levelFinder(this.state.friendPoint)
                                                .level
                                        )}
                                    </Text>
                                </Animatable.View>
                                <Animatable.View
                                    style={styles.opponentPicContainer}
                                    animation="slideInRight"
                                    useNativeDriver={true}
                                    duration={800}
                                    delay={400}
                                >
                                    <Image
                                        source={{
                                            uri: this.props.opponentInformation
                                                .profilePicture
                                        }}
                                        style={styles.opponentPic}
                                    />
                                </Animatable.View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.separatorView}>
                        <View style={styles.separatorLineUser}>
                            <Text style={styles.winLoseText}>
                                {this.state.friendMatchClientWinCount}
                            </Text>
                            <Text style={styles.winLoseCounterText}>
                                Galibiyet
                            </Text>
                        </View>
                        <View style={styles.separatorCircle}>
                            {!this.state.isFriendJoined &&
                                !this.state.isCoundownFinished && (
                                    <CountDown
                                        until={this.state.countDownTime}
                                        size={countdownProps.size}
                                        digitStyle={{
                                            backgroundColor: ''
                                        }}
                                        digitTxtStyle={styles.timerText}
                                        timeToShow={['S']}
                                        timeLabels={{ s: null }}
                                        running={this.state.isCoundownActive}
                                        onFinish={this.countdownOnFinish}
                                    />
                                )}
                            {!this.state.isFriendJoined &&
                                this.state.isCoundownFinished && (
                                    <TouchableOpacity
                                        onPress={this.playAheadOnPress}
                                    >
                                        <Text style={styles.startFirstText}>
                                            ÖNDEN
                                        </Text>
                                        <Text style={styles.startFirstText}>
                                            OYNA
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            {this.state.isFriendJoined && (
                                <Image source={SWORD} style={styles.swordPic} />
                            )}
                        </View>
                        <View style={styles.separatorLineOpponent}>
                            <Text style={styles.winLoseText}>
                                {this.state.friendMatchOpponentWinCount}
                            </Text>
                            <Text style={styles.winLoseCounterText}>
                                Galibiyet
                            </Text>
                        </View>
                    </View>
                </View>
                {!this.state.isFriendJoined && (
                    <View style={styles.backButtonContainer}>
                        <TouchableOpacity onPress={this.backButtonOnPress}>
                            <Image
                                source={BACK_BUTTON}
                                style={styles.backButton}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    clientInformation: state.client.clientInformation,
    clientDBId: state.client.clientDBId,
    clientToken: state.client.clientToken,
    gameContentMap: state.gameContent.gameContentMap
})

const mapDispatchToProps = dispatch => ({
    //removeOneEnergy: () => dispatch(appActions.removeOneEnergy())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FriendMatchingScreen)
