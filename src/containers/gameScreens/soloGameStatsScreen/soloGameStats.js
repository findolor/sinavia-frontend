import React from 'react'
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Dimensions
} from 'react-native'
import {
    navigationReset,
    navigationReplace
} from '../../../services/navigationService'
import { SCENE_KEYS } from '../../../config/'
import { connect } from 'react-redux'
import { clientActions } from '../../../redux/client/actions'

import styles from './style'
import background from '../../../assets/gameScreens/gameStatsBackground.jpg'
import slideUp from '../../../assets/gameScreens/slideUp.png'
import slideDown from '../../../assets/gameScreens/slideDown.png'
import correct from '../../../assets/gameScreens/correct.png'
import incorrect from '../../../assets/gameScreens/incorrect.png'
import unanswered from '../../../assets/gameScreens/unanswered.png'
import selectedFav from '../../../assets/favori.png'
import unselectedFav from '../../../assets/favori_bos.png'
import SINAVIA_LOGO from '../../../assets/sinavia_logo_cut.png'

import PROFILE_IMG from '../../../assets/profile2.jpg'

import YOU_WIN_LOGO from '../../../assets/gameScreens/win.png'
import YOU_LOSE_LOGO from '../../../assets/gameScreens/lose.png'
import DRAW_LOGO from '../../../assets/gameScreens/draw.png'

const REPLAY_NORMAL_BORDER = '#00D9EF'
const REPLAY_ACTIVE_BORDER = 'green'
const REPLAY_DEACTIVE_BORDER = 'red'

export default class SoloGameStats extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            screenPosition: 1
        }
    }

    // Used for getting the index of questions from scroll view
    handleScrollHorizontal = event => {
        this.scrollX = event.nativeEvent.contentOffset.x
        this.setState(
            {
                questionPosition: Math.min(
                    Math.max(
                        Math.floor(
                            this.scrollX /
                            Math.round(Dimensions.get('window').width) +
                            0.5
                        ) + 1,
                        0
                    ),
                    Object.keys(this.props.questionList).length /*Image count*/
                )
            },
            this.checkFavouriteStatus()
        )
    }

    // Used for getting the index of screen from scroll view
    handleScrollVertical = event => {
        this.scrollY = event.nativeEvent.contentOffset.y
        this.setState({
            screenPosition: Math.min(
                Math.max(
                    Math.floor(
                        this.scrollY /
                        Math.round(Dimensions.get('window').height) +
                        0.5
                    ) + 1,
                    0
                ),
                2 // Screen number which is 2
            )
        })
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
                    <View style={styles.logoContainer}>
                        <Image
                            source={SINAVIA_LOGO}
                            style={styles.logoImg}
                        />
                    </View>
                    <View style={styles.resultsContainer}>
                        <View style={styles.courseTextView}>
                            <Text style={styles.courseText}>Paragrafta Anlam</Text>
                        </View>
                        <View style={styles.userAndResultView}>
                            <View style={styles.userView}>
                                <Image
                                    source={PROFILE_IMG}
                                    style={styles.profilePic}
                                />
                                <Text style={styles.usernameText}>arcaaltunsu</Text>
                            </View>
                            <View style={styles.resultView}>
                                <View style={styles.dividedAnswer}>
                                    <Image
                                        source={correct}
                                        style={styles.answerImg}
                                    />
                                    <Text style={styles.numbers}>
                                        5 Doğru
                                    </Text>
                                </View>
                                <View style={styles.dividedAnswer}>
                                    <Image
                                        source={incorrect}
                                        style={styles.answerImg}
                                    />
                                    <Text style={styles.numbers}>
                                        5 Yanlış
                                    </Text>
                                </View>
                                <View style={styles.dividedAnswer}>
                                    <Image
                                        source={unanswered}
                                        style={styles.answerImg}
                                    />
                                    <Text style={styles.numbers}>
                                        5 Boş
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity>
                            <View
                                style={styles.replayButton}
                            >
                                <Text style={styles.buttonText}>Yeniden</Text>
                                <Text style={styles.buttonText}>Oyna</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
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
                                    this.state.screenPosition === 1
                                        ? slideUp
                                        : slideDown
                                }
                                style={styles.slideUpImg}
                            />
                            <Text style={styles.slideViewText}>
                                {' '}
                                {this.state.screenPosition === 1
                                    ? 'SORULARI GÖRMEK İÇİN KAYDIR'
                                    : 'SONUÇLARI GÖRMEK İÇİN KAYDIR'}{' '}
                            </Text>
                            <Image
                                source={
                                    this.state.screenPosition === 1
                                        ? slideUp
                                        : slideDown
                                }
                                style={styles.slideUpImg}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.secondScreenView}>
                    <View style={styles.questionNumberContainer}>
                        <Text style={styles.questionNumberText}>
                            4/
                            5
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
                    <View style={styles.favAndAnswerContainer}>
                        <View style={styles.answerContainer}>
                            <View
                                style={[
                                    styles.correctAnswer,
                                    { backgroundColor: 'white' }
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.optionText,
                                        { color: '#00D9EF' }
                                    ]}
                                >
                                    D
                                </Text>
                            </View>
                            <Text style={styles.answerText}>Doğru Cevap</Text>
                        </View>
                        <View style={styles.favIconContainer}>
                            <TouchableOpacity onPress={this.favouriteOnPress}>
                                <Image
                                    source={unselectedFav}
                                    style={styles.favIcon}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.answerContainer}>
                            <View
                                style={[
                                    styles.correctAnswer,
                                    {
                                        backgroundColor: 'white'
                                    }
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.optionText,
                                        { color: '#00D9EF' }
                                    ]}
                                >
                                    A
                                </Text>
                            </View>
                            <Text style={styles.answerText}>Senin Cevabın</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
