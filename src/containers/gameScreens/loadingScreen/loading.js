import React from 'react'
import { View, Text, Button } from 'react-native'
import styles from './style'
import NotchView from '../../../components/notchView'
// Colyseus imports
import { Buffer } from 'buffer'
import { AsyncStorage } from 'react-native'
window.localStorage = AsyncStorage
global.Buffer = Buffer
import * as Colyseus from 'colyseus.js'
// App service imports
import { SCENE_KEYS, navigationPush } from '../../../services/navigationService'
import { GAME_ENGINE_ENDPOINT } from '../../../config'
import { deviceStorage } from '../../../services/deviceStorage'

class LoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gameMode: {
                ranked: 'rankedRoom',
                group: 'groupRoom'
            },
            isDisabled: true
        }
    }

    async componentDidMount() {
        if (this.props.isHardReset) return

        const userId = await deviceStorage.getItemFromStorage('userId')

        this.client = new Colyseus.Client(GAME_ENGINE_ENDPOINT)
        this.client.onOpen.add(() => {
            /* setTimeout(() => {
                this.joinRoom({
                    create: true,
                    examName: 'LGS',
                    courseName: 'Matematik',
                    subjectName: 'Sayilar',
                    databaseId: userId
                })
            }, 3000) */
            this.joinRoom({
                create: true,
                examName: 'LGS',
                courseName: 'Matematik',
                subjectName: 'Sayilar',
                databaseId: userId
            })
        })
    }

    // Client sends a ready signal when they join a room successfully
    joinRoom = playerOptions => {
        this.room = this.client.join(this.state.gameMode.ranked, playerOptions)
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
                courseName: playerOptions.courseName,
                subjectName: playerOptions.subjectName
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
