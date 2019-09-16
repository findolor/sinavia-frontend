import React from 'react'
import Home from './homeScreen/home'
import Leaderboard from './leaderboardScreen/leaderboard'
import Purchase from './purchaseScreen/purchase'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

import NotchView from '../../components/notchView'

import selectedTrophyIcon from '../../assets/mainScreens/trophy_Dolu.png'
import emptyTrophyIcon from '../../assets/mainScreens/trophy.png'
import selectedHomeIcon from '../../assets/mainScreens/home_dolu.png'
import emptyHomeIcon from '../../assets/mainScreens/home.png'
import selectedJokerIcon from '../../assets/mainScreens/joker_dolu.png'
import emptyJokerIcon from '../../assets/mainScreens/joker.png'

export default class Main extends React.Component {
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
                return
        }
    }

    render() {
        const visibleForm = this.state.visibleForm
        return (
            <View style={styles.container}>
                <NotchView color={'#fcfcfc'} />
                <View style={styles.formContainer}>
                    {visibleForm === 'HOME' && <Home style={styles.formsStyle}/>}
                    {visibleForm === 'LEADERBOARD' && <Leaderboard style={styles.formsStyle}/>}
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
                        onPress={() => this.updatePageIcons('JOKER')}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        justifyContent: 'flex-end'
    },
    formContainer:{
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
