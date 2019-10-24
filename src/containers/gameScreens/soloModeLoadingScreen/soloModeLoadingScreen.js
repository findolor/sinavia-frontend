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
        console.log('here')
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

        this.room.onMessage.add(message => {
            console.log(message)
        })
    }

    backButtonOnPress = () => {
        this.room.leave()
        this.client.close()
        navigationReset('main')
    }

    render() {
        return null
    }
}

const mapStateToProps = state => ({
    clientToken: state.client.clientToken,
    clientDBId: state.client.clientDBId,
    gameContentMap: state.gameContent.gameContentMap,
    clientInformation: state.client.clientInformation
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    null
)(SoloModeLoadingScreen)
