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

import YOU_WIN_LOGO from '../../../assets/gameScreens/win.png'
import YOU_LOSE_LOGO from '../../../assets/gameScreens/lose.png'
import DRAW_LOGO from '../../../assets/gameScreens/draw.png'

const REPLAY_NORMAL_BORDER = '#00D9EF'
const REPLAY_ACTIVE_BORDER = 'green'
const REPLAY_DEACTIVE_BORDER = 'red'

class GameStatsScreen extends React.Component {
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
            // Match point variables
            finishedGamePoint: 20,
            correctAnswerPoint: 0,
            matchResultPoint: 0,
            // Match result text
            matchResultText: '',
            // Total earned points
            totalEarnedPoints: 0,
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
            isFaved: false,
            // Fav icon
            favouriteIcon: unselectedFav,
            // Current match information
            matchInformation: {}
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

                        navigationReplace(SCENE_KEYS.gameScreens.rankedGame, {
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
                    }, 1000)
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

            let playerCorrect = 0
            let playerIncorrect = 0
            let playerUnanswered = 0
            let playerUsername = ''
            let playerProfilePicture = ''

            let totalEarnedPoints = 20

            playerIds.forEach(element => {
                if (element === 'matchInformation') {
                    this.setState({ matchInformation: playerProps[element] })
                    return
                }
                if (this.props.client.id !== element) {
                    opponentUsername = playerProps[element].username
                    opponentProfilePicture = playerProps[element].profilePicture
                    playerProps[element].answers.forEach(result => {
                        switch (result.result) {
                            case null:
                                opponentUnanswered++
                                return
                            case true:
                                opponentCorrect++
                                return
                            case false:
                                opponentIncorrect++
                        }
                    })
                } else {
                    playerUsername = playerProps[element].username
                    playerProfilePicture = playerProps[element].profilePicture
                    playerProps[element].answers.forEach((result, index) => {
                        switch (result.result) {
                            case null:
                                playerUnanswered++
                                return
                            case true:
                                playerCorrect++
                                return
                            case false:
                                playerIncorrect++
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

            if (this.props.isMatchFinished) {
                if (playerNet < opponentNet) {
                    this.setState({
                        matchResultLogo: YOU_LOSE_LOGO,
                        matchResultText: 'Kaybettin',
                        matchResultPoint: 0
                    })
                } else if (playerNet === opponentNet) {
                    this.setState({
                        matchResultLogo: DRAW_LOGO,
                        matchResultText: 'Berabere',
                        matchResultPoint: 50
                    })
                    totalEarnedPoints += 50
                } else {
                    this.setState({
                        matchResultLogo: YOU_WIN_LOGO,
                        matchResultText: 'Kazandın',
                        matchResultPoint: 100
                    })
                    totalEarnedPoints += 100
                }
            } else {
                this.setState({
                    matchResultLogo:
                        this.props.isWon === true
                            ? YOU_WIN_LOGO
                            : YOU_LOSE_LOGO,
                    matchResultText:
                        this.props.isWon === true ? 'Kazandın' : 'Kaybettin',
                    matchResultPoint: this.props.isWon === true ? 100 : 0,
                    finishedGamePoint: 0,
                    isReplayButtonDisabled: true,
                    replayButtonBorderColor: REPLAY_DEACTIVE_BORDER
                })

                // We add 80 because we take away the finished match point
                if (this.props.isWon) totalEarnedPoints += 80
                else totalEarnedPoints -= 20

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

            totalEarnedPoints += playerCorrect * 20

            if (this.props.isWon)
                this.props.updateTotalPoints(totalEarnedPoints)
            else if (playerCorrect !== 0)
                this.props.updateTotalPoints(totalEarnedPoints)

            for (i = 0; i < Object.keys(this.props.questionList).length; i++) {
                if (this.props.playerProps)
                    this.state.allQuestionsList.push(
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

            this.setState({
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
                correctAnswerPoint: playerCorrect * 20,
                totalEarnedPoints: totalEarnedPoints
            })

            this.checkFavouriteStatus()

            resolve(true)
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

                navigationReplace(SCENE_KEYS.gameScreens.rankedGame, {
                    room: this.props.room,
                    client: this.props.client,
                    playerUsername: this.props.playerUsername,
                    playerProfilePicture: this.props.playerProfilePicture,
                    opponentUsername: this.props.opponentUsername,
                    opponentId: this.props.opponentId,
                    opponentProfilePicture: this.props.opponentProfilePicture
                })
            }, 1000)
        }
    }

    newOpponentButtonOnPress = () => {
        this.props.room.leave()
        navigationReset('game', this.state.matchInformation)
    }

    mainScreenButtonOnPress = () => {
        this.props.room.leave()
        this.props.client.close()
        navigationReset('main')
    }

    favouriteOnPress = () => {
        if (this.state.isFaved) {
            this.props.unfavouriteQuestion(
                this.props.clientToken,
                this.props.clientDBId,
                this.props.fullQuestionList[this.state.questionPosition - 1],
                this.props.favouriteQuestions
            )
            this.setState({ favouriteIcon: unselectedFav, isFaved: false })
        } else {
            this.props.favouriteQuestion(
                this.props.clientToken,
                this.props.clientDBId,
                this.props.fullQuestionList[this.state.questionPosition - 1],
                this.props.favouriteQuestions
            )
            this.setState({ favouriteIcon: selectedFav, isFaved: true })
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
                            source={this.state.matchResultLogo}
                            style={styles.resultTextImg}
                        />
                    </View>
                    <View style={styles.resultsContainer}>
                        <View style={styles.results1Container}>
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
                            <View style={styles.answersContainer}>
                                <View style={styles.dividedAnswer}>
                                    <Text style={styles.numbers}>
                                        {this.state.correctAnswerNumber}
                                    </Text>
                                    <Image
                                        source={correct}
                                        style={styles.answerImg}
                                    />
                                    <Text style={styles.numbers}>
                                        {this.state.opponentCorrectAnswerNumber}
                                    </Text>
                                </View>
                                <View style={styles.dividedAnswer}>
                                    <Text style={styles.numbers}>
                                        {this.state.incorrectAnswerNumber}
                                    </Text>
                                    <Image
                                        source={incorrect}
                                        style={styles.answerImg}
                                    />
                                    <Text style={styles.numbers}>
                                        {
                                            this.state
                                                .opponentInorrectAnswerNumber
                                        }
                                    </Text>
                                </View>
                                <View style={styles.dividedAnswer}>
                                    <Text style={styles.numbers}>
                                        {this.state.unansweredAnswerNumber}
                                    </Text>
                                    <Image
                                        source={unanswered}
                                        style={styles.answerImg}
                                    />
                                    <Text style={styles.numbers}>
                                        {
                                            this.state
                                                .opponentUnansweredAnswerNumber
                                        }
                                    </Text>
                                </View>
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
                        <View style={styles.results2Container}>
                            <View style={styles.allScoresContainer}>
                                <View style={styles.scoreContainer}>
                                    <Text style={styles.scoresText}>
                                        Oyunu Bitirdin
                                    </Text>
                                    <Text style={styles.scoresText}>
                                        {this.state.finishedGamePoint}
                                    </Text>
                                </View>
                                <View style={styles.scoreContainer}>
                                    <Text style={styles.scoresText}>
                                        Doğru Cevap x{' '}
                                        {this.state.correctAnswerNumber}
                                    </Text>
                                    <Text style={styles.scoresText}>
                                        {this.state.correctAnswerPoint}
                                    </Text>
                                </View>
                                <View style={styles.scoreContainer}>
                                    <Text style={styles.scoresText}>
                                        {this.state.matchResultText}
                                    </Text>
                                    <Text style={styles.scoresText}>
                                        {this.state.matchResultPoint}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.separatorContainer}>
                                <View style={styles.separatorLine} />
                            </View>
                            <View style={styles.sinaviaScoreContainer}>
                                <Text style={styles.sinaviaScoreText}>
                                    Sınavia Puanı
                                </Text>
                                <Text style={styles.sinaviaScoreText}>
                                    {this.state.totalEarnedPoints}
                                </Text>
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
                                        borderColor: this.state
                                            .replayButtonBorderColor,
                                        borderWidth: 2
                                    }
                                ]}
                            >
                                <Text style={styles.buttonText}>Yeniden</Text>
                                <Text style={styles.buttonText}>Oyna</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.newOpponentButtonOnPress}
                        >
                            <View style={styles.newOpponentButton}>
                                <Text style={styles.buttonText}>Yeni</Text>
                                <Text style={styles.buttonText}>Rakip</Text>
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
        ),
    updateTotalPoints: totalEarnedPoints =>
        dispatch(clientActions.updateTotalPoints(totalEarnedPoints))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameStatsScreen)
