import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import styles from './style'
import background from '../../../assets/gameScreens/gameStatsBackground.jpg'
import win from '../../../assets/gameScreens/win.png'
import slideUp from '../../../assets/gameScreens/slideUp.png'
import correct from '../../../assets/gameScreens/correct.png'
import incorrect from '../../../assets/gameScreens/incorrect.png'
import unanswered from '../../../assets/gameScreens/unanswered.png'
import profilePic from '../../../assets/profile2.jpg'

class GameStatsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
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
                        <Image source={win} style={styles.resultTextImg} />
                    </View>
                    <View style={styles.resultsContainer}>
                        <View style={styles.results1Container}>
                            <View style={styles.user1Container}>
                                <Image
                                    source={profilePic}
                                    style={styles.profilePic}
                                />
                                <Text style={styles.usernameText}>
                                    haqotherage
                                </Text>
                            </View>
                            <View style={styles.answersContainer}>
                                <View style={styles.dividedAnswer}>
                                    <Text style={styles.numbers}>1</Text>
                                    <Image
                                        source={correct}
                                        style={styles.answerImg}
                                    />
                                    <Text style={styles.numbers}>1</Text>
                                </View>
                                <View style={styles.dividedAnswer}>
                                    <Text style={styles.numbers}>1</Text>
                                    <Image
                                        source={incorrect}
                                        style={styles.answerImg}
                                    />
                                    <Text style={styles.numbers}>1</Text>
                                </View>
                                <View style={styles.dividedAnswer}>
                                    <Text style={styles.numbers}>1</Text>
                                    <Image
                                        source={unanswered}
                                        style={styles.answerImg}
                                    />
                                    <Text style={styles.numbers}>1</Text>
                                </View>
                            </View>
                            <View style={styles.user2Container}>
                                <Image
                                    source={profilePic}
                                    style={styles.profilePic}
                                />
                                <Text style={styles.usernameText}>
                                    haqotherage
                                </Text>
                            </View>
                        </View>
                        <View style={styles.results2Container} />
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
                <View style={styles.secondScreenView} />
            </ScrollView>
        )
    }
}

export default GameStatsScreen
