import React from 'react'
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    ImageBackground,
    FlatList
} from 'react-native'
import {
    navigationReset,
    navigationReplace,
    SCENE_KEYS,
    navigationPush
} from '../../../services/navigationService'
import { connect } from 'react-redux'
import { clientActions } from '../../../redux/client/actions'
import { chooseImage } from '../../../services/courseAssetChooser'

import styles from './style'
import slideUp from '../../../assets/gameScreens/slideUp.png'
import slideDown from '../../../assets/gameScreens/slideDown.png'
import correct from '../../../assets/gameScreens/correct.png'
import incorrect from '../../../assets/gameScreens/incorrect.png'
import unanswered from '../../../assets/gameScreens/unanswered.png'
import selectedFav from '../../../assets/favori.png'
import unselectedFav from '../../../assets/favori_bos.png'
import SINAVIA_LOGO from '../../../assets/sinavia_logo_cut.png'
import VIDEO_LOGO from '../../../assets/mainScreens/blueVideoLogo.png'
import SOLVING_LOGO from '../../../assets/mainScreens/blueSolvingLogo.png'

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import ImageModal from 'react-native-image-modal'

class SoloModeGameStats extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // Client match results
            correctAnswerNumber: 0,
            incorrectAnswerNumber: 0,
            unansweredAnswerNumber: 0,
            // Opponent username
            clientUsername: '',
            // Player profile pictures
            clientProfilePicture: '',
            // Question position
            questionPosition: 1,
            // A list to feed into the scroll view
            allQuestionsList: [],
            // Screen position
            screenPosition: 1,
            // User answer background color. Changes depending on the result
            answerBackgroundColor: '',
            // Fav icon selection
            isFaved: false,
            // Fav icon
            favouriteIcon: unselectedFav,
            // ExamId of the match
            examId: null,
            // Replay button disable var
            isReplayDisabled: false,
            //these states will be updated for every questions
            solvedQuestionImage: null,
            solvedQuestionVideo: null,
            isSolvedQuestionVisible: false
        }
    }

    async componentDidMount() {
        await this.loadScreen()
        this.props.room.onMessage(message => {
            this.chooseMessageAction(message)
        })
        this.props.room.onError(err => console.log(err))
    }

    chooseMessageAction = message => {
        switch (message.action) {
            case 'replay':
                this.props.room.removeAllListeners()

                navigationReplace(SCENE_KEYS.gameScreens.soloModeGameScreen, {
                    room: this.props.room,
                    client: this.props.client,
                    playerUsername: this.props.playerUsername,
                    playerProfilePicture: this.props.playerProfilePicture,
                    opponentUsername: this.props.opponentUsername,
                    opponentId: this.props.opponentId,
                    opponentProfilePicture: this.props.opponentProfilePicture
                })
                return
        }
    }

    loadScreen() {
        return new Promise(resolve => {
            // This is the same logic as ranked etc..
            let undefinedQuestionIndex = -1

            let playerCorrect = 0
            let playerIncorrect = 0
            let playerUnanswered = 0
            let playerUsername = ''
            let playerProfilePicture = ''

            playerUsername = this.props.playerProps.username
            playerProfilePicture = this.props.playerProps.profilePicture
            this.props.playerProps.answers.forEach((result, index) => {
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
                tempList.push(this.props.questionList[i])
            }

            this.setState(
                {
                    correctAnswerNumber: playerCorrect,
                    incorrectAnswerNumber: playerIncorrect,
                    unansweredAnswerNumber: playerUnanswered,
                    clientProfilePicture: playerProfilePicture,
                    clientUsername: playerUsername,
                    examId: this.props.playerProps.examId,
                    allQuestionsList: tempList
                },
                () => {
                    this.checkFavouriteStatus()
                    this.checkSolvedQuestionImageVideo()
                    resolve(true)
                }
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

    checkSolvedQuestionImageVideo = () => {
        this.setState({
            solvedQuestionImage: this.props.fullQuestionList[
                this.state.questionPosition - 1
            ].solvedQuestionImage,
            solvedQuestionVideo: this.props.fullQuestionList[
                this.state.questionPosition - 1
            ].solvedQuestionVideo
        })
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
                ),
                isSolvedQuestionVisible: false
            },
            () => {
                this.checkFavouriteStatus()
                this.checkSolvedQuestionImageVideo()
            }
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

    replayButtonOnPress = () => {
        this.props.room.send({
            action: 'replay'
        })
        this.setState({ isReplayDisabled: true })
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

    mainScreenButtonOnPress = () => {
        this.props.room.leave()
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

    showSolvedQuestionImage = () => {
        this.setState({
            isSolvedQuestionVisible: !this.state.isSolvedQuestionVisible
        })
    }

    goToVideo = () => {
        navigationPush(SCENE_KEYS.mainScreens.video, {
            videoUri: this.state.solvedQuestionVideo
        })
    }

    render() {
        const background = chooseImage(this.state.examId, true)
        return (
            <ScrollView
                pagingEnabled={true}
                showsVerticalScrollIndicator={false}
                onScroll={this.handleScrollVertical}
                scrollEventThrottle={8}
            >
                <View style={styles.container}>
                    <ImageBackground
                        source={background}
                        style={styles.background}
                    >
                        <View style={styles.backgroundImgShadowView} />
                    </ImageBackground>
                    <View style={styles.logoContainer}>
                        <Image source={SINAVIA_LOGO} style={styles.logoImg} />
                    </View>
                    <View style={styles.resultsContainer}>
                        <View style={styles.courseTextView}>
                            <Text style={styles.courseText}>
                                Paragrafta Anlam
                            </Text>
                        </View>
                        <View style={styles.userAndResultView}>
                            <View style={styles.userView}>
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
                            <View style={styles.resultView}>
                                <View style={styles.dividedAnswer}>
                                    <Image
                                        source={correct}
                                        style={styles.answerImg}
                                    />
                                    <Text style={styles.numbers}>
                                        {this.state.correctAnswerNumber} Doğru
                                    </Text>
                                </View>
                                <View style={styles.dividedAnswer}>
                                    <Image
                                        source={incorrect}
                                        style={styles.answerImg}
                                    />
                                    <Text style={styles.numbers}>
                                        {this.state.incorrectAnswerNumber}{' '}
                                        Yanlış
                                    </Text>
                                </View>
                                <View style={styles.dividedAnswer}>
                                    <Image
                                        source={unanswered}
                                        style={styles.answerImg}
                                    />
                                    <Text style={styles.numbers}>
                                        {this.state.unansweredAnswerNumber} Boş
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            onPress={this.replayButtonOnPress}
                            disabled={this.state.isReplayDisabled}
                        >
                            <View style={styles.replayButton}>
                                <Text style={styles.buttonText}>Yeniden</Text>
                                <Text style={styles.buttonText}>Oyna</Text>
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
                                    : 'SONUÇLARI GÖRMEK İÇİN KAYDIR'}{' '}
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
                        {this.state.solvedQuestionImage !== null ? (
                            <View
                                style={{
                                    position: 'absolute',
                                    height: hp(7),
                                    width: wp(34),
                                    justifyContent: 'center',
                                    marginLeft: wp(0)
                                }}
                            >
                                {this.state.isSolvedQuestionVisible ===
                                false ? (
                                    <TouchableOpacity
                                        onPress={this.showSolvedQuestionImage}
                                        style={styles.videoButton}
                                    >
                                        <Image
                                            source={SOLVING_LOGO}
                                            style={styles.solvingLogo}
                                        />
                                        <Text style={styles.videoButtonText}>
                                            Çözüme bak
                                        </Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        onPress={this.showSolvedQuestionImage}
                                        style={styles.videoButton}
                                    >
                                        <Image
                                            source={SOLVING_LOGO}
                                            style={styles.solvingLogo}
                                        />
                                        <Text style={styles.videoButtonText}>
                                            Soruya Dön
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ) : (
                            <View />
                        )}
                        <View
                            style={{
                                position: 'absolute',
                                height: hp(7),
                                width: wp(22),
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: wp(34)
                            }}
                        >
                            <Text style={styles.questionNumberText}>
                                {this.state.questionPosition}/
                                {
                                    Object.keys(this.state.allQuestionsList)
                                        .length
                                }
                            </Text>
                        </View>
                        {this.state.solvedQuestionVideo !== null ? (
                            <View
                                style={{
                                    position: 'absolute',
                                    height: hp(7),
                                    width: wp(34),
                                    justifyContent: 'center',
                                    marginLeft: wp(56)
                                }}
                            >
                                <TouchableOpacity
                                    onPress={this.goToVideo}
                                    style={styles.videoButton}
                                >
                                    <Image
                                        source={VIDEO_LOGO}
                                        style={styles.videoLogo}
                                    />
                                    <Text style={styles.videoButtonText}>
                                        Çözümü izle
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View />
                        )}
                    </View>
                    <FlatList
                        ref={ref => {
                            this.flatListRef = ref
                        }}
                        horizontal={true}
                        pagingEnabled={true}
                        data={this.state.allQuestionsList}
                        onScroll={this.handleScrollHorizontal}
                        showsHorizontalScrollIndicator={false}
                        extraData={this.state.isSolvedQuestionVisible}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={styles.scrollQuestionContainer}>
                                    {this.state.isSolvedQuestionVisible ===
                                    false ? (
                                        <View style={styles.questionContainer}>
                                            <ImageModal
                                                resizeMode="contain"
                                                imageBackgroundColor="#ffffff"
                                                overlayBackgroundColor="#000000DE"
                                                style={styles.questionStyle}
                                                source={{ uri: item }}
                                            />
                                        </View>
                                    ) : (
                                        <View style={styles.questionContainer}>
                                            <ImageModal
                                                resizeMode="contain"
                                                imageBackgroundColor="#ffffff"
                                                overlayBackgroundColor="#000000DE"
                                                style={styles.questionStyle}
                                                source={{
                                                    uri: this.state
                                                        .solvedQuestionImage
                                                }}
                                            />
                                        </View>
                                    )}
                                </View>
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    ></FlatList>
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
                                        this.props.playerProps.answers[
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
                                        this.props.playerProps.answers[
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

export default connect(mapStateToProps, mapDispatchToProps)(SoloModeGameStats)
