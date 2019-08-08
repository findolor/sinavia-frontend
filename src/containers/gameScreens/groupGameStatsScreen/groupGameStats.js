import React from 'react'
import {
    FlatList,
    Image,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import styles from './style'
import background from '../../../assets/gameScreens/gameStatsBackground.jpg'
import slideUp from '../../../assets/gameScreens/slideUp.png'
import correct from '../../../assets/gameScreens/correct.png'
import incorrect from '../../../assets/gameScreens/incorrect.png'
import unanswered from '../../../assets/gameScreens/unanswered.png'
import profilePic from '../../../assets/profile2.jpg'
import question from '../../../assets/soru.jpg'
import selectedFav from '../../../assets/favori.png'
import unselectedFav from '../../../assets/favori_bos.png'
import selectedJokerIcon from '../../../assets/mainScreens/joker_dolu.png'
import emptyJokerIcon from '../../../assets/mainScreens/joker.png'
const YOU_WIN_LOGO = require('../../../assets/gameScreens/win.png')

const data = [
    {
        name: 'Nurettin Hakan Yılmaz',
        correctsNumber: '10',
        unansweredsNumber: '2',
        incorrectsNumber: '3'
    },
    {
        name: 'Hakan Yılmaz',
        correctsNumber: '10',
        unansweredsNumber: '2',
        incorrectsNumber: '3'
    },
    {
        name: 'Hakan Yılmaz',
        correctsNumber: '10',
        unansweredsNumber: '2',
        incorrectsNumber: '3'
    },
    {
        name: 'Hakan Yılmaz',
        correctsNumber: '10',
        unansweredsNumber: '2',
        incorrectsNumber: '3'
    }
]

class GroupGameStatsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: data,
            // If we are the winner, isClientWinner is true
            isClientWinner: true,
            // Client match results
            correctAnswerNumber: 0,
            incorrectAnswerNumber: 0,
            unansweredAnswerNumber: 0,
            // Opponent match results
            opponentCorrectAnswerNumber: 0,
            opponentInorrectAnswerNumber: 0,
            opponentUnansweredAnswerNumber: 0,
            // Opponent username
            clientUsername: '',
            opponentUsername: '',
            // Match point variables
            finishedGamePoint: 20,
            correctAnswerPoint: 60,
            winOrLosePoint: 100,
            // Match win or lose text
            winOrLoseText: 'Kazandın',
            // Total earned points
            totalEarnedPoints: 180,
            // Player profile pictures
            clientProfilePicture: '',
            opponentProfilePicture: '',

            isQuestionModalVisible: false,
            favIconSelected: false
        }
    }

    componentDidMount() {
        // TODO logic for filling the screen with results
    }

    render() {
        return (
            <ScrollView
                pagingEnabled={true}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <Image source={background} style={styles.background} />
                    <View style={styles.resultTextContainer}>
                        <Image
                            source={YOU_WIN_LOGO}
                            style={styles.resultTextImg}
                        />
                    </View>
                    <View style={styles.resultsContainer}>
                        <FlatList
                            data={this.state.data}
                            vertical={true}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.userRow}>
                                        <View
                                            style={
                                                styles.orderContainer
                                            }
                                        >
                                            <Text style={styles.orderNumberText}>
                                                1
                                            </Text>
                                        </View>
                                        <View style={styles.nameContainer}>
                                            <Text style={styles.nameText}>
                                                {item.name}
                                            </Text>
                                        </View>
                                        <View style={styles.optionsContainer}>
                                            <View style={styles.optionContainer}>
                                                <Text style={styles.optionCounterText}>
                                                    {item.correctsNumber}
                                                </Text>
                                            </View>
                                            <View style={styles.optionContainer}>
                                                <Text style={styles.optionCounterText}>
                                                    {item.unansweredsNumber}
                                                </Text>
                                            </View>
                                            <View style={styles.optionContainer}>
                                                <Text style={styles.optionCounterText}>
                                                    {item.incorrectsNumber}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }}
                            keyExtractor={(item, index) => index}
                        />
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity>
                            <View style={styles.replayButton}>
                                <Text style={styles.buttonText}>Yeniden</Text>
                                <Text style={styles.buttonText}>Oyna</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.newOpponentButton}>
                                <Text style={styles.buttonText}>Yeni</Text>
                                <Text style={styles.buttonText}>Rakip</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.mainScreenButton}>
                                <Text style={styles.buttonText}>Ana</Text>
                                <Text style={styles.buttonText}>Menü</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.slideView}>
                        <View style={styles.slideUpContainer}>
                            <Image source={slideUp} style={styles.slideUpImg} />
                            <Text style={styles.slideViewText}>
                                {' '}
                                SORULARI GÖRMEK İÇİN KAYDIR{' '}
                            </Text>
                            <Image source={slideUp} style={styles.slideUpImg} />
                        </View>
                    </View>
                </View>
                <View style={styles.secondScreenView}>
                    <View style={styles.questionNumberContainer}>
                        <Text style={styles.questionNumberText}>1/5</Text>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled = {true}>
                        <View style={styles.scrollQuestionContainer}>
                            <View style={styles.questionContainer}>
                                <Image
                                    source={question}
                                    style={styles.questionStyle}
                                />
                            </View>
                        </View>
                        <View style={styles.scrollQuestionContainer}>
                            <View style={styles.questionContainer}>
                                <Image
                                    source={question}
                                    style={styles.questionStyle}
                                />
                            </View>
                        </View>
                        <View style={styles.scrollQuestionContainer}>
                            <View style={styles.questionContainer}>
                                <Image
                                    source={question}
                                    style={styles.questionStyle}
                                />
                            </View>
                        </View>
                        <View style={styles.scrollQuestionContainer}>
                            <View style={styles.questionContainer}>
                                <Image
                                    source={question}
                                    style={styles.questionStyle}
                                />
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.favAndAnswerContainer}>
                        <View style={styles.answerContainer}>
                            <View style={styles.correctAnswer}>
                                <Text style={styles.optionText}>C</Text>
                            </View>
                            <Text style={styles.answerText}>Doğru Cevap</Text>
                        </View>
                        <View style={styles.favIconContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        favIconSelected: true,
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
                        </View>
                        <View style={styles.answerContainer}>
                            <View style={styles.correctAnswer}>
                                <Text style={styles.optionText}>C</Text>
                            </View>
                            <Text style={styles.answerText}>Senin Cevabın</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default GroupGameStatsScreen
