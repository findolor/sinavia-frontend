import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './style'

class RankedGame extends React.Component {
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
                                <Text style={styles.countdownText}>09</Text>
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
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>A</Text>
                        </View>
                        <View
                            style={[styles.button, { borderColor: '#00d9ef' }]}
                        >
                            <Text style={styles.buttonText}>B</Text>
                        </View>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>C</Text>
                        </View>
                    </View>
                    <View style={styles.bottomButtonRowContainer}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>D</Text>
                        </View>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>E</Text>
                        </View>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Bos</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.jokerContainer}>
                    <View style={styles.joker} />
                    <View style={styles.joker} />
                    <View style={styles.joker} />
                </View>
            </View>
        )
    }
}

export default RankedGame
