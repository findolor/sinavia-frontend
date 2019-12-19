import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    Alert,
    FlatList,
    BackHandler,
    Vibration
} from 'react-native'
import styles, { countdownProps } from './style'
import CountDown from 'react-native-countdown-component'
import { showMessage } from 'react-native-flash-message'
import NotchView from '../../../components/notchView'
import { SCENE_KEYS } from '../../../config/'
import {
    navigationReset,
    navigationReplace
} from '../../../services/navigationService'
import { connect } from 'react-redux'
import { clientActions } from '../../../redux/client/actions'

import ZOOM_IN_BUTTON from '../../../assets/gameScreens/zoomInButton.png'
import ZOOM_OUT_BUTTON from '../../../assets/gameScreens/zoomOutButton.png'
import BACK_BUTTON from '../../../assets/backButton.png'
import REMOVE_OPTIONS from '../../../assets/jokers/removeOptions.png'
import SECOND_CHANCE from '../../../assets/jokers/secondChance.png'
import CORRECT_IMG from '../../../assets/gameScreens/correct.png'
import UNANSWERED_IMG from '../../../assets/gameScreens/unanswered.png'
import INCORRECT_IMG from '../../../assets/gameScreens/incorrect.png'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import AuthButton from '../../../components/authScreen/authButton'
import * as Animatable from 'react-native-animatable'
import { interstitialAd } from '../../../services/admobService'

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
            isQuitGameModalVisible: false,
            visibleView: '',
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
            // Joker usage variables
            isRemoveOptionJokerUsed: false,
            isSecondChanceJokerUsed: false,
            // Joker amount variables
            isRemoveOptionJokerFinished: false,
            isSecondChanceJokerFinished: false,
            // Current question answer for second chance joker
            questionAnswer: 0,
            // Question visible variable
            isQuestionVisible: true,
            // Group leaderboard
            groupLeaderboard: [],
            // Joker names
            secondJokerNameFirstWord: '',
            secondJokerNameSecondWord: '',
            secondJokerAmount: '',
            thirdJokerNameFirstWord: '',
            thirdJokerNameSecondWord: '',
            thirdJokerAmount: '',
            // Full question list for favouriting
            fullQuestionList: [],
            // Server ping variable
            isServerPinged: false
        }
    }

    // We get the room in props
    async componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () =>
                this.setState({
                    isQuitGameModalVisible: true,
                    visibleView: 'quitGameModal'
                })
        )
        // We check if the user has enough jokers
        this.checkJokerAmount()
        await this.initializeLeaderboard()
        // We send ready signal when game screen is loaded
        this.props.room.send({
            action: 'ready'
        })

        // We set ping intervals to check if we are still connected to the server
        // This is used because with the current colyseus version this is not possible?
        this.checkPingInterval = this.checkPingInterval()
        this.pingInterval = this.pingInterval()

        this.props.room.onStateChange.add(state => {
            // We update the UI after state changes
            this.chooseStateAction(state.groupState)
        })
        // Joker messages come through here
        this.props.room.onMessage.add(message => {
            this.chooseMessageAction(message)
        })
        this.props.room.onError.add(err => {
            let that = this
            this.setState({
                isQuitGameModalVisible: true,
                visibleView: 'serverError'
            })
            setTimeout(() => {
                that.shutdownGame()
                that.props.room.leave()
                navigationReset('main')
            }, 3000)
        })
        this.props.room.onLeave.add(res => {
            let that = this
            if (res.code === 1001) return
            this.setState({
                isQuitGameModalVisible: true,
                visibleView: 'serverError'
            })
            setTimeout(() => {
                that.shutdownGame()
                that.props.room.leave()
                navigationReset('main')
            }, 3000)
        })
    }

    // This timeout checks the ping variable every 20 seconds
    // If the varible is false that means the connection has dropped
    checkPingInterval = () => {
        let that = this
        return setInterval(() => {
            if (this.state.isServerPinged)
                this.setState({ isServerPinged: false })
            else {
                this.setState({
                    isQuitGameModalVisible: true,
                    visibleView: 'serverError'
                })
                setTimeout(() => {
                    that.shutdownGame()
                    that.props.room.leave()
                    navigationReset('main')
                }, 3000)
            }
        }, 15000)
    }

    // This interval pings the server every 10 seconds
    pingInterval = () => {
        let that = this
        return setInterval(() => {
            that.props.room.send({ action: 'ping' })
        }, 10000)
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    checkJokerAmount = () => {
        this.props.userJokers.forEach(userJoker => {
            switch (userJoker.jokerId) {
                case 2:
                    let splittedSecondJoker = userJoker.joker.name.split(
                        /[ ,]+/
                    )
                    this.setState({
                        secondJokerNameFirstWord: splittedSecondJoker[0],
                        secondJokerNameSecondWord: splittedSecondJoker[1],
                        secondJokerAmount: userJoker.amount
                    })
                    if (userJoker.amount === 0) {
                        this.setState({
                            isRemoveOptionJokerDisabled: true,
                            isRemoveOptionJokerFinished: true
                        })
                    } else {
                        this.setState({ isRemoveOptionJokerDisabled: false })
                    }
                    break
                case 3:
                    let splittedThirdJoker = userJoker.joker.name.split(/[ ,]+/)
                    this.setState({
                        thirdJokerNameFirstWord: splittedThirdJoker[0],
                        thirdJokerNameSecondWord: splittedThirdJoker[1],
                        thirdJokerAmount: userJoker.amount
                    })
                    if (userJoker.amount === 0) {
                        this.setState({
                            isSecondChanceJokerDisabled: true,
                            isSecondChanceJokerFinished: true
                        })
                    } else {
                        this.setState({ isSecondChanceJokerDisabled: false })
                    }
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
        clearInterval(this.checkPingInterval)
        clearInterval(this.pingInterval)

        // Clear room listeners
        this.props.room.removeAllListeners()

        // Clear other game related things
        this.setState({ isCountDownRunning: false })
    }

    showSimpleMessage(username, props = {}) {
        const message = {
            message: username,
            description: 'oyundan ayrıldı',
            duration: 3000,
            titleStyle: {
                fontFamily: 'Averta-SemiboldItalic',
                color: '#FF9900'
            },
            textStyle: { fontFamily: 'Averta-Regular', color: '#00D9EF' },
            ...props
        }

        showMessage(message)
    }

    chooseMessageAction = message => {
        switch (message.action) {
            // Which options to remove comes from the server
            case 'remove-options-joker':
                this.setState({
                    isRemoveOptionJokerDisabled: true,
                    secondJokerAmount: this.state.secondJokerAmount - 1,
                    isRemoveOptionJokerUsed: true
                })
                this.props.subtractJoker(2)

                this.removeOptions(message.optionsToRemove)
                break
            // Question answer comes from the server
            case 'second-chance-joker':
                this.setState({
                    isSecondChanceJokerDisabled: true,
                    isSecondChanceJokerActive: true,
                    thirdJokerAmount: this.state.thirdJokerAmount - 1,
                    isSecondChanceJokerUsed: true
                })
                this.props.subtractJoker(3)

                this.setState({ questionAnswer: message.questionAnswer })
                break
            case 'error-joker':
                Alert.alert('Joker hatası!')
                break
            case 'client-leaving':
                this.showSimpleMessage(`${message.username}`, {
                    backgroundColor: '#FFFFFF',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderColor: '#00D9EF',
                    borderWidth: hp(0.25),
                    height: hp(10)
                })
                break
            case 'only-client':
                const that = this
                // If the client hasn't answered any of the questions, we just navigate him to main screen
                if (
                    Object.keys(message.playerProps[message.clientId].answers)
                        .length === 0
                ) {
                    this.setState({
                        isQuitGameModalVisible: true,
                        visibleView: 'allOpponentsLeaveNoAnswer'
                    })
                    setTimeout(function() {
                        that.props.room.leave()
                        that.onlyClientMatchQuit()
                    }, 5000)
                    break
                }
                // Do a shutdown routine
                this.setState({
                    isQuitGameModalVisible: true,
                    visibleView: 'allOpponentLeaveAfterAnswer'
                })
                setTimeout(function() {
                    that.shutdownGame()
                    if (!this.props.clientInformation.isPremium)
                        interstitialAd()
                    navigationReplace(SCENE_KEYS.gameScreens.groupGameStats, {
                        playerProps: message.playerProps,
                        room: that.props.room,
                        client: that.props.client,
                        questionList: that.state.questionList,
                        fullQuestionList: message.fullQuestionList,
                        isMatchFinished: false
                    })
                }, 5000)
                break
            case 'finished-resend':
                this.props.room.send({
                    action: 'finished'
                })
                break
            case 'save-questions':
                this.setState({ fullQuestionList: message.fullQuestionList })
                break
            case 'leave-match':
                // If the client hasn't answered any of the questions, we just navigate him to main screen
                if (
                    Object.keys(message.playerProps[message.clientId].answers)
                        .length === 0
                ) {
                    this.props.room.leave()
                    this.onlyClientMatchQuit()
                    break
                }
                console.log(this.state.questionList)
                // Do a shutdown routine
                this.shutdownGame()
                this.props.room.leave()
                if (!this.props.clientInformation.isPremium) interstitialAd()
                navigationReplace(SCENE_KEYS.gameScreens.groupGameStats, {
                    playerProps: message.playerProps,
                    room: this.props.room,
                    client: this.props.client,
                    questionList: this.state.questionList,
                    fullQuestionList: message.fullQuestionList,
                    isMatchFinished: false
                })
                break
            case 'ping':
                this.setState({ isServerPinged: true })
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
                if (!this.props.clientInformation.isPremium) interstitialAd()
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

        Vibration.vibrate(400)
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

        this.setState({
            playerOneButton: buttonNumber,
            isSecondChanceJokerDisabled: true,
            isRemoveOptionJokerDisabled: true
        })
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
        if (
            !this.state.isRemoveOptionJokerFinished &&
            !this.state.isRemoveOptionJokerUsed
        )
            this.setState({ isRemoveOptionJokerDisabled: false })
        if (
            !this.state.isSecondChanceJokerFinished &&
            !this.state.isSecondChanceJokerUsed
        )
            this.setState({ isSecondChanceJokerDisabled: false })
    }

    countdownOnFinish = () => {
        // If the question is answered we do nothing
        if (this.state.isQuestionAnswered) return
        // We send the same response as 'leave empty' option
        this.buttonOnPress(6)
    }

    zoomButtonOnPress = () => {
        this.setState({ isQuestionModalVisible: true })
    }

    questionModalCloseOnPress = () => {
        this.setState({ isQuestionModalVisible: false })
    }

    removeOptionJokerOnPressed = () => {
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
        this.props.room.send({
            action: 'second-chance-joker',
            jokerId: 3
        })
    }

    changeQuestionLeaderboard = () => {
        this.setState({ isQuestionVisible: !this.state.isQuestionVisible })
    }

    allOpponentsLeaveNoAnswer() {
        return (
            <View
                style={{
                    height: hp(120),
                    width: wp(100),
                    backgroundColor: '#000000DE'
                }}
            >
                <View style={styles.quitModalContainer}>
                    <View style={styles.quitView}>
                        <Text style={styles.areYouSureText}>
                            Tüm kullanıcılar oyundan ayrıldı
                        </Text>
                        <Text style={styles.areYouSureText}>
                            Ana sayfaya yönlendirileceksin
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    allOpponentLeaveAfterAnswer() {
        return (
            <View
                style={{
                    height: hp(120),
                    width: wp(100),
                    backgroundColor: '#000000DE'
                }}
            >
                <View style={styles.quitModalContainer}>
                    <View style={styles.quitView}>
                        <Text style={styles.areYouSureText}>
                            Tüm kullanıcılar oyundan ayrıldı
                        </Text>
                        <Text style={styles.areYouSureText}>
                            Sonuç sayfasına yönlendirileceksin
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    serverError() {
        return (
            <View
                style={{
                    height: hp(120),
                    width: wp(100),
                    backgroundColor: '#000000DE'
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.quitView}>
                        <Text style={styles.areYouSureText}>
                            Bağlantı hatası
                        </Text>
                        <Text style={styles.areYouSureText}>
                            Sonuç sayfasına yönlendirileceksin
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    quitGameModal() {
        return (
            <View
                style={{
                    height: hp(120),
                    width: wp(100),
                    backgroundColor: '#000000DE'
                }}
            >
                <View style={styles.quitModalContainer}>
                    <View style={styles.quitView}>
                        <Text style={styles.areYouSureText}>
                            Oyundan çıkmak istediğine
                        </Text>
                        <Text style={styles.areYouSureText}>emin misin?</Text>
                    </View>
                    <View style={styles.yesOrNoButtonsContainer}>
                        <AuthButton
                            height={hp(7)}
                            width={wp(42)}
                            color="#00D9EF"
                            buttonText="Evet"
                            fontSize={hp(3)}
                            borderRadius={hp(1.5)}
                            onPress={() =>
                                this.props.room.send({
                                    action: 'leave-match'
                                })
                            }
                        />
                        <AuthButton
                            height={hp(7)}
                            width={wp(42)}
                            color="#00D9EF"
                            buttonText="Hayır"
                            fontSize={hp(3)}
                            borderRadius={hp(1.5)}
                            onPress={() =>
                                this.setState({ isQuitGameModalVisible: false })
                            }
                        />
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView color={styles.topContainer.backgroundColor} />
                <View style={styles.topContainer}>
                    <Animatable.View
                        style={styles.headerContainer}
                        useNativeDriver={true}
                        delay={750}
                        animation="fadeIn"
                    >
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
                                <View
                                    style={[
                                        styles.answerView,
                                        {
                                            backgroundColor: '#6AC259',
                                            borderColor: 'white',
                                            borderWidth: 1
                                        }
                                    ]}
                                >
                                    <Text style={styles.answersText}>
                                        {this.state.playerOneCorrect}
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.answerView,
                                        {
                                            backgroundColor: '#B72A2A',
                                            borderColor: 'white',
                                            borderWidth: 1
                                        }
                                    ]}
                                >
                                    <Text style={styles.answersText}>
                                        {this.state.playerOneIncorrect}
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.answerView,
                                        {
                                            backgroundColor: '#3A52A3',
                                            borderColor: 'white',
                                            borderWidth: 1
                                        }
                                    ]}
                                >
                                    <Text style={styles.answersText}>
                                        {this.state.playerOneUnanswered}
                                    </Text>
                                </View>
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
                    </Animatable.View>
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
                                        source={ZOOM_OUT_BUTTON}
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
                                        source={ZOOM_IN_BUTTON}
                                        style={styles.zoomButton}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                    <View style={styles.backButtonContainer}>
                        <TouchableOpacity
                            onPress={() =>
                                this.setState({
                                    isQuitGameModalVisible: true,
                                    visibleView: 'quitGameModal'
                                })
                            }
                        >
                            <Image
                                source={BACK_BUTTON}
                                style={styles.backButton}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal
                    visible={this.state.isQuitGameModalVisible}
                    transparent={true}
                    animationType={'fade'}
                >
                    {this.state.visibleView === 'allOpponentsLeaveNoAnswer' &&
                        this.allOpponentsLeaveNoAnswer()}
                    {this.state.visibleView === 'allOpponentLeaveAfterAnswer' &&
                        this.allOpponentLeaveAfterAnswer()}
                    {this.state.visibleView === 'quitGameModal' &&
                        this.quitGameModal()}
                    {this.state.visibleView === 'serverError' &&
                        this.serverError()}
                </Modal>
                <View style={styles.dummyButtonContainer}>
                    {this.state.start && (
                        <View>
                            <View style={styles.topButtonRowContainer}>
                                <TouchableOpacity
                                    onPress={() => this.buttonOnPress(1)}
                                    disabled={this.state.isButtonOneDisabled}
                                >
                                    <Animatable.View
                                        style={[
                                            styles.button,
                                            {
                                                borderColor: this.state
                                                    .buttonOneBorderColor
                                            }
                                        ]}
                                        animation={
                                            this.state.buttonOneBorderColor ===
                                            NORMAL_BUTTON_COLOR
                                                ? 'bounceIn'
                                                : this.state
                                                      .buttonOneBorderColor !==
                                                  SELECTED_BUTTON_COLOR
                                                ? this.state
                                                      .buttonOneBorderColor !==
                                                  CORRECT_ANSWER_COLOR
                                                    ? 'swing'
                                                    : 'pulse'
                                                : null
                                        }
                                        useNativeDriver={true}
                                    >
                                        <Text style={styles.buttonText}>
                                            {this.state.buttonOneName}
                                        </Text>
                                    </Animatable.View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.buttonOnPress(2)}
                                    disabled={this.state.isButtonTwoDisabled}
                                >
                                    <Animatable.View
                                        style={[
                                            styles.button,
                                            {
                                                borderColor: this.state
                                                    .buttonTwoBorderColor
                                            }
                                        ]}
                                        animation={
                                            this.state.buttonTwoBorderColor ===
                                            NORMAL_BUTTON_COLOR
                                                ? 'bounceIn'
                                                : this.state
                                                      .buttonTwoBorderColor !==
                                                  SELECTED_BUTTON_COLOR
                                                ? this.state
                                                      .buttonTwoBorderColor !==
                                                  CORRECT_ANSWER_COLOR
                                                    ? 'swing'
                                                    : 'pulse'
                                                : null
                                        }
                                        delay={200}
                                        useNativeDriver={true}
                                    >
                                        <Text style={styles.buttonText}>
                                            {this.state.buttonTwoName}
                                        </Text>
                                    </Animatable.View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.buttonOnPress(3)}
                                    disabled={this.state.isButtonThreeDisabled}
                                >
                                    <Animatable.View
                                        style={[
                                            styles.button,
                                            {
                                                borderColor: this.state
                                                    .buttonThreeBorderColor
                                            }
                                        ]}
                                        animation={
                                            this.state
                                                .buttonThreeBorderColor ===
                                            NORMAL_BUTTON_COLOR
                                                ? 'bounceIn'
                                                : this.state
                                                      .buttonThreeBorderColor !==
                                                  SELECTED_BUTTON_COLOR
                                                ? this.state
                                                      .buttonThreeBorderColor !==
                                                  CORRECT_ANSWER_COLOR
                                                    ? 'swing'
                                                    : 'pulse'
                                                : null
                                        }
                                        delay={100}
                                        useNativeDriver={true}
                                    >
                                        <Text style={styles.buttonText}>
                                            {this.state.buttonThreeName}
                                        </Text>
                                    </Animatable.View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bottomButtonRowContainer}>
                                <TouchableOpacity
                                    onPress={() => this.buttonOnPress(4)}
                                    disabled={this.state.isButtonFourDisabled}
                                >
                                    <Animatable.View
                                        style={[
                                            styles.button,
                                            {
                                                borderColor: this.state
                                                    .buttonFourBorderColor
                                            }
                                        ]}
                                        animation={
                                            this.state.buttonFourBorderColor ===
                                            NORMAL_BUTTON_COLOR
                                                ? 'bounceIn'
                                                : this.state
                                                      .buttonFourBorderColor !==
                                                  SELECTED_BUTTON_COLOR
                                                ? this.state
                                                      .buttonFourBorderColor !==
                                                  CORRECT_ANSWER_COLOR
                                                    ? 'swing'
                                                    : 'pulse'
                                                : null
                                        }
                                        delay={150}
                                        useNativeDriver={true}
                                    >
                                        <Text style={styles.buttonText}>
                                            {this.state.buttonFourName}
                                        </Text>
                                    </Animatable.View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.buttonOnPress(5)}
                                    disabled={this.state.isButtonFiveDisabled}
                                >
                                    <Animatable.View
                                        style={[
                                            styles.button,
                                            {
                                                borderColor: this.state
                                                    .buttonFiveBorderColor
                                            }
                                        ]}
                                        animation={
                                            this.state.buttonFiveBorderColor ===
                                            NORMAL_BUTTON_COLOR
                                                ? 'bounceIn'
                                                : this.state
                                                      .buttonFiveBorderColor !==
                                                  SELECTED_BUTTON_COLOR
                                                ? this.state
                                                      .buttonFiveBorderColor !==
                                                  CORRECT_ANSWER_COLOR
                                                    ? 'swing'
                                                    : 'pulse'
                                                : null
                                        }
                                        delay={50}
                                        useNativeDriver={true}
                                    >
                                        <Text style={styles.buttonText}>
                                            {this.state.buttonFiveName}
                                        </Text>
                                    </Animatable.View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.buttonOnPress(6)}
                                    disabled={this.state.isButtonSixDisabled}
                                >
                                    <Animatable.View
                                        style={[
                                            styles.button,
                                            {
                                                borderColor: this.state
                                                    .buttonSixBorderColor
                                            }
                                        ]}
                                        animation="bounceIn"
                                        delay={250}
                                        useNativeDriver={true}
                                    >
                                        <Text style={styles.buttonText}>
                                            {this.state.buttonSixName}
                                        </Text>
                                    </Animatable.View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
                <Animatable.View
                    style={styles.jokerContainer}
                    useNativeDriver={true}
                    delay={750}
                    animation="fadeIn"
                >
                    <View style={styles.touchableJokerContainer}>
                        <TouchableOpacity
                            style={styles.jokerImageContainer}
                            onPress={this.removeOptionJokerOnPressed}
                            disabled={this.state.isRemoveOptionJokerDisabled}
                        >
                            <View
                                style={[
                                    styles.jokerImageView,
                                    {
                                        borderColor:
                                            this.state
                                                .isRemoveOptionJokerDisabled ===
                                            true
                                                ? '#FFD79C'
                                                : '#FF9900'
                                    }
                                ]}
                            >
                                <View
                                    style={[
                                        styles.jokerCounterView,
                                        {
                                            width:
                                                (
                                                    '' +
                                                    this.state.secondJokerAmount
                                                ).length < 3
                                                    ? hp(4)
                                                    : hp(5.5),
                                            backgroundColor:
                                                this.state
                                                    .isRemoveOptionJokerDisabled ===
                                                true
                                                    ? '#FE8B8B'
                                                    : 'red'
                                        }
                                    ]}
                                >
                                    <Text style={styles.jokerCounterText}>
                                        {this.state.secondJokerAmount}
                                    </Text>
                                </View>
                                <Image
                                    source={REMOVE_OPTIONS}
                                    style={[
                                        styles.jokerImg,
                                        {
                                            opacity:
                                                this.state
                                                    .isRemoveOptionJokerDisabled ===
                                                true
                                                    ? 0.3
                                                    : 1,
                                            resizeMode: 'contain'
                                        }
                                    ]}
                                />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.jokerNameContainer}>
                            <TouchableOpacity
                                onPress={this.removeOptionJokerOnPressed}
                                disabled={
                                    this.state.isRemoveOptionJokerDisabled
                                }
                            >
                                <Text
                                    style={[
                                        styles.jokerNameText,
                                        {
                                            color:
                                                this.state
                                                    .isRemoveOptionJokerDisabled ===
                                                true
                                                    ? 'rgba(0,0,0,0.5)'
                                                    : 'black'
                                        }
                                    ]}
                                >
                                    {this.state.secondJokerNameFirstWord}
                                </Text>
                                <Text
                                    style={[
                                        styles.jokerNameText,
                                        {
                                            color:
                                                this.state
                                                    .isRemoveOptionJokerDisabled ===
                                                true
                                                    ? 'rgba(0,0,0,0.5)'
                                                    : 'black'
                                        }
                                    ]}
                                >
                                    {this.state.secondJokerNameSecondWord}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.touchableJokerContainer}>
                        <TouchableOpacity
                            style={styles.jokerImageContainer}
                            onPress={this.secondChangeJokerOnPressed}
                            disabled={this.state.isSecondChanceJokerDisabled}
                        >
                            <View
                                style={[
                                    styles.jokerImageView,
                                    {
                                        borderColor:
                                            this.state
                                                .isSecondChanceJokerDisabled ===
                                            true
                                                ? '#FFD79C'
                                                : '#FF9900'
                                    }
                                ]}
                            >
                                <View
                                    style={[
                                        styles.jokerCounterView,
                                        {
                                            width:
                                                (
                                                    '' +
                                                    this.state.thirdJokerAmount
                                                ).length < 3
                                                    ? hp(4)
                                                    : hp(5.5),
                                            backgroundColor:
                                                this.state
                                                    .isSecondChanceJokerDisabled ===
                                                true
                                                    ? '#FE8B8B'
                                                    : 'red'
                                        }
                                    ]}
                                >
                                    <Text style={styles.jokerCounterText}>
                                        {this.state.thirdJokerAmount}
                                    </Text>
                                </View>
                                <Image
                                    source={SECOND_CHANCE}
                                    style={[
                                        styles.jokerImg,
                                        {
                                            opacity:
                                                this.state
                                                    .isSecondChanceJokerDisabled ===
                                                true
                                                    ? 0.3
                                                    : 1,
                                            resizeMode: 'contain'
                                        }
                                    ]}
                                />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.jokerNameContainer}>
                            <TouchableOpacity
                                onPress={this.secondChangeJokerOnPressed}
                                disabled={
                                    this.state.isSecondChanceJokerDisabled
                                }
                            >
                                <Text
                                    style={[
                                        styles.jokerNameText,
                                        {
                                            color:
                                                this.state
                                                    .isSecondChanceJokerDisabled ===
                                                true
                                                    ? 'rgba(0,0,0,0.5)'
                                                    : 'black'
                                        }
                                    ]}
                                >
                                    {this.state.thirdJokerNameFirstWord}
                                </Text>
                                <Text
                                    style={[
                                        styles.jokerNameText,
                                        {
                                            color:
                                                this.state
                                                    .isSecondChanceJokerDisabled ===
                                                true
                                                    ? 'rgba(0,0,0,0.5)'
                                                    : 'black'
                                        }
                                    ]}
                                >
                                    {this.state.thirdJokerNameSecondWord}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animatable.View>
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupGame)
