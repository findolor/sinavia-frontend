import React from 'react'
import { View, Text, Button, AsyncStorage } from 'react-native'
import styles from './style'
import NotchView from '../../../components/notchView'
import { Buffer } from 'buffer'
window.localStorage = AsyncStorage
global.Buffer = Buffer
import * as Colyseus from 'colyseus.js'
import { SCENE_KEYS, navigationPush } from '../../../services/navigationService'
import { GAME_ENGINE_ENDPOINT } from '../../../config'

class LoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gameMode: {
                ranked: 'rankedRoom',
                group: 'groupRoom'
            },
            player: {
                playerOne: {
                    create: true,
                    examName: 'LGS',
                    courseName: 'Matematik',
                    subjectName: 'Sayilar',
                    databaseId: '4973ef67-cc68-4702-8082-f9ea6b69a463',
                    roomCode: 'aaa',
                    maxClientNumber: 2
                },
                playerTwo: {
                    create: true,
                    examName: 'LGS',
                    courseName: 'Matematik',
                    subjectName: 'Sayilar',
                    databaseId: 'c4b812f2-78d5-4bc3-a46a-87a03bdf97fc',
                    roomCode: 'aaa'
                }
            },
            isDisabled: true
        }
    }

    componentDidMount() {
        if (!this.props.isHardReset) {
            this.client = new Colyseus.Client(GAME_ENGINE_ENDPOINT)
            this.client.onOpen.add(() => {
                setTimeout(() => {
                    this.joinRoom()
                }, 3000)
            })
        }
    }

    // Client sends a ready signal when they join a room successfully
    joinRoom = () => {
        const selectedPlayer = this.state.player.playerOne

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

            navigationPush(SCENE_KEYS.gameScreens.matchIntro, {
                // These are necessary for the game logic
                room: this.room,
                client: this.client,
                // These can be used in both screens
                playerUsername: playerUsername,
                playerProfilePicture: playerProfilePicture,
                opponentUsername: opponentUsername,
                opponentId: opponentId,
                opponentProfilePicture: opponentProfilePicture,
                // These are used in the match intro screen
                courseName: selectedPlayer.courseName,
                subjectName: selectedPlayer.subjectName
            })
        })
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
                    <Text
                        style={{
                            fontFamily: 'Averta-BoldItalic',
                            fontSize: 30,
                            color: '#00d9ef'
                        }}
                    >
                        Rakip Bekleniyor...
                    </Text>
                </View>
            </View>
        )
    }
}

export default LoadingScreen
