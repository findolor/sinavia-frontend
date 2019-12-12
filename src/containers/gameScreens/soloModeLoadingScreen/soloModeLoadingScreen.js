import React from 'react'
import { BackHandler, Image, ImageBackground, Text, View } from 'react-native'
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
import LOGO from '../../../assets/sinavia_logo_cut.png'
import * as Animatable from 'react-native-animatable'
import { chooseImage } from '../../../services/courseAssetChooser'

class SoloModeLoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.client = new Colyseus.Client(GAME_ENGINE_ENDPOINT)
        this.client.onOpen.add(() => {
            this.joinRoom({
                examId: this.props.contentIds.examId,
                courseId: this.props.contentIds.courseId,
                subjectId: this.props.contentIds.subjectId,
                databaseId: this.props.clientDBId,
                choosenQuestionAmount: this.props.choosenQuestionAmount
            })
        })
    }

    // Client sends a ready signal when they join a room successfully
    joinRoom = playerOptions => {
        this.room = this.client.join('soloModeRoom', playerOptions)

        this.room.onJoin.add(() => {
            this.timeout = setTimeout(() => {
                this.room.removeAllListeners()
                navigationReplace(SCENE_KEYS.gameScreens.soloModeGameScreen, {
                    // These are necessary for the game logic
                    room: this.room,
                    client: this.client,
                    // These can be used in both screens
                    playerUsername: this.props.clientInformation.username,
                    playerProfilePicture: this.props.clientInformation
                        .profilePicture
                })
            }, 5000)

            this.room.onError.add(error => {
                this.connectionErrorRoutine()
            })

            this.room.onLeave.add(res => {
                this.connectionErrorRoutine()
            })
        })
    }

    connectionErrorRoutine = () => {
        this.room.leave()
        clearTimeout(this.timeout)
        navigationReset('main')
    }

    render() {
        const background = chooseImage(this.props.contentIds.examId, true)
        return (
            <View style={styles.container}>
                <ImageBackground source={background} style={styles.background}>
                    <View style={styles.shadowView}>
                        <View style={styles.logoView}>
                            <View style={styles.logoBorderView}>
                                <Image source={LOGO} style={styles.logoImg} />
                            </View>
                        </View>
                        <Animatable.View
                            style={styles.textsView}
                            useNativeDriver={true}
                            animation="fadeIn"
                            delay={500}
                        >
                            <Text style={styles.courseText}>
                                {
                                    this.props.gameContentMap.courses[
                                        this.props.contentIds.courseId - 1
                                    ].name
                                }
                            </Text>
                            <Text style={styles.subjectText}>
                                {
                                    this.props.gameContentMap.subjects[
                                        this.props.contentIds.subjectId - 1
                                    ].name
                                }
                            </Text>
                            <Animatable.View
                                useNativeDriver={true}
                                animation="pulse"
                                delay={2000}
                                duration={1500}
                            >
                                <Text style={styles.questionCounterText}>
                                    Soru Sayısı:{' '}
                                    {this.props.choosenQuestionAmount}
                                </Text>
                            </Animatable.View>
                        </Animatable.View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    clientDBId: state.client.clientDBId,
    clientInformation: state.client.clientInformation,
    gameContentMap: state.gameContent.gameContentMap
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, null)(SoloModeLoadingScreen)
