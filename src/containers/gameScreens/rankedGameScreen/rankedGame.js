import React from 'react'
import { View, Text, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import styles, { countdownProps } from './style'
import { Buffer } from 'buffer'
window.localStorage = AsyncStorage
global.Buffer = Buffer
import * as Colyseus from 'colyseus.js'
import CountDown from 'react-native-countdown-component'
import NotchView from '../../../components/notchView'

const NORMAL_BUTTON_COLOR = '#C3C3C3'
const SELECTED_BUTTON_COLOR = '#00d9ef'

class RankedGame extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // Registered room name
            roomName: 'rankedRoom',
            // Dummy player info
            playerOne: {
                create: true,
                userLevel: 4,
                username: 'arda',
                examName: 'LGS',
                courseName: 'Matematik',
                subjectName: 'Sayilar'
            },
            playerTwo: {
                create: true,
                userLevel: 4,
                username: 'deli',
                examName: 'LGS',
                courseName: 'Matematik',
                subjectName: 'Sayilar'
            },
            // Player buttons
            playerOneButton: 0,
            playerTwoButton: 0,
            // Players usernames
            playerOneUsername: '',
            playerTwoUsername: '',
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
            countDownTime: 60
        }
    }

    componentDidMount() {
        this.client = new Colyseus.Client('http://localhost:5000')
        this.client.onOpen.add(() => {
            this.joinRoom()
        })
    }

    // Client sends a ready signal when they join a room successfully
    joinRoom = () => {
        this.room = this.client.join(this.state.roomName, this.state.playerOne)
        this.room.onJoin.add(() =>
            setTimeout(() => {
                this.room.send({
                    action: 'ready'
                })
            }, 2000)
        )
        this.room.onError.add(err => console.log(err))
        this.room.onStateChange.add(state => {
            // We update the UI after state changes
            this.updateUIState(state.rankedState)
        })
    }

    updateUIState = rankedState => {
        // First we decide which one is the player
        if (this.client.id === rankedState.playerOneId) {
            this.chooseStateAction(rankedState, true)
        } else {
            this.chooseStateAction(rankedState, false)
        }
    }

    // if isThisPlayerOne is true, we are the player one. Otherwise player two
    chooseStateAction = (rankedState, isThisPlayerOne) => {
        console.log(rankedState.stateInformation)
        // We check the action that happened
        switch (rankedState.stateInformation) {
            // Setting up question number and resetting the buttons
            case 'question':
                // We only do these once
                if (rankedState.questionNumber === 0) {
                    this.setState({ questionList: rankedState.questionList })
                    if (rankedState.playerOneId === this.client.id) {
                        this.setState({
                            playerOneUsername:
                                rankedState.playerProps[rankedState.playerOneId]
                                    .username,
                            playerTwoUsername:
                                rankedState.playerProps[rankedState.playerTwoId]
                                    .username
                        })
                    } else {
                        this.setState({
                            playerOneUsername:
                                rankedState.playerProps[rankedState.playerTwoId]
                                    .username,
                            playerTwoUsername:
                                rankedState.playerProps[rankedState.playerOneId]
                                    .username
                        })
                    }
                }
                this.resetButtons()
                this.setState({
                    start: false,
                    questionNumber: rankedState.questionNumber,
                    isQuestionAnswered: false,
                    countDownTime: 60,
                    isCountDownRunning: false
                })
                setTimeout(() => {
                    this.setState({
                        playerOneButton: 0,
                        playerTwoButton: 0,
                        isCountDownRunning: true,
                        start: true
                    })
                }, 5000)
                return
            // Player one answered the question
            case 'results-one':
                this.updateAnswerResult(rankedState, true, isThisPlayerOne)
                return
            // Player two answered the question
            case 'results-two':
                this.updateAnswerResult(rankedState, false, isThisPlayerOne)
                return
            case 'reset-round':
                this.setState({
                    countDownTime: 4
                })
                return
            case 'match-finished':
                this.setState({ isCountDownRunning: false })
                return
        }
    }

    updateAnswerResult = (rankedState, isPlayerOneAnswer, isThisPlayerOne) => {
        console.log(rankedState, isPlayerOneAnswer, isThisPlayerOne)
        let answers
        let unanswered
        let correct
        let incorrect
        // Check if we are the player one and the answer is from player one, or we are two and the answer is from two
        if (isPlayerOneAnswer === isThisPlayerOne) {
            answers = rankedState.playerProps[this.client.id].answers
            unanswered = this.state.playerOneUnanswered
            correct = this.state.playerOneCorrect
            incorrect = this.state.playerOneIncorrect
        } else {
            if (isThisPlayerOne) {
                answers =
                    rankedState.playerProps[rankedState.playerTwoId].answers
                unanswered = this.state.playerTwoUnanswered
                correct = this.state.playerTwoCorrect
                incorrect = this.state.playerTwoIncorrect
            } else {
                answers =
                    rankedState.playerProps[rankedState.playerOneId].answers
                unanswered = this.state.playerTwoUnanswered
                correct = this.state.playerTwoCorrect
                incorrect = this.state.playerTwoIncorrect
            }
        }
        // The same player and player answer checks
        switch (answers[rankedState.questionNumber].result) {
            // If the answer is unanswered
            case null:
                if (isPlayerOneAnswer === isThisPlayerOne)
                    this.setState({
                        playerOneUnanswered: unanswered + 1
                    })
                else
                    this.setState({
                        playerTwoUnanswered: unanswered + 1
                    })
                return
            // If the answer is correct
            case true:
                if (isPlayerOneAnswer === isThisPlayerOne)
                    this.setState({
                        playerOneCorrect: correct + 1
                    })
                else
                    this.setState({
                        playerTwoCorrect: correct + 1
                    })
                return
            // If the answer is incorrect
            case false:
                if (isPlayerOneAnswer === isThisPlayerOne)
                    this.setState({
                        playerOneIncorrect: incorrect + 1
                    })
                else
                    this.setState({
                        playerTwoIncorrect: incorrect + 1
                    })
                return
        }
    }

    // Sends the button action and question finished action
    buttonOnPress = buttonNumber => {
        let that = this
        this.setState({ playerOneButton: buttonNumber })
        this.highlightButton(buttonNumber)
        this.room.send({
            action: 'button-press',
            button: buttonNumber
        })
        // After setting the button and sending 'button-press' action, we send 'finished' action for round end
        setTimeout(() => {
            that.room.send({
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
            buttonSixBorderColor: NORMAL_BUTTON_COLOR
        })
    }

    countdownOnFinish = () => {
        if (this.state.isQuestionAnswered) return
        // We send the same response as 'leave empty' option
        this.buttonOnPress(6)
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
                                    {this.state.playerOneUsername}
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
                                    {this.state.playerTwoUsername}
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
                    <View style={styles.questionInformation}>
                        <Text style={styles.questionInformationText}>
                            Soru {this.state.questionNumber + 1} /{' '}
                            {Object.keys(this.state.questionList).length}
                        </Text>
                    </View>
                    <View style={styles.zoomButtonContainer}>
                        <TouchableOpacity>
                            <Image
                                source={require('../../../assets/zoom.png')}
                                style={styles.zoomButton}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.backButtonContainer}>
                        <TouchableOpacity>
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
                    <View style={styles.jokerAndTextContainer}>
                        <TouchableOpacity>
                            <Image
                                source={require('../../../assets/Rakip.png')}
                                style={styles.joker}
                            />
                        </TouchableOpacity>
                        <Text style={styles.jokerText}>
                            Rakibin şıkkını gör
                        </Text>
                    </View>
                    <View style={styles.jokerAndTextContainer}>
                        <TouchableOpacity>
                            <Image
                                source={require('../../../assets/Sikeleme.png')}
                                style={styles.joker}
                            />
                        </TouchableOpacity>
                        <Text style={styles.jokerText}>Şık Ele</Text>
                    </View>
                    <View style={styles.jokerAndTextContainer}>
                        <TouchableOpacity>
                            <Image
                                source={require('../../../assets/2hak.png')}
                                style={styles.joker}
                            />
                        </TouchableOpacity>
                        <Text style={styles.jokerText}>İkinci Şans</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default RankedGame
