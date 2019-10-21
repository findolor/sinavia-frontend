import React from 'react'
import { View, Text, Image, ImageBackground } from 'react-native'
import styles from './style'
import NotchView from '../../../components/notchView'
import {
    SCENE_KEYS,
    navigationReplace
} from '../../../services/navigationService'

import SWORD from '../../../assets/sword.png'

class RankedMatchingScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        // Waits for 5 sec and moves onto game screen
        setTimeout(() => {
            navigationReplace(SCENE_KEYS.gameScreens.rankedGame, {
                room: this.props.room,
                client: this.props.client,
                playerUsername: this.props.playerUsername,
                playerProfilePicture: this.props.playerProfilePicture,
                opponentUsername: this.props.opponentUsername,
                opponentId: this.props.opponentId,
                opponentProfilePicture: this.props.opponentProfilePicture,
                playerCoverPicture: this.props.playerCoverPicture,
                opponentCoverPicture: this.props.opponentCoverPicture
            })
        }, 5000)
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView color={'#00D9EF'} />
                <View style={styles.contentContainer}>
                    <Text style={styles.courseText}>
                        {this.props.courseName}
                    </Text>
                    <Text style={styles.subjectText}>
                        {this.props.subjectName}
                    </Text>
                </View>
                <View style={styles.coversContainer}>
                    <View style={styles.coverContainer}>
                        <ImageBackground
                            source={{ uri: this.props.playerCoverPicture }}
                            resizeMode={'stretch'}
                            style={styles.cover}
                        >
                            <View style={styles.playerView}>
                                <View style={styles.userPicContainer}>
                                    <Image
                                        source={{
                                            uri: this.props.playerProfilePicture
                                        }}
                                        style={styles.playerPic}
                                    />
                                </View>
                                <View style={styles.userInfoContainer}>
                                    <Text style={styles.usernameText}>
                                        @{this.props.playerUsername}
                                    </Text>
                                    <Text style={styles.sinaviaScoreText}>
                                        Sınavia Puanı: {this.props.clientPoints}
                                    </Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.coverContainer}>
                        <ImageBackground
                            source={{ uri: this.props.opponentCoverPicture }}
                            resizeMode={'stretch'}
                            style={styles.cover}
                        >
                            <View style={styles.playerView}>
                                <View style={styles.opponentInfoContainer}>
                                    <Text style={styles.usernameText}>
                                        @{this.props.opponentUsername}
                                    </Text>
                                    <Text style={styles.sinaviaScoreText}>
                                        Sınavia Puanı:{' '}
                                        {this.props.opponentPoints}
                                    </Text>
                                </View>
                                <View style={styles.opponentPicContainer}>
                                    <Image
                                        source={{
                                            uri: this.props
                                                .opponentProfilePicture
                                        }}
                                        style={styles.playerPic}
                                    />
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.separatorView}>
                        <View style={styles.separatorLine} />
                        <View style={styles.separatorCircle}>
                            <Image source={SWORD} style={styles.swordPic} />
                        </View>
                        <View style={styles.separatorLine} />
                    </View>
                </View>
            </View>
        )
    }
}

export default RankedMatchingScreen
