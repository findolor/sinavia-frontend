import React from 'react'
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Modal,
    FlatList
} from 'react-native'
import {
    navigationReset,
    navigationPush,
    SCENE_KEYS
} from '../../../services/navigationService'
import styles from './style'
import { connect } from 'react-redux'
import { clientActions } from '../../../redux/client/actions'
import { reportQuestionServices } from '../../../sagas/questionReporting'

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
import VIDEO_LOGO from '../../../assets/mainScreens/blueVideoLogo.png'
import SOLVING_LOGO from '../../../assets/mainScreens/blueSolvingLogo.png'
import PREMIUM_SOLVING_IMG from '../../../assets/premiumSolvingImg.png'
import PREMIUM_VIDEO_LOGO from '../../../assets/premiumVideo.png'
import REPORT_ICON from '../.././../assets/mainScreens/reportIcon.png'
import CHECK_ICON from '../../../assets/mainScreens/checkIcon.png'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import premiumStyles from '../../mainScreens/purchaseScreen/style'
import LinearGradient from 'react-native-linear-gradient'
import ImageModal from 'react-native-image-modal'

class SoloFriendGameStatsScreen extends React.Component {
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
            opponentUsername: '',
            // Match result text
            matchResultText: '',
            // Player profile pictures
            opponentProfilePicture: '',
            // Match result logo
            matchResultLogo: null,
            // Question position
            questionPosition: 1,
            // A list to feed into the scroll view
            allQuestionsList: [],
            // All the questions parsed
            questionList: [],
            // Screen position
            screenPosition: 1,
            // User answer background color. Changes depending on the result
            answerBackgroundColor: '',
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
            // Client question answers
            clientAnswers: [
                {
                    correctAnswer: 0,
                    answer: 0
                }
            ],
            isModalVisible: false,
            visibleView: false,
            //these states will be updated for every questions
            solvedQuestionImage: null,
            solvedQuestionVideo: null,
            isSolvedQuestionVisible: false,
            reportQuestion: false,
            reportSolving: false,
            reportAnswer: false
        }
    }

    async componentDidMount() {
        await this.loadScreen()
    }

    // TODO Tidy up this code block
    // These could be implemented better
    loadScreen() {
        return new Promise(resolve => {
            let opponentCorrect
            let opponentIncorrect
            let opponentUnanswered

            if (this.props.friendStatistics === null) {
                opponentCorrect = '...'
                opponentIncorrect = '...'
                opponentUnanswered = '...'
            } else {
                opponentCorrect = this.props.friendStatistics.correctNumber
                opponentIncorrect = this.props.friendStatistics.incorrectNumber
                opponentUnanswered = this.props.friendStatistics
                    .unansweredNumber
            }
            let opponentUsername = this.props.friendUsername
            let opponentProfilePicture = this.props.friendProfilePicture

            let playerCorrect = this.props.clientStatistics.correctNumber
            let playerIncorrect = this.props.clientStatistics.incorrectNumber
            let playerUnanswered = this.props.clientStatistics.unansweredNumber

            let friendMatchesCount
            let opponentFriendMatchWinCount = '...'
            let playerFriendMatchWinCount = '...'
            if (this.props.friendMatches === null) {
                friendMatchesCount = '...'
            } else {
                friendMatchesCount = Object.keys(this.props.friendMatches)
                    .length

                opponentFriendMatchWinCount = 0
                playerFriendMatchWinCount = 0

                this.props.friendMatches.forEach(friendMatch => {
                    if (!friendMatch.isMatchDraw) {
                        if (friendMatch.winnerId === this.props.clientDBId)
                            playerFriendMatchWinCount++
                        else opponentFriendMatchWinCount++
                    }
                })
            }

            if (this.props.friendStatistics === null) {
                this.setState({
                    matchResultLogo: null,
                    matchResultText: 'Bekleniyor'
                })
            } else {
                let playerNet
                let opponentNet

                if (this.props.clientStatistics.examId !== 1) {
                    playerNet = playerCorrect - playerIncorrect / 4
                    opponentNet = opponentCorrect - opponentIncorrect / 4
                } else {
                    playerNet = playerCorrect - playerIncorrect / 3
                    opponentNet = opponentCorrect - opponentIncorrect / 3
                }

                if (playerNet < opponentNet) {
                    this.setState({
                        matchResultLogo: YOU_LOSE_LOGO,
                        matchResultText: 'Kaybettin'
                    })
                    if (!this.props.isFromNotification) {
                        opponentFriendMatchWinCount++
                        friendMatchesCount++
                    }
                } else if (playerNet === opponentNet) {
                    this.setState({
                        matchResultLogo: DRAW_LOGO,
                        matchResultText: 'Berabere'
                    })
                    if (!this.props.isFromNotification) friendMatchesCount++
                } else {
                    this.setState({
                        matchResultLogo: YOU_WIN_LOGO,
                        matchResultText: 'Kazandın'
                    })
                    if (!this.props.isFromNotification) {
                        playerFriendMatchWinCount++
                        friendMatchesCount++
                    }
                }
            }

            if (Object.keys(this.props.userAnswers).length !== 5) {
                this.props.questionList.splice(
                    Object.keys(this.props.userAnswers).length,
                    Object.keys(this.props.questionList).length -
                        Object.keys(this.props.userAnswers).length
                )
            }

            this.props.questionList.forEach((question, index) => {
                if (
                    this.props.friendStatistics !== null &&
                    this.props.isFromNotification
                )
                    question = JSON.parse(question)
                this.state.allQuestionsList.push(question.questionLink)
            })

            let clientAnswers = []
            if (
                this.props.friendStatistics !== null &&
                this.props.isFromNotification
            ) {
                this.props.userAnswers.forEach(answer => {
                    clientAnswers.push(JSON.parse(answer))
                })
            } else clientAnswers = this.props.userAnswers
            let questionList = []
            if (
                this.props.friendStatistics !== null &&
                this.props.isFromNotification
            ) {
                this.props.questionList.forEach(question => {
                    questionList.push(JSON.parse(question))
                })
            } else questionList = this.props.questionList

            this.setState(
                {
                    correctAnswerNumber: playerCorrect,
                    incorrectAnswerNumber: playerIncorrect,
                    unansweredAnswerNumber: playerUnanswered,
                    opponentCorrectAnswerNumber: opponentCorrect,
                    opponentInorrectAnswerNumber: opponentIncorrect,
                    opponentUnansweredAnswerNumber: opponentUnanswered,
                    opponentProfilePicture: opponentProfilePicture,
                    opponentUsername: opponentUsername,
                    playerFriendMatchWinCount: playerFriendMatchWinCount,
                    opponentFriendMatchWinCount: opponentFriendMatchWinCount,
                    friendMatchesCount: friendMatchesCount,
                    clientAnswers: clientAnswers,
                    questionList: questionList
                },
                () => {
                    this.checkFavouriteStatus()
                    this.checkSolvedQuestionImageVideo()
                }
            )

            resolve(true)
        })
    }

    checkFavouriteStatus = () => {
        const index = this.props.favouriteQuestions.findIndex(
            x =>
                x.question.id ===
                this.state.questionList[this.state.questionPosition - 1].id
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

    checkSolvedQuestionImageVideo = () => {
        this.setState({
            solvedQuestionImage: this.state.questionList[
                this.state.questionPosition - 1
            ].solvedQuestionImage,
            solvedQuestionVideo: this.state.questionList[
                this.state.questionPosition - 1
            ].solvedQuestionVideo
        })
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
            ),
            isSolvedQuestionVisible: false
        })
        this.checkFavouriteStatus()
        this.checkSolvedQuestionImageVideo()
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

    mainScreenButtonOnPress = () => {
        navigationReset('main')
    }

    favouriteOnPress = () => {
        if (this.props.clientInformation.isPremium) {
            if (this.state.isFaved) {
                this.props.unfavouriteQuestion(
                    this.props.clientToken,
                    this.props.clientDBId,
                    this.state.questionList[this.state.questionPosition - 1],
                    this.props.favouriteQuestions
                )
                this.setState({ favouriteIcon: unselectedFav, isFaved: false })
            } else {
                this.props.favouriteQuestion(
                    this.props.clientToken,
                    this.props.clientDBId,
                    this.state.questionList[this.state.questionPosition - 1],
                    this.props.favouriteQuestions
                )
                this.setState({ favouriteIcon: selectedFav, isFaved: true })
            }
        } else {
            this.setState({
                visibleView: 'PREMIUM_FAV',
                isModalVisible: true
            })
        }
    }

    closeModalButtonOnPress = () => {
        this.setState({
            isModalVisible: false,
            reportQuestion: false,
            reportSolving: false,
            reportAnswer: false
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
                            <Text
                                allowFontScaling={false}
                                style={premiumStyles.premiumModalHeaderText}
                            >
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
                                        allowFontScaling={false}
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
                                        allowFontScaling={false}
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

    premiumForSolvingImgPage() {
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
                            <Text
                                allowFontScaling={false}
                                style={premiumStyles.premiumModalHeaderText}
                            >
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
                                        source={PREMIUM_SOLVING_IMG}
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
                                        allowFontScaling={false}
                                        style={
                                            premiumStyles.premiumModalHeaderText
                                        }
                                    >
                                        Çözümleri Gör!
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
                                        allowFontScaling={false}
                                        style={[
                                            premiumStyles.premiumModalInfoText,
                                            { marginTop: hp(1.5) }
                                        ]}
                                    >
                                        Soruların çözümleri şimdi Elit Öğrenci
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

    premiumForSolvingVideoPage() {
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
                            <Text
                                allowFontScaling={false}
                                style={premiumStyles.premiumModalHeaderText}
                            >
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
                                        source={PREMIUM_VIDEO_LOGO}
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
                                        allowFontScaling={false}
                                        style={
                                            premiumStyles.premiumModalHeaderText
                                        }
                                    >
                                        Çözüm Videolarını İzle!
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
                                        allowFontScaling={false}
                                        style={[
                                            premiumStyles.premiumModalInfoText,
                                            { marginTop: hp(1.5) }
                                        ]}
                                    >
                                        Soru Çözüm Videoları şimdi Elit Öğrenci
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

    showSolvedQuestion = () => {
        if (this.props.clientInformation.isPremium) {
            this.setState({
                isSolvedQuestionVisible: !this.state.isSolvedQuestionVisible
            })
        } else {
            this.setState({
                visibleView: 'PREMIUM_SOLVING_IMG',
                isModalVisible: true
            })
        }
    }

    goToVideo = () => {
        if (this.props.clientInformation.isPremium) {
            navigationPush(SCENE_KEYS.mainScreens.video, {
                videoUri: this.state.solvedQuestionVideo
            })
        } else {
            this.setState({
                visibleView: 'PREMIUM_SOLVING_VIDEO',
                isModalVisible: true
            })
        }
    }

    reportOnPress = () => {
        this.setState({
            visibleView: 'QUESTION_REPORT',
            isModalVisible: true
        })
    }

    reportQuestionOnPress = () => {
        this.setState({ reportQuestion: !this.state.reportQuestion })
    }

    reportSolvingOnPress = () => {
        this.setState({ reportSolving: !this.state.reportSolving })
    }

    reportAnswerOnPress = () => {
        this.setState({ reportAnswer: !this.state.reportAnswer })
    }

    reportButtonOnPress = () => {
        if (
            this.state.reportQuestion === true ||
            this.state.reportSolving === true ||
            this.state.reportAnswer === true
        ) {
            reportQuestionServices.reportQuestion(
                this.props.clientToken,
                this.props.clientDBId,
                this.props.fullQuestionList[this.state.questionPosition - 1].id,
                {
                    question: this.state.reportQuestion,
                    solution: this.state.reportSolving,
                    answer: this.state.reportAnswer
                }
            )
            this.setState({
                isModalVisible: false,
                reportQuestion: false,
                reportSolving: false,
                reportAnswer: false
            })
        }
    }

    questionReportModal() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#000000DE',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        modalContainer: {
                            flex: 1,
                            alignItems: 'center'
                        }
                    }}
                >
                    <View style={styles.reportView}>
                        <View style={styles.reportOptionView}>
                            <TouchableOpacity
                                onPress={this.reportQuestionOnPress}
                                style={styles.checkBox}
                            >
                                {this.state.reportQuestion === true && (
                                    <View>
                                        <Image
                                            source={CHECK_ICON}
                                            style={styles.checkIcon}
                                        />
                                    </View>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.reportQuestionOnPress}
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={styles.reportOptionText}
                                >
                                    Soru hatalı/eksik
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.reportOptionView}>
                            <TouchableOpacity
                                onPress={this.reportSolvingOnPress}
                                style={styles.checkBox}
                            >
                                {this.state.reportSolving === true && (
                                    <View>
                                        <Image
                                            source={CHECK_ICON}
                                            style={styles.checkIcon}
                                        />
                                    </View>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.reportSolvingOnPress}
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={styles.reportOptionText}
                                >
                                    Soru çözümü hatalı/eksik
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.reportOptionView}>
                            <TouchableOpacity
                                onPress={this.reportAnswerOnPress}
                                style={styles.checkBox}
                            >
                                {this.state.reportAnswer === true && (
                                    <View>
                                        <Image
                                            source={CHECK_ICON}
                                            style={styles.checkIcon}
                                        />
                                    </View>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.reportAnswerOnPress}
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={styles.reportOptionText}
                                >
                                    Doğru cevap hatalı
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.yesOrNoButtonsContainer}>
                        <AuthButton
                            height={hp(7)}
                            width={wp(42)}
                            color="#00D9EF"
                            buttonText="Vazgeç"
                            fontSize={hp(3)}
                            borderRadius={hp(1.5)}
                            onPress={this.closeModalButtonOnPress}
                        />
                        <AuthButton
                            height={hp(7)}
                            width={wp(42)}
                            color="#00D9EF"
                            buttonText="Bildir"
                            fontSize={hp(3)}
                            borderRadius={hp(1.5)}
                            onPress={this.reportButtonOnPress}
                        />
                    </View>
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
                                        uri: this.props.clientInformation
                                            .profilePicture
                                    }}
                                    style={styles.profilePic}
                                />
                                <Text
                                    allowFontScaling={false}
                                    style={styles.usernameText}
                                >
                                    {this.props.clientInformation.username}
                                </Text>
                            </View>
                            <View style={styles.user2Container}>
                                <Image
                                    source={{
                                        uri: this.state.opponentProfilePicture
                                    }}
                                    style={styles.profilePic}
                                />
                                <Text
                                    allowFontScaling={false}
                                    style={styles.usernameText}
                                >
                                    {this.state.opponentUsername}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.resultsAndStatisticsContainer}>
                            <View style={styles.dividedAnswer}>
                                <View style={styles.numberContainer}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.numbers}
                                    >
                                        {this.state.correctAnswerNumber}
                                    </Text>
                                </View>
                                <Image
                                    source={correct}
                                    style={styles.answerImg}
                                />
                                <View style={styles.numberContainer}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.numbers}
                                    >
                                        {this.state.opponentCorrectAnswerNumber}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.dividedAnswer}>
                                <View style={styles.numberContainer}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.numbers}
                                    >
                                        {this.state.incorrectAnswerNumber}
                                    </Text>
                                </View>
                                <Image
                                    source={incorrect}
                                    style={styles.answerImg}
                                />
                                <View style={styles.numberContainer}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.numbers}
                                    >
                                        {
                                            this.state
                                                .opponentInorrectAnswerNumber
                                        }
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.dividedAnswer}>
                                <View style={styles.numberContainer}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.numbers}
                                    >
                                        {this.state.unansweredAnswerNumber}
                                    </Text>
                                </View>
                                <Image
                                    source={unanswered}
                                    style={styles.answerImg}
                                />
                                <View style={styles.numberContainer}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.numbers}
                                    >
                                        {
                                            this.state
                                                .opponentUnansweredAnswerNumber
                                        }
                                    </Text>
                                </View>
                            </View>
                            {this.props.friendMatches !== null && (
                                <View style={styles.versusGameStatsBox}>
                                    <View
                                        style={styles.versusGameTextsContainer}
                                    >
                                        <View
                                            style={
                                                styles.versusGameTitleContainer
                                            }
                                        >
                                            <Text
                                                allowFontScaling={false}
                                                style={
                                                    styles.versusGameTitleText
                                                }
                                            >
                                                Aranızdaki Oyunlar
                                            </Text>
                                        </View>
                                        <View
                                            style={
                                                styles.versusGameTotalContainer
                                            }
                                        >
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.versusTotalText}
                                            >
                                                Toplam Oyun{' '}
                                            </Text>
                                            <Text
                                                allowFontScaling={false}
                                                style={
                                                    styles.versusTotalCounter
                                                }
                                            >
                                                {this.state.friendMatchesCount}
                                            </Text>
                                        </View>
                                    </View>
                                    {this.state.playerFriendMatchWinCount ===
                                        0 &&
                                        this.state
                                            .opponentFriendMatchWinCount ===
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
                                                        allowFontScaling={false}
                                                        style={
                                                            styles.noneWinsInfoText
                                                        }
                                                    >
                                                        Henüz kazanan yok, hadi
                                                        bunu değiştir!
                                                    </Text>
                                                </View>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={
                                                        styles.yourWinsCounter
                                                    }
                                                >
                                                    {
                                                        this.state
                                                            .playerFriendMatchWinCount
                                                    }
                                                </Text>
                                                <Text
                                                    allowFontScaling={false}
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
                                                                        this
                                                                            .state
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
                                                                        this
                                                                            .state
                                                                            .opponentFriendMatchWinCount)) *
                                                                    82
                                                            )
                                                        }
                                                    ]}
                                                />
                                                <Text
                                                    allowFontScaling={false}
                                                    style={
                                                        styles.yourWinsCounter
                                                    }
                                                >
                                                    {
                                                        this.state
                                                            .playerFriendMatchWinCount
                                                    }
                                                </Text>
                                                <Text
                                                    allowFontScaling={false}
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
                                        this.state
                                            .opponentFriendMatchWinCount ===
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
                                                    allowFontScaling={false}
                                                    style={
                                                        styles.yourWinsCounter
                                                    }
                                                >
                                                    {
                                                        this.state
                                                            .playerFriendMatchWinCount
                                                    }
                                                </Text>
                                                <Text
                                                    allowFontScaling={false}
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
                                    {this.state.playerFriendMatchWinCount ===
                                        0 &&
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
                                                    allowFontScaling={false}
                                                    style={
                                                        styles.yourWinsCounter
                                                    }
                                                >
                                                    {
                                                        this.state
                                                            .playerFriendMatchWinCount
                                                    }
                                                </Text>
                                                <Text
                                                    allowFontScaling={false}
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
                                    <View
                                        style={styles.versusGameNamesContainer}
                                    >
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.versusGameTitleText}
                                        >
                                            Sen
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.versusGameTitleText}
                                        >
                                            {this.state.opponentUsername}
                                        </Text>
                                    </View>
                                </View>
                            )}
                            {this.props.friendMatches === null && (
                                <View
                                    style={styles.friendMatchWaitingContainer}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.friendMatchWaitingText}
                                    >
                                        {this.state.opponentUsername} bekleniyor
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            onPress={this.mainScreenButtonOnPress}
                        >
                            <View style={styles.mainScreenButton}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.buttonText}
                                >
                                    Ana
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.buttonText}
                                >
                                    Menü
                                </Text>
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
                            <Text
                                allowFontScaling={false}
                                style={styles.slideViewText}
                            >
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
                {Object.keys(this.props.userAnswers).length !== 0 && (
                    <View style={styles.secondScreenView}>
                        <Modal
                            visible={this.state.isModalVisible}
                            transparent={true}
                            animationType={'fade'}
                        >
                            {this.state.visibleView === 'PREMIUM_FAV' &&
                                this.premiumForFavoritesPage()}
                            {this.state.visibleView === 'PREMIUM_SOLVING_IMG' &&
                                this.premiumForSolvingImgPage()}
                            {this.state.visibleView ===
                                'PREMIUM_SOLVING_VIDEO' &&
                                this.premiumForSolvingVideoPage()}
                            {this.state.visibleView === 'QUESTION_REPORT' &&
                                this.questionReportModal()}
                        </Modal>
                        <View style={styles.questionNumberContainer}>
                            {this.state.solvedQuestionImage !== null ? (
                                <View
                                    style={{
                                        position: 'absolute',
                                        height: hp(7),
                                        width: wp(34),
                                        justifyContent: 'center',
                                        marginLeft: wp(0)
                                    }}
                                >
                                    {this.state.isSolvedQuestionVisible ===
                                    false ? (
                                        <TouchableOpacity
                                            onPress={this.showSolvedQuestion}
                                            style={styles.videoButton}
                                        >
                                            <Image
                                                source={SOLVING_LOGO}
                                                style={styles.solvingLogo}
                                            />
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.videoButtonText}
                                            >
                                                Çözüme bak
                                            </Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            onPress={this.showSolvedQuestion}
                                            style={styles.videoButton}
                                        >
                                            <Image
                                                source={SOLVING_LOGO}
                                                style={styles.solvingLogo}
                                            />
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.videoButtonText}
                                            >
                                                Soruya Dön
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            ) : (
                                <View />
                            )}
                            <View
                                style={{
                                    position: 'absolute',
                                    height: hp(7),
                                    width: wp(22),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: wp(34)
                                }}
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={styles.questionNumberText}
                                >
                                    {this.state.questionPosition}/
                                    {
                                        Object.keys(this.state.allQuestionsList)
                                            .length
                                    }
                                </Text>
                            </View>
                            {this.state.solvedQuestionVideo !== null ? (
                                <View
                                    style={{
                                        position: 'absolute',
                                        height: hp(7),
                                        width: wp(34),
                                        justifyContent: 'center',
                                        marginLeft: wp(56)
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={this.goToVideo}
                                        style={styles.videoButton}
                                    >
                                        <Image
                                            source={VIDEO_LOGO}
                                            style={styles.videoLogo}
                                        />
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.videoButtonText}
                                        >
                                            Çözümü izle
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View />
                            )}
                        </View>
                        <FlatList
                            ref={ref => {
                                this.flatListRef = ref
                            }}
                            horizontal={true}
                            pagingEnabled={true}
                            data={this.state.allQuestionsList}
                            onScroll={this.handleScrollHorizontal}
                            showsHorizontalScrollIndicator={false}
                            extraData={this.state.isSolvedQuestionVisible}
                            renderItem={({ item, index }) => {
                                return (
                                    <View
                                        style={styles.scrollQuestionContainer}
                                    >
                                        {this.state.isSolvedQuestionVisible ===
                                        false ? (
                                            <View
                                                style={styles.questionContainer}
                                            >
                                                <ImageModal
                                                    resizeMode="contain"
                                                    imageBackgroundColor="#ffffff"
                                                    overlayBackgroundColor="#000000DE"
                                                    style={styles.questionStyle}
                                                    source={{ uri: item }}
                                                />
                                            </View>
                                        ) : (
                                            <View
                                                style={styles.questionContainer}
                                            >
                                                <ImageModal
                                                    resizeMode="contain"
                                                    imageBackgroundColor="#ffffff"
                                                    overlayBackgroundColor="#000000DE"
                                                    style={styles.questionStyle}
                                                    source={{
                                                        uri: this.state
                                                            .solvedQuestionImage
                                                    }}
                                                />
                                            </View>
                                        )}
                                    </View>
                                )
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        ></FlatList>
                        <View style={styles.favAndAnswerContainer}>
                            <View style={styles.reportContainer}>
                                <TouchableOpacity onPress={this.reportOnPress}>
                                    <Image
                                        source={REPORT_ICON}
                                        style={styles.reportIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.answerContainer}>
                                <View
                                    style={[
                                        styles.correctAnswer,
                                        { backgroundColor: 'white' }
                                    ]}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={[
                                            styles.optionText,
                                            { color: '#00D9EF' }
                                        ]}
                                    >
                                        {this.answerSwitcher(
                                            this.state.clientAnswers[
                                                this.state.questionPosition - 1
                                            ].correctAnswer
                                        )}
                                    </Text>
                                </View>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.answerText}
                                >
                                    Doğru Cevap
                                </Text>
                            </View>
                            <View style={styles.favIconContainer}>
                                <TouchableOpacity
                                    onPress={this.favouriteOnPress}
                                >
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
                                        allowFontScaling={false}
                                        style={[
                                            styles.optionText,
                                            { color: '#00D9EF' }
                                        ]}
                                    >
                                        {this.answerSwitcher(
                                            this.state.clientAnswers[
                                                this.state.questionPosition - 1
                                            ].answer
                                        )}
                                    </Text>
                                </View>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.answerText}
                                >
                                    Senin Cevabın
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>
        )
    }
}

const mapStateToProps = state => ({
    clientDBId: state.client.clientDBId,
    clientToken: state.client.clientToken,
    clientInformation: state.client.clientInformation,
    favouriteQuestions: state.client.favouriteQuestions
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
)(SoloFriendGameStatsScreen)
