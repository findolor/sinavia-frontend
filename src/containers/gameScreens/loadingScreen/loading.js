import React from 'react'
import { View, Text, Button } from 'react-native'
import styles from './style'
import NotchView from '../../../components/notchView'
import LottieView from 'lottie-react-native'
// Colyseus imports
import { Buffer } from 'buffer'
import { AsyncStorage } from 'react-native'
window.localStorage = AsyncStorage
global.Buffer = Buffer
import * as Colyseus from 'colyseus.js'
// App service imports
import { SCENE_KEYS, navigationPush } from '../../../services/navigationService'
import { GAME_ENGINE_ENDPOINT } from '../../../config'
import { connect } from 'react-redux'
import { wp, hp } from '../../splashScreen/style'

class LoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        if (this.props.isHardReset) return
        this.client = new Colyseus.Client(GAME_ENGINE_ENDPOINT)
        // 0.11.0
        /* this.joinRoom({
            create: true,
            examName: 'LGS',
            courseName: 'Matematik',
            subjectName: 'Sayilar',
            databaseId: this.props.clientDBId
        }) */
        // 0.10.8
        this.client.onOpen.add(() => {
            this.joinRoom({
                create: true,
                examId: this.props.examId,
                courseId: this.props.courseId,
                subjectId: this.props.subjectId,
                databaseId: this.props.clientDBId
            })
        })
    }

    // Client sends a ready signal when they join a room successfully
    joinRoom = playerOptions => {
        this.room = this.client.join('rankedRoom', playerOptions)

        // Initiate the bot game after 10 seconds
        this.botTimeout = setTimeout(() => {
            this.room.send({
                action: 'start-with-bot'
            })
        }, 20000)

        // Opponent information
        let opponentUsername
        let opponentId
        let opponentProfilePicture
        let opponentCoverPicture
        // Client information
        let playerUsername
        let playerProfilePicture
        let playerCoverPicture
        this.room.onMessage.add(message => {
            // Message is playerProps
            const playerIds = Object.keys(message)

            playerIds.forEach(element => {
                if (this.client.id !== element) {
                    opponentUsername = message[element].username
                    opponentId = element
                    opponentProfilePicture = message[element].profilePicture
                    opponentCoverPicture = message[element].coverPicture
                } else {
                    playerUsername = message[element].username
                    playerProfilePicture = message[element].profilePicture
                    playerCoverPicture = message[element].coverPicture
                }
            })
            this.room.removeAllListeners()
            clearTimeout(this.botTimeout)

            navigationPush(SCENE_KEYS.gameScreens.rankedMatchingScreen, {
                // These are necessary for the game logic
                room: this.room,
                client: this.client,
                // These can be used in both screens
                playerUsername: playerUsername,
                playerProfilePicture: playerProfilePicture,
                playerCoverPicture: playerCoverPicture,
                opponentUsername: opponentUsername,
                opponentId: opponentId,
                opponentProfilePicture: opponentProfilePicture,
                opponentCoverPicture: opponentCoverPicture,
                // These are used in the match intro screen
                courseName: this.props.gameContentMap.courses[
                    this.props.courseId - 1
                ].name,
                subjectName: this.props.gameContentMap.subjects[
                    this.props.subjectId - 1
                ].name
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ marginTop: hp(-8) }}>
                    <LottieView
                        source={require('../../../assets/gameScreens/rankedLoading.json')}
                        autoPlay
                        loop
                        style={{ width: wp(100), aspectRatio: 0.5 }}
                        speed={1.1}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    clientDBId: state.client.clientDBId,
    gameContentMap: state.gameContent.gameContentMap
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    null
)(LoadingScreen)
