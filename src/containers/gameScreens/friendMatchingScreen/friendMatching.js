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
import { appActions } from '../../../redux/app/actions'

// Colyseus imports
import { Buffer } from 'buffer'
window.localStorage = AsyncStorage
global.Buffer = Buffer
import * as Colyseus from 'colyseus.js'

import { GAME_ENGINE_ENDPOINT, SCENE_KEYS } from '../../../config'

import SWORD from '../../../assets/sword.png'
import BACK_BUTTON from '../../../assets/backButton.png'
import { gameEnergyServices } from '../../../sagas/gameEnergy'

class FriendMatchingScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countDownTime: 30,
            isCoundownFinished: false
        }
    }

    componentDidMount() {
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
        })
    }

    // If we dont convert the spaces we get an error from the wss uri
    convertSpacesToUnderscore = text => {
        return text.replace(' ', '_')
    }

    // TODO Implement logic for the closed game
    // If the user closes the game
    // Friend should not be able to enter the game
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
            if (message.action === 'game-reject') {
                Alert.alert('Arkadaşın oyunu reddetti!')
                this.room.removeAllListeners()
                this.client.close()
                navigationReset('main')
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

            if (this.props.clientInformation.isPremium) {
                setTimeout(() => {
                    navigationReplace(SCENE_KEYS.gameScreens.friendGame, {
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
                }, 3000)
            } else {
                gameEnergyServices
                    .subtractGameEnergy(
                        this.props.clientToken,
                        this.props.clientDBId
                    )
                    .then(() => {
                        // Removing one energy when the match starts
                        this.props.removeOneEnergy()

                        setTimeout(() => {
                            navigationReplace(
                                SCENE_KEYS.gameScreens.friendGame,
                                {
                                    // These are necessary for the game logic
                                    room: this.room,
                                    client: this.client,
                                    // These can be used in both screens
                                    playerUsername: playerUsername,
                                    playerProfilePicture: playerProfilePicture,
                                    opponentUsername: opponentUsername,
                                    opponentId: opponentId,
                                    opponentProfilePicture: opponentProfilePicture
                                }
                            )
                        }, 3000)
                    })
                    .catch(error => {
                        console.log(error)
                        this.backButtonOnPress()
                    })
            }
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

        if (this.props.clientInformation.isPremium) {
            navigationReplace(SCENE_KEYS.gameScreens.soloFriendGameScreen, {
                // These are necessary for the game logic
                room: this.room,
                client: this.client,
                // These can be used in both screens
                playerUsername: this.props.clientInformation.username,
                playerProfilePicture: this.props.clientInformation
                    .profilePicture
            })
        } else {
            gameEnergyServices
                .subtractGameEnergy(
                    this.props.clientToken,
                    this.props.clientDBId
                )
                .then(() => {
                    // Removing one energy when the match starts
                    this.props.removeOneEnergy()

                    navigationReplace(
                        SCENE_KEYS.gameScreens.soloFriendGameScreen,
                        {
                            // These are necessary for the game logic
                            room: this.room,
                            client: this.client,
                            // These can be used in both screens
                            playerUsername: this.props.clientInformation
                                .username,
                            playerProfilePicture: this.props.clientInformation
                                .profilePicture
                        }
                    )
                })
                .catch(error => {
                    console.log(error)
                    this.backButtonOnPress()
                })
        }
    }

    backButtonOnPress = () => {
        this.room.leave()
        this.client.close()
        navigationReset('main')
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView color={'#FF9900'} />
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
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity onPress={this.backButtonOnPress}>
                        <Image source={BACK_BUTTON} style={styles.backButton} />
                    </TouchableOpacity>
                </View>
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
    removeOneEnergy: () => dispatch(appActions.removeOneEnergy())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FriendMatchingScreen)
