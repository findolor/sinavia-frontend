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

const GAME_OVER_LOGO = require('../../../assets/gameScreens/gameover.png')
import VIDEO_LOGO from '../../../assets/mainScreens/blueVideoLogo.png'

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
            isModalVisible: false
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
                        undefinedQuestionIndex = index
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

            playerList.sort((a, b) => parseFloat(b.net) - parseFloat(a.net))

            this.setState(
                { flatListData: playerList, allQuestionsList: tempList },
                () => resolve(true)
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

    goToVideo = () => {
        navigationPush(SCENE_KEYS.mainScreens.video, {
            videoUri: 'https://player.vimeo.com/video/8175286/config'
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
                    <View style={styles.resultTextContainer}>
                        <Image
                            source={GAME_OVER_LOGO}
                            style={styles.resultTextImg}
                        />
                    </View>
                    <View style={styles.resultsContainer}>
                        <View style={styles.resultsContainerHeader}>
                            <View style={styles.orderContainer}>
                                <Text style={styles.orderHeaderText}>No</Text>
                            </View>
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameHeaderText}>
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
                                                style={styles.orderNumberText}
                                            >
                                                {index + 1}
                                            </Text>
                                        </View>
                                        <View style={styles.nameContainer}>
                                            <Text style={styles.nameText}>
                                                {item.username}
                                            </Text>
                                        </View>
                                        <View style={styles.optionsContainer}>
                                            <View
                                                style={styles.optionContainer}
                                            >
                                                <Text
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
                        <TouchableOpacity onPress={this.goToVideo} style={styles.videoButton}>
                            <Image source={VIDEO_LOGO} style={styles.videoLogo}/>
                            <Text style={styles.videoButtonText}>Çözümü izle</Text>
                        </TouchableOpacity>
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
)(GroupGameStatsScreen)
