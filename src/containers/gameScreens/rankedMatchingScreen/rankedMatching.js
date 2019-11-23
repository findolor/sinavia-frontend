import React from 'react'
import { View, Text, Image, ImageBackground } from 'react-native'
import styles from './style'
import NotchView from '../../../components/notchView'
import {
    SCENE_KEYS,
    navigationReplace
} from '../../../services/navigationService'
import { levelFinder } from '../../../services/userLevelFinder'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

import SWORD from '../../../assets/sword.png'
import LOCATION_IMG from '../../../assets/gameScreens/location.png'

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
        }, 500000000000)
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
                                    <Text style={[styles.usernameText, {marginLeft: wp(3)}]}>
                                        @{this.props.playerUsername}
                                    </Text>
                                    <Text style={[styles.sinaviaScoreText, {marginLeft: wp(3)}]}>
                                        Konu Seviyesi:{' '}
                                        {Math.floor(
                                            levelFinder(this.props.clientPoints)
                                                .level
                                        )}
                                    </Text>
                                    <View style={styles.locationView}>
                                        <Image source={LOCATION_IMG} style={[styles.locationImg, {marginLeft: wp(3)}]}/>
                                        <Text style={[styles.locationText, {marginLeft: wp(1.7)}]}>{this.props.playerCity}</Text>
                                    </View>
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
                                    <Text style={[styles.usernameText, {marginRight: wp(3)}]}>
                                        @{this.props.opponentUsername}
                                    </Text>
                                    <Text style={[styles.sinaviaScoreText, {marginRight: wp(3)}]}>
                                        Konu Seviyesi:{' '}
                                        {Math.floor(
                                            levelFinder(
                                                this.props.opponentPoints
                                            ).level
                                        )}
                                    </Text>
                                    <View style={[styles.locationView, {justifyContent: 'flex-end'}]}>
                                        <Image source={LOCATION_IMG} style={[styles.locationImg, {marginRight: wp(1.7)}]}/>
                                        <Text style={[styles.locationText, {marginRight: wp(3)}]}>{this.props.opponentCity}</Text>
                                    </View>
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
