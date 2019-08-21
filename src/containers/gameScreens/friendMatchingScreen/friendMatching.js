import React from 'react'
import { View, Text, Image, ImageBackground } from 'react-native'
import styles from './style'
import NotchView from '../../../components/notchView'
import { SCENE_KEYS, navigationPush } from '../../../services/navigationService'

import COVER from '../../../assets/cover.jpg'
import PROFILE_PIC from '../../../assets/profile2.jpg'
import WHITE from '../../../assets/white.jpg'
import SWORD from '../../../assets/sword.png'
import background from '../../../assets/gameScreens/gameStatsBackground.jpg'

class FriendMatchingScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView color={'#FF9900'} />
                <View style={styles.contentContainer}>
                    <Text style={styles.courseText}>TÜRKÇE</Text>
                    <Text style={styles.subjectText}>Paragrafta Anlam</Text>
                </View>
                <View style={styles.coverContainer}>
                    <ImageBackground
                        source={COVER}
                        resizeMode={'stretch'}
                        style={styles.cover}
                    >
                        <View style={styles.playerView}>
                            <View style={styles.userPicContainer}>
                                <Image
                                    source={PROFILE_PIC}
                                    style={styles.userPic}
                                />
                            </View>
                            <View style={styles.userInfoContainer}>
                                <Text style={styles.usernameText}>
                                    @haqotherage
                                </Text>
                                <Text style={styles.subjectBasedSinaviaScoreText}>
                                    Sınavia Puanı: 20
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.coverContainer}>
                    <ImageBackground
                        source={COVER}
                        resizeMode={'stretch'}
                        style={styles.cover}
                    >
                        <View style={styles.playerView}>
                            <View style={styles.opponentInfoContainer}>
                                <Text style={styles.usernameText}>
                                    @haqotherage
                                </Text>
                                <Text style={styles.subjectBasedSinaviaScoreText}>
                                    Sınavia Puanı: 20
                                </Text>
                            </View>
                            <View style={styles.opponentPicContainer}>
                                <Image
                                    source={PROFILE_PIC}
                                    style={styles.opponentPic}
                                />
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.separatorView}>
                    <View style={styles.separatorLineUser}>
                        <Text style={styles.winLoseText}>
                            Galibiyet
                        </Text>
                        <Text style={styles.winLoseCounterText}>
                            20
                        </Text>
                    </View>
                    <View style={styles.separatorCircle}>
                        <Text style={styles.timerText}>30</Text>
                    </View>
                    <View style={styles.separatorLineOpponent}>
                        <Text style={styles.winLoseText}>
                            Mağlubiyet
                        </Text>
                        <Text style={styles.winLoseCounterText}>
                            20
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default FriendMatchingScreen
