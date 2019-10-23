import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    Alert,
    FlatList,
    BackHandler
} from 'react-native'
import styles, { countdownProps } from './style'
import CountDown from 'react-native-countdown-component'
import NotchView from '../../../components/notchView'
import { SCENE_KEYS } from '../../../config/'
import {
    navigationReset,
    navigationReplace
} from '../../../services/navigationService'
import { connect } from 'react-redux'
import { clientActions } from '../../../redux/client/actions'

import CLOSE_BUTTON from '../../../assets/closeButton.png'
import ZOOM_BUTTON from '../../../assets/gameScreens/zoomButton.png'
import BACK_BUTTON from '../../../assets/backButton.png'
import FIFTY_FIFTY from '../../../assets/gameScreens/jokers/fiftyFifty.png'
import SECOND_CHANCE from '../../../assets/gameScreens/jokers/secondChance.png'
import CORRECT_IMG from '../../../assets/gameScreens/correct.png'
import UNANSWERED_IMG from '../../../assets/gameScreens/unanswered.png'
import INCORRECT_IMG from '../../../assets/gameScreens/incorrect.png'

const NORMAL_BUTTON_COLOR = '#C3C3C3'
const SELECTED_BUTTON_COLOR = '#00d9ef'
const CORRECT_ANSWER_COLOR = '#14e31f'
const INCORRECT_ANSWER_COLOR = '#eb2b0e'

class GroupGame extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // Player buttons
            playerOneButton: 0,
            // Question number
            questionNumber: 0,
            // Player answers
            playerOneCorrect: 0,
            playerOneIncorrect: 0,
            playerOneUnanswered: 0,
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
            isRemoveOptionJokerDisabled: true,
            isSecondChanceJokerDisabled: true,
            // Joker active variables
            isSecondChanceJokerActive: false,
            // Current question answer for second chance joker
            questionAnswer: 0,
            // Question visible variable
            isQuestionVisible: true,
            // Group leaderboard
            groupLeaderboard: [],
            // Joker names
            secondJokerName: '',
            thirdJokerName: '',
            // Full question list for favouriting
            fullQuestionList: []
        }
    }

    // We get the room in props
    async componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                this.backButtonOnPress()
            }
        )
        // We check if the user has enough jokers
        this.checkJokerAmount()
        await this.initializeLeaderboard()
        // We send ready signal when game screen is loaded
        this.props.room.send({
            action: 'ready'
        })
        this.props.room.onStateChange.add(state => {
            // We update the UI after state changes
            this.chooseStateAction(state.groupState)
        })
        // Joker messages come through here
        this.props.room.onMessage.add(message => {
            this.chooseMessageAction(message)
        })
        this.props.room.onError.add(err => console.log(err))
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    checkJokerAmount = () => {
        this.props.userJokers.forEach(userJoker => {
            switch (userJoker.jokerId) {
                case 2:
                    this.setState({
                        secondJokerName:
                            userJoker.joker.name + ' ' + userJoker.amount,
                        isRemoveOptionJokerDisabled: false
                    })
                    break
                case 3:
                    this.setState({
                        thirdJokerName:
                            userJoker.joker.name + ' ' + userJoker.amount,
                        isSecondChanceJokerDisabled: false
                    })
                    break
            }
        })
    }

    initializeLeaderboard = () => {
        return new Promise(resolve => {
            const groupLeaderboard = []

            this.props.groupRoomPlayerList.forEach(player => {
                delete player.id
                delete player.profilePicture
                delete player.status
                delete player.isLeader
                player.correct = 0
                player.incorrect = 0
                player.unanswered = 0
                groupLeaderboard.push(player)
            })
            this.setState({ groupLeaderboard: groupLeaderboard })

            resolve(true)
        })
    }

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
                break
            // Question answer comes from the server
            case 'second-chance-joker':
                this.setState({ questionAnswer: message.questionAnswer })
                break
            case 'client-leaving':
                Alert.alert(
                    this.state.opponentId,
                    `${message.username} oyundan ayrildi.`
                )
                break
            case 'only-client':
                Alert.alert('Herkes oyundan ayrıldı!')
                // If the client hasn't answered any of the questions, we just navigate him to main screen
                if (
                    Object.keys(message.playerProps[message.clientId].answers)
                        .length === 0
                ) {
                    this.onlyClientMatchQuit()
                    break
                }
                // Do a shutdown routine
                this.shutdownGame()
                navigationReplace(SCENE_KEYS.gameScreens.groupGameStats, {
                    playerProps: message.playerProps,
                    room: this.props.room,
                    client: this.props.client,
                    questionList: this.state.questionList,
                    fullQuestionList: message.fullQuestionList,
                    isMatchFinished: false
                })
                break
            case 'finished-resend':
                this.props.room.send({
                    action: 'finished'
                })
                break
            case 'save-questions':
                this.setState({ fullQuestionList: message.fullQuestionList })
                break
        }
    }

    onlyClientMatchQuit = () => {
        this.shutdownGame()
        this.props.client.close()
        navigationReset('main')
    }

    // TODO Move these actions to their functions
    chooseStateAction = groupState => {
        // We check the action that happened
        switch (groupState.stateInformation) {
            // Setting up question number and resetting the buttons
            case 'question':
                // We set the questionList once when the game starts
                if (groupState.questionNumber === 0)
                    this.setState({ questionList: groupState.questionList })
                // We reset the questions every time a round starts
                this.resetButtons()
                // Necessary settings
                this.setState({
                    start: false,
                    questionNumber: groupState.questionNumber,
                    isQuestionAnswered: false,
                    countDownTime: 60,
                    isCountDownRunning: false
                })
                // 5s is the question reading time
                this.startTimeout = setTimeout(() => {
                    this.setState({
                        playerOneButton: 0,
                        isCountDownRunning: true,
                        start: true
                    })
                }, 3000)
                break
            // As soon as someone answers, a result event is fired
            case 'result':
                this.setState({ playerProps: groupState.playerProps })
                break
            case 'show-results':
                // 8 second countdown time for the results
                this.setState({
                    countDownTime: 5
                })
                this.updateTimeout = setTimeout(() => {
                    // We wait 2.5 seconds for the reveal
                    this.updatePlayerResults()
                }, 2500)
                break
            case 'match-finished':
                this.shutdownGame()
                navigationReplace(SCENE_KEYS.gameScreens.groupGameStats, {
                    playerProps: this.state.playerProps,
                    room: this.props.room,
                    client: this.props.client,
                    questionList: this.state.questionList,
                    fullQuestionList: this.state.fullQuestionList,
                    isMatchFinished: false
                })
                break
            case 'player-props':
                this.setState({ playerProps: groupState.playerProps }, () => {
                    this.updateGroupLeaderboard()
                })
                break
        }
    }
    // TODO add a list here that has all the answers
    updatePlayerResults = () => {
        // Player answers to the question
        const answers = this.state.playerProps[this.props.client.id].answers

        // Switch statement for the user
        this.updateAnswers(answers)
        // Update group leaderboard
        this.updateGroupLeaderboard()
    }

    updateGroupLeaderboard = () => {
        const playerList = []

        const playerProps = this.state.playerProps
        const playerIds = Object.keys(playerProps)

        let correct = 0
        let incorrect = 0
        let unanswered = 0
        let username = ''

        playerIds.forEach(playerId => {
            if (!playerProps[playerId].isLeft) {
                username = playerProps[playerId].username
                if (playerProps[playerId].answers !== undefined) {
                    playerProps[playerId].answers.forEach(result => {
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

                    playerList.push({
                        username: username,
                        correct: correct,
                        incorrect: incorrect,
                        unanswered: unanswered
                    })
                    correct = 0
                    incorrect = 0
                    unanswered = 0
                }
            }
        })
        this.setState({ groupLeaderboard: playerList })
    }

    updateAnswers = answers => {
        switch (answers[this.state.questionNumber].result) {
            // If the answer is unanswered
            case null:
                this.setState({
                    playerOneUnanswered: this.state.playerOneUnanswered + 1
                })
                this.updateButtons(
                    answers[this.state.questionNumber].correctAnswer,
                    true
                )
                return
            // If the answer is correct
            case true:
                this.setState({
                    playerOneCorrect: this.state.playerOneCorrect + 1
                })
                this.updateButtons(
                    answers[this.state.questionNumber].answer,
                    true
                )
                return
            // If the answer is incorrect
            case false:
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
        this.props.room.leave()
        this.props.client.close()
        navigationReset('main')
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
                disabledButton: false,
                jokerId: 2
            })
        else
            this.props.room.send({
                action: 'remove-options-joker',
                disabled: alreadyDisabledButton,
                jokerId: 2
            })
        this.props.subtractJoker(2)
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

    secondChangeJokerOnPressed = () => {
        this.setState({
            isSecondChanceJokerDisabled: true,
            isSecondChanceJokerActive: true
        })
        this.props.room.send({
            action: 'second-chance-joker',
            jokerId: 3
        })
        this.props.subtractJoker(3)
    }

    changeQuestionLeaderboard = () => {
        this.setState({ isQuestionVisible: !this.state.isQuestionVisible })
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
                                    uri: this.props.clientInformation
                                        .profilePicture
                                }}
                                style={styles.userProfilePicture}
                            />
                            <View style={styles.usernameContainer}>
                                <Text style={styles.usernameText}>
                                    {this.props.clientInformation.username}
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
                        <View style={styles.seeGroupContainer}>
                            {this.state.isQuestionVisible === true && (
                                <TouchableOpacity
                                    onPress={this.changeQuestionLeaderboard}
                                >
                                    <View style={styles.seeGroupCircle}>
                                        <Text style={styles.seeGroupText}>
                                            Grubu
                                        </Text>
                                        <Text style={styles.seeGroupText}>
                                            Gör
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            {this.state.isQuestionVisible === false && (
                                <TouchableOpacity
                                    onPress={this.changeQuestionLeaderboard}
                                >
                                    <View style={styles.seeGroupCircle}>
                                        <Text style={styles.seeGroupText}>
                                            Soruyu
                                        </Text>
                                        <Text style={styles.seeGroupText}>
                                            Gör
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                    {this.state.isQuestionVisible === true && (
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
                    )}
                    {this.state.isQuestionVisible === false && (
                        <View style={styles.questionContainer}>
                            <View style={styles.resultsContainerHeader}>
                                <View style={styles.orderContainer}>
                                    <Text style={styles.orderHeaderText}>
                                        No
                                    </Text>
                                </View>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.nameHeaderText}>
                                        Kullanıcı
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
                                data={this.state.groupLeaderboard}
                                vertical={true}
                                showsVerticalScrollIndicator={false}
                                nestedScrollEnabled={true}
                                extraData={this.state.playerProps}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={styles.userRow}>
                                            <View style={styles.orderContainer}>
                                                <Text
                                                    style={
                                                        styles.orderNumberText
                                                    }
                                                >
                                                    {index + 1}
                                                </Text>
                                            </View>
                                            <View style={styles.nameContainer}>
                                                <Text style={styles.nameText}>
                                                    {item.username}
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.optionsContainer}
                                            >
                                                <View
                                                    style={
                                                        styles.optionContainer
                                                    }
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
                                                    style={
                                                        styles.optionContainer
                                                    }
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
                                                    style={
                                                        styles.optionContainer
                                                    }
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
                    )}
                    <Modal
                        visible={this.state.isQuestionModalVisible}
                        transparent={true}
                        animationType={'fade'}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.questionImageModalContainer}>
                                <Image
                                    source={{
                                        uri: this.state.questionList[
                                            this.state.questionNumber
                                        ]
                                    }}
                                    style={styles.questionModalStyle}
                                />
                            </View>
                            <View style={styles.closeModalContainer}>
                                <TouchableOpacity
                                    onPress={this.questionModalCloseOnPress}
                                >
                                    <Image
                                        source={CLOSE_BUTTON}
                                        style={styles.closeModal}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <View style={styles.questionAndZoomButtonContainer}>
                        <View style={styles.spaceContainer} />
                        <View style={styles.questionInformation}>
                            <Text style={styles.questionInformationText}>
                                Soru {this.state.questionNumber + 1} /{' '}
                                {Object.keys(this.state.questionList).length}
                            </Text>
                        </View>
                        <View style={styles.zoomButtonContainer}>
                            {this.state.isQuestionVisible === true && (
                                <TouchableOpacity
                                    onPress={this.zoomButtonOnPress}
                                >
                                    <Image
                                        source={ZOOM_BUTTON}
                                        style={styles.zoomButton}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                    <View style={styles.backButtonContainer}>
                        <TouchableOpacity onPress={this.backButtonOnPress}>
                            <Image
                                source={BACK_BUTTON}
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
                            onPress={this.removeOptionJokerOnPressed}
                            disabled={this.state.isRemoveOptionJokerDisabled}
                        >
                            <View style={styles.jokerAndTextContainer}>
                                <Image
                                    source={
                                        this.state
                                            .isRemoveOptionJokerDisabled ===
                                        false
                                            ? FIFTY_FIFTY
                                            : null
                                    }
                                    style={styles.joker}
                                />
                                <Text style={styles.jokerText}>
                                    {this.state.isRemoveOptionJokerDisabled ===
                                    false
                                        ? this.state.secondJokerName
                                        : ''}
                                </Text>
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
                                    source={
                                        this.state
                                            .isSecondChanceJokerDisabled ===
                                        false
                                            ? SECOND_CHANCE
                                            : null
                                    }
                                    style={styles.joker}
                                />
                                <Text style={styles.jokerText}>
                                    {this.state.isSecondChanceJokerDisabled ===
                                    false
                                        ? this.state.thirdJokerName
                                        : ''}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    clientInformation: state.client.clientInformation,
    userJokers: state.client.userJokers
})

const mapDispatchToProps = dispatch => ({
    subtractJoker: jokerId => dispatch(clientActions.subtractJoker(jokerId))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupGame)
