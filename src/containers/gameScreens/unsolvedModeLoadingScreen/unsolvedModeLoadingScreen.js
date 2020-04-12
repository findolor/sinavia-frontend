import React from 'react'
import {
    BackHandler,
    Image,
    ImageBackground,
    Text,
    View,
    Alert
} from 'react-native'
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

class UnsolvedModeLoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.client = new Colyseus.Client(GAME_ENGINE_ENDPOINT)
        this.joinRoom({
            examId: this.props.contentIds.examId,
            courseId: this.props.contentIds.courseId,
            subjectId: this.props.contentIds.subjectId,
            databaseId: this.props.clientDBId
        })
    }

    // Client sends a ready signal when they join a room successfully
    joinRoom = playerOptions => {
        this.client
            .create('unsolvedModeRoom', playerOptions)
            .then(room => {
                this.room = room

                this.timeout = setTimeout(() => {
                    this.room.removeAllListeners()
                    navigationReplace(
                        SCENE_KEYS.gameScreens.unsolvedModeGameScreen,
                        {
                            // These are necessary for the game logic
                            room: this.room,
                            client: this.client,
                            // These can be used in both screens
                            playerUsername: this.props.clientInformation
                                .username,
                            playerProfilePicture: this.props.clientInformation
                                .profilePicture,
                            contentIds: this.props.contentIds
                        }
                    )
                }, 5000)

                this.room.onMessage(message => {
                    if (message.action === 'no-questions') {
                        Alert.alert('Tekrar çözebileceğin soru yok')
                        this.connectionErrorRoutine()
                    }
                })

                this.room.onError(error => {
                    console.log(error)
                    clearTimeout(this.timeout)
                    navigationReset('main')
                })

                this.room.onLeave(code => {
                    console.log(code)
                    clearTimeout(this.timeout)
                    navigationReset('main')
                })
            })
            .catch(error => {
                console.log(error)
                navigationReset('main')
            })
    }

    connectionErrorRoutine = () => {
        this.room.leave()
        clearTimeout(this.timeout)
        navigationReset('main')
    }

    getNames = () => {
        const subjectIndex = this.props.gameContentMap.subjects.findIndex(
            x => x.id === this.props.contentIds.subjectId
        )
        const courseIndex = this.props.gameContentMap.courses.findIndex(
            x => x.id === this.props.contentIds.courseId
        )

        return {
            courseName: this.props.gameContentMap.courses[courseIndex].name,
            subjectName: this.props.gameContentMap.subjects[subjectIndex].name
        }
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
                                {this.getNames().courseName}
                            </Text>
                            <Text style={styles.subjectText}>
                                {this.getNames().subjectName}
                            </Text>
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

export default connect(mapStateToProps, null)(UnsolvedModeLoadingScreen)
