import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './style'
import NotchView from '../../../components/notchView'
import { SCENE_KEYS, navigationPush } from '../../../services/navigationService'

import SWORD from '../../../assets/sword.png'

class MatchIntroScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        // Waits for 5 sec and moves onto game screen
        setTimeout(() => {
            navigationPush(SCENE_KEYS.gameScreens.rankedGame, {
                room: this.props.room,
                client: this.props.client,
                playerUsername: this.props.playerUsername,
                playerProfilePicture: this.props.playerProfilePicture,
                opponentUsername: this.props.opponentUsername,
                opponentId: this.props.opponentId,
                opponentProfilePicture: this.props.opponentProfilePicture
            })
        }, 5000)
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView color={'#E2871A'} />
                <View style={styles.contentContainer}>
                    <Text style={styles.courseText}>
                        {this.props.courseName}
                    </Text>
                    <Text style={styles.subjectText}>
                        {this.props.subjectName}
                    </Text>
                </View>
                <View style={styles.playerContainer}>
                    <View style={styles.playerPicContainer}>
                        <Image
                            source={{ uri: this.props.playerProfilePicture }}
                            style={styles.playerPic}
                        />
                    </View>
                    <View style={styles.playerInfoContainer}>
                        <Text style={styles.usernameText}>
                            @{this.props.playerUsername}
                        </Text>
                        <Text style={styles.sinaviaScoreText}>
                            Sınavia Puanı: 20
                        </Text>
                    </View>
                </View>
                <View style={styles.separatorContainer}>
                    <View style={styles.separatorLineLeft} />
                    <Image source={SWORD} style={styles.sword} />
                    <View style={styles.separatorLineRight} />
                </View>
                <View style={styles.opponentContainer}>
                    <View style={styles.opponentInfoContainer}>
                        <Text style={styles.usernameText}>
                            @{this.props.opponentUsername}
                        </Text>
                        <Text style={styles.sinaviaScoreText}>
                            Sınavia Puanı: 20
                        </Text>
                    </View>
                    <View style={styles.opponentPicContainer}>
                        <Image
                            source={{ uri: this.props.opponentProfilePicture }}
                            style={styles.playerPic}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

export default MatchIntroScreen
