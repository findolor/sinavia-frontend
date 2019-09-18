import React from 'react'
import {
    Image,
    FlatList,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { SCENE_KEYS, navigationPop } from '../../../services/navigationService'
import { connect } from 'react-redux'
import styles from './style'
import NotchView from '../../../components/notchView'
import Gallery from 'react-native-image-gallery'
import Share from 'react-native-share'
import RNFetchBlob, { Dirs as DIRS } from 'rn-fetch-blob'
import selectedFav from '../../../assets/favori.png'
import unselectedFav from '../../../assets/favori_bos.png'
import backButton from '../../../assets/backButton.png'
import returnLogo from '../../../assets/return.png'
import shareLogo from '../../../assets/share.png'

const data = [
    {
        source: {
            uri:
                'http://testicoz.org/wp-content/uploads/2017/09/ygs-dilveanlatim-7-01.png'
        },
        id: 0
    },
    {
        source: {
            uri:
                'http://testicoz.org/wp-content/uploads/2017/09/ygs-dilveanlatim-7-01.png'
        },
        id: 1
    },
    {
        source: {
            uri:
                'https://prods3.imgix.net/images/articles/2017_04/Feature-restaurant-butcher-bakery-shops2.jpg?auto=format%2Ccompress&ixjsv=2.2.3'
        },
        id: 2
    }
]

// TODO write this file again according to the data from server
class Favorites extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: data,
            isModalVisible: false,
            initialIndex: 0,
            galleryPosition: 0,
            favIconSelected: false,
            // ScrollView item list
            scrollViewList: []
        }
    }

    // TODO REMOVE GALLERY AND THINK OF SOMETHING ELSE
    async componentDidMount() {
        await this.loadScreen()
    }

    // Takes the transformed favouriteQuestions and makes the proper ui
    loadScreen = () => {
        console.log(this.props.favouriteQuestions)
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
                            <View style={styles.card} key={index}>
                                <View style={styles.contentContainerWrapper}>
                                    <Text style={styles.contentText}>
                                        {examName} - {courseName}
                                    </Text>
                                </View>
                                <View style={styles.questionsContainer}>
                                    <FlatList
                                        horizontal={true}
                                        data={questionList}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({ item }) => {
                                            return (
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        this.questionOnPress(
                                                            item
                                                        )
                                                    }
                                                >
                                                    <Image
                                                        source={{
                                                            uri: item.source.uri
                                                        }}
                                                        style={styles.question}
                                                    />
                                                </TouchableOpacity>
                                            )
                                        }}
                                        keyExtractor={(item, index) =>
                                            index.toString()
                                        }
                                    />
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

    // This function takes favouriteQuestions ( it is an array )
    // And turns it into an object with first level keys as "exams"
    // With second level keys as "courses"
    mapFavouriteQuestions = () => {
        const favouriteQuestions = {}
        this.props.favouriteQuestions.forEach(question => {
            console.log(question)
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

    questionOnPress = item => {
        this.setState({ isModalVisible: true, initialIndex: item.id })
    }

    galleryOnScroll = event => {
        this.setState({ galleryPosition: event.position })
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
                                Soru {this.state.galleryPosition + 1}/
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
                        <Gallery
                            style={styles.galleryView}
                            images={this.state.data}
                            initialPage={this.state.initialIndex}
                            onPageScroll={event => this.galleryOnScroll(event)}
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
                                    C
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
                    <ScrollView
                        style={styles.cardsScrollView}
                        showsVerticalScrollIndicator={false}
                    >
                        {this.state.scrollViewList}
                        {/* <View style={styles.card}>
                            <View style={styles.contentContainerWrapper}>
                                <Text style={styles.contentText}>
                                    YKS - TÜRKÇE
                                </Text>
                            </View>
                            <View style={styles.questionsContainer}>
                                <FlatList
                                    horizontal={true}
                                    data={this.state.data}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    this.questionOnPress(item)
                                                }
                                            >
                                                <Image
                                                    source={{
                                                        uri: item.source.uri
                                                    }}
                                                    style={styles.question}
                                                />
                                            </TouchableOpacity>
                                        )
                                    }}
                                    keyExtractor={(item, index) =>
                                        index.toString()
                                    }
                                />
                            </View>
                        </View> */}
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
