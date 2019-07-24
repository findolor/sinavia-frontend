import React from 'react'
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native'
import styles, { countdownProps } from './style'
import { Buffer } from 'buffer'
import CountDown from 'react-native-countdown-component'
import NotchView from '../../../components/notchView'
import { navigationPop } from '../../../services/navigationService'

const NORMAL_BUTTON_COLOR = '#C3C3C3'
const SELECTED_BUTTON_COLOR = '#00d9ef'
const OPPONENT_ANSWER_COLOR = '#f5bc14'
const CORRECT_ANSWER_COLOR = '#14e31f'
const INCORRECT_ANSWER_COLOR = '#eb2b0e'

class RankedGame extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // Player buttons
            playerOneButton: 0,
            playerTwoButton: 0,
            // Question number
            questionNumber: 0,
            // Player answers
            playerOneCorrect: 0,
            playerOneIncorrect: 0,
            playerOneUnanswered: 0,
            playerTwoCorrect: 0,
            playerTwoIncorrect: 0,
            playerTwoUnanswered: 0,
            // Countdown running variable
            isCountDownRunning: false,
            // Round starter variable
            start: false,
            // Match finish variable
            isMatchOver: false,
            // Question image list
            questionList: [],
            // Button border colors
            buttonOneBorderColor: NORMAL_BUTTON_COLOR,
            buttonTwoBorderColor: NORMAL_BUTTON_COLOR,
            buttonThreeBorderColor: NORMAL_BUTTON_COLOR,
            buttonFourBorderColor: NORMAL_BUTTON_COLOR,
            buttonFiveBorderColor: NORMAL_BUTTON_COLOR,
            buttonSixBorderColor: NORMAL_BUTTON_COLOR,
            // Button disable variables
            isButtonOneDisabled: false,
            isButtonTwoDisabled: false,
            isButtonThreeDisabled: false,
            isButtonFourDisabled: false,
            isButtonFiveDisabled: false,
            isButtonSixDisabled: false,
            // Variable to know if the client has answered question
            isQuestionAnswered: false,
            // Our countdown timer's time
            countDownTime: 60,
            // playerProps state
            playerProps: {},
            // Opponent clientId
            opponentId: this.props.opponentId,
            // modal visibility variable
            isQuestionModalVisible: false
        }
    }

    // We get the room in props
    componentDidMount() {
        this.setState({})
        this.props.room.send({
            action: 'ready'
        })
        this.props.room.onStateChange.add(state => {
            // We update the UI after state changes
            this.chooseStateAction(state.rankedState)
        })
        this.props.room.onError.add(err => console.log(err))
    }

    componentWillUnmount() {
        clearTimeout(this.startTimeout)
        clearTimeout(this.updateTimeout)
        clearTimeout(this.finishedTimeout)
    }

    chooseStateAction = rankedState => {
        console.log(rankedState.stateInformation)
        // We check the action that happened
        switch (rankedState.stateInformation) {
            // Setting up question number and resetting the buttons
            case 'question':
                // We only do these once
                if (rankedState.questionNumber === 0)
                    this.setState({ questionList: rankedState.questionList })
                this.resetButtons()
                this.setState({
                    start: false,
                    questionNumber: rankedState.questionNumber,
                    isQuestionAnswered: false,
                    countDownTime: 60,
                    isCountDownRunning: false
                })
                this.startTimeout = setTimeout(() => {
                    this.setState({
                        playerOneButton: 0,
                        playerTwoButton: 0,
                        isCountDownRunning: true,
                        start: true
                    })
                }, 5000)
                return
            case 'result':
                this.setState({ playerProps: rankedState.playerProps })
                return
            case 'show-results':
                this.setState({
                    countDownTime: 8
                })
                this.highlightOpponentButton(
                    rankedState.playerProps[this.state.opponentId].answers[
                        this.state.questionNumber
                    ].answer
                )
                this.updateTimeout = setTimeout(() => {
                    this.updatePlayerResults()
                }, 2500)
                return
            case 'match-finished':
                this.setState({ isCountDownRunning: false })
                return
        }
    }

    updatePlayerResults = () => {
        const answers = this.state.playerProps[this.props.client.id].answers
        const answersOpponent = this.state.playerProps[this.state.opponentId]
            .answers

        // Switch statement for the user
        this.updateAnswers(answers, true)
        // Switch statement for the opponent
        this.updateAnswers(answersOpponent, false)
    }

    updateAnswers = (answers, isClient) => {
        switch (answers[this.state.questionNumber].result) {
            // If the answer is unanswered
            case null:
                if (isClient) {
                    this.setState({
                        playerOneUnanswered: this.state.playerOneUnanswered + 1
                    })
                    this.updateButtons(
                        answers[this.state.questionNumber].correctAnswer,
                        true
                    )
                } else
                    this.setState({
                        playerTwoUnanswered: this.state.playerTwoUnanswered + 1
                    })
                return
            // If the answer is correct
            case true:
                if (isClient) {
                    this.setState({
                        playerOneCorrect: this.state.playerOneCorrect + 1
                    })
                    this.updateButtons(
                        answers[this.state.questionNumber].answer,
                        true
                    )
                } else
                    this.setState({
                        playerTwoCorrect: this.state.playerTwoCorrect + 1
                    })
                return
            // If the answer is incorrect
            case false:
                if (isClient) {
                    this.setState({
                        playerOneIncorrect: this.state.playerOneIncorrect + 1
                    })
                    this.updateButtons(
                        answers[this.state.questionNumber].answer,
                        false
                    )
                    this.updateButtons(
                        answers[this.state.questionNumber].correctAnswer,
                        true
                    )
                } else
                    this.setState({
                        playerTwoIncorrect: this.state.playerTwoIncorrect + 1
                    })
                return
        }
    }

    updateButtons = (buttonNumber, isCorrect) => {
        switch (buttonNumber) {
            case 1:
                if (isCorrect)
                    this.setState({
                        buttonOneBorderColor: CORRECT_ANSWER_COLOR
                    })
                else
                    this.setState({
                        buttonOneBorderColor: INCORRECT_ANSWER_COLOR
                    })
                return
            case 2:
        }
        switch (buttonNumber) {
            case 1:
                if (isCorrect)
                    this.setState({
                        buttonOneBorderColor: CORRECT_ANSWER_COLOR
                    })
                else
                    this.setState({
                        buttonOneBorderColor: INCORRECT_ANSWER_COLOR
                    })
                return
            case 2:
                if (isCorrect)
                    this.setState({
                        buttonTwoBorderColor: CORRECT_ANSWER_COLOR
                    })
                else
                    this.setState({
                        buttonTwoBorderColor: INCORRECT_ANSWER_COLOR
                    })
                return
            case 3:
                if (isCorrect)
                    this.setState({
                        buttonThreeBorderColor: CORRECT_ANSWER_COLOR
                    })
                else
                    this.setState({
                        buttonThreeBorderColor: INCORRECT_ANSWER_COLOR
                    })
                return
            case 4:
                if (isCorrect)
                    this.setState({
                        buttonFourBorderColor: CORRECT_ANSWER_COLOR
                    })
                else
                    this.setState({
                        buttonFourBorderColor: INCORRECT_ANSWER_COLOR
                    })
                return
            case 5:
                if (isCorrect)
                    this.setState({
                        buttonFiveBorderColor: CORRECT_ANSWER_COLOR
                    })
                else
                    this.setState({
                        buttonFiveBorderColor: INCORRECT_ANSWER_COLOR
                    })
                return
        }
    }

    // Sends the button action and question finished action
    buttonOnPress = buttonNumber => {
        let that = this
        this.setState({ playerOneButton: buttonNumber })
        this.highlightButton(buttonNumber)
        this.props.room.send({
            action: 'button-press',
            button: buttonNumber
        })
        // After setting the button and sending 'button-press' action, we send 'finished' action for round end
        this.finishedTimeout = setTimeout(() => {
            that.props.room.send({
                action: 'finished'
            })
        }, 1000)
    }

    highlightButton = buttonNumber => {
        this.disableButtons()
        this.setState({ isQuestionAnswered: true })
        switch (buttonNumber) {
            case 1:
                this.setState({ buttonOneBorderColor: SELECTED_BUTTON_COLOR })
                return
            case 2:
                this.setState({ buttonTwoBorderColor: SELECTED_BUTTON_COLOR })
                return
            case 3:
                this.setState({ buttonThreeBorderColor: SELECTED_BUTTON_COLOR })
                return
            case 4:
                this.setState({ buttonFourBorderColor: SELECTED_BUTTON_COLOR })
                return
            case 5:
                this.setState({ buttonFiveBorderColor: SELECTED_BUTTON_COLOR })
                return
            case 6:
                this.setState({ buttonSixBorderColor: SELECTED_BUTTON_COLOR })
                return
        }
    }

    highlightOpponentButton = buttonNumber => {
        switch (buttonNumber) {
            case 1:
                this.setState({ buttonOneBorderColor: OPPONENT_ANSWER_COLOR })
                return
            case 2:
                this.setState({ buttonTwoBorderColor: OPPONENT_ANSWER_COLOR })
                return
            case 3:
                this.setState({ buttonThreeBorderColor: OPPONENT_ANSWER_COLOR })
                return
            case 4:
                this.setState({ buttonFourBorderColor: OPPONENT_ANSWER_COLOR })
                return
            case 5:
                this.setState({ buttonFiveBorderColor: OPPONENT_ANSWER_COLOR })
                return
            case 6:
                this.setState({ buttonSixBorderColor: OPPONENT_ANSWER_COLOR })
                return
        }
    }

    disableButtons = () => {
        this.setState({
            isButtonOneDisabled: true,
            isButtonTwoDisabled: true,
            isButtonThreeDisabled: true,
            isButtonFourDisabled: true,
            isButtonFiveDisabled: true,
            isButtonSixDisabled: true
        })
    }

    resetButtons = () => {
        this.setState({
            isButtonOneDisabled: false,
            isButtonTwoDisabled: false,
            isButtonThreeDisabled: false,
            isButtonFourDisabled: false,
            isButtonFiveDisabled: false,
            isButtonSixDisabled: false,
            buttonOneBorderColor: NORMAL_BUTTON_COLOR,
            buttonTwoBorderColor: NORMAL_BUTTON_COLOR,
            buttonThreeBorderColor: NORMAL_BUTTON_COLOR,
            buttonFourBorderColor: NORMAL_BUTTON_COLOR,
            buttonFiveBorderColor: NORMAL_BUTTON_COLOR,
            buttonSixBorderColor: NORMAL_BUTTON_COLOR,
            playerOneButton: 0,
            playerTwoButton: 0
        })
    }

    countdownOnFinish = () => {
        if (this.state.isQuestionAnswered) return
        // We send the same response as 'leave empty' option
        this.buttonOnPress(6)
    }

    backButtonOnPress = () => {
        this.props.room.removeAllListeners()
        this.props.room.leave()
        navigationPop()
    }

    zoomButtonOnPress = () => {
        this.setState({ isQuestionModalVisible: true })
    }

    questionModalCloseOnPress = () => {
        this.setState({ isQuestionModalVisible: false })
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView color={styles.topContainer.backgroundColor} />
                <View style={styles.topContainer}>
                    <View style={styles.headerContainer}>
                        <View style={styles.userContainer}>
                            <Image
                                source={require('../../../assets/snoop.jpg')}
                                style={styles.userProfilePicture}
                            />
                            <View style={styles.usernameContainer}>
                                <Text style={styles.usernameText}>
                                    {this.props.playerUsername}
                                </Text>
                            </View>
                            <View style={styles.answersContainer}>
                                <Text style={styles.answersText}>D:</Text>
                                <Text> </Text>
                                <Text style={styles.answersText}>
                                    {this.state.playerOneCorrect}
                                </Text>
                                <Text style={styles.answersText}> Y:</Text>
                                <Text> </Text>
                                <Text style={styles.answersText}>
                                    {this.state.playerOneIncorrect}
                                </Text>
                                <Text style={styles.answersText}> B:</Text>
                                <Text> </Text>
                                <Text style={styles.answersText}>
                                    {this.state.playerOneUnanswered}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.countdownContainer}>
                            <View style={styles.countdownInnerContainer}>
                                <CountDown
                                    until={this.state.countDownTime}
                                    size={countdownProps.size}
                                    digitStyle={{
                                        backgroundColor: '#3FC8D9'
                                    }}
                                    digitTxtStyle={styles.countdownText}
                                    timeToShow={['M', 'S']}
                                    timeLabels={{ s: null }}
                                    separatorStyle={{ color: '#fff' }}
                                    showSeparator
                                    running={this.state.isCountDownRunning}
                                    onFinish={this.countdownOnFinish}
                                />
                            </View>
                        </View>
                        <View style={styles.userContainer}>
                            <Image
                                source={require('../../../assets/doge.jpeg')}
                                style={styles.userProfilePicture}
                            />
                            <View style={styles.usernameContainer}>
                                <Text style={styles.usernameText}>
                                    {this.props.opponentUsername}
                                </Text>
                            </View>
                            <View style={styles.answersContainer}>
                                <Text style={styles.answersText}>D:</Text>
                                <Text> </Text>
                                <Text style={styles.answersText}>
                                    {this.state.playerTwoCorrect}
                                </Text>
                                <Text style={styles.answersText}> Y:</Text>
                                <Text> </Text>
                                <Text style={styles.answersText}>
                                    {this.state.playerTwoIncorrect}
                                </Text>
                                <Text style={styles.answersText}> B:</Text>
                                <Text> </Text>
                                <Text style={styles.answersText}>
                                    {this.state.playerTwoUnanswered}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.questionContainer}>
                        <Image
                            source={{
                                uri: this.state.questionList[
                                    this.state.questionNumber
                                ]
                            }}
                            style={styles.questionStyle}
                        />
                    </View>
                    <Modal
                        visible={this.state.isQuestionModalVisible}
                        transparent={true}
                        animationType={'fade'}
                    >
                        <View style={styles.questionModalContainer}>
                            <View style={styles.questionImageModalContainer}>
                                <Image
                                    source={require('../../../assets/soru.jpg')}
                                    style={styles.questionModalStyle}
                                />
                            </View>
                            <View style={styles.closeModalContainer}>
                                <TouchableOpacity
                                    onPress={this.questionModalCloseOnPress}
                                >
                                    <Image
                                        source={require('../../../assets/x.png')}
                                        style={styles.closeModal}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <View style={styles.questionInformation}>
                        <Text style={styles.questionInformationText}>
                            Soru {this.state.questionNumber + 1} /{' '}
                            {Object.keys(this.state.questionList).length}
                        </Text>
                    </View>
                    <View style={styles.zoomButtonContainer}>
                        <TouchableOpacity onPress={this.zoomButtonOnPress}>
                            <Image
                                source={require('../../../assets/zoom.png')}
                                style={styles.zoomButton}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.backButtonContainer}>
                        <TouchableOpacity onPress={this.backButtonOnPress}>
                            <Image
                                source={require('../../../assets/Back.png')}
                                style={styles.backButton}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.dummyButtonContainer}>
                    {this.state.start && (
                        <View>
                            <View style={styles.topButtonRowContainer}>
                                <TouchableOpacity
                                    onPress={() => this.buttonOnPress(1)}
                                    disabled={this.state.isButtonOneDisabled}
                                >
                                    <View
                                        style={[
                                            styles.button,
                                            {
                                                borderColor: this.state
                                                    .buttonOneBorderColor
                                            }
                                        ]}
                                    >
                                        <Text style={styles.buttonText}>A</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.buttonOnPress(2)}
                                    disabled={this.state.isButtonTwoDisabled}
                                >
                                    <View
                                        style={[
                                            styles.button,
                                            {
                                                borderColor: this.state
                                                    .buttonTwoBorderColor
                                            }
                                        ]}
                                    >
                                        <Text style={styles.buttonText}>B</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.buttonOnPress(3)}
                                    disabled={this.state.isButtonThreeDisabled}
                                >
                                    <View
                                        style={[
                                            styles.button,
                                            {
                                                borderColor: this.state
                                                    .buttonThreeBorderColor
                                            }
                                        ]}
                                    >
                                        <Text style={styles.buttonText}>C</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bottomButtonRowContainer}>
                                <TouchableOpacity
                                    onPress={() => this.buttonOnPress(4)}
                                    disabled={this.state.isButtonFourDisabled}
                                >
                                    <View
                                        style={[
                                            styles.button,
                                            {
                                                borderColor: this.state
                                                    .buttonFourBorderColor
                                            }
                                        ]}
                                    >
                                        <Text style={styles.buttonText}>D</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.buttonOnPress(5)}
                                    disabled={this.state.isButtonFiveDisabled}
                                >
                                    <View
                                        style={[
                                            styles.button,
                                            {
                                                borderColor: this.state
                                                    .buttonFiveBorderColor
                                            }
                                        ]}
                                    >
                                        <Text style={styles.buttonText}>E</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.buttonOnPress(6)}
                                    disabled={this.state.isButtonSixDisabled}
                                >
                                    <View
                                        style={[
                                            styles.button,
                                            {
                                                borderColor: this.state
                                                    .buttonSixBorderColor
                                            }
                                        ]}
                                    >
                                        <Text style={styles.buttonText}>
                                            Boş
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
                <View style={styles.jokerContainer}>
                    <View style={styles.touchableJokerContainer}>
                        <TouchableOpacity>
                            <View style={styles.jokerAndTextContainer}>
                                <Image
                                    source={require('../../../assets/Rakip.png')}
                                    style={styles.joker}
                                />
                                <Text style={styles.jokerText}>
                                    Rakibin şıkkını gör
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.touchableJokerContainer}>
                        <TouchableOpacity>
                            <View style={styles.jokerAndTextContainer}>
                                <Image
                                    source={require('../../../assets/Sikeleme.png')}
                                    style={styles.joker}
                                />
                                <Text style={styles.jokerText}>Şık Ele</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.touchableJokerContainer}>
                        <TouchableOpacity>
                            <View style={styles.jokerAndTextContainer}>
                                <Image
                                    source={require('../../../assets/2hak.png')}
                                    style={styles.joker}
                                />
                                <Text style={styles.jokerText}>
                                    İkinci Şans
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default RankedGame
