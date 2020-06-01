import React from 'react'
import {
    FlatList,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Modal
} from 'react-native'
import styles from './style'
import { connect } from 'react-redux'
import { clientActions } from '../../../redux/client/actions'
import {
    SCENE_KEYS,
    navigationReset,
    navigationPush
} from '../../../services/navigationService'

import background from '../../../assets/gameScreens/gameStatsBackground.jpg'
import slideUp from '../../../assets/gameScreens/slideUp.png'
import slideDown from '../../../assets/gameScreens/slideDown.png'
import CORRECT_IMG from '../../../assets/gameScreens/correct.png'
import INCORRECT_IMG from '../../../assets/gameScreens/incorrect.png'
import UNANSWERED_IMG from '../../../assets/gameScreens/unanswered.png'
import selectedFav from '../../../assets/favori.png'
import unselectedFav from '../../../assets/favori_bos.png'
import premiumStyles from '../../mainScreens/purchaseScreen/style'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import LinearGradient from 'react-native-linear-gradient'
import ImageModal from 'react-native-image-modal'

const GAME_OVER_LOGO = require('../../../assets/gameScreens/gameover.png')
import VIDEO_LOGO from '../../../assets/mainScreens/blueVideoLogo.png'
import SOLVING_LOGO from '../../../assets/mainScreens/blueSolvingLogo.png'
import PREMIUM_SOLVING_IMG from '../../../assets/premiumSolvingImg.png'
import PREMIUM_VIDEO_LOGO from '../../../assets/premiumVideo.png'
import REPORT_ICON from '../.././../assets/mainScreens/reportIcon.png'
import CHECK_ICON from '../../../assets/mainScreens/checkIcon.png'

const REPLAY_NORMAL_BORDER = '#00D9EF'
const REPLAY_ACTIVE_BORDER = 'green'
const REPLAY_DEACTIVE_BORDER = 'red'
class GroupGameStatsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            flatListData: [],
            // Question position
            questionPosition: 1,
            // A list to feed into the scroll view
            allQuestionsList: [],
            // Screen position
            screenPosition: 1,
            // Replay button press number. If it is one opponent has pressed it.
            replayButtonPressNumber: 0,
            // Replay button border color
            replayButtonBorderColor: REPLAY_NORMAL_BORDER,
            // Replay button disabled
            isReplayButtonDisabled: false,
            // Players list
            allPlayersResults: [],
            isQuestionModalVisible: false,
            // Fav icon selection
            isFaved: false,
            // Fav icon
            favouriteIcon: unselectedFav,
            isModalVisible: false,
            visibleView: '',
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
        this.props.room.onMessage(message => {
            this.chooseMessageAction(message)
        })
        this.props.room.onLeave(code => {
            console.log(code)
            //this.mainScreenButtonOnPress()
        })
        this.props.room.onError(err => {
            console.log(err)
            //this.mainScreenButtonOnPress()
        })
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

                        navigationReset(SCENE_KEYS.gameScreens.groupGame, {
                            room: this.props.room,
                            client: this.props.client,
                            playerUsername: this.props.playerUsername,
                            playerProfilePicture: this.props
                                .playerProfilePicture,
                            opponentUsername: this.props.opponentUsername,
                            opponentId: this.props.opponentId,
                            opponentProfilePicture: this.props
                                .opponentProfilePicture
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
        }
    }

    loadScreen() {
        new Promise(resolve => {
            const playerList = []

            const playerProps = this.props.playerProps
            const playerIds = Object.keys(playerProps)

            let undefinedQuestionIndex = -1

            let correct = 0
            let incorrect = 0
            let unanswered = 0
            let username = ''
            let profilePicture = ''

            playerIds.forEach(playerId => {
                if (playerId === 'matchInformation') return
                if (
                    !playerProps[playerId].isLeft ||
                    !this.props.isMatchFinished
                ) {
                    username = playerProps[playerId].username
                    profilePicture = playerProps[playerId].profilePicture
                    playerProps[playerId].answers.forEach((result, index) => {
                        undefinedQuestionIndex = index
                        switch (result.result) {
                            case null:
                                unanswered++
                                return
                            case true:
                                correct++
                                return
                            case false:
                                incorrect++
                        }
                    })
                    let net

                    if (playerProps.matchInformation.examId !== 1)
                        net = correct - incorrect / 4
                    else net = correct - incorrect / 3

                    playerList.push({
                        username: username,
                        profilePicture: profilePicture,
                        correct: correct,
                        incorrect: incorrect,
                        unanswered: unanswered,
                        net: net
                    })
                    correct = 0
                    incorrect = 0
                    unanswered = 0
                }
            })

            if (!this.props.isMatchFinished) {
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
                tempList.push(this.props.questionList[i])
            }

            playerList.sort((a, b) => parseFloat(b.net) - parseFloat(a.net))

            this.setState(
                { flatListData: playerList, allQuestionsList: tempList },
                () => {
                    this.checkFavouriteStatus()
                    this.checkSolvedQuestionImageVideo()
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

    checkSolvedQuestionImageVideo = () => {
        this.setState({
            solvedQuestionImage: this.props.fullQuestionList[
                this.state.questionPosition - 1
            ].solvedQuestionImage,
            solvedQuestionVideo: this.props.fullQuestionList[
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
            this.props.room.send({
                action: 'replay'
            })
            this.props.room.send({
                action: 'reset-room'
            })
            setTimeout(() => {
                this.props.room.removeAllListeners()

                navigationReset(SCENE_KEYS.gameScreens.rankedGame, {
                    room: this.props.room,
                    client: this.props.client
                })
            }, 2000)
        }
    }

    mainScreenButtonOnPress = () => {
        this.props.room.leave()
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
                visibleView: 'PREMIUM_FAV',
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
                            source={GAME_OVER_LOGO}
                            style={styles.resultTextImg}
                        />
                    </View>
                    <View style={styles.resultsContainer}>
                        <View style={styles.resultsContainerHeader}>
                            <View style={styles.orderContainer}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.orderHeaderText}
                                >
                                    No
                                </Text>
                            </View>
                            <View style={styles.nameContainer}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.nameHeaderText}
                                >
                                    Ad Soyad
                                </Text>
                            </View>
                            <View style={styles.optionsContainer}>
                                <View style={styles.optionContainer}>
                                    <Image
                                        source={CORRECT_IMG}
                                        style={styles.optionsImg}
                                    />
                                </View>
                                <View style={styles.optionContainer}>
                                    <Image
                                        source={UNANSWERED_IMG}
                                        style={styles.optionsImg}
                                    />
                                </View>
                                <View style={styles.optionContainer}>
                                    <Image
                                        source={INCORRECT_IMG}
                                        style={styles.optionsImg}
                                    />
                                </View>
                            </View>
                        </View>
                        <FlatList
                            data={this.state.flatListData}
                            vertical={true}
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled={true}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={styles.userRow}>
                                        <View style={styles.orderContainer}>
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.orderNumberText}
                                            >
                                                {index + 1}
                                            </Text>
                                        </View>
                                        <View style={styles.nameContainer}>
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.nameText}
                                            >
                                                {item.username}
                                            </Text>
                                        </View>
                                        <View style={styles.optionsContainer}>
                                            <View
                                                style={styles.optionContainer}
                                            >
                                                <Text
                                                    allowFontScaling={false}
                                                    style={
                                                        styles.optionCounterText
                                                    }
                                                >
                                                    {item.correct}
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.optionContainer}
                                            >
                                                <Text
                                                    allowFontScaling={false}
                                                    style={
                                                        styles.optionCounterText
                                                    }
                                                >
                                                    {item.unanswered}
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.optionContainer}
                                            >
                                                <Text
                                                    allowFontScaling={false}
                                                    style={
                                                        styles.optionCounterText
                                                    }
                                                >
                                                    {item.incorrect}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
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
                        {this.state.visibleView === 'PREMIUM_SOLVING_VIDEO' &&
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
                                <View style={styles.scrollQuestionContainer}>
                                    {this.state.isSolvedQuestionVisible ===
                                    false ? (
                                        <View style={styles.questionContainer}>
                                            <ImageModal
                                                resizeMode="contain"
                                                imageBackgroundColor="#ffffff"
                                                overlayBackgroundColor="#000000DE"
                                                style={styles.questionStyle}
                                                source={{ uri: item }}
                                            />
                                        </View>
                                    ) : (
                                        <View style={styles.questionContainer}>
                                            <ImageModal
                                                resizeMode="contain"
                                                imageBackgroundColor="#ffffff"
                                                overlayBackgroundColor="#000000DE"
                                                style={styles.questionStyle}
                                                source={{
                                                    uri:
                                                        'https://lh3.googleusercontent.com/proxy/iCYubhYEtP4-Nu-EIczOrR1PLiZWX3kTj38SF_E-vI98xFkagqsOXEiVWAzSrczThFbbv3m_Jf1_eAfyZzDoSpe6vj_uIzA2BrrwOkzEE6exLzQkcdDNTwlz-uSM'
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
                                        this.props.playerProps[
                                            this.props.room.sessionId
                                        ].answers[
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
                                    allowFontScaling={false}
                                    style={[
                                        styles.optionText,
                                        { color: '#00D9EF' }
                                    ]}
                                >
                                    {this.answerSwitcher(
                                        this.props.playerProps[
                                            this.props.room.sessionId
                                        ].answers[
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
)(GroupGameStatsScreen)
