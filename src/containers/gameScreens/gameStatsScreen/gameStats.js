import React from 'react'
import {
    Image,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Dimensions
} from 'react-native'
import styles from './style'
import background from '../../../assets/gameScreens/gameStatsBackground.jpg'
import slideUp from '../../../assets/gameScreens/slideUp.png'
import correct from '../../../assets/gameScreens/correct.png'
import incorrect from '../../../assets/gameScreens/incorrect.png'
import unanswered from '../../../assets/gameScreens/unanswered.png'
import selectedFav from '../../../assets/favori.png'
import unselectedFav from '../../../assets/favori_bos.png'

import YOU_WIN_LOGO from '../../../assets/gameScreens/win.png'
import YOU_LOSE_LOGO from '../../../assets/gameScreens/lose.png'
import DRAW_LOGO from '../../../assets/gameScreens/draw.png'

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
            totalEarnedPoints: 180,
            // Player profile pictures
            clientProfilePicture: '',
            opponentProfilePicture: '',
            // Match result logo
            matchResultLogo: '',
            // Question position
            questionPosition: 1,
            // A list to feed into the scroll view
            allQuestionsList: [],
            // Screen position
            screenPosition: 1,
            isQuestionModalVisible: false,
            favIconSelected: false
        }
    }

    async componentDidMount() {
        await this.loadScreen()
    }

    loadScreen() {
        new Promise(resolve => {
            const playerProps = this.props.playerProps
            const playerIds = Object.keys(playerProps)

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
                    playerProps[element].answers.forEach(result => {
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
                    })
                }
            })

            if (playerCorrect < opponentCorrect) {
                this.setState({
                    matchResultLogo: YOU_LOSE_LOGO,
                    matchResultText: 'Kaybettin',
                    matchResultPoint: 0
                })
            } else if (playerCorrect === opponentCorrect) {
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

            totalEarnedPoints += playerCorrect * 20

            for (i = 0; i < Object.keys(this.props.questionList).length; i++) {
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
            resolve(true)
        })
    }

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
    }

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
                2
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
                        <TouchableOpacity>
                            <View style={styles.replayButton}>
                                <Text style={styles.buttonText}>Yeniden</Text>
                                <Text style={styles.buttonText}>Oyna</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.newOpponentButton}>
                                <Text style={styles.buttonText}>Yeni</Text>
                                <Text style={styles.buttonText}>Rakip</Text>
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
                            <Image source={slideUp} style={styles.slideUpImg} />
                            <Text style={styles.slideViewText}>
                                {' '}
                                {this.state.screenPosition === 1
                                    ? 'SORULARI GÖRMEK İÇİN KAYDIR'
                                    : 'PUANLARI GÖRMEK İÇİN KAYDIR'}{' '}
                            </Text>
                            <Image source={slideUp} style={styles.slideUpImg} />
                        </View>
                    </View>
                </View>
                <View style={styles.secondScreenView}>
                    <View style={styles.questionNumberContainer}>
                        <Text style={styles.questionNumberText}>
                            {this.state.questionPosition}/5
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
                            <View style={styles.correctAnswer}>
                                <Text style={styles.optionText}>
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
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        favIconSelected: true
                                    })
                                }}
                            >
                                <Image
                                    source={
                                        this.state.favIconSelected === true
                                            ? selectedFav
                                            : unselectedFav
                                    }
                                    style={styles.favIcon}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.answerContainer}>
                            <View style={styles.correctAnswer}>
                                <Text style={styles.optionText}>
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

export default GameStatsScreen
