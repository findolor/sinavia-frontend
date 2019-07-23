import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './style'
import CountDown from 'react-native-countdown-component'

class RankedGame extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // Player buttons
            playerOneButton: 0,
            playerTwoButton: 0,
            // Question number
            questionNumber: -1,
            // Player answers
            playerOneCorrect: 0,
            playerOneIncorrect: 0,
            playerOneUnanswered: 0,
            playerTwoCorrect: 0,
            playerTwoIncorrect: 0,
            playerTwoUnanswered: 0,
            // Countdown running variable
            isCountdownRunning: false,
            // Round starter variable
            start: false,
            // Match finish variable
            isMatchOver: false,
            // Question image link
            questionLink: ''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.headerContainer}>
                        <View style={styles.userContainer}>
                            <Image
                                source={require('../../../assets/snoop.jpg')}
                                style={styles.userProfilePicture}
                            />
                            <View style={styles.usernameContainer}>
                                <Text style={styles.usernameText}>Sohigh</Text>
                            </View>
                            <View style={styles.answersContainer}>
                                <Text style={styles.answersText}>D: 1 </Text>
                                <Text style={styles.answersText}>Y: 2 </Text>
                                <Text style={styles.answersText}>B: 3 </Text>
                            </View>
                        </View>
                        <View style={styles.countdownContainer}>
                            <View style={styles.countdownInnerContainer}>
                                <CountDown
                                    until={60}
                                    size={15}
                                    digitStyle={{ backgroundColor: '#3FC8D9' }}
                                    digitTxtStyle={styles.countdownText}
                                    timeToShow={['M', 'S']}
                                    timeLabels={{ s: null }}
                                    separatorStyle={{ color: '#fff' }}
                                    showSeparator
                                />
                            </View>
                        </View>
                        <View style={styles.userContainer}>
                            <Image
                                source={require('../../../assets/doge.jpeg')}
                                style={styles.userProfilePicture}
                            />
                            <View style={styles.usernameContainer}>
                                <Text style={styles.usernameText}>Solow</Text>
                            </View>
                            <View style={styles.answersContainer}>
                                <Text style={styles.answersText}>D: 1 </Text>
                                <Text style={styles.answersText}>Y: 2 </Text>
                                <Text style={styles.answersText}>B: 3 </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.questionContainer}>
                        <Image
                            source={require('../../../assets/soru.jpg')}
                            style={styles.questionStyle}
                        />
                    </View>
                    <View style={styles.questionInformation}>
                        <Text style={styles.questionInformationText}>
                            Soru 1/5
                        </Text>
                    </View>
                    <View style={styles.zoomButtonContainer}>
                        <TouchableOpacity>
                            <Image
                                source={require('../../../assets/zoom.png')}
                                style={styles.zoomButton}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.backButtonContainer}>
                        <TouchableOpacity>
                            <Image
                                source={require('../../../assets/Back.png')}
                                style={styles.backButton}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.topButtonRowContainer}>
                        <TouchableOpacity>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>A</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View
                                style={[
                                    styles.button,
                                    { borderColor: '#00d9ef' }
                                ]}
                            >
                                <Text style={styles.buttonText}>B</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>C</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomButtonRowContainer}>
                        <TouchableOpacity>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>D</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>E</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Boş</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.jokerContainer}>
                    <TouchableOpacity>
                        <View style={styles.joker} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.joker} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.joker} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default RankedGame
