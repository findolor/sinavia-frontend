import React from 'react'
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Dimensions
} from 'react-native'
import { navigationReset } from '../../../services/navigationService'
import { SCENE_KEYS } from '../../../config/'

import styles from './style'
import background from '../../../assets/gameScreens/gameStatsBackground.jpg'
import slideUp from '../../../assets/gameScreens/slideUp.png'
import slideDown from '../../../assets/gameScreens/slideDown.png'
import correct from '../../../assets/gameScreens/correct.png'
import incorrect from '../../../assets/gameScreens/incorrect.png'
import unanswered from '../../../assets/gameScreens/unanswered.png'
import selectedFav from '../../../assets/favori.png'
import unselectedFav from '../../../assets/favori_bos.png'

import YOU_WIN_LOGO from '../../../assets/gameScreens/win.png'
import YOU_LOSE_LOGO from '../../../assets/gameScreens/lose.png'
import DRAW_LOGO from '../../../assets/gameScreens/draw.png'
import PROFILE_PIC from '../../../assets/profile2.jpg'
import { widthPercentageToDP } from "react-native-responsive-screen"

const REPLAY_NORMAL_BORDER = '#00D9EF'
const REPLAY_ACTIVE_BORDER = 'green'
const REPLAY_DEACTIVE_BORDER = 'red'

class FriendGameStatsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            totalFriendGamesPlayed: 0,
            clientWinCount: 10,
            opponentWinCount:10
        }
    }

    render() {
        return (
            <ScrollView
                pagingEnabled={true}
                showsVerticalScrollIndicator={false}
                onScroll={this.handleScrollVertical}
                scrollEventThrottle={8}
            >
                <View style={styles.container}>
                    <Image source={background} style={styles.background} />
                    <View style={styles.resultTextContainer}>
                        <Image
                            source={YOU_WIN_LOGO}
                            style={styles.resultTextImg}
                        />
                    </View>
                    <View style={styles.resultsContainer}>
                        <View style={styles.userPicsContainer}>
                            <View style={styles.user1Container}>
                                <Image
                                    source={PROFILE_PIC}
                                    style={styles.profilePic}
                                />
                                <Text style={styles.usernameText}>
                                    haqotherage
                                </Text>
                            </View>
                            <View style={styles.user2Container}>
                                <Image
                                    source={PROFILE_PIC}
                                    style={styles.profilePic}
                                />
                                <Text style={styles.usernameText}>
                                    haqotherage
                                </Text>
                            </View>
                        </View>
                        <View style={styles.resultsAndStatisticsContainer}>
                                <View style={styles.dividedAnswer}>
                                    <View style={styles.numberContainer}>
                                        <Text style={styles.numbers}>
                                            10
                                        </Text>
                                    </View>
                                    <Image
                                        source={correct}
                                        style={styles.answerImg}
                                    />
                                    <View style={styles.numberContainer}>
                                        <Text style={styles.numbers}>
                                            3
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.dividedAnswer}>
                                    <View style={styles.numberContainer}>
                                        <Text style={styles.numbers}>
                                            3
                                        </Text>
                                    </View>
                                    <Image
                                        source={incorrect}
                                        style={styles.answerImg}
                                    />
                                    <View style={styles.numberContainer}>
                                        <Text style={styles.numbers}>
                                            3
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.dividedAnswer}>
                                    <View style={styles.numberContainer}>
                                        <Text style={styles.numbers}>
                                            3
                                        </Text>
                                    </View>
                                    <Image
                                        source={unanswered}
                                        style={styles.answerImg}
                                    />
                                    <View style={styles.numberContainer}>
                                        <Text style={styles.numbers}>
                                            3
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.versusGameStatsBox}>
                                    <View style={styles.versusGameTextsContainer}>
                                        <View style={styles.versusGameTitleContainer}>
                                            <Text style={styles.versusGameTitleText}>
                                                Aranızdaki Oyunlar
                                            </Text>
                                        </View>
                                        <View style={styles.versusGameTotalContainer}>
                                            <Text style={styles.versusTotalText}>
                                                Toplam Oyun{' '}
                                            </Text>
                                            <Text style={styles.versusTotalCounter}>
                                                {this.state.totalFriendGamesPlayed}
                                            </Text>
                                        </View>
                                    </View>
                                    {this.state.clientWinCount > 0 &&
                                    this.state.opponentWinCount > 0 && (
                                        <View style={styles.versusGameChartContainer}>
                                            <View
                                                style={[
                                                    styles.yourWinsView,
                                                    {
                                                        width: widthPercentageToDP(
                                                            (this.state.clientWinCount /
                                                                (this.state
                                                                        .clientWinCount +
                                                                    this.state
                                                                        .opponentWinCount)) *
                                                            82
                                                        )
                                                    }
                                                ]}
                                            />
                                            <View
                                                style={[
                                                    styles.opponentsWinsView,
                                                    {
                                                        width: widthPercentageToDP(
                                                            (this.state
                                                                    .opponentWinCount /
                                                                (this.state
                                                                        .clientWinCount +
                                                                    this.state
                                                                        .opponentWinCount)) *
                                                            82
                                                        )
                                                    }
                                                ]}
                                            />
                                            <Text style={styles.yourWinsCounter}>
                                                {this.state.clientWinCount}
                                            </Text>
                                            <Text style={styles.opponentWinsCounter}>
                                                {this.state.opponentWinCount}
                                            </Text>
                                        </View>
                                    )}
                                    {this.state.clientWinCount > 0 &&
                                    this.state.opponentWinCount === 0 && (
                                        <View style={styles.versusGameChartContainer}>
                                            <View
                                                style={[
                                                    styles.yourWinsView,
                                                    {
                                                        width: widthPercentageToDP(82),
                                                        borderTopRightRadius: 10,
                                                        borderBottomRightRadius: 10
                                                    }
                                                ]}
                                            />
                                            <Text style={styles.yourWinsCounter}>
                                                {this.state.clientWinCount}
                                            </Text>
                                            <Text style={styles.opponentWinsCounter}>
                                                {this.state.opponentWinCount}
                                            </Text>
                                        </View>
                                    )}
                                    {this.state.clientWinCount === 0 &&
                                    this.state.opponentWinCount > 0 && (
                                        <View style={styles.versusGameChartContainer}>
                                            <View
                                                style={[
                                                    styles.opponentsWinsView,
                                                    {
                                                        width: widthPercentageToDP(82),
                                                        borderTopLeftRadius: 10,
                                                        borderBottomLeftRadius: 10
                                                    }
                                                ]}
                                            />
                                            <Text style={styles.yourWinsCounter}>
                                                {this.state.clientWinCount}
                                            </Text>
                                            <Text style={styles.opponentWinsCounter}>
                                                {this.state.opponentWinCount}
                                            </Text>
                                        </View>
                                    )}
                                    <View style={styles.versusGameNamesContainer}>
                                        <Text style={styles.versusGameTitleText}>Sen</Text>
                                        <Text style={styles.versusGameTitleText}>
                                            Hakan Yılmaz
                                        </Text>
                                    </View>
                                </View>
                            </View>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                        >
                            <View
                                style={[
                                    styles.replayButton,
                                    {
                                        borderColor: this.state
                                            .replayButtonBorderColor,
                                        borderWidth: 1
                                    }
                                ]}
                            >
                                <Text style={styles.buttonText}>Yeniden</Text>
                                <Text style={styles.buttonText}>Oyna</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                        >
                            <View style={styles.mainScreenButton}>
                                <Text style={styles.buttonText}>Ana</Text>
                                <Text style={styles.buttonText}>Menü</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.slideView}>
                        <View style={styles.slideUpContainer}>
                            <Image
                                source={
                                    slideUp
                                }
                                style={styles.slideUpImg}
                            />
                            <Text style={styles.slideViewText}>
                                {' '}
                                {this.state.screenPosition === 1
                                    ? 'SORULARI GÖRMEK İÇİN KAYDIR'
                                    : 'PUANLARI GÖRMEK İÇİN KAYDIR'}{' '}
                            </Text>
                            <Image
                                source={slideUp}
                                style={styles.slideUpImg}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.secondScreenView}>
                    <View style={styles.questionNumberContainer}>
                        <Text style={styles.questionNumberText}>
                            3/5
                        </Text>
                    </View>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}
                        onScroll={this.handleScrollHorizontal}
                        scrollEventThrottle={8}
                    >

                    </ScrollView>
                </View>
            </ScrollView>
        )
    }
}

export default FriendGameStatsScreen
