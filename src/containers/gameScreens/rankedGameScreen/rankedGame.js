import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    Alert,
    BackHandler,
    Vibration
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

import PEN_IMG from '../../../assets/pen.png'
import BACK_BUTTON from '../../../assets/backButton.png'
import SEE_OPPONENT from '../../../assets/jokers/seeOpponent.png'
import REMOVE_OPTIONS from '../../../assets/jokers/removeOptions.png'
import SECOND_CHANCE from '../../../assets/jokers/secondChance.png'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import AuthButton from '../../../components/authScreen/authButton'
import * as Animatable from 'react-native-animatable'
import { interstitialAd } from '../../../services/admobService'
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas'
import ImageModal from 'react-native-image-modal'

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
            isSeeOpponentAnswerJokerDisabled: true,
            isSecondChanceJokerDisabled: true,
            // Joker active variables
            isSeeOpponentAnswerJokerActive: false,
            isSecondChanceJokerActive: false,
            // Joker usage variables
            isRemoveOptionJokerUsed: false,
            isSeeOpponentAnswerJokerUsed: false,
            isSecondChanceJokerUsed: false,
            // Joker amount variables
            isRemoveOptionJokerFinished: false,
            isSeeOpponentAnswerJokerFinished: false,
            isSecondChanceJokerFinished: false,
            // Current question answer for second chance
            questionAnswer: 0,
            // Contains every information about question
            fullQuestionList: [],
            // Joker names
            firstJokerNameFirstWord: '',
            firstJokerNameSecondWord: '',
            firstJokerAmount: '',
            secondJokerNameFirstWord: '',
            secondJokerNameSecondWord: '',
            secondJokerAmount: '',
            thirdJokerNameFirstWord: '',
            thirdJokerNameSecondWord: '',
            thirdJokerAmount: ''
        }
    }

    // We get the room in props
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => this.setState({isQuitGameModalVisible: true, visibleView: 'quitGameModal'})
        )
        // We check if the user has enough jokers
        this.checkJokerAmount()
        // We send ready signal when game screen is loaded
        this.props.room.send({
            action: 'ready'
        })
        this.props.room.onStateChange(state => {
            // We update the UI after state changes
            this.chooseStateAction(state.rankedState)
        })
        // Joker messages come through here
        this.props.room.onMessage(message => {
            this.chooseMessageAction(message)
        })
        this.props.room.onLeave(code => {
            if(code === 1000) return
            let that = this
            console.log(code)
            this.setState({isQuitGameModalVisible: true, visibleView: 'serverError'})
            setTimeout(function(){
                that.props.room.leave()
                navigationReset('main')
            }, 3000)
        })
        this.props.room.onError(err => {
            let that = this
            console.log(err)
            this.setState({isQuitGameModalVisible: true, visibleView: 'serverError'})
            setTimeout(function(){
                that.props.room.leave()
                navigationReset('main')
            }, 3000)
        })
    }

    checkJokerAmount = () => {
        this.props.userJokers.forEach(userJoker => {
            switch (userJoker.jokerId) {
                case 1:
                    let splittedFirstJoker = userJoker.joker.name.split(/[ ,]+/)
                    this.setState({
                        firstJokerNameFirstWord: splittedFirstJoker[0],
                        firstJokerNameSecondWord: splittedFirstJoker[1],
                        firstJokerAmount: userJoker.amount
                    })
                    if(userJoker.amount === 0){
                        this.setState({isSeeOpponentAnswerJokerDisabled: true, isSeeOpponentAnswerJokerFinished: true })
                    }
                    else {
                        this.setState({isSeeOpponentAnswerJokerDisabled: false })
                    }
                    break
                case 2:
                    let splittedSecondJoker = userJoker.joker.name.split(/[ ,]+/)
                    this.setState({
                        secondJokerNameFirstWord: splittedSecondJoker[0],
                        secondJokerNameSecondWord: splittedSecondJoker[1],
                        secondJokerAmount: userJoker.amount
                    })
                    if(userJoker.amount === 0){
                        this.setState({isRemoveOptionJokerDisabled: true, isRemoveOptionJokerFinished: true })
                    }
                    else {
                        this.setState({isRemoveOptionJokerDisabled: false})
                    }
                    break
                case 3:
                    let splittedThirdJoker = userJoker.joker.name.split(/[ ,]+/)
                    this.setState({
                        thirdJokerNameFirstWord: splittedThirdJoker[0],
                        thirdJokerNameSecondWord: splittedThirdJoker[1],
                        thirdJokerAmount: userJoker.amount
                    })
                    if(userJoker.amount === 0){
                        this.setState({isSecondChanceJokerDisabled: true, isSecondChanceJokerFinished: true })
                    }
                    else {
                        this.setState({isSecondChanceJokerDisabled: false})
                    }
                    break
            }
        })
    }

    componentWillUnmount() {
        this.backHandler.remove()
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
                this.setState({ isRemoveOptionJokerDisabled: true, secondJokerAmount: this.state.secondJokerAmount-1, isRemoveOptionJokerUsed: true})
                this.props.subtractJoker(2)

                this.removeOptions(message.optionsToRemove)
                break
            // Question answer comes from the server
            case 'second-chance-joker':
                this.setState({
                    isSecondChanceJokerDisabled: true,
                    isSecondChanceJokerActive: true,
                    thirdJokerAmount: this.state.thirdJokerAmount-1,
                    isSecondChanceJokerUsed: true
                })
                this.props.subtractJoker(3)

                this.setState({ questionAnswer: message.questionAnswer })
                break
            case 'see-opponent-answer-joker':
                this.setState({
                    isSeeOpponentAnswerJokerDisabled: true,
                    isSeeOpponentAnswerJokerActive: true,
                    firstJokerAmount: this.state.firstJokerAmount-1,
                    isSeeOpponentAnswerJokerUsed: true
                })
                this.props.subtractJoker(1)

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
                break
            case 'error-joker':
                Alert.alert('Joker hatası!')
                break
            case 'client-leaving':
                const that = this
                // If the client hasn't answered any of the questions, we just navigate him to main screen
                if (
                    Object.keys(message.playerProps[message.clientId].answers)
                        .length === 0
                )
                {
                    this.setState({isQuitGameModalVisible: true, visibleView: 'opponentLeaveNoAnswer'})
                    this.props.updateTotalPoints(100)
                    this.shutdownGame()
                    setTimeout(function(){
                            that.props.room.leave()
                            navigationReset('main')
                    }, 3000)
                    break
                }
                // Do a shutdown routine
                this.setState({isQuitGameModalVisible: true, visibleView: 'opponentLeaveAfterAnswer'})
                setTimeout(function() {
                    that.shutdownGame()
                    if(!that.props.clientInformation.isPremium) interstitialAd()
                    navigationReplace(SCENE_KEYS.gameScreens.gameStats, {
                        playerProps: message.playerProps,
                        room: that.props.room,
                        client: that.props.client,
                        questionList: that.state.questionList,
                        playerUsername: that.props.playerUsername,
                        playerProfilePicture: that.props.playerProfilePicture,
                        opponentUsername: that.props.opponentUsername,
                        opponentId: that.props.opponentId,
                        opponentProfilePicture: that.props.opponentProfilePicture,
                        fullQuestionList: message.fullQuestionList,
                        isMatchFinished: false,
                        isWon: true
                })
                }, 3000)
                break
            case 'save-questions':
                this.setState({ fullQuestionList: message.fullQuestionList })
                break
            case 'resend-finished':
                this.props.room.send({
                    action: 'finished'
                })
                break
            case 'player-props':
                this.setState({ playerProps: message.playerProps })
                break
            case 'leave-match':
                // If the client hasn't answered any of the questions, we just navigate him to main screen
                if (
                    Object.keys(message.playerProps[message.clientId].answers)
                        .length === 0
                ) {
                    this.shutdownGame()
                    this.props.room.leave()
                    navigationReset('main')
                    break
                }
                // Do a shutdown routine
                this.shutdownGame()
                this.props.room.leave()
                if(!this.props.clientInformation.isPremium) interstitialAd()
                navigationReplace(SCENE_KEYS.gameScreens.gameStats, {
                    playerProps: message.playerProps,
                    room: this.props.room,
                    client: this.props.client,
                    questionList: this.state.questionList,
                    playerUsername: this.props.playerUsername,
                    playerProfilePicture: this.props.playerProfilePicture,
                    opponentUsername: this.props.opponentUsername,
                    opponentId: this.props.opponentId,
                    opponentProfilePicture: this.props.opponentProfilePicture,
                    fullQuestionList: message.fullQuestionList,
                    isMatchFinished: false,
                    isWon: false
                })
                break
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
                }, 3000)
                break
            // As soon as someone answers, a result event is fired
            case 'result':
                if (
                    this.state.isSeeOpponentAnswerJokerActive &&
                    // We check if the answer is from the opponent, if not we don't proceed
                    rankedState.playerProps[this.props.room.sessionId].answers[
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
                break
            case 'show-results':
                // 8 second countdown time for the results
                this.setState({
                    countDownTime: 5,
                    isQuestionModalVisible: false
                })
                this.highlightOpponentButton(
                    rankedState.playerProps[this.state.opponentId].answers[
                        this.state.questionNumber
                    ].answer
                )
                this.updateTimeout = setTimeout(() => {
                    // We wait 1.5 seconds for the reveal
                    this.updatePlayerResults()
                }, 1500)
                break
            case 'match-finished':
                this.shutdownGame()
                if(!this.props.clientInformation.isPremium) interstitialAd()
                navigationReplace(SCENE_KEYS.gameScreens.gameStats, {
                    playerProps: this.state.playerProps,
                    room: this.props.room,
                    client: this.props.client,
                    questionList: this.state.questionList,
                    playerUsername: this.props.playerUsername,
                    playerProfilePicture: this.props.playerProfilePicture,
                    opponentUsername: this.props.opponentUsername,
                    opponentId: this.props.opponentId,
                    opponentProfilePicture: this.props.opponentProfilePicture,
                    fullQuestionList: this.state.fullQuestionList,
                    isMatchFinished: true
                })
                return
        }
    }

    updatePlayerResults = () => {
        // Player answers to the question
        const answers = this.state.playerProps[this.props.room.sessionId].answers
        const answersOpponent = this.state.playerProps[this.state.opponentId]
            .answers

        // Switch statement for the user
        this.updateAnswers(answers, true)
        // Switch statement for the opponent
        this.updateAnswers(answersOpponent, false)

        Vibration.vibrate(400)
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

        this.setState({ playerOneButton: buttonNumber, isRemoveOptionJokerDisabled: true, isSecondChanceJokerDisabled: true, isSeeOpponentAnswerJokerDisabled: true })
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
        if(!this.state.isRemoveOptionJokerUsed && !this.state.isRemoveOptionJokerFinished) this.setState({ isRemoveOptionJokerDisabled: false })
        if(!this.state.isSecondChanceJokerUsed && !this.state.isSecondChanceJokerFinished) this.setState({ isSecondChanceJokerDisabled: false })
        if(!this.state.isSeeOpponentAnswerJokerUsed && !this.state.isSeeOpponentAnswerJokerFinished) this.setState({ isSeeOpponentAnswerJokerDisabled: false })
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

    seeOpponentAnswerJokerOnPressed = () => {
        this.props.room.send({
            action: 'see-opponent-answer-joker',
            jokerId: 1
        })
    }

    secondChangeJokerOnPressed = () => {
        this.props.room.send({
            action: 'second-chance-joker',
            jokerId: 3
        })
    }

    serverError() {
        return (
            <View
                style={{ height: hp(120), width: wp(100), backgroundColor: '#000000DE' }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.quitView}>
                        <Text style={styles.areYouSureText}>
                            Sunucu hatası
                        </Text>
                        <Text style={styles.areYouSureText}>
                            Ana sayfaya yönlendirileceksin
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    opponentLeaveNoAnswer() {
        return (
            <View
                style={{ height: hp(120), width: wp(100), backgroundColor: '#000000DE' }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.quitView}>
                        <Text style={styles.areYouSureText}>
                            Rakibin oyundan ayrıldı
                        </Text>
                        <Text style={styles.areYouSureText}>
                            Ana sayfaya yönlendirileceksin
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    opponentLeaveAfterAnswer() {
        return (
            <View
                style={{ height: hp(120), width: wp(100), backgroundColor: '#000000DE' }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.quitView}>
                        <Text style={styles.areYouSureText}>
                            Rakibin oyundan ayrıldı
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
                style={{ height: hp(120), width: wp(100), backgroundColor: '#000000DE' }}
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
                style={{ height: hp(120), width: wp(100), backgroundColor: '#000000DE' }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.quitView}>
                        <Text style={styles.areYouSureText}>
                            Oyundan çıkmak istediğine
                        </Text>
                        <Text style={styles.areYouSureText}>
                            emin misin?
                        </Text>
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
                                })}
                        />
                        <AuthButton
                            height={hp(7)}
                            width={wp(42)}
                            color="#00D9EF"
                            buttonText="Hayır"
                            fontSize={hp(3)}
                            borderRadius={hp(1.5)}
                            onPress={() => this.setState({isQuitGameModalVisible: false})}
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
                        animation="fadeIn">
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
                                <View style={[styles.answerView, {backgroundColor: '#6AC259', borderColor: 'white', borderWidth: 1}]}>
                                    <Text style={styles.answersText}>
                                        {this.state.playerOneCorrect}
                                    </Text>
                                </View>
                                <View style={[styles.answerView, {backgroundColor: '#B72A2A', borderColor: 'white', borderWidth: 1}]}>
                                    <Text style={styles.answersText}>
                                        {this.state.playerOneIncorrect}
                                    </Text>
                                </View>
                                <View style={[styles.answerView, {backgroundColor: '#3A52A3', borderColor: 'white', borderWidth: 1}]}>
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
                                <View style={[styles.answerView, {backgroundColor: '#6AC259', borderColor: 'white', borderWidth: 1}]}>
                                    <Text style={styles.answersText}>
                                        {this.state.playerTwoCorrect}
                                    </Text>
                                </View>
                                <View style={[styles.answerView, {backgroundColor: '#B72A2A', borderColor: 'white', borderWidth: 1}]}>
                                    <Text style={styles.answersText}>
                                        {this.state.playerTwoIncorrect}
                                    </Text>
                                </View>
                                <View style={[styles.answerView, {backgroundColor: '#3A52A3', borderColor: 'white', borderWidth: 1}]}>
                                    <Text style={styles.answersText}>
                                        {this.state.playerTwoUnanswered}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </Animatable.View>
                    <View style={styles.questionContainer}>
                        <ImageModal
                            resizeMode="contain"
                            imageBackgroundColor="#ffffff"
                            overlayBackgroundColor="#000000DE"
                            style={styles.questionStyle}
                            source={{
                                uri: this.state.questionList[
                                    this.state.questionNumber
                                    ]
                            }}
                        />
                    </View>
                    <Modal
                        visible={this.state.isQuestionModalVisible}
                        transparent={true}
                        animationType={'fade'}
                    >
                        <View style={styles.questionModalContainer}>
                            <View style={{ backgroundColor: 'transparent', flex: 1, width: wp(100), justifyContent: 'center'}}>
                                <View style={{ position: 'absolute', height: hp(78), width: wp(100), justifyContent: 'center'}}>
                                    <Image
                                        source={{
                                            uri: this.state.questionList[
                                                this.state.questionNumber
                                                ]
                                        }}
                                        style={styles.questionModalStyle}
                                    />
                                </View>
                                <RNSketchCanvas
                                    ref={ref => this.canvas1 = ref}
                                    containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
                                    canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
                                    onStrokeEnd={data => {
                                    }}
                                    closeComponent={<View style={[styles.functionButton, {marginLeft: wp(4)}]}><Text style={{ fontFamily: 'Averta-Bold', color: 'white', fontSize: hp(2), textAlign: 'center' }}>Kapat</Text></View>}
                                    onClosePressed={this.questionModalCloseOnPress}
                                    undoComponent={<View style={[styles.functionButton, {marginRight: wp(4)}]}><Text style={{ fontFamily: 'Averta-Bold', color: 'white', fontSize: hp(2), textAlign: 'center' }}>Geri al</Text></View>}
                                    onUndoPressed={(id) => {
                                        this.canvas1.deletePath(id)
                                    }}
                                    clearComponent={<View style={[styles.functionButton, {marginRight: wp(4)}]}><Text style={{ fontFamily: 'Averta-Bold', color: 'white', fontSize: hp(2), textAlign: 'center' }}>Temizle</Text></View>}
                                    onClearPressed={() => {
                                        this.canvas1.clear()
                                    }}
                                    eraseComponent={<View style={[styles.functionButton, {marginLeft: wp(4)}]}><Text style={{ fontFamily: 'Averta-Bold', color: 'white', fontSize: hp(2), textAlign: 'center' }}>Silgi</Text></View>}
                                    strokeComponent={color => (
                                        <View style={[{ backgroundColor: color, borderWidth: hp(1)  }, styles.strokeColorButton]} />
                                    )}
                                    strokeSelectedComponent={(color, index, changed) => {
                                        return (
                                            <View style={[{ backgroundColor: color}, styles.strokeSelectedColorButton]} />
                                        )
                                    }}
                                    strokeWidthComponent={(w) => {
                                        return (<View style={styles.strokeWidthButton}>
                                                <View style={{
                                                    backgroundColor: 'white',
                                                    width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                                                }} />
                                            </View>
                                        )
                                    }}
                                    defaultStrokeIndex={0}
                                    defaultStrokeWidth={5}
                                />
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
                            <TouchableOpacity onPress={this.zoomButtonOnPress}>
                                <Image
                                    source={PEN_IMG}
                                    style={styles.zoomButton}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.backButtonContainer}>
                        <TouchableOpacity
                            onPress={() => this.setState({isQuitGameModalVisible: true, visibleView: 'quitGameModal'})}
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
                    {this.state.visibleView === 'opponentLeaveNoAnswer' &&
                    this.opponentLeaveNoAnswer()}
                    {this.state.visibleView === 'opponentLeaveAfterAnswer' &&
                    this.opponentLeaveAfterAnswer()}
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
                                                ? this.state.buttonOneBorderColor !== OPPONENT_ANSWER_COLOR ? this.state
                                                .buttonOneBorderColor !==
                                            CORRECT_ANSWER_COLOR
                                              ? 'swing'
                                              : 'pulse'
                                          : null : null
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
                                                ? this.state.buttonTwoBorderColor !== OPPONENT_ANSWER_COLOR ? this.state
                                                .buttonTwoBorderColor !==
                                            CORRECT_ANSWER_COLOR
                                              ? 'swing'
                                              : 'pulse'
                                          : null : null
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
                                                ? this.state.buttonThreeBorderColor !== OPPONENT_ANSWER_COLOR ? this.state
                                                .buttonThreeBorderColor !==
                                            CORRECT_ANSWER_COLOR
                                              ? 'swing'
                                              : 'pulse'
                                          : null : null
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
                                                ? this.state.buttonFourBorderColor !== OPPONENT_ANSWER_COLOR ? this.state
                                                .buttonFourBorderColor !==
                                            CORRECT_ANSWER_COLOR
                                              ? 'swing'
                                              : 'pulse'
                                          : null : null
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
                                                ? this.state.buttonFiveBorderColor !== OPPONENT_ANSWER_COLOR ? this.state
                                                .buttonFiveBorderColor !==
                                            CORRECT_ANSWER_COLOR
                                              ? 'swing'
                                              : 'pulse'
                                          : null : null
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
                <Animatable.View style={styles.jokerContainer} useNativeDriver={true}
                    delay={750}
                    animation="fadeIn">
                    <View style={styles.touchableJokerContainer}>
                        <TouchableOpacity style={styles.jokerImageContainer}
                                          onPress={this.seeOpponentAnswerJokerOnPressed}
                                          disabled={
                                              this.state.isSeeOpponentAnswerJokerDisabled
                                          }>
                            <View style={[styles.jokerImageView, {borderColor: this.state.isSeeOpponentAnswerJokerDisabled === true ? '#FFD79C' : '#FF9900'}]}>
                                <View style={[styles.jokerCounterView, { width: ((''+this.state.firstJokerAmount).length) < 3 ? hp(4) : hp(5.5), backgroundColor: this.state.isSeeOpponentAnswerJokerDisabled === true ? '#FE8B8B' : 'red'}]}>
                                    <Text style={styles.jokerCounterText}>{this.state.firstJokerAmount}</Text>
                                </View>
                                <Image source={SEE_OPPONENT} style={[styles.jokerImg, { opacity: this.state.isSeeOpponentAnswerJokerDisabled === true ? 0.3 : 1, resizeMode: 'contain'}]}/>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.jokerNameContainer}>
                            <TouchableOpacity onPress={this.seeOpponentAnswerJokerOnPressed}
                                              disabled={
                                                  this.state.isSeeOpponentAnswerJokerDisabled
                                              }>
                                <Text style={[styles.jokerNameText, {color: this.state.isSeeOpponentAnswerJokerDisabled === true ? 'rgba(0,0,0,0.5)' : 'black'}]}>{this.state.firstJokerNameFirstWord}</Text>
                                <Text style={[styles.jokerNameText, {color: this.state.isSeeOpponentAnswerJokerDisabled === true ? 'rgba(0,0,0,0.5)' : 'black'}]}>{this.state.firstJokerNameSecondWord}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.touchableJokerContainer}>
                        <TouchableOpacity style={styles.jokerImageContainer}
                                          onPress={this.removeOptionJokerOnPressed}
                                          disabled={
                                              this.state.isRemoveOptionJokerDisabled
                                          }>
                            <View style={[styles.jokerImageView, {borderColor: this.state.isRemoveOptionJokerDisabled === true ? '#FFD79C' : '#FF9900'}]}>
                                <View style={[styles.jokerCounterView, { width: ((''+this.state.secondJokerAmount).length) < 3 ? hp(4) : hp(5.5), backgroundColor: this.state.isRemoveOptionJokerDisabled === true ? '#FE8B8B' : 'red'}]}>
                                    <Text style={styles.jokerCounterText}>{this.state.secondJokerAmount}</Text>
                                </View>
                                <Image source={REMOVE_OPTIONS} style={[styles.jokerImg, { opacity: this.state.isRemoveOptionJokerDisabled === true ? 0.3 : 1, resizeMode: 'contain'}]}/>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.jokerNameContainer}>
                            <TouchableOpacity onPress={this.removeOptionJokerOnPressed}
                                              disabled={
                                                  this.state.isRemoveOptionJokerDisabled
                                              }>
                                <Text style={[styles.jokerNameText, {color: this.state.isRemoveOptionJokerDisabled === true ? 'rgba(0,0,0,0.5)' : 'black'}]}>{this.state.secondJokerNameFirstWord}</Text>
                                <Text style={[styles.jokerNameText, {color: this.state.isRemoveOptionJokerDisabled === true ? 'rgba(0,0,0,0.5)' : 'black'}]}>{this.state.secondJokerNameSecondWord}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.touchableJokerContainer}>
                        <TouchableOpacity style={styles.jokerImageContainer}
                                          onPress={this.secondChangeJokerOnPressed}
                                          disabled={
                                              this.state.isSecondChanceJokerDisabled
                                          }>
                            <View style={[styles.jokerImageView, {borderColor: this.state.isSecondChanceJokerDisabled === true ? '#FFD79C' : '#FF9900'}]}>
                                <View style={[styles.jokerCounterView, { width: ((''+this.state.thirdJokerAmount).length) < 3 ? hp(4) : hp(5.5), backgroundColor: this.state.isSecondChanceJokerDisabled === true ? '#FE8B8B' : 'red'}]}>
                                    <Text style={styles.jokerCounterText}>{this.state.thirdJokerAmount}</Text>
                                </View>
                                <Image source={SECOND_CHANCE} style={[styles.jokerImg, { opacity: this.state.isSecondChanceJokerDisabled === true ? 0.3 : 1, resizeMode: 'contain'}]}/>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.jokerNameContainer}>
                            <TouchableOpacity onPress={this.secondChangeJokerOnPressed}
                                              disabled={
                                                  this.state.isSecondChanceJokerDisabled
                                              }>
                                <Text style={[styles.jokerNameText, {color: this.state.isSecondChanceJokerDisabled === true ? 'rgba(0,0,0,0.5)' : 'black'}]}>{this.state.thirdJokerNameFirstWord}</Text>
                                <Text style={[styles.jokerNameText, {color: this.state.isSecondChanceJokerDisabled === true ? 'rgba(0,0,0,0.5)' : 'black'}]}>{this.state.thirdJokerNameSecondWord}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animatable.View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    userJokers: state.client.userJokers,
    clientInformation: state.client.clientInformation
})

const mapDispatchToProps = dispatch => ({
    subtractJoker: jokerId => dispatch(clientActions.subtractJoker(jokerId)),
    updateTotalPoints: totalEarnedPoints =>
        dispatch(clientActions.updateTotalPoints(totalEarnedPoints))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RankedGame)
