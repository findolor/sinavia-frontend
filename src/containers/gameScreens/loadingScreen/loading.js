import React from 'react'
import { View, TouchableOpacity, Image, BackHandler } from 'react-native'
import styles from './style'
import LottieView from 'lottie-react-native'
// Colyseus imports
import { Buffer } from 'buffer'
import { AsyncStorage } from 'react-native'
window.localStorage = AsyncStorage
global.Buffer = Buffer
import * as Colyseus from 'colyseus.js'
// App service imports
import {
    navigationReplace,
    navigationReset
} from '../../../services/navigationService'
import { GAME_ENGINE_ENDPOINT, SCENE_KEYS } from '../../../config'
import { connect } from 'react-redux'
import BACK_BUTTON from '../../../assets/return.png'

class LoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        if (this.props.isHardReset) return
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                this.backButtonOnPress()
            }
        )
        this.client = new Colyseus.Client(GAME_ENGINE_ENDPOINT)
        this.joinRoom({
            examId: this.props.examId,
            courseId: this.props.courseId,
            subjectId: this.props.subjectId,
            databaseId: this.props.clientDBId
        })
    }

    componentWillUnmount() {
        if (!this.props.isHardReset) this.backHandler.remove()
    }

    // Client sends a ready signal when they join a room successfully
    joinRoom = playerOptions => {
        this.client
            .joinOrCreate('rankedRoom', playerOptions)
            .then(room => {
                // Initiate the bot game after 10 seconds
                this.botTimeout = setTimeout(() => {
                    room.send({
                        action: 'start-with-bot'
                    })
                }, 20000)

                // Opponent information
                let opponentUsername
                let opponentId
                let opponentProfilePicture
                let opponentCoverPicture
                let opponentTotalPoints
                let opponentCity
                // Client information
                let playerUsername
                let playerProfilePicture
                let playerCoverPicture
                let playerTotalPoints
                let playerCity

                room.onMessage(message => {
                    // Message is playerProps
                    const playerIds = Object.keys(message)

                    playerIds.forEach(element => {
                        if (room.sessionId !== element) {
                            opponentUsername = message[element].username
                            opponentId = element
                            opponentProfilePicture =
                                message[element].profilePicture
                            opponentCoverPicture = message[element].coverPicture
                            opponentTotalPoints = message[element].totalPoints
                            opponentCity = message[element].city
                        } else {
                            playerUsername = message[element].username
                            playerProfilePicture =
                                message[element].profilePicture
                            playerCoverPicture = message[element].coverPicture
                            playerTotalPoints = message[element].totalPoints
                            playerCity = message[element].city
                        }
                    })
                    room.removeAllListeners()
                    clearTimeout(this.botTimeout)

                    navigationReplace(
                        SCENE_KEYS.gameScreens.rankedMatchingScreen,
                        {
                            // These are necessary for the game logic
                            room: room,
                            client: this.client,
                            // These can be used in both screens
                            playerUsername: playerUsername,
                            playerProfilePicture: playerProfilePicture,
                            playerCoverPicture: playerCoverPicture,
                            playerCity: playerCity,
                            opponentUsername: opponentUsername,
                            opponentId: opponentId,
                            opponentProfilePicture: opponentProfilePicture,
                            opponentCoverPicture: opponentCoverPicture,
                            opponentCity: opponentCity,
                            // These are used in the match intro screen
                            courseName: this.props.gameContentMap.courses[
                                this.props.courseId - 1
                            ].name,
                            subjectName: this.props.gameContentMap.subjects[
                                this.props.subjectId - 1
                            ].name,
                            clientPoints: playerTotalPoints,
                            opponentPoints: opponentTotalPoints
                        }
                    )
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    backButtonOnPress = () => {
        this.room.leave()
        navigationReset('main')
    }

    render() {
        if (this.props.isHardReset) return null
        else
            return (
                <View style={styles.container}>
                    <View style={styles.backButtonContainer}>
                        <TouchableOpacity onPress={this.backButtonOnPress}>
                            <Image
                                source={BACK_BUTTON}
                                style={styles.backButton}
                            />
                        </TouchableOpacity>
                    </View>
                    <LottieView
                        source={require('../../../assets/gameScreens/gameLoading.json')}
                        autoPlay
                        loop
                        resizeMode={'cover'}
                        speed={1.1}
                    />
                </View>
            )
    }
}

const mapStateToProps = state => ({
    clientToken: state.client.clientToken,
    clientDBId: state.client.clientDBId,
    gameContentMap: state.gameContent.gameContentMap,
    clientInformation: state.client.clientInformation
})

const mapDispatchToProps = dispatch => ({
    //removeOneEnergy: () => dispatch(appActions.removeOneEnergy())
})

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen)
