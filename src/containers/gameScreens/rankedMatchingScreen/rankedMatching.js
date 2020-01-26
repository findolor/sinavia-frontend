import React from 'react'
import { View, Text, Image, ImageBackground } from 'react-native'
import styles from './style'
import NotchView from '../../../components/notchView'
import {
    SCENE_KEYS,
    navigationReplace,
    navigationReset
} from '../../../services/navigationService'
import { levelFinder } from '../../../services/userLevelFinder'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import * as Animatable from 'react-native-animatable'
import SWORD from '../../../assets/sword.png'
import LOCATION_IMG from '../../../assets/gameScreens/location.png'

class RankedMatchingScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        // Waits for 5 sec and moves onto game screen
        this.timeout = setTimeout(() => {
            this.props.room.removeAllListeners()
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

        this.props.room.onError(error => {
            console.log(error)
            clearTimeout(this.timeout)
            navigationReset('main')
        })

        this.props.room.onLeave(code => {
            console.log(code)
            clearTimeout(this.timeout)
            navigationReset('main')
        })
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
                                <Animatable.View
                                    style={styles.userPicContainer}
                                    animation="slideInLeft"
                                    useNativeDriver={true}
                                    duration={800}
                                    delay={400}
                                >
                                    <Image
                                        source={{
                                            uri: this.props.playerProfilePicture
                                        }}
                                        style={styles.playerPic}
                                    />
                                </Animatable.View>
                                <Animatable.View
                                    style={styles.userInfoContainer}
                                    animation="slideInRight"
                                    useNativeDriver={true}
                                    duration={800}
                                    delay={800}
                                >
                                    <Text
                                        style={[
                                            styles.usernameText,
                                            { marginLeft: wp(3) }
                                        ]}
                                    >
                                        @{this.props.playerUsername}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.sinaviaScoreText,
                                            { marginLeft: wp(3) }
                                        ]}
                                    >
                                        Konu Seviyesi:{' '}
                                        {Math.floor(
                                            levelFinder(this.props.clientPoints)
                                                .level
                                        )}
                                    </Text>
                                    <View style={styles.locationView}>
                                        <Image
                                            source={LOCATION_IMG}
                                            style={[
                                                styles.locationImg,
                                                { marginLeft: wp(3) }
                                            ]}
                                        />
                                        <Text
                                            style={[
                                                styles.locationText,
                                                { marginLeft: wp(1.7) }
                                            ]}
                                        >
                                            {this.props.playerCity}
                                        </Text>
                                    </View>
                                </Animatable.View>
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
                                <Animatable.View
                                    style={styles.opponentInfoContainer}
                                    animation="slideInLeft"
                                    useNativeDriver={true}
                                    duration={800}
                                    delay={800}
                                >
                                    <Text
                                        style={[
                                            styles.usernameText,
                                            { marginRight: wp(3) }
                                        ]}
                                    >
                                        @{this.props.opponentUsername}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.sinaviaScoreText,
                                            { marginRight: wp(3) }
                                        ]}
                                    >
                                        Konu Seviyesi:{' '}
                                        {Math.floor(
                                            levelFinder(
                                                this.props.opponentPoints
                                            ).level
                                        )}
                                    </Text>
                                    <View
                                        style={[
                                            styles.locationView,
                                            { justifyContent: 'flex-end' }
                                        ]}
                                    >
                                        <Image
                                            source={LOCATION_IMG}
                                            style={[
                                                styles.locationImg,
                                                { marginRight: wp(1.7) }
                                            ]}
                                        />
                                        <Text
                                            style={[
                                                styles.locationText,
                                                { marginRight: wp(3) }
                                            ]}
                                        >
                                            {this.props.opponentCity}
                                        </Text>
                                    </View>
                                </Animatable.View>
                                <Animatable.View
                                    style={styles.opponentPicContainer}
                                    animation="slideInRight"
                                    useNativeDriver={true}
                                    duration={800}
                                    delay={400}
                                >
                                    <Image
                                        source={{
                                            uri: this.props
                                                .opponentProfilePicture
                                        }}
                                        style={styles.playerPic}
                                    />
                                </Animatable.View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.separatorView}>
                        <View style={styles.separatorLine} />
                        <View style={styles.separatorCircle}>
                            <Animatable.View
                                animation="bounceIn"
                                duration={800}
                                delay={2000}
                            >
                                <Image source={SWORD} style={styles.swordPic} />
                            </Animatable.View>
                        </View>
                        <View style={styles.separatorLine} />
                    </View>
                </View>
            </View>
        )
    }
}

export default RankedMatchingScreen
