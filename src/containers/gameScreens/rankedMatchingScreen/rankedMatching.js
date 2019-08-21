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

class RankedMatchingScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView color={'#00D9EF'} />
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
                                        style={styles.playerPic}
                                    />
                            </View>
                            <View style={styles.userInfoContainer}>
                                <Text style={styles.usernameText}>
                                    @haqotherage
                                </Text>
                                <Text style={styles.sinaviaScoreText}>
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
                                <Text style={styles.sinaviaScoreText}>
                                    Sınavia Puanı: 20
                                </Text>
                            </View>
                            <View style={styles.opponentPicContainer}>
                                <Image
                                    source={PROFILE_PIC}
                                    style={styles.playerPic}
                                />
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.separatorView}>
                    <View style={styles.separatorLine}/>
                    <View style={styles.separatorCircle}>
                        <Image
                            source={SWORD}
                            style={styles.swordPic}
                        />
                    </View>
                    <View style={styles.separatorLine}/>
                </View>
            </View>
        )
    }
}

export default RankedMatchingScreen
