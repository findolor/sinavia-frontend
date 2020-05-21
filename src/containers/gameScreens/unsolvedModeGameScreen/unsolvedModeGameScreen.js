import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    BackHandler,
    Vibration
} from 'react-native'
import styles, { countdownProps } from './style'
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas'
import CountDown from 'react-native-countdown-component'
import NotchView from '../../../components/notchView'
import { SCENE_KEYS } from '../../../config'
import {
    navigationReset,
    navigationReplace
} from '../../../services/navigationService'
import { connect } from 'react-redux'
import { clientActions } from '../../../redux/client/actions'

import PEN_IMG from '../../../assets/pen.png'
import BACK_BUTTON from '../../../assets/backButton.png'
import REMOVE_OPTIONS from '../../../assets/jokers/removeOptions.png'
import SECOND_CHANCE from '../../../assets/jokers/secondChance.png'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import AuthButton from '../../../components/authScreen/authButton'
import * as Animatable from 'react-native-animatable'
import ImageModal from 'react-native-image-modal'

const NORMAL_BUTTON_COLOR = '#C3C3C3'
const SELECTED_BUTTON_COLOR = '#00d9ef'
const CORRECT_ANSWER_COLOR = '#14e31f'
const INCORRECT_ANSWER_COLOR = '#eb2b0e'

class UnsolvedModeGameScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // Player button
            playerButton: 0,
            // Question number
            questionNumber: 0,
            // Player answers
            playerCorrect: 0,
            playerIncorrect: 0,
            playerUnanswered: 0,
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
            countDownTime: 90,
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
            // Current question answer for second chance
            questionAnswer: 0,
            // Contains every information about question
            fullQuestionList: [],
            // Joker names
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
            () =>
                this.setState({
                    isQuitGameModalVisible: true,
                    visibleView: 'quitGameModal'
                })
        )
        // We check if the user has enough jokers
        this.checkJokerAmount()
        // We send ready signal when game screen is loaded
        this.props.room.send({
            action: 'ready'
        })
        this.props.room.onStateChange(state => {
            // We update the UI after state changes
            this.chooseStateAction(state.unsolvedQuestionsState)
        })
        // Joker messages come through here
        this.props.room.onMessage(message => {
            this.chooseMessageAction(message)
        })
        this.props.room.onLeave(code => {
            if (code === 1000) return
            let that = this
            console.log(code)
            this.setState({
                isQuitGameModalVisible: true,
                visibleView: 'serverError'
            })
            setTimeout(function() {
                that.props.room.leave()
                navigationReset('main')
            }, 3000)
        })
        this.props.room.onError(err => {
            let that = this
            console.log(err)
            this.setState({
                isQuitGameModalVisible: true,
                visibleView: 'serverError'
            })
            setTimeout(function() {
                that.props.room.leave()
                navigationReset('main')
            }, 3000)
        })
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
                this.setState({
                    isRemoveOptionJokerDisabled: true,
                    secondJokerAmount: this.state.secondJokerAmount - 1
                })
                this.props.subtractJoker(2)

                this.removeOptions(message.optionsToRemove)
                break
            // Question answer comes from the server
            case 'second-chance-joker':
                this.setState({
                    isSecondChanceJokerDisabled: true,
                    isSecondChanceJokerActive: true,
                    thirdJokerAmount: this.state.thirdJokerAmount - 1
                })
                this.props.subtractJoker(3)

                this.setState({ questionAnswer: message.questionAnswer })
                break
            case 'error-joker':
                Alert.alert('Joker hatası!')
                break
            case 'save-questions':
                this.setState({ fullQuestionList: message.fullQuestionList })
                break
            case 'leave-match':
                // If the client hasn't answered any of the questions, we just navigate him to main screen
                if (Object.keys(message.playerProps.answers).length === 0) {
                    this.shutdownGame()
                    this.props.room.leave()
                    navigationReset('main')
                    break
                }
                // Do a shutdown routine
                this.shutdownGame()
                navigationReplace(
                    SCENE_KEYS.gameScreens.unsolvedModeGameStatsScreen,
                    {
                        playerProps: message.playerProps,
                        room: this.props.room,
                        client: this.props.client,
                        questionList: this.state.questionList,
                        playerUsername: this.props.playerUsername,
                        playerProfilePicture: this.props.playerProfilePicture,
                        fullQuestionList: message.fullQuestionList,
                        isMatchFinished: false,
                        contentIds: this.props.contentIds
                    }
                )
                break
        }
    }

    // TODO Move these actions to their functions
    chooseStateAction = unsolvedQuestionsState => {
        // We check the action that happened
        switch (unsolvedQuestionsState.stateInformation) {
            // Setting up question number and resetting the buttons
            case 'question':
                // We set the questionList once when the game starts
                if (unsolvedQuestionsState.questionNumber === 0)
                    this.setState({
                        questionList: unsolvedQuestionsState.questionList
                    })
                // We reset the questions every time a round starts
                this.resetButtons()
                // Necessary settings
                this.setState({
                    start: false,
                    questionNumber: unsolvedQuestionsState.questionNumber,
                    isQuestionAnswered: false,
                    countDownTime: 90,
                    isCountDownRunning: false
                })
                // 5s is the question reading time
                this.startTimeout = setTimeout(() => {
                    this.setState({
                        playerButton: 0,
                        isCountDownRunning: true,
                        start: true
                    })
                }, 3000)
                return
            // As soon as someone answers, a result event is fired
            case 'result':
                this.setState({
                    playerProps: unsolvedQuestionsState.playerProps
                })
                return
            case 'show-results':
                // 8 second countdown time for the results
                this.setState({
                    countDownTime: 5,
                    isQuestionModalVisible: false
                })
                this.updateTimeout = setTimeout(() => {
                    // We wait 1.5 seconds for the reveal
                    this.updatePlayerResults()
                }, 1500)
                return
            case 'match-finished':
                this.shutdownGame()
                navigationReplace(
                    SCENE_KEYS.gameScreens.unsolvedModeGameStatsScreen,
                    {
                        playerProps: this.state.playerProps,
                        room: this.props.room,
                        client: this.props.client,
                        questionList: this.state.questionList,
                        playerUsername: this.props.clientInformation.username,
                        playerProfilePicture: this.props.clientInformation
                            .profilePicture,
                        fullQuestionList: this.state.fullQuestionList,
                        isMatchFinished: true,
                        contentIds: this.props.contentIds
                    }
                )
                return
        }
    }

    updatePlayerResults = () => {
        // Player answers to the question
        const answers = this.state.playerProps.answers
        // Switch statement for the user
        this.updateAnswers(answers)

        Vibration.vibrate(400)
    }

    updateAnswers = answers => {
        switch (answers[this.state.questionNumber].result) {
            // If the answer is unanswered
            case null:
                this.setState({
                    playerUnanswered: this.state.playerUnanswered + 1
                })
                this.updateButtons(
                    answers[this.state.questionNumber].correctAnswer,
                    true
                )
                break
            // If the answer is correct
            case true:
                this.setState({
                    playerCorrect: this.state.playerCorrect + 1
                })
                this.updateButtons(
                    answers[this.state.questionNumber].answer,
                    true
                )
                break
            // If the answer is incorrect
            case false:
                this.setState({
                    playerIncorrect: this.state.playerIncorrect + 1
                })
                this.updateButtons(
                    answers[this.state.questionNumber].answer,
                    false
                )
                this.updateButtons(
                    answers[this.state.questionNumber].correctAnswer,
                    true
                )
                break
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
            playerButton: buttonNumber,
            isRemoveOptionJokerDisabled: true,
            isSecondChanceJokerDisabled: true
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
            playerButton: 0,
            buttonOneName: 'A',
            buttonTwoName: 'B',
            buttonThreeName: 'C',
            buttonFourName: 'D',
            buttonFiveName: 'E',
            buttonSixName: 'Boş'
        })
        if (
            !this.state.isRemoveOptionJokerFinished &&
            this.state.secondJokerAmount != 0
        )
            this.setState({ isRemoveOptionJokerDisabled: false })
        if (
            !this.state.isSecondChanceJokerFinished &&
            this.state.thirdJokerAmount != 0
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

    serverError() {
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
                            onPress={() => {
                                this.props.room.send({
                                    action: 'leave-match'
                                })
                            }}
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
                        <Text style={styles.areYouSureText}>Sunucu hatası</Text>
                        <Text style={styles.areYouSureText}>
                            Sonuç sayfasına yönlendirileceksin
                        </Text>
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
                                        {this.state.playerCorrect}
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
                                        {this.state.playerIncorrect}
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
                                        {this.state.playerUnanswered}
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
                            <View
                                style={{
                                    backgroundColor: 'transparent',
                                    flex: 1,
                                    width: wp(100),
                                    justifyContent: 'center'
                                }}
                            >
                                <View
                                    style={{
                                        position: 'absolute',
                                        height: hp(78),
                                        width: wp(100),
                                        justifyContent: 'center'
                                    }}
                                >
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
                                    ref={ref => (this.canvas1 = ref)}
                                    containerStyle={{
                                        backgroundColor: 'transparent',
                                        flex: 1
                                    }}
                                    canvasStyle={{
                                        backgroundColor: 'transparent',
                                        flex: 1
                                    }}
                                    onStrokeEnd={data => {}}
                                    closeComponent={
                                        <View
                                            style={[
                                                styles.functionButton,
                                                { marginLeft: wp(4) }
                                            ]}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily: 'Averta-Bold',
                                                    color: 'white',
                                                    fontSize: hp(2),
                                                    textAlign: 'center'
                                                }}
                                            >
                                                Kapat
                                            </Text>
                                        </View>
                                    }
                                    onClosePressed={
                                        this.questionModalCloseOnPress
                                    }
                                    undoComponent={
                                        <View
                                            style={[
                                                styles.functionButton,
                                                { marginRight: wp(4) }
                                            ]}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily: 'Averta-Bold',
                                                    color: 'white',
                                                    fontSize: hp(2),
                                                    textAlign: 'center'
                                                }}
                                            >
                                                Geri al
                                            </Text>
                                        </View>
                                    }
                                    onUndoPressed={id => {
                                        this.canvas1.deletePath(id)
                                    }}
                                    clearComponent={
                                        <View
                                            style={[
                                                styles.functionButton,
                                                { marginRight: wp(4) }
                                            ]}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily: 'Averta-Bold',
                                                    color: 'white',
                                                    fontSize: hp(2),
                                                    textAlign: 'center'
                                                }}
                                            >
                                                Temizle
                                            </Text>
                                        </View>
                                    }
                                    onClearPressed={() => {
                                        this.canvas1.clear()
                                    }}
                                    eraseComponent={
                                        <View
                                            style={[
                                                styles.functionButton,
                                                { marginLeft: wp(4) }
                                            ]}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily: 'Averta-Bold',
                                                    color: 'white',
                                                    fontSize: hp(2),
                                                    textAlign: 'center'
                                                }}
                                            >
                                                Silgi
                                            </Text>
                                        </View>
                                    }
                                    strokeComponent={color => (
                                        <View
                                            style={[
                                                {
                                                    backgroundColor: color,
                                                    borderWidth: hp(1)
                                                },
                                                styles.strokeColorButton
                                            ]}
                                        />
                                    )}
                                    strokeSelectedComponent={(
                                        color,
                                        index,
                                        changed
                                    ) => {
                                        return (
                                            <View
                                                style={[
                                                    { backgroundColor: color },
                                                    styles.strokeSelectedColorButton
                                                ]}
                                            />
                                        )
                                    }}
                                    strokeWidthComponent={w => {
                                        return (
                                            <View
                                                style={styles.strokeWidthButton}
                                            >
                                                <View
                                                    style={{
                                                        backgroundColor:
                                                            'white',
                                                        width:
                                                            Math.sqrt(w / 3) *
                                                            10,
                                                        height:
                                                            Math.sqrt(w / 3) *
                                                            10,
                                                        borderRadius:
                                                            (Math.sqrt(w / 3) *
                                                                10) /
                                                            2
                                                    }}
                                                />
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
    userJokers: state.client.userJokers,
    clientInformation: state.client.clientInformation
})

const mapDispatchToProps = dispatch => ({
    subtractJoker: jokerId => dispatch(clientActions.subtractJoker(jokerId))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UnsolvedModeGameScreen)
