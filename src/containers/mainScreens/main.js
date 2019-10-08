import React from 'react'
import Home from './homeScreen/home'
import Leaderboard from './leaderboardScreen/leaderboard'
import Purchase from './purchaseScreen/purchase'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { Image, StyleSheet, TouchableOpacity, View, Alert } from 'react-native'
import { connect } from 'react-redux'

import NotchView from '../../components/notchView'

import selectedTrophyIcon from '../../assets/mainScreens/trophy_Dolu.png'
import emptyTrophyIcon from '../../assets/mainScreens/trophy.png'
import selectedHomeIcon from '../../assets/mainScreens/home_dolu.png'
import emptyHomeIcon from '../../assets/mainScreens/home.png'
import selectedJokerIcon from '../../assets/mainScreens/joker_dolu.png'
import emptyJokerIcon from '../../assets/mainScreens/joker.png'

// TODO DELETE THIS LATER
// FOR TESTING
import { Buffer } from 'buffer'
import { AsyncStorage } from 'react-native'
window.localStorage = AsyncStorage
global.Buffer = Buffer
import * as Colyseus from 'colyseus.js'
import { GAME_ENGINE_ENDPOINT } from '../../config'
import {
    navigationPush,
    navigationReset,
    SCENE_KEYS
} from '../../services/navigationService'
/// FOR TESTING

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleForm: 'HOME',
            homeIconSelected: true,
            trophyIconSelected: false,
            jokerIconSelected: false
        }
    }

    setVisibleForm = visibleForm => {
        this.setState({ visibleForm: visibleForm })
    }

    updatePageIcons = pageName => {
        if (!this.props.isNetworkConnected) {
            Alert.alert('Lütfen internet bağlantınızı kontrol ediniz!')
            return
        }

        switch (pageName) {
            case 'HOME':
                this.setVisibleForm('HOME')
                this.setState({ trophyIconSelected: false })
                this.setState({ homeIconSelected: true })
                this.setState({ jokerIconSelected: false })
                return
            case 'TROPHY':
                this.setVisibleForm('LEADERBOARD')
                this.setState({ trophyIconSelected: true })
                this.setState({ homeIconSelected: false })
                this.setState({ jokerIconSelected: false })
                return
            case 'PURCHASE':
                this.setVisibleForm('PURCHASE')
                this.setState({ trophyIconSelected: false })
                this.setState({ homeIconSelected: false })
                this.setState({ jokerIconSelected: true })
                // TODO DELETE THIS LATER
                // FOR TESTING
                this.client = new Colyseus.Client(GAME_ENGINE_ENDPOINT)
                this.client.onOpen.add(() => {
                    this.room = this.client.join('friendSoloRoom', {
                        databaseId: this.props.clientDBId,
                        ongoingMatchId: 2,
                        examId: 1,
                        courseId: 1,
                        subjectId: 1
                    })

                    this.room.onJoin.add(() => {
                        this.room.removeAllListeners()
                        navigationReset('game', { isHardReset: true })
                        navigationPush(SCENE_KEYS.gameScreens.soloGameScreen, {
                            client: this.client,
                            room: this.room,
                            playerUsername: this.props.clientInformation
                                .username,
                            playerProfilePicture: this.props.clientInformation
                                .profilePicture
                        })
                    })
                })
                // FOR TESTING
                return
        }
    }

    render() {
        const visibleForm = this.state.visibleForm
        return (
            <View style={styles.container}>
                <NotchView color={'#fcfcfc'} />
                <View style={styles.formContainer}>
                    {visibleForm === 'HOME' && (
                        <Home style={styles.formsStyle} />
                    )}
                    {visibleForm === 'LEADERBOARD' && (
                        <Leaderboard style={styles.formsStyle} />
                    )}
                </View>
                <View style={styles.bottomBar}>
                    <TouchableOpacity
                        onPress={() => this.updatePageIcons('TROPHY')}
                    >
                        <Image
                            source={
                                this.state.trophyIconSelected === true
                                    ? selectedTrophyIcon
                                    : emptyTrophyIcon
                            }
                            style={{
                                resizeMode: 'contain',
                                height: hp(5),
                                width: hp(5)
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.updatePageIcons('HOME')}
                    >
                        <Image
                            source={
                                this.state.homeIconSelected === true
                                    ? selectedHomeIcon
                                    : emptyHomeIcon
                            }
                            style={{
                                resizeMode: 'contain',
                                height: hp(5),
                                width: hp(5)
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.updatePageIcons('PURCHASE')}
                    >
                        <Image
                            source={
                                this.state.jokerIconSelected === true
                                    ? selectedJokerIcon
                                    : emptyJokerIcon
                            }
                            style={{
                                resizeMode: 'contain',
                                height: hp(5),
                                width: hp(5)
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    isNetworkConnected: state.app.isNetworkConnected,
    clientDBId: state.client.clientDBId,
    clientInformation: state.client.clientInformation
})

export default connect(
    mapStateToProps,
    null
)(Main)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        justifyContent: 'flex-end'
    },
    formContainer: {
        flex: 87
    },
    formsStyle: {
        flex: 1
    },
    bottomBar: {
        flex: 9,
        width: wp(100),
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: '#00D9EF',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    }
})
