import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './style'
import NotchView from '../../../components/notchView'
import { SCENE_KEYS, navigationPush } from '../../../services/navigationService'

import PROFILE_PIC from '../../../assets/profile2.jpg'
import SWORD from '../../../assets/sword.png'

class MatchingScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView color={'#E2871A'} />
                <View style={styles.contentContainer}>
                    <Text style={styles.courseText}>TÜRKÇE</Text>
                    <Text style={styles.subjectText}>Paragrafta Anlam</Text>
                </View>
                <View style={styles.user1Container}>
                    <View style={styles.user1PicContainer}>
                        <Image
                            source={PROFILE_PIC}
                            style={styles.user1Pic}
                        />
                    </View>
                    <View style={styles.user1InfoContainer}>
                        <Text style={styles.usernameText}>@haqotherage</Text>
                        <Text style={styles.sinaviaScoreText}>Sınavia Puanı: 20</Text>
                    </View>
                </View>
                <View style={styles.separatorContainer}>
                    <View style={styles.separatorLineLeft} />
                    <Image
                        source={SWORD}
                        style={styles.sword}
                    />
                    <View style={styles.separatorLineRight} />
                </View>
                <View style={styles.user2Container}>
                    <View style={styles.user2InfoContainer}>
                        <Text style={styles.usernameText}>@haqotherage</Text>
                        <Text style={styles.sinaviaScoreText}>Sınavia Puanı: 20</Text>
                    </View>
                    <View style={styles.user2PicContainer}>
                        <Image
                            source={PROFILE_PIC}
                            style={styles.user1Pic}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

export default MatchingScreen
