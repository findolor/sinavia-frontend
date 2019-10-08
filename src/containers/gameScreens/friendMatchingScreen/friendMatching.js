import React from 'react'
import {
    View,
    Text,
    Image,
    ImageBackground,
    AsyncStorage,
    TouchableOpacity
} from 'react-native'
import styles, { countdownProps } from './style'
import NotchView from '../../../components/notchView'
import CountDown from 'react-native-countdown-component'
import { SCENE_KEYS, navigationPush } from '../../../services/navigationService'
import { connect } from 'react-redux'

// Colyseus imports
import { Buffer } from 'buffer'
window.localStorage = AsyncStorage
global.Buffer = Buffer
import * as Colyseus from 'colyseus.js'

import { deviceStorage } from '../../../services/deviceStorage'
import { GAME_ENGINE_ENDPOINT } from '../../../config'

import SWORD from '../../../assets/sword.png'

class FriendMatchingScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countDownTime: 2,
            isCoundownFinished: false
        }
    }

    async componentDidMount() {
        this.client = new Colyseus.Client(GAME_ENGINE_ENDPOINT)
        this.client.onOpen.add(() => {
            this.joinRoom({
                examId: this.props.examId,
                courseId: this.props.courseId,
                subjectId: this.props.subjectId,
                databaseId: this.props.clientDBId,
                roomCode: this.props.roomCode,
                create: this.props.isCreateRoom,
                userId: this.props.clientDBId,
                friendId: this.props.invitedFriendId
            })
        })
    }

    joinRoom = playerOptions => {
        this.room = this.client.join('friendRoom', playerOptions)
        // Opponent information
        let opponentUsername
        let opponentId
        let opponentProfilePicture
        // Client information
        let playerUsername
        let playerProfilePicture
        this.room.onMessage.add(message => {
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

            navigationPush(SCENE_KEYS.gameScreens.friendGame, {
                // These are necessary for the game logic
                room: this.room,
                client: this.client,
                // These can be used in both screens
                playerUsername: playerUsername,
                playerProfilePicture: playerProfilePicture,
                opponentUsername: opponentUsername,
                opponentId: opponentId,
                opponentProfilePicture: opponentProfilePicture
            })
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

        navigationPush(SCENE_KEYS.gameScreens.soloGameScreen, {
            // These are necessary for the game logic
            room: this.room,
            client: this.client,
            // These can be used in both screens
            playerUsername: this.props.clientInformation.username,
            playerProfilePicture: this.props.clientInformation.profilePicture
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView color={'#FF9900'} />
                <View style={styles.contentContainer}>
                    <Text style={styles.courseText}>TÜRKÇE</Text>
                    <Text style={styles.subjectText}>Paragrafta Anlam</Text>
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
                                <View style={styles.userPicContainer}>
                                    <Image
                                        source={{
                                            uri: this.props.clientInformation
                                                .profilePicture
                                        }}
                                        style={styles.userPic}
                                    />
                                </View>
                                <View style={styles.userInfoContainer}>
                                    <Text style={styles.usernameText}>
                                        @{this.props.clientInformation.username}
                                    </Text>
                                    <Text
                                        style={
                                            styles.subjectBasedSinaviaScoreText
                                        }
                                    >
                                        Sınavia Puanı: 20
                                    </Text>
                                </View>
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
                                <View style={styles.opponentInfoContainer}>
                                    <Text style={styles.usernameText}>
                                        @
                                        {
                                            this.props.opponentInformation
                                                .username
                                        }
                                    </Text>
                                    <Text
                                        style={
                                            styles.subjectBasedSinaviaScoreText
                                        }
                                    >
                                        Sınavia Puanı: 20
                                    </Text>
                                </View>
                                <View style={styles.opponentPicContainer}>
                                    <Image
                                        source={{
                                            uri: this.props.opponentInformation
                                                .profilePicture
                                        }}
                                        style={styles.opponentPic}
                                    />
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
                <View style={styles.separatorView}>
                    <View style={styles.separatorLineUser}>
                        <Text style={styles.winLoseText}>Kazanma</Text>
                        <Text style={styles.winLoseCounterText}>20</Text>
                    </View>
                    <View style={styles.separatorCircle}>
                        {!this.state.isFriendJoined &&
                            !this.state.isCoundownFinished && (
                                <CountDown
                                    until={this.state.countDownTime}
                                    size={countdownProps.size}
                                    digitStyle={{
                                        backgroundColor: '#FF9900',
                                        borderRadius: 100
                                    }}
                                    digitTxtStyle={styles.timerText}
                                    timeToShow={['S']}
                                    timeLabels={{ s: null }}
                                    separatorStyle={{ color: '#fff' }}
                                    showSeparator
                                    //running={!this.state.isCoundownFinished}
                                    onFinish={this.countdownOnFinish}
                                />
                            )}
                        {!this.state.isFriendJoined &&
                            this.state.isCoundownFinished && (
                                <TouchableOpacity
                                    onPress={this.playAheadOnPress}
                                >
                                    <Text>ÖNDEN OYNA</Text>
                                </TouchableOpacity>
                            )}
                        {this.state.isFriendJoined && (
                            <Image source={SWORD} style={styles.swordPic} />
                        )}
                    </View>
                    <View style={styles.separatorLineOpponent}>
                        <Text style={styles.winLoseText}>Kazanma</Text>
                        <Text style={styles.winLoseCounterText}>20</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    clientInformation: state.client.clientInformation,
    clientDBId: state.client.clientDBId
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    null
)(FriendMatchingScreen)
