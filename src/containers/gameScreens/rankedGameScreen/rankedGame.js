import React from 'react'
import { View, Text, Image, TouchableOpacity, Modal, Alert } from 'react-native'
import styles, { countdownProps } from './style'
import CountDown from 'react-native-countdown-component'
import NotchView from '../../../components/notchView'
import { SCENE_KEYS } from '../../../config/'
import {
    navigationPop,
    navigationPush
} from '../../../services/navigationService'

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
            isQuestionModalVisible: false,
            // Question option names
            buttonOneName: 'A',
            buttonTwoName: 'B',
            buttonThreeName: 'C',
            buttonFourName: 'D',
            buttonFiveName: 'E',
            buttonSixName: 'Boş',
            // Joker disable variables
            isRemoveOptionJokerDisabled: false,
            isSeeOpponentAnswerJokerDisabled: false,
            isSecondChanceJokerDisabled: false,
            // Joker active variables
            isSeeOpponentAnswerJokerActive: false,
            isSecondChanceJokerActive: false,
            // Current question answer for second chance
            questionAnswer: 0
        }
    }

    // We get the room in props
    componentDidMount() {
        // We send ready signal when game screen is loaded
        this.props.room.send({
            action: 'ready'
        })
        this.props.room.onStateChange.add(state => {
            // We update the UI after state changes
            this.chooseStateAction(state.rankedState)
        })
        // Joker messages come through here
        this.props.room.onMessage.add(message => {
            this.chooseMessageAction(message)
        })
        this.props.room.onError.add(err => console.log(err))
    }

    componentWillUnmount() {}

    shutdownGame = () => {
        // We clear the timeouts on quitting
        clearTimeout(this.startTimeout)
        clearTimeout(this.updateTimeout)
        clearTimeout(this.finishedTimeout)

        // Clear room listeners
        this.props.room.removeAllListeners()

        // Clear other game related things
        this.setState({ isCountDownRunning: false })
    }

    chooseMessageAction = message => {
        switch (message.action) {
            // Which options to remove comes from the server
            case 'remove-options-joker':
                this.removeOptions(message.optionsToRemove)
                return
            // Question answer comes from the server
            case 'second-chance-joker':
                this.setState({ questionAnswer: message.questionAnswer })
                return
            case 'client-leaving':
                // TODO navigate to the game-stats screen
                Alert.alert(this.state.opponentId, 'oyuncu oyundan ayrildi.')

                // Do a shutdown routine
                this.shutdownGame()

                return
        }
    }

    // TODO Move these actions to their functions
    chooseStateAction = rankedState => {
        // We check the action that happened
        switch (rankedState.stateInformation) {
            // Setting up question number and resetting the buttons
            case 'question':
                // We set the questionList once when the game starts
                if (rankedState.questionNumber === 0)
                    this.setState({ questionList: rankedState.questionList })
                // If the second chance joker is active when the round starts, we deactivate it
                if (this.state.isSeeOpponentAnswerJokerActive)
                    this.setState({ isSeeOpponentAnswerJokerActive: false })
                // We reset the questions every time a round starts
                this.resetButtons()
                // Necessary settings
                this.setState({
                    start: false,
                    questionNumber: rankedState.questionNumber,
                    isQuestionAnswered: false,
                    countDownTime: 60,
                    isCountDownRunning: false
                })
                // 5s is the question reading time
                this.startTimeout = setTimeout(() => {
                    this.setState({
                        playerOneButton: 0,
                        playerTwoButton: 0,
                        isCountDownRunning: true,
                        start: true
                    })
                }, 5000)
                return
            // As soon as someone answers, a result event is fired
            case 'result':
                if (
                    this.state.isSeeOpponentAnswerJokerActive &&
                    // We check if the answer is from the opponent, if not we don't proceed
                    rankedState.playerProps[this.props.client.id].answers[
                        this.state.questionNumber
                    ] === undefined
                ) {
                    this.setState({ isSeeOpponentAnswerJokerActive: false })
                    // We show the opponent answer here
                    this.highlightOpponentButton(
                        rankedState.playerProps[this.state.opponentId].answers[
                            this.state.questionNumber
                        ].answer
                    )
                }
                this.setState({ playerProps: rankedState.playerProps })
                return
            case 'show-results':
                // 8 second countdown time for the results
                this.setState({
                    countDownTime: 8
                })
                this.highlightOpponentButton(
                    rankedState.playerProps[this.state.opponentId].answers[
                        this.state.questionNumber
                    ].answer
                )
                this.updateTimeout = setTimeout(() => {
                    // We wait 2.5 seconds for the reveal
                    this.updatePlayerResults()
                }, 2500)
                return
            case 'match-finished':
                this.shutdownGame()
                navigationPush(SCENE_KEYS.gameScreens.gameStats, {
                    playerProps: this.state.playerProps,
                    room: this.props.room,
                    client: this.props.client,
                    questionList: this.state.questionList
                })
                return
        }
    }

    updatePlayerResults = () => {
        // Player answers to the question
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
        // If buttonNumber is same as the answer we deactivate the joker and continue
        if (this.state.isSecondChanceJokerActive) {
            this.setState({
                isSecondChanceJokerActive: false
            })
            if (buttonNumber !== this.state.questionAnswer) {
                this.removeOption(buttonNumber)
                return
            }
        }

        let that = this

        this.setState({ playerOneButton: buttonNumber })
        this.highlightButton(buttonNumber)

        this.props.room.send({
            action: 'button-press',
            button: buttonNumber
        })
        // After setting the button and sending 'button-press' action, we send 'finished' action for round end
        // There is a timeout because there needs to be a delay between the events
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
            playerTwoButton: 0,
            buttonOneName: 'A',
            buttonTwoName: 'B',
            buttonThreeName: 'C',
            buttonFourName: 'D',
            buttonFiveName: 'E',
            buttonSixName: 'Boş'
        })
    }

    countdownOnFinish = () => {
        // If the question is answered we do nothing
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

    removeOptionJokerOnPressed = () => {
        this.setState({ isRemoveOptionJokerDisabled: true })

        // This is used for not selecting the already disabled button to remove
        let alreadyDisabledButton = 0

        if (this.state.isButtonOneDisabled) alreadyDisabledButton = 1
        if (this.state.isButtonTwoDisabled) alreadyDisabledButton = 2
        if (this.state.isButtonThreeDisabled) alreadyDisabledButton = 3
        if (this.state.isButtonFourDisabled) alreadyDisabledButton = 4
        if (this.state.isButtonFiveDisabled) alreadyDisabledButton = 5

        // If there is a disabled button we send it, if not we don't do anything
        if (alreadyDisabledButton === 0)
            this.props.room.send({
                action: 'remove-options-joker',
                disabledButton: false
            })
        else
            this.props.room.send({
                action: 'remove-options-joker',
                disabled: alreadyDisabledButton
            })
    }

    removeOptions = optionsToRemove => {
        optionsToRemove.forEach(element => {
            this.removeOption(element)
        })
    }

    removeOption = buttonNumber => {
        switch (buttonNumber) {
            case 1:
                this.setState({
                    buttonOneName: '',
                    isButtonOneDisabled: true
                })
                return
            case 2:
                this.setState({
                    buttonTwoName: '',
                    isButtonTwoDisabled: true
                })
                return
            case 3:
                this.setState({
                    buttonThreeName: '',
                    isButtonThreeDisabled: true
                })
                return
            case 4:
                this.setState({
                    buttonFourName: '',
                    isButtonFourDisabled: true
                })
                return
            case 5:
                this.setState({
                    buttonFiveName: '',
                    isButtonFiveDisabled: true
                })
                return
        }
    }

    seeOpponentAnswerJokerOnPressed = () => {
        this.setState({
            isSeeOpponentAnswerJokerDisabled: true,
            isSeeOpponentAnswerJokerActive: true
        })

        // If the user answered the question before we used the joker, we show the answer immediately
        const playerProp = this.state.playerProps[this.state.opponentId]
        let answers
        // Necessary checks for any undefined variables
        if (playerProp !== undefined) {
            answers = playerProp.answers[this.state.questionNumber]

            if (answers !== undefined) {
                this.setState({ isSeeOpponentAnswerJokerActive: false })
                this.highlightOpponentButton(answers.answer)
            }
        }
    }

    secondChangeJokerOnPressed = () => {
        this.setState({
            isSecondChanceJokerDisabled: true,
            isSecondChanceJokerActive: true
        })
        this.props.room.send({
            action: 'second-chance-joker'
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView color={styles.topContainer.backgroundColor} />
                <View style={styles.topContainer}>
                    <View style={styles.headerContainer}>
                        <View style={styles.userContainer}>
                            <Image
                                source={{
                                    uri: this.props.playerProfilePicture
                                }}
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
                                source={{
                                    uri: this.props.opponentProfilePicture
                                }}
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
                                        <Text style={styles.buttonText}>
                                            {this.state.buttonOneName}
                                        </Text>
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
                                        <Text style={styles.buttonText}>
                                            {this.state.buttonTwoName}
                                        </Text>
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
                                        <Text style={styles.buttonText}>
                                            {this.state.buttonThreeName}
                                        </Text>
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
                                        <Text style={styles.buttonText}>
                                            {this.state.buttonFourName}
                                        </Text>
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
                                        <Text style={styles.buttonText}>
                                            {this.state.buttonFiveName}
                                        </Text>
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
                                            {this.state.buttonSixName}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
                <View style={styles.jokerContainer}>
                    <View style={styles.touchableJokerContainer}>
                        <TouchableOpacity
                            onPress={this.seeOpponentAnswerJokerOnPressed}
                            disabled={
                                this.state.isSeeOpponentAnswerJokerDisabled
                            }
                        >
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
                        <TouchableOpacity
                            onPress={this.removeOptionJokerOnPressed}
                            disabled={this.state.isRemoveOptionJokerDisabled}
                        >
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
                        <TouchableOpacity
                            onPress={this.secondChangeJokerOnPressed}
                            disabled={this.state.isSecondChanceJokerDisabled}
                        >
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
