import React from 'react'
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Modal
} from 'react-native'
import {
    navigationReset,
    navigationReplace
} from '../../../services/navigationService'
import { SCENE_KEYS } from '../../../config/'
import styles from './style'
import { connect } from 'react-redux'
import { clientActions } from '../../../redux/client/actions'

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
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import premiumStyles from '../../mainScreens/purchaseScreen/style'
import LinearGradient from 'react-native-linear-gradient'

const REPLAY_NORMAL_BORDER = '#00D9EF'
const REPLAY_ACTIVE_BORDER = '#11DD56'
const REPLAY_DEACTIVE_BORDER = ''

class FriendGameStatsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // Client match results
            correctAnswerNumber: 0,
            incorrectAnswerNumber: 0,
            unansweredAnswerNumber: 0,
            // Opponent match results
            opponentCorrectAnswerNumber: 0,
            opponentInorrectAnswerNumber: 0,
            opponentUnansweredAnswerNumber: 0,
            // Opponent username
            clientUsername: '',
            opponentUsername: '',
            // Match result text
            matchResultText: '',
            // Player profile pictures
            clientProfilePicture: '',
            opponentProfilePicture: '',
            // Match result logo
            matchResultLogo: null,
            // Question position
            questionPosition: 1,
            // A list to feed into the scroll view
            allQuestionsList: [],
            // Screen position
            screenPosition: 1,
            // User answer background color. Changes depending on the result
            answerBackgroundColor: '',
            // Replay button press number. If it is one opponent has pressed it.
            replayButtonPressNumber: 0,
            // Replay button border color
            replayButtonBorderColor: REPLAY_NORMAL_BORDER,
            // Replay button disabled
            isReplayButtonDisabled: false,
            // Fav icon selection
            favIconSelected: false,
            // Matches between the users
            playerFriendMatchWinCount: 0,
            opponentFriendMatchWinCount: 0,
            friendMatchesCount: 0,
            // Fav icon selection
            isFaved: false,
            // Fav icon
            favouriteIcon: unselectedFav,
            isModalVisible: false,
            // All the friend matches
            friendMatches: null
        }
    }

    async componentDidMount() {
        await this.loadScreen()
        this.props.room.onMessage.add(message => {
            this.chooseMessageAction(message)
        })
        this.props.room.onError.add(err => console.log(err))
    }

    chooseMessageAction = message => {
        switch (message.action) {
            case 'replay':
                if (this.state.replayButtonPressNumber === 0) {
                    this.setState({
                        replayButtonBorderColor: REPLAY_ACTIVE_BORDER,
                        replayButtonPressNumber: 1
                    })
                } else {
                    setTimeout(() => {
                        this.props.room.removeAllListeners()
                        navigationReplace(SCENE_KEYS.gameScreens.friendGame, {
                            room: this.props.room,
                            client: this.props.client,
                            playerUsername: this.props.playerUsername,
                            playerProfilePicture: this.props
                                .playerProfilePicture,
                            opponentUsername: this.props.opponentUsername,
                            opponentId: this.props.opponentId,
                            opponentProfilePicture: this.props
                                .opponentProfilePicture,
                            friendMatches: this.state.friendMatches
                        })
                    }, 2000)
                }
                return
            case 'client-leaving':
                this.setState({
                    replayButtonBorderColor: REPLAY_DEACTIVE_BORDER,
                    isReplayButtonDisabled: true
                })
                return
            case 'friend-matches':
                this.setState({ friendMatches: message.friendMatches })
                break
        }
    }

    // TODO Tidy up this code block
    // These could be implemented better
    loadScreen() {
        return new Promise(resolve => {
            const playerProps = this.props.playerProps
            const playerIds = Object.keys(playerProps)

            // If one of the users leave the game early
            // We mark number of questions they played in the match and delete the rest
            let undefinedQuestionIndex = -1

            let opponentCorrect = 0
            let opponentIncorrect = 0
            let opponentUnanswered = 0
            let opponentUsername = ''
            let opponentProfilePicture = ''
            let opponentFriendMatchWinCount = 0

            let playerCorrect = 0
            let playerIncorrect = 0
            let playerUnanswered = 0
            let playerUsername = ''
            let playerProfilePicture = ''
            let playerFriendMatchWinCount = 0

            let friendMatchesCount =
                Object.keys(this.props.friendMatches).length + 1

            playerIds.forEach(element => {
                if (element === 'matchInformation') return
                if (this.props.client.id !== element) {
                    opponentUsername = playerProps[element].username
                    opponentProfilePicture = playerProps[element].profilePicture
                    playerProps[element].answers.forEach(result => {
                        switch (result.result) {
                            case null:
                                opponentUnanswered++
                                break
                            case true:
                                opponentCorrect++
                                break
                            case false:
                                opponentIncorrect++
                                break
                        }
                    })
                } else {
                    playerUsername = playerProps[element].username
                    playerProfilePicture = playerProps[element].profilePicture
                    playerProps[element].answers.forEach((result, index) => {
                        switch (result.result) {
                            case null:
                                playerUnanswered++
                                break
                            case true:
                                playerCorrect++
                                break
                            case false:
                                playerIncorrect++
                                break
                        }
                        undefinedQuestionIndex = index
                    })
                }
            })

            let playerNet
            let opponentNet

            if (playerProps.matchInformation.examId !== 1) {
                playerNet = playerCorrect - playerIncorrect / 4
                opponentNet = opponentCorrect - opponentIncorrect / 4
            } else {
                playerNet = playerCorrect - playerIncorrect / 3
                opponentNet = opponentCorrect - opponentIncorrect / 3
            }

            this.props.friendMatches.forEach(friendMatch => {
                if (!friendMatch.isMatchDraw) {
                    if (friendMatch.winnerId === this.props.clientDBId)
                        playerFriendMatchWinCount++
                    else opponentFriendMatchWinCount++
                }
            })

            if (this.props.isMatchFinished) {
                if (playerNet < opponentNet) {
                    this.setState({
                        matchResultLogo: YOU_LOSE_LOGO,
                        matchResultText: 'Kaybettin'
                    })
                    opponentFriendMatchWinCount++
                } else if (playerNet === opponentNet) {
                    this.setState({
                        matchResultLogo: DRAW_LOGO,
                        matchResultText: 'Berabere'
                    })
                } else {
                    this.setState({
                        matchResultLogo: YOU_WIN_LOGO,
                        matchResultText: 'Kazandın'
                    })
                    playerFriendMatchWinCount++
                }
            } else {
                this.props.isWon === true
                    ? playerFriendMatchWinCount++
                    : opponentFriendMatchWinCount++
                this.setState({
                    matchResultLogo:
                        this.props.isWon === true
                            ? YOU_WIN_LOGO
                            : YOU_LOSE_LOGO,
                    matchResultText: true ? 'Kazandın' : 'Kaybettin',
                    isReplayButtonDisabled: true,
                    replayButtonBorderColor: REPLAY_DEACTIVE_BORDER
                })

                this.props.fullQuestionList.splice(
                    undefinedQuestionIndex + 1,
                    Object.keys(this.props.fullQuestionList).length -
                        undefinedQuestionIndex +
                        1
                )
                this.props.questionList.splice(
                    undefinedQuestionIndex + 1,
                    Object.keys(this.props.questionList).length -
                        undefinedQuestionIndex +
                        1
                )
            }

            const tempList = []

            for (i = 0; i < Object.keys(this.props.questionList).length; i++) {
                tempList.push(
                    <View style={styles.scrollQuestionContainer} key={i}>
                        <View style={styles.questionContainer}>
                            <Image
                                source={{ uri: this.props.questionList[i] }}
                                style={styles.questionStyle}
                            />
                        </View>
                    </View>
                )
            }

            this.setState(
                {
                    correctAnswerNumber: playerCorrect,
                    incorrectAnswerNumber: playerIncorrect,
                    unansweredAnswerNumber: playerUnanswered,
                    opponentCorrectAnswerNumber: opponentCorrect,
                    opponentInorrectAnswerNumber: opponentIncorrect,
                    opponentUnansweredAnswerNumber: opponentUnanswered,
                    clientProfilePicture: playerProfilePicture,
                    opponentProfilePicture: opponentProfilePicture,
                    clientUsername: playerUsername,
                    opponentUsername: opponentUsername,
                    playerFriendMatchWinCount: playerFriendMatchWinCount,
                    opponentFriendMatchWinCount: opponentFriendMatchWinCount,
                    friendMatchesCount: friendMatchesCount,
                    allQuestionsList: tempList
                },
                () => {
                    this.checkFavouriteStatus()
                    resolve(true)
                }
            )
        })
    }

    checkFavouriteStatus = () => {
        const index = this.props.favouriteQuestions.findIndex(
            x =>
                x.question.id ===
                this.props.fullQuestionList[this.state.questionPosition - 1].id
        )

        if (index === -1) {
            this.setState({
                favouriteIcon: unselectedFav,
                isFaved: false
            })
        } else {
            this.setState({ favouriteIcon: selectedFav, isFaved: true })
        }
    }

    // Used for getting the index of questions from scroll view
    handleScrollHorizontal = event => {
        this.scrollX = event.nativeEvent.contentOffset.x
        this.setState({
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
        })
        this.checkFavouriteStatus()
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

    answerSwitcher(buttonNumber) {
        switch (buttonNumber) {
            case 1:
                return 'A'
            case 2:
                return 'B'
            case 3:
                return 'C'
            case 4:
                return 'D'
            case 5:
                return 'E'
            case 6:
                return 'Boş'
        }
    }

    replayButtonOnPress = () => {
        if (this.state.replayButtonPressNumber === 0) {
            this.setState({
                replayButtonBorderColor: REPLAY_ACTIVE_BORDER,
                replayButtonPressNumber: 1,
                isReplayButtonDisabled: true
            })
            this.props.room.send({
                action: 'replay'
            })
        } else {
            this.setState({ isReplayButtonDisabled: true })
            this.props.room.send({
                action: 'replay'
            })
            this.props.room.send({
                action: 'reset-room'
            })
            setTimeout(() => {
                this.props.room.removeAllListeners()
                navigationReplace(SCENE_KEYS.gameScreens.friendGame, {
                    room: this.props.room,
                    client: this.props.client,
                    playerUsername: this.props.playerUsername,
                    playerProfilePicture: this.props.playerProfilePicture,
                    opponentUsername: this.props.opponentUsername,
                    opponentId: this.props.opponentId,
                    opponentProfilePicture: this.props.opponentProfilePicture,
                    friendMatches: this.state.friendMatches
                })
            }, 2000)
        }
    }

    mainScreenButtonOnPress = () => {
        this.props.room.leave()
        this.props.client.close()
        navigationReset('main')
    }

    favouriteOnPress = () => {
        if (this.props.clientInformation.isPremium) {
            if (this.state.isFaved) {
                this.props.unfavouriteQuestion(
                    this.props.clientToken,
                    this.props.clientDBId,
                    this.props.fullQuestionList[
                        this.state.questionPosition - 1
                    ],
                    this.props.favouriteQuestions
                )
                this.setState({ favouriteIcon: unselectedFav, isFaved: false })
            } else {
                this.props.favouriteQuestion(
                    this.props.clientToken,
                    this.props.clientDBId,
                    this.props.fullQuestionList[
                        this.state.questionPosition - 1
                    ],
                    this.props.favouriteQuestions
                )
                this.setState({ favouriteIcon: selectedFav, isFaved: true })
            }
        } else {
            this.setState({
                isModalVisible: true
            })
        }
    }

    closeModalButtonOnPress = () => {
        this.setState({
            isModalVisible: false
        })
    }

    premiumForFavoritesPage() {
        return (
            <View style={premiumStyles.premiumModal}>
                <TouchableOpacity
                    onPress={this.closeModalButtonOnPress}
                    style={{ height: hp(120), width: wp(100) }}
                />
                <View
                    style={[premiumStyles.premiumModalView, { height: hp(33) }]}
                >
                    <LinearGradient
                        colors={['white', '#FFE6BB', '#FFA800']}
                        style={[
                            premiumStyles.linearGradientPremiumModalView,
                            { height: hp(33) }
                        ]}
                    >
                        <View style={premiumStyles.premiumModalHeaderView}>
                            <Text style={premiumStyles.premiumModalHeaderText}>
                                ELİT ÖĞRENCİ PAKETİ
                            </Text>
                        </View>
                        <View style={premiumStyles.premiumModalSwiperContainer}>
                            <View style={premiumStyles.premiumModalSwiperView}>
                                <View
                                    style={
                                        premiumStyles.premiumModalSwiperImgView
                                    }
                                >
                                    <Image
                                        source={selectedFav}
                                        style={premiumStyles.premiumModalImg}
                                    />
                                </View>
                                <View
                                    style={[
                                        premiumStyles.premiumModalSwiperHeaderView,
                                        { height: hp(5.5) }
                                    ]}
                                >
                                    <Text
                                        style={
                                            premiumStyles.premiumModalHeaderText
                                        }
                                    >
                                        Soru Favorileme!
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        premiumStyles.premiumModalSwiperInfoView,
                                        {
                                            justifyContent: 'flex-start',
                                            height: hp(9.5)
                                        }
                                    ]}
                                >
                                    <Text
                                        style={[
                                            premiumStyles.premiumModalInfoText,
                                            { marginTop: hp(1.5) }
                                        ]}
                                    >
                                        Soru Favorileme şimdi Elit Öğrenci
                                        Paketi'nde
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </View>
        )
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
                            source={this.state.matchResultLogo}
                            style={styles.resultTextImg}
                        />
                    </View>
                    <View style={styles.resultsContainer}>
                        <View style={styles.userPicsContainer}>
                            <View style={styles.user1Container}>
                                <Image
                                    source={{
                                        uri: this.state.clientProfilePicture
                                    }}
                                    style={styles.profilePic}
                                />
                                <Text style={styles.usernameText}>
                                    {this.state.clientUsername}
                                </Text>
                            </View>
                            <View style={styles.user2Container}>
                                <Image
                                    source={{
                                        uri: this.state.opponentProfilePicture
                                    }}
                                    style={styles.profilePic}
                                />
                                <Text style={styles.usernameText}>
                                    {this.state.opponentUsername}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.resultsAndStatisticsContainer}>
                            <View style={styles.dividedAnswer}>
                                <View style={styles.numberContainer}>
                                    <Text style={styles.numbers}>
                                        {this.state.correctAnswerNumber}
                                    </Text>
                                </View>
                                <Image
                                    source={correct}
                                    style={styles.answerImg}
                                />
                                <View style={styles.numberContainer}>
                                    <Text style={styles.numbers}>
                                        {this.state.opponentCorrectAnswerNumber}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.dividedAnswer}>
                                <View style={styles.numberContainer}>
                                    <Text style={styles.numbers}>
                                        {this.state.incorrectAnswerNumber}
                                    </Text>
                                </View>
                                <Image
                                    source={incorrect}
                                    style={styles.answerImg}
                                />
                                <View style={styles.numberContainer}>
                                    <Text style={styles.numbers}>
                                        {
                                            this.state
                                                .opponentInorrectAnswerNumber
                                        }
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.dividedAnswer}>
                                <View style={styles.numberContainer}>
                                    <Text style={styles.numbers}>
                                        {this.state.unansweredAnswerNumber}
                                    </Text>
                                </View>
                                <Image
                                    source={unanswered}
                                    style={styles.answerImg}
                                />
                                <View style={styles.numberContainer}>
                                    <Text style={styles.numbers}>
                                        {
                                            this.state
                                                .opponentUnansweredAnswerNumber
                                        }
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.versusGameStatsBox}>
                                <View style={styles.versusGameTextsContainer}>
                                    <View
                                        style={styles.versusGameTitleContainer}
                                    >
                                        <Text
                                            style={styles.versusGameTitleText}
                                        >
                                            Aranızdaki Oyunlar
                                        </Text>
                                    </View>
                                    <View
                                        style={styles.versusGameTotalContainer}
                                    >
                                        <Text style={styles.versusTotalText}>
                                            Toplam Oyun{' '}
                                        </Text>
                                        <Text style={styles.versusTotalCounter}>
                                            {this.state.friendMatchesCount}
                                        </Text>
                                    </View>
                                </View>
                                {this.state.playerFriendMatchWinCount === 0 &&
                                    this.state.opponentFriendMatchWinCount ===
                                        0 && (
                                        <View
                                            style={
                                                styles.versusGameChartContainer
                                            }
                                        >
                                            <View
                                                style={[
                                                    styles.noneWinsView,
                                                    {
                                                        width: wp(82),
                                                        borderTopRightRadius: hp(
                                                            1
                                                        ),
                                                        borderBottomRightRadius: hp(
                                                            1
                                                        )
                                                    }
                                                ]}
                                            >
                                                <Text
                                                    style={
                                                        styles.noneWinsInfoText
                                                    }
                                                >
                                                    Henüz kazanan yok, hadi bunu
                                                    değiştir!
                                                </Text>
                                            </View>
                                            <Text
                                                style={styles.yourWinsCounter}
                                            >
                                                {
                                                    this.state
                                                        .playerFriendMatchWinCount
                                                }
                                            </Text>
                                            <Text
                                                style={
                                                    styles.opponentWinsCounter
                                                }
                                            >
                                                {
                                                    this.state
                                                        .opponentFriendMatchWinCount
                                                }
                                            </Text>
                                        </View>
                                    )}
                                {this.state.playerFriendMatchWinCount > 0 &&
                                    this.state.opponentFriendMatchWinCount >
                                        0 && (
                                        <View
                                            style={
                                                styles.versusGameChartContainer
                                            }
                                        >
                                            <View
                                                style={[
                                                    styles.yourWinsView,
                                                    {
                                                        width: wp(
                                                            (this.state
                                                                .playerFriendMatchWinCount /
                                                                (this.state
                                                                    .playerFriendMatchWinCount +
                                                                    this.state
                                                                        .opponentFriendMatchWinCount)) *
                                                                82
                                                        )
                                                    }
                                                ]}
                                            />
                                            <View
                                                style={[
                                                    styles.opponentsWinsView,
                                                    {
                                                        width: wp(
                                                            (this.state
                                                                .opponentFriendMatchWinCount /
                                                                (this.state
                                                                    .playerFriendMatchWinCount +
                                                                    this.state
                                                                        .opponentFriendMatchWinCount)) *
                                                                82
                                                        )
                                                    }
                                                ]}
                                            />
                                            <Text
                                                style={styles.yourWinsCounter}
                                            >
                                                {
                                                    this.state
                                                        .playerFriendMatchWinCount
                                                }
                                            </Text>
                                            <Text
                                                style={
                                                    styles.opponentWinsCounter
                                                }
                                            >
                                                {
                                                    this.state
                                                        .opponentFriendMatchWinCount
                                                }
                                            </Text>
                                        </View>
                                    )}
                                {this.state.playerFriendMatchWinCount > 0 &&
                                    this.state.opponentFriendMatchWinCount ===
                                        0 && (
                                        <View
                                            style={
                                                styles.versusGameChartContainer
                                            }
                                        >
                                            <View
                                                style={[
                                                    styles.yourWinsView,
                                                    {
                                                        width: wp(82),
                                                        borderTopRightRadius: hp(
                                                            1
                                                        ),
                                                        borderBottomRightRadius: hp(
                                                            1
                                                        )
                                                    }
                                                ]}
                                            />
                                            <Text
                                                style={styles.yourWinsCounter}
                                            >
                                                {
                                                    this.state
                                                        .playerFriendMatchWinCount
                                                }
                                            </Text>
                                            <Text
                                                style={
                                                    styles.opponentWinsCounter
                                                }
                                            >
                                                {
                                                    this.state
                                                        .opponentFriendMatchWinCount
                                                }
                                            </Text>
                                        </View>
                                    )}
                                {this.state.playerFriendMatchWinCount === 0 &&
                                    this.state.opponentFriendMatchWinCount >
                                        0 && (
                                        <View
                                            style={
                                                styles.versusGameChartContainer
                                            }
                                        >
                                            <View
                                                style={[
                                                    styles.opponentsWinsView,
                                                    {
                                                        width: wp(82),
                                                        borderTopLeftRadius: hp(
                                                            1
                                                        ),
                                                        borderBottomLeftRadius: hp(
                                                            1
                                                        )
                                                    }
                                                ]}
                                            />
                                            <Text
                                                style={styles.yourWinsCounter}
                                            >
                                                {
                                                    this.state
                                                        .playerFriendMatchWinCount
                                                }
                                            </Text>
                                            <Text
                                                style={
                                                    styles.opponentWinsCounter
                                                }
                                            >
                                                {
                                                    this.state
                                                        .opponentFriendMatchWinCount
                                                }
                                            </Text>
                                        </View>
                                    )}
                                <View style={styles.versusGameNamesContainer}>
                                    <Text style={styles.versusGameTitleText}>
                                        Sen
                                    </Text>
                                    <Text style={styles.versusGameTitleText}>
                                        {this.state.opponentUsername}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            onPress={this.replayButtonOnPress}
                            disabled={this.state.isReplayButtonDisabled}
                        >
                            <View
                                style={[
                                    styles.replayButton,
                                    {
                                        backgroundColor: this.state
                                            .replayButtonBorderColor,
                                        opacity:
                                            this.state
                                                .replayButtonBorderColor ===
                                            REPLAY_DEACTIVE_BORDER
                                                ? 0.5
                                                : 1
                                    }
                                ]}
                            >
                                <Text style={styles.buttonText}>Yeniden</Text>
                                <Text style={styles.buttonText}>Oyna</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.mainScreenButtonOnPress}
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
                                    : 'PUANLARI GÖRMEK İÇİN KAYDIR'}{' '}
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
                    <Modal
                        visible={this.state.isModalVisible}
                        transparent={true}
                        animationType={'fade'}
                    >
                        {this.premiumForFavoritesPage()}
                    </Modal>
                    <View style={styles.questionNumberContainer}>
                        <Text style={styles.questionNumberText}>
                            {this.state.questionPosition}/
                            {Object.keys(this.state.allQuestionsList).length}
                        </Text>
                    </View>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}
                        onScroll={this.handleScrollHorizontal}
                        scrollEventThrottle={8}
                    >
                        {this.state.allQuestionsList}
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
                                    {this.answerSwitcher(
                                        this.props.playerProps[
                                            this.props.client.id
                                        ].answers[
                                            this.state.questionPosition - 1
                                        ].correctAnswer
                                    )}
                                </Text>
                            </View>
                            <Text style={styles.answerText}>Doğru Cevap</Text>
                        </View>
                        <View style={styles.favIconContainer}>
                            <TouchableOpacity onPress={this.favouriteOnPress}>
                                <Image
                                    source={this.state.favouriteIcon}
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
                                    {this.answerSwitcher(
                                        this.props.playerProps[
                                            this.props.client.id
                                        ].answers[
                                            this.state.questionPosition - 1
                                        ].answer
                                    )}
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

const mapStateToProps = state => ({
    clientDBId: state.client.clientDBId,
    clientToken: state.client.clientToken,
    favouriteQuestions: state.client.favouriteQuestions,
    clientInformation: state.client.clientInformation
})

const mapDispatchToProps = dispatch => ({
    favouriteQuestion: (clientToken, clientId, question, favedQuestionList) =>
        dispatch(
            clientActions.favouriteQuestion(
                clientToken,
                clientId,
                question,
                favedQuestionList
            )
        ),
    unfavouriteQuestion: (clientToken, clientId, question, favedQuestionList) =>
        dispatch(
            clientActions.unfavouriteQuestion(
                clientToken,
                clientId,
                question,
                favedQuestionList
            )
        )
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FriendGameStatsScreen)
