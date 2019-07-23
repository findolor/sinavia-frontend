import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles, { countdownProps } from './style'
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
            isCountDownRunning: true,
            // Round starter variable
            start: false,
            // Match finish variable
            isMatchOver: false,
            // Question image link
            questionLink: '',
            // Button border colors
            buttonOneBorderColor: '#C3C3C3',
            buttonTwoBorderColor: '#C3C3C3',
            buttonThreeBorderColor: '#C3C3C3',
            buttonFourBorderColor: '#C3C3C3',
            buttonFiveBorderColor: '#C3C3C3',
            buttonSixBorderColor: '#C3C3C3'
        }
    }

    // Sends the button action and question finished action
    buttonOnPress = buttonNumber => {
        let that = this
        this.setState({
            isCountDownRunning: false,
            playerOneButton: buttonNumber
        })
        this.highlightButton(buttonNumber)
        /* this.room.send({
            action: 'button-press',
            button: buttonNumber
        }) */
        // After setting the button and sending 'button-press' action, we send 'finished' action for round end
        /* setTimeout(() => {
            that.room.send({
                action: 'finished'
            })
        }, 2000) */
    }

    highlightButton = buttonNumber => {
        switch (buttonNumber) {
            case 1:
                this.setState({ buttonOneBorderColor: '#00d9ef' })
                return
            case 2:
                this.setState({ buttonTwoBorderColor: '#00d9ef' })
                return
            case 3:
                this.setState({ buttonThreeBorderColor: '#00d9ef' })
                return
            case 4:
                this.setState({ buttonFourBorderColor: '#00d9ef' })
                return
            case 5:
                this.setState({ buttonFiveBorderColor: '#00d9ef' })
                return
            case 6:
                this.setState({ buttonSixBorderColor: '#00d9ef' })
                return
        }
    }

    countdownOnFinish = () => {
        // We send the same response as 'leave empty' option
        this.buttonOnPress(6)
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
                                    size={countdownProps.size}
                                    digitStyle={{ backgroundColor: '#3FC8D9' }}
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
                        <TouchableOpacity onPress={() => this.buttonOnPress(1)}>
                            <View
                                style={[
                                    styles.button,
                                    {
                                        borderColor: this.state
                                            .buttonOneBorderColor
                                    }
                                ]}
                            >
                                <Text style={styles.buttonText}>A</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.buttonOnPress(2)}>
                            <View
                                style={[
                                    styles.button,
                                    {
                                        borderColor: this.state
                                            .buttonTwoBorderColor
                                    }
                                ]}
                            >
                                <Text style={styles.buttonText}>B</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.buttonOnPress(3)}>
                            <View
                                style={[
                                    styles.button,
                                    {
                                        borderColor: this.state
                                            .buttonThreeBorderColor
                                    }
                                ]}
                            >
                                <Text style={styles.buttonText}>C</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomButtonRowContainer}>
                        <TouchableOpacity onPress={() => this.buttonOnPress(4)}>
                            <View
                                style={[
                                    styles.button,
                                    {
                                        borderColor: this.state
                                            .buttonFourBorderColor
                                    }
                                ]}
                            >
                                <Text style={styles.buttonText}>D</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.buttonOnPress(5)}>
                            <View
                                style={[
                                    styles.button,
                                    {
                                        borderColor: this.state
                                            .buttonFiveBorderColor
                                    }
                                ]}
                            >
                                <Text style={styles.buttonText}>E</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.buttonOnPress(6)}>
                            <View
                                style={[
                                    styles.button,
                                    {
                                        borderColor: this.state
                                            .buttonSixBorderColor
                                    }
                                ]}
                            >
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
