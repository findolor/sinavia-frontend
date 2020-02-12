import React from 'react'
import {
    Image,
    FlatList,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    PermissionsAndroid,
    Platform,
    Easing
} from 'react-native'
import { navigationPop, navigationPush, navigationReplace, SCENE_KEYS } from '../../../services/navigationService'
import { connect } from 'react-redux'
import styles from './style'
import NotchView from '../../../components/notchView'
import Share from 'react-native-share'
import RNFetchBlob from 'rn-fetch-blob'
import selectedFav from '../../../assets/favori.png'
import unselectedFav from '../../../assets/favori_bos.png'
import backButton from '../../../assets/backButton.png'
import returnLogo from '../../../assets/return.png'
import shareLogo from '../../../assets/share.png'
import VIDEO_LOGO from '../../../assets/mainScreens/whiteVideoLogo.png'
import SOLVING_LOGO from '../../../assets/mainScreens/whiteSolvingLogo.png'
import QUESTION_MARK from '../../../assets/mainScreens/whiteQuestionMarkLogo.png'

import { clientActions } from '../../../redux/client/actions'
import NO_RESULTS_FAV from '../../../assets/noResultsFav.png'

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import ImageModal from 'react-native-image-modal'
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas'

class Favorites extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isModalVisible: false,
            isZoomModalVisible: false,
            galleryPosition: 1,
            favIconSelected: false,
            // ScrollView item list
            scrollViewList: [],
            startQuestionIndex: 1,
            correctAnswer: '',
            // Favoruite variables
            favouriteIcon: unselectedFav,
            isFaved: false,
            solvingImg: 1,
            solvingVideo: 1,
            solving: false
        }
    }

    async componentDidMount() {
        await this.loadScreen()
    }

    async requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera')
            } else {
                console.log('Camera permission denied')
            }
        } catch (err) {
            console.log(err)
        }
    }
    // Takes the transformed favouriteQuestions and makes the proper ui
    loadScreen = () => {
        new Promise.resolve().then(() => {
            const scrollViewList = []
            let itemList
            let questionList
            let examName
            let courseName

            let favouriteQuestions = this.mapFavouriteQuestions()

            Object.keys(favouriteQuestions).forEach(examKey => {
                itemList = []
                examName = this.props.gameContentMap.exams[examKey - 1].name
                Object.keys(favouriteQuestions[examKey]).forEach(
                    (courseKey, index) => {
                        questionList = []
                        courseName = this.props.gameContentMap.courses[
                            courseKey - 1
                        ].name
                        favouriteQuestions[examKey][courseKey].forEach(
                            (question, index) => {
                                questionList.push({
                                    source: {
                                        uri: question.question.questionLink
                                    },
                                    id: index - 1,
                                    correctAnswer:
                                        question.question.correctAnswer,
                                    favouriteQuestionId: question.id
                                })
                            }
                        )
                        itemList.push(
                            <View
                                style={styles.subjectCardContainer}
                                key={index}
                            >
                                <View style={styles.contentContainerWrapper}>
                                    <Text style={styles.contentText}>
                                        {examName} - {courseName}
                                    </Text>
                                </View>
                                <View style={styles.questionsContainer}>
                                    <FlatList
                                        horizontal={false}
                                        data={questionList}
                                        nestedScrollEnabled={true}
                                        numColumns={2}
                                        showsVerticalScrollIndicator={false}
                                        extraData={questionList}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.loadScreenQuestionModal(
                                                            index,
                                                            favouriteQuestions[
                                                                examKey
                                                            ][courseKey]
                                                        )
                                                    }}
                                                >
                                                    <View
                                                        style={
                                                            styles.questionImgBorder
                                                        }
                                                    >
                                                        <Image
                                                            source={{
                                                                uri:
                                                                    item.source
                                                                        .uri
                                                            }}
                                                            style={
                                                                styles.question
                                                            }
                                                        />
                                                        <Text>
                                                            {item.subjectId}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        }}
                                        keyExtractor={(item, index) =>
                                            index.toString()
                                        }
                                    />
                                    <View
                                        style={
                                            styles.subjectQuestionCounterView
                                        }
                                    >
                                        <Text
                                            style={
                                                styles.subjectQuestionCounterText
                                            }
                                        >
                                            {questionList.length} Soru
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }
                )
                scrollViewList.push(itemList)
            })

            this.setState({ scrollViewList: scrollViewList, solving: false })
            return true
        })
    }

    loadScreenQuestionModal = (index, questionList) => {
        this.goToIndex(index, questionList)
    }

    goToIndex(index, questionList) {
        this.setState(
            {
                isModalVisible: true,
                galleryPosition: index + 1,
                startQuestionIndex: index,
                data: questionList,
                correctAnswer: questionList[index].question.correctAnswer
            },
            () => this.checkFavouriteStatus()
        )
    }

    // This function takes favouriteQuestions ( it is an array )
    // And turns it into an object with first level keys as "exams"
    // With second level keys as "courses"
    mapFavouriteQuestions = () => {
        const favouriteQuestions = {}
        this.props.favouriteQuestions.forEach(question => {
            if (favouriteQuestions[question.question.examId] === undefined) {
                favouriteQuestions[question.question.examId] = {}
                if (
                    favouriteQuestions[question.question.examId][
                        question.question.courseId
                    ] === undefined
                ) {
                    favouriteQuestions[question.question.examId][
                        question.question.courseId
                    ] = []
                    favouriteQuestions[question.question.examId][
                        question.question.courseId
                    ].push(question)
                } else
                    favouriteQuestions[question.question.examId][
                        question.question.courseId
                    ].push(question)
            } else if (
                favouriteQuestions[question.question.examId][
                    question.question.courseId
                ] === undefined
            ) {
                favouriteQuestions[question.question.examId][
                    question.question.courseId
                ] = []
                favouriteQuestions[question.question.examId][
                    question.question.courseId
                ].push(question)
            } else
                favouriteQuestions[question.question.examId][
                    question.question.courseId
                ].push(question)
        })
        return favouriteQuestions
    }

    checkFavouriteStatus = () => {
        const index = this.props.favouriteQuestions.findIndex(
            x =>
                x.questionId ===
                this.state.data[this.state.galleryPosition - 1].questionId
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

    favouriteOnPress = () => {
        if (this.state.isFaved) {
            this.props.unfavouriteQuestion(
                this.props.clientToken,
                this.props.clientDBId,
                this.state.data[this.state.galleryPosition - 1].question,
                this.props.favouriteQuestions
            )
            this.setState({ favouriteIcon: unselectedFav, isFaved: false })
        } else {
            this.props.favouriteQuestion(
                this.props.clientToken,
                this.props.clientDBId,
                this.state.data[this.state.galleryPosition - 1].question,
                this.props.favouriteQuestions
            )
            this.setState({ favouriteIcon: selectedFav, isFaved: true })
        }
    }

    returnButtonOnPress = () => {
        navigationPop()
    }

    shareImage = async () => {
        await this.requestCameraPermission()

        const configOptions = {
            path: RNFetchBlob.fs.dirs.CacheDir + '/question.png'
        }

        RNFetchBlob.config(configOptions)
            .fetch(
                'GET',
                this.state.data[this.state.galleryPosition - 1].question
                    .questionLink
            )
            .then(response => {
                //let base64Str
                //if (response.info().status == 200)
                // the conversion is done in native code
                //base64Str = response.base64()

                let shareOptions = {}

                if (Platform.OS === 'ios') {
                    shareOptions.url = `file://${response.path()}`
                    delete shareOptions.message
                } else {
                    //shareOptions.url = `data:image/jpg;base64,${base64Str}`
                    shareOptions.url = `file://${response.path()}`
                }

                Share.open(shareOptions)
                    .then(data => {
                        console.log(data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => console.log(err))
    }

    galleryOnScroll = event => {
        this.scrollX = event.nativeEvent.contentOffset.x
        this.setState(
            {
                galleryPosition: Math.min(
                    Math.max(
                        Math.floor(
                            this.scrollX /
                                Math.round(Dimensions.get('window').width) +
                                0.5
                        ) + 1,
                        0
                    ),
                    Object.keys(this.state.data).length /*Image count*/
                ),
                correctAnswer: this.state.data[this.state.galleryPosition - 1]
                    .question.correctAnswer,
                solving: false
            },
            this.checkFavouriteStatus()
        )
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

    showSolving = () => {
        this.setState({solving: !this.state.solving})
    }

    goToVideo = () => {
        this.setState({isModalVisible: false})
        navigationPush(SCENE_KEYS.mainScreens.video, {
            videoUri: 'https://player.vimeo.com/video/8175286/config'
        })
    }

    zoomOnPress = () => {
        this.setState({ isZoomModalVisible: true })
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView/>
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.returnButtonOnPress}>
                        <View style={styles.returnLogoContainer}>
                            <Image
                                source={returnLogo}
                                style={styles.returnLogo}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.headerTextWrapper}>
                        <Text style={styles.headerText}>Favori Sorular</Text>
                    </View>
                </View>
                <Modal
                    visible={this.state.isModalVisible}
                    onRequestClose={async () => {
                        this.setState({ isModalVisible: false })
                        await this.loadScreen()
                    }}
                >
                    <NotchView color={'#00D9EF'}/>
                    <Modal visible={this.state.isZoomModalVisible}>
                        <View style={styles.zoomModalContainer}>
                            <View style={{ flex: 1, width: wp(100), justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{
                                    height: hp(80),
                                    width: wp(100),
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Image
                                        source={{ uri: 'https://lh3.googleusercontent.com/proxy/iCYubhYEtP4-Nu-EIczOrR1PLiZWX3kTj38SF_E-vI98xFkagqsOXEiVWAzSrczThFbbv3m_Jf1_eAfyZzDoSpe6vj_uIzA2BrrwOkzEE6exLzQkcdDNTwlz-uSM' }}
                                        style={styles.questionModalStyle}
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <View style={styles.modalHeader}>
                        <View style={styles.backButtonContainer}>
                            <TouchableOpacity
                                onPress={async () => {
                                    this.setState({ isModalVisible: false })
                                    await this.loadScreen()
                                }}
                            >
                                <Image
                                    source={backButton}
                                    style={styles.backButtonImg}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.questionNumberContainer}>
                            <Text style={styles.questionNumberText}>
                                Soru {this.state.galleryPosition}/
                                {Object.keys(this.state.data).length}
                            </Text>
                        </View>
                        <View style={styles.shareButtonView}>
                            <TouchableOpacity onPress={this.shareImage}>
                                <Image
                                    source={shareLogo}
                                    style={styles.backButtonImg}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.galleryContainer}>
                        <FlatList
                            ref={ref => {
                                this.flatListRef = ref
                            }}
                            horizontal={true}
                            pagingEnabled={true}
                            data={this.state.data}
                            initialScrollIndex={this.state.startQuestionIndex}
                            showsHorizontalScrollIndicator={false}
                            onScroll={this.galleryOnScroll}
                            onScrollToIndexFailed={() => {
                            }}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={styles.galleryView}>
                                        <View
                                            style={
                                                styles.questionSubjectNameView
                                            }
                                        >
                                            <Text
                                                style={
                                                    styles.questionSubjectText
                                                }
                                            >
                                                {
                                                    this.props.gameContentMap
                                                        .subjects[
                                                    item.question
                                                        .subjectId - 1
                                                        ].name
                                                }
                                            </Text>
                                        </View>
                                        {this.state.solving === false
                                            ? <View
                                                style={styles.questionInModalView}
                                            >
                                                <ImageModal
                                                    resizeMode="contain"
                                                    imageBackgroundColor="#ffffff"
                                                    overlayBackgroundColor="#000000DE"
                                                    style={styles.questionInModal}
                                                    source={{
                                                        uri:
                                                        item.question
                                                            .questionLink
                                                    }}
                                                />
                                            </View>
                                            : <View
                                                style={styles.questionInModalView}
                                            >
                                                <ImageModal
                                                    resizeMode="contain"
                                                    imageBackgroundColor="#ffffff"
                                                    overlayBackgroundColor="#000000DE"
                                                    style={styles.questionInModal}
                                                    source={{ uri: 'https://lh3.googleusercontent.com/proxy/iCYubhYEtP4-Nu-EIczOrR1PLiZWX3kTj38SF_E-vI98xFkagqsOXEiVWAzSrczThFbbv3m_Jf1_eAfyZzDoSpe6vj_uIzA2BrrwOkzEE6exLzQkcdDNTwlz-uSM' }}
                                                />
                                            </View>}
                                    </View>
                                )
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <View style={styles.modalFooter}>
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
                                        this.state.correctAnswer
                                    )}
                                </Text>
                            </View>
                            <Text style={styles.answerText}>Doğru cevap</Text>
                        </View>
                        <View style={styles.answerContainer}>
                            <TouchableOpacity onPress={this.favouriteOnPress}>
                                <Image
                                    source={this.state.favouriteIcon}
                                    style={styles.favIcon}
                                />
                            </TouchableOpacity>
                            <Text style={styles.answerText}>
                                {this.state.isFaved === true
                                    ? 'Favoriden çıkar'
                                    : 'Favoriye ekle'}
                            </Text>
                        </View>
                        {this.state.solvingImg !== null
                        ?   <View>
                                {this.state.solving === false
                                    ? <View style={styles.answerContainer}>
                                        <TouchableOpacity onPress={this.showSolving}>
                                            <Image
                                                source={SOLVING_LOGO}
                                                style={styles.favIcon}
                                            />
                                        </TouchableOpacity>
                                        <Text style={styles.answerText}>
                                            Çözüme bak
                                        </Text>
                                    </View>
                                    : <View style={styles.answerContainer}>
                                        <TouchableOpacity onPress={this.showSolving}>
                                            <Image
                                                source={QUESTION_MARK}
                                                style={styles.favIcon}
                                            />
                                        </TouchableOpacity>
                                        <Text style={styles.answerText}>
                                            Soruya Dön
                                        </Text>
                                    </View>}
                            </View>
                        :null}
                        {this.state.solvingVideo !== null
                            ? <View style={styles.answerContainer}>
                                    <TouchableOpacity onPress={this.goToVideo}>
                                        <Image
                                            source={VIDEO_LOGO}
                                            style={styles.favIcon}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.answerText}>
                                        Çözümü izle
                                    </Text>
                            </View>
                            : null
                        }
                    </View>
                </Modal>
                {Object.keys(this.state.scrollViewList).length !== 0 && (
                    <View style={styles.scrollViewContainer}>
                        <ScrollView
                            horizontal={true}
                            showsVerticalScrollIndicator={false}
                        >
                            {this.state.scrollViewList}
                        </ScrollView>
                    </View>
                )}
                {Object.keys(this.state.scrollViewList).length === 0 && (
                    <View style={styles.noResultsView}>
                        <Image
                            source={NO_RESULTS_FAV}
                            style={styles.noResultImg}
                        />
                        <Text style={styles.noResultsText}>
                            Henüz herhangi bir soru favorilemedin
                        </Text>
                    </View>
                )}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    clientToken: state.client.clientToken,
    clientDBId: state.client.clientDBId,
    favouriteQuestions: state.client.favouriteQuestions,
    gameContentMap: state.gameContent.gameContentMap
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

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
