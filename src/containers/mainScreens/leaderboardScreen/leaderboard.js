import React from 'react'
import {
    Image,
    ImageBackground,
    Modal,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import styles from './style'
import NotchView from '../../../components/notchView'
import PROFILE_PIC from '../../../assets/profile2.jpg'
import FIRST_TITLE from '../../../assets/firstTitle.png'
import SECOND_TITLE from '../../../assets/secondTitle.png'
import THIRD_TITLE from '../../../assets/thirdTitle.png'
import SLIDE_DOWN from '../../../assets/slide_down.png'
import SLIDE_UP from '../../../assets/slide_up.png'

class Leaderboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                >
                    <NotchView color={'#fcfcfc'} />
                    <View style={styles.leaderContainer}>
                        <View style={styles.tabbarContainer}>
                            <View style={styles.globalTabContainer}>
                                <Text style={styles.tabbarGlobalText}>
                                    Global
                                </Text>
                            </View>
                            <View style={styles.friendsTabContainer}>
                                <Text style={styles.tabbarFriendsText}>
                                    Arkadaş
                                </Text>
                            </View>
                        </View>
                        <View style={styles.dropdownsAndImageContainer}>
                            <View style={styles.coursesDropdownContainer} />
                            <View style={styles.leaderImageContainer}>
                                <ImageBackground
                                    source={PROFILE_PIC}
                                    style={styles.firstUserPic}
                                    imageStyle={{ borderRadius: 100 }}
                                >
                                    <Image
                                        source={FIRST_TITLE}
                                        style={styles.firstUserTitlePic}
                                    />
                                    <View style={styles.firstUserOrderView}>
                                        <Text style={styles.topTenOrderNumber}>
                                            1
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </View>
                            <View style={styles.subjectsDropdownContainer} />
                        </View>
                        <View style={styles.nameAndScoreContainer}>
                            <Text style={styles.nameText}>Hakan Yılmaz</Text>
                            <Text style={styles.scoreText}>
                                Sınavia Puanı: 400
                            </Text>
                        </View>
                    </View>
                    <View style={styles.topTenContainer}>
                        <View style={styles.dividedTopTenContainer}>
                            <View style={styles.topTenUserContainer}>
                                <View style={styles.topTenUserPicContainer}>
                                    <ImageBackground
                                        source={PROFILE_PIC}
                                        style={
                                            styles.secondAndThirdUsersFromTopTenPic
                                        }
                                        imageStyle={{ borderRadius: 100 }}
                                    >
                                        <Image
                                            source={SECOND_TITLE}
                                            style={
                                                styles.secondAndThirdTitlePic
                                            }
                                        />
                                        <View
                                            style={
                                                styles.secondToTenUsersOrderView
                                            }
                                        >
                                            <Text
                                                style={styles.topTenOrderNumber}
                                            >
                                                2
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                                <View style={styles.topTenUserNameContainer}>
                                    <Text style={styles.topTenUserNameText}>
                                        Hakan Yılmaz
                                    </Text>
                                </View>
                                <View style={styles.topTenUserScoreContainer}>
                                    <Text style={styles.topTenUserScoreText}>
                                        400
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.topTenUserContainer}>
                                <View style={styles.topTenUserPicContainer}>
                                    <ImageBackground
                                        source={PROFILE_PIC}
                                        style={
                                            styles.secondAndThirdUsersFromTopTenPic
                                        }
                                        imageStyle={{ borderRadius: 100 }}
                                    >
                                        <Image
                                            source={THIRD_TITLE}
                                            style={
                                                styles.secondAndThirdTitlePic
                                            }
                                        />
                                        <View
                                            style={
                                                styles.secondToTenUsersOrderView
                                            }
                                        >
                                            <Text
                                                style={styles.topTenOrderNumber}
                                            >
                                                3
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                                <View style={styles.topTenUserNameContainer}>
                                    <Text style={styles.topTenUserNameText}>
                                        Hakan Yılmaz
                                    </Text>
                                </View>
                                <View style={styles.topTenUserScoreContainer}>
                                    <Text style={styles.topTenUserScoreText}>
                                        400
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.topTenUserContainer}>
                                <View style={styles.topTenUserPicContainer}>
                                    <ImageBackground
                                        source={PROFILE_PIC}
                                        style={styles.otherUsersFromTopTenPic}
                                        imageStyle={{ borderRadius: 100 }}
                                    >
                                        <View
                                            style={
                                                styles.secondToTenUsersOrderView
                                            }
                                        >
                                            <Text
                                                style={styles.topTenOrderNumber}
                                            >
                                                4
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                                <View style={styles.topTenUserNameContainer}>
                                    <Text style={styles.topTenUserNameText}>
                                        Hakan Yılmaz
                                    </Text>
                                </View>
                                <View style={styles.topTenUserScoreContainer}>
                                    <Text style={styles.topTenUserScoreText}>
                                        400
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.dividedTopTenContainer}>
                            <View style={styles.topTenUserContainer}>
                                <View style={styles.topTenUserPicContainer}>
                                    <ImageBackground
                                        source={PROFILE_PIC}
                                        style={styles.otherUsersFromTopTenPic}
                                        imageStyle={{ borderRadius: 100 }}
                                    >
                                        <View
                                            style={
                                                styles.secondToTenUsersOrderView
                                            }
                                        >
                                            <Text
                                                style={styles.topTenOrderNumber}
                                            >
                                                5
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                                <View style={styles.topTenUserNameContainer}>
                                    <Text style={styles.topTenUserNameText}>
                                        Hakan Yılmaz
                                    </Text>
                                </View>
                                <View style={styles.topTenUserScoreContainer}>
                                    <Text style={styles.topTenUserScoreText}>
                                        400
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.topTenUserContainer}>
                                <View style={styles.topTenUserPicContainer}>
                                    <ImageBackground
                                        source={PROFILE_PIC}
                                        style={styles.otherUsersFromTopTenPic}
                                        imageStyle={{ borderRadius: 100 }}
                                    >
                                        <View
                                            style={
                                                styles.secondToTenUsersOrderView
                                            }
                                        >
                                            <Text
                                                style={styles.topTenOrderNumber}
                                            >
                                                6
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                                <View style={styles.topTenUserNameContainer}>
                                    <Text style={styles.topTenUserNameText}>
                                        Hakan Yılmaz
                                    </Text>
                                </View>
                                <View style={styles.topTenUserScoreContainer}>
                                    <Text style={styles.topTenUserScoreText}>
                                        400
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.topTenUserContainer}>
                                <View style={styles.topTenUserPicContainer}>
                                    <ImageBackground
                                        source={PROFILE_PIC}
                                        style={styles.otherUsersFromTopTenPic}
                                        imageStyle={{ borderRadius: 100 }}
                                    >
                                        <View
                                            style={
                                                styles.secondToTenUsersOrderView
                                            }
                                        >
                                            <Text
                                                style={styles.topTenOrderNumber}
                                            >
                                                7
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                                <View style={styles.topTenUserNameContainer}>
                                    <Text style={styles.topTenUserNameText}>
                                        Hakan Yılmaz
                                    </Text>
                                </View>
                                <View style={styles.topTenUserScoreContainer}>
                                    <Text style={styles.topTenUserScoreText}>
                                        400
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.dividedTopTenContainer}>
                            <View style={styles.topTenUserContainer}>
                                <View style={styles.topTenUserPicContainer}>
                                    <ImageBackground
                                        source={PROFILE_PIC}
                                        style={styles.otherUsersFromTopTenPic}
                                        imageStyle={{ borderRadius: 100 }}
                                    >
                                        <View
                                            style={
                                                styles.secondToTenUsersOrderView
                                            }
                                        >
                                            <Text
                                                style={styles.topTenOrderNumber}
                                            >
                                                8
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                                <View style={styles.topTenUserNameContainer}>
                                    <Text style={styles.topTenUserNameText}>
                                        Hakan Yılmaz
                                    </Text>
                                </View>
                                <View style={styles.topTenUserScoreContainer}>
                                    <Text style={styles.topTenUserScoreText}>
                                        400
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.topTenUserContainer}>
                                <View style={styles.topTenUserPicContainer}>
                                    <ImageBackground
                                        source={PROFILE_PIC}
                                        style={styles.otherUsersFromTopTenPic}
                                        imageStyle={{ borderRadius: 100 }}
                                    >
                                        <View
                                            style={
                                                styles.secondToTenUsersOrderView
                                            }
                                        >
                                            <Text
                                                style={styles.topTenOrderNumber}
                                            >
                                                9
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                                <View style={styles.topTenUserNameContainer}>
                                    <Text style={styles.topTenUserNameText}>
                                        Hakan Yılmaz
                                    </Text>
                                </View>
                                <View style={styles.topTenUserScoreContainer}>
                                    <Text style={styles.topTenUserScoreText}>
                                        400
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.topTenUserContainer}>
                                <View style={styles.topTenUserPicContainer}>
                                    <ImageBackground
                                        source={PROFILE_PIC}
                                        style={styles.otherUsersFromTopTenPic}
                                        imageStyle={{ borderRadius: 100 }}
                                    >
                                        <View
                                            style={
                                                styles.secondToTenUsersOrderView
                                            }
                                        >
                                            <Text
                                                style={styles.topTenOrderNumber}
                                            >
                                                10
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                                <View style={styles.topTenUserNameContainer}>
                                    <Text style={styles.topTenUserNameText}>
                                        Hakan Yılmaz
                                    </Text>
                                </View>
                                <View style={styles.topTenUserScoreContainer}>
                                    <Text style={styles.topTenUserScoreText}>
                                        400
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.continueOrderTextContainer}>
                        <Image
                            source={SLIDE_DOWN}
                            style={styles.slideDownLeftImg}
                        />
                        <Text style={styles.continueOrderText}>
                            Sıralamanın devamı için kaydır
                        </Text>
                        <Image
                            source={SLIDE_DOWN}
                            style={styles.slideDownRightImg}
                        />
                    </View>
                    <View style={styles.tenToHundredUserRow}>
                        <View style={styles.tenToHundredUserOrderContainer}>
                            <Text style={styles.tenToHundredUserOrderText}>
                                11
                            </Text>
                        </View>
                        <View style={styles.tenToHundredUserNameContainer}>
                            <Text style={styles.tenToHundredUserNameText}>
                                Oğuz Liv
                            </Text>
                        </View>
                        <View style={styles.tenToHundredUserScoreContainer}>
                            <Text style={styles.tenToHundredUserScoreText}>
                                400
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tenToHundredUserRow}>
                        <View style={styles.tenToHundredUserOrderContainer}>
                            <Text style={styles.tenToHundredUserOrderText}>
                                12
                            </Text>
                        </View>
                        <View style={styles.tenToHundredUserNameContainer}>
                            <Text style={styles.tenToHundredUserNameText}>
                                Hakan Yılmaz
                            </Text>
                        </View>
                        <View style={styles.tenToHundredUserScoreContainer}>
                            <Text style={styles.tenToHundredUserScoreText}>
                                400
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.yourOrderTextContainer}>
                    <Text style={styles.yourOrderText}>
                        Senin Sıralaman: 300
                    </Text>
                </View>
            </View>
        )
    }
}

export default Leaderboard
