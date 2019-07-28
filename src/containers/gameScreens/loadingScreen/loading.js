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
                    examName: 'LGS',
                    courseName: 'Matematik',
                    subjectName: 'Sayilar',
                    databaseId: '4973ef67-cc68-4702-8082-f9ea6b69a463'
                },
                playerTwo: {
                    create: true,
                    userLevel: 4,
                    examName: 'LGS',
                    courseName: 'Matematik',
                    subjectName: 'Sayilar',
                    databaseId: 'c4b812f2-78d5-4bc3-a46a-87a03bdf97fc'
                }
            },
            isDisabled: true
        }
    }

    componentDidMount() {
        this.client = new Colyseus.Client('http://localhost:5000')
        this.client.onOpen.add(() => {
            setTimeout(() => {
                this.joinRoom()
            }, 3000)
        })
    }

    // Client sends a ready signal when they join a room successfully
    joinRoom = () => {
        const selectedPlayer = this.state.player.playerTwo

        this.room = this.client.join(this.state.gameMode.ranked, selectedPlayer)
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
                    opponentUsername = message[element].username
                    opponentId = element
                    opponentProfilePicture = message[element].profilePicture
                } else {
                    playerUsername = message[element].username
                    playerProfilePicture = message[element].profilePicture
                }
            })

            this.room.removeAllListeners()

            navigationPush(SCENE_KEYS.gameScreens.rankedGame, {
                room: this.room,
                client: this.client,
                playerUsername: playerUsername,
                playerProfilePicture: playerProfilePicture,
                opponentUsername: opponentUsername,
                opponentId: opponentId,
                opponentProfilePicture: opponentProfilePicture
            })
        })
    }

    play = () => {
        this.joinRoom()
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView color={'#fffs'} />
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {/* <Button
                        title="play"
                        onPress={this.play}
                        disabled={this.state.isDisabled}
                    >
                        Play
                    </Button> */}
                    <Text>Yukleniyor</Text>
                </View>
            </View>
        )
    }
}

export default LoadingScreen
