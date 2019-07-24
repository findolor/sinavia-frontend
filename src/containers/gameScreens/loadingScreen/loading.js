import React from 'react'
import { View, Text, Button, AsyncStorage } from 'react-native'
import styles from './style'
import NotchView from '../../../components/notchView'
import { Buffer } from 'buffer'
window.localStorage = AsyncStorage
global.Buffer = Buffer
import * as Colyseus from 'colyseus.js'
import { SCENE_KEYS, navigationPush } from '../../../services/navigationService'

class LoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gameMode: {
                ranked: 'rankedRoom'
            },
            player: {
                playerOne: {
                    create: true,
                    userLevel: 4,
                    username: 'arda',
                    examName: 'LGS',
                    courseName: 'Matematik',
                    subjectName: 'Sayilar'
                },
                playerTwo: {
                    create: true,
                    userLevel: 4,
                    username: 'deli',
                    examName: 'LGS',
                    courseName: 'Matematik',
                    subjectName: 'Sayilar'
                }
            },
            isDisabled: true
        }
    }

    componentDidMount() {
        this.client = new Colyseus.Client('http://localhost:5000')
        this.client.onOpen.add(() => {
            console.log('inside')
            this.setState({ isDisabled: false })
        })
    }

    // Client sends a ready signal when they join a room successfully
    joinRoom = () => {
        this.room = this.client.join(
            this.state.gameMode.ranked,
            this.state.player.playerOne
        )
        this.room.onJoin.add(() =>
            navigationPush(SCENE_KEYS.gameScreens.rankedGame, {
                client: this.client,
                room: this.room
            })
        )
    }

    play = () => {
        this.joinRoom()
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView color={'#ee00ee'} />
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Button
                        title="play"
                        onPress={this.play}
                        disabled={this.state.isDisabled}
                    >
                        Play
                    </Button>
                </View>
            </View>
        )
    }
}

export default LoadingScreen
