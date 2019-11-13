import React from 'react'
import {
    Image,
    FlatList,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View, Dimensions
} from 'react-native'
import { SCENE_KEYS, navigationPop } from '../../../services/navigationService'
import { connect } from 'react-redux'
import styles from './style'
import NotchView from '../../../components/notchView'
import Swiper from 'react-native-swiper'
import Share from 'react-native-share'
import RNFetchBlob, { Dirs as DIRS } from 'rn-fetch-blob'
import selectedFav from '../../../assets/favori.png'
import unselectedFav from '../../../assets/favori_bos.png'
import backButton from '../../../assets/backButton.png'
import returnLogo from '../../../assets/return.png'
import shareLogo from '../../../assets/share.png'

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { favouriteQuestion } from '../../../services/apiServices/favouriteQuestion'
import { fetchUser } from '../../../sagas/user/fetchUser'

const data = []

// TODO write this file again according to the data from server
class Favorites extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: data,
            isModalVisible: false,
            galleryPosition: 1,
            favIconSelected: false,
            // ScrollView item list
            scrollViewList: [],
            startQuestionIndex: 1,
            correctAnswer: ''
        }
    }

    // TODO REMOVE GALLERY AND THINK OF SOMETHING ELSE
    async componentDidMount() {
        await this.loadScreen()
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
                            <View style={styles.subjectCardContainer}>
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
                                                        this.loadScreen1(index, favouriteQuestions[examKey][courseKey])
                                                    }}
                                                >
                                                    <View style={styles.questionImgBorder}>
                                                        <Image
                                                            source={{
                                                                uri: item.source.uri
                                                            }}
                                                            style={styles.question}
                                                        />
                                                        <Text>{item.subjectId}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        }}
                                        keyExtractor={(item, index) =>
                                            index.toString()
                                        }
                                    />
                                    <View style={styles.subjectQuestionCounterView}><Text style={styles.subjectQuestionCounterText}>{questionList.length} Soru</Text></View>
                                </View>
                            </View>
                        )
                    }
                )
                scrollViewList.push(itemList)
            })

            this.setState({ scrollViewList: scrollViewList })
            return true
        })
    }

    loadScreen1 = (index, questionList) => {
        console.log('Soru Sirasi' + index)
        console.log('Test Sirasi' + questionList)
        this.goIndex(index, questionList)
    }

    goIndex(index, questionList){
        this.setState({ isModalVisible: true, galleryPosition: index+1, startQuestionIndex: index, data: questionList, correctAnswer: questionList[index].question.correctAnswer})
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

    returnButtonOnPress = () => {
        navigationPop()
    }

    shareImage = () => {
        const configOptions = {
            path: RNFetchBlob.fs.dirs.DownloadDir + '/question.png'
        }
        RNFetchBlob.config(configOptions)
            .fetch(
                'GET',
                'http://testicoz.org/wp-content/uploads/2017/09/ygs-dilveanlatim-7-01.png'
            )
            .then(async resp => {
                console.log('The file saved to ', resp.path())
                console.log('response : ', resp)
                console.log(resp.data)
                let filePath = resp.path()
                let base64image = resp.data
                let shareOptions = {
                    url: `file://${configOptions.path}`,
                    message:
                        'Merhaba, bu soruyu çözmeme yardımcı olabilir misin?'
                }
                Share.open(shareOptions)
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
                correctAnswer: this.state.data[this.state.galleryPosition-1].question.correctAnswer
    }
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

    render() {
        return (
            <View style={styles.container}>
                <NotchView />
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
                <Modal visible={this.state.isModalVisible}>
                    <NotchView color={'#00D9EF'} />
                    <View style={styles.modalHeader}>
                        <View style={styles.backButtonContainer}>
                            <TouchableOpacity
                                onPress={() =>
                                    this.setState({ isModalVisible: false })
                                }
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
                            ref={(ref) => { this.flatListRef = ref }}
                            horizontal={true}
                            pagingEnabled={true}
                            data={this.state.data}
                            initialScrollIndex={this.state.startQuestionIndex}
                            showsHorizontalScrollIndicator={false}
                            onScroll={this.galleryOnScroll}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={styles.galleryView}>
                                        <View style={styles.questionSubjectNameView}>
                                            <Text style={styles.questionSubjectText}>{
                                                this.props.gameContentMap.subjects[
                                                item.question.subjectId - 1
                                                    ].name
                                            }</Text>
                                        </View>
                                        <View style={styles.questionInModalView}>
                                            <Image
                                                source={{
                                                    uri: item.question.questionLink
                                                }}
                                                style={styles.questionInModal}
                                            />
                                        </View>
                                    </View>
                                )
                            }}
                            keyExtractor={(item, index) =>
                                index.toString()
                            }
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
                                    {this.answerSwitcher(this.state.correctAnswer)}
                                </Text>
                            </View>
                            <Text style={styles.answerText}>Doğru cevap</Text>
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
                            <Text style={styles.answerText}>
                                Favoriden çıkar
                            </Text>
                        </View>
                    </View>
                </Modal>
                <View style={styles.scrollViewContainer}>
                    <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
                        {this.state.scrollViewList}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    favouriteQuestions: state.client.favouriteQuestions,
    gameContentMap: state.gameContent.gameContentMap
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    null
)(Favorites)
