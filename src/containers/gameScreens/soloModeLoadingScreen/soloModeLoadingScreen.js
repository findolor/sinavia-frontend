import React from 'react'
import { BackHandler } from 'react-native'
import styles from './style'
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

class SoloModeLoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.client = new Colyseus.Client(GAME_ENGINE_ENDPOINT)
        this.client.onOpen.add(() => {
            this.joinRoom({
                examId: this.props.examId,
                courseId: this.props.courseId,
                subjectId: this.props.subjectId,
                databaseId: this.props.clientDBId
            })
        })
    }

    // Client sends a ready signal when they join a room successfully
    joinRoom = playerOptions => {
        this.room = this.client.join('soloModeRoom', playerOptions)

        this.room.onJoin.add(() => {
            navigationReplace(SCENE_KEYS.gameScreens.soloModeGameScreen, {
                // These are necessary for the game logic
                room: this.room,
                client: this.client,
                // These can be used in both screens
                playerUsername: this.props.clientInformation.username,
                playerProfilePicture: this.props.clientInformation
                    .profilePicture
            })
        })
    }

    render() {
        return null
    }
}

const mapStateToProps = state => ({
    clientDBId: state.client.clientDBId,
    clientInformation: state.client.clientInformation
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    null
)(SoloModeLoadingScreen)
