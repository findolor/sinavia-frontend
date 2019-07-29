import React from 'react'
import Home from './homeScreen/home'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { navigationPush } from '../../services/navigationService'
import selectedTrophyIcon from '../../assets/mainScreens/trophy_Dolu.png'
import emptyTrophyIcon from '../../assets/mainScreens/trophy.png'
import selectedHomeIcon from '../../assets/mainScreens/home_dolu.png'
import emptyHomeIcon from '../../assets/mainScreens/home.png'
import selectedJokerIcon from '../../assets/mainScreens/joker_dolu.png'
import emptyJokerIcon from '../../assets/mainScreens/joker.png'
import NotchView from '../../components/notchView'

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

    render() {
        const visibleForm = this.state.visibleForm
        return (
            <View style={styles.container}>
                <NotchView color={'#fcfcfc'} />
                {visibleForm === 'HOME' && <Home />}
                <View style={styles.bottomBar}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                trophyIconSelected: true,
                                homeIconSelected: false,
                                jokerIconSelected: false
                            })
                        }}
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
                        onPress={() => {
                            this.setState({
                                trophyIconSelected: false,
                                homeIconSelected: true,
                                jokerIconSelected: false
                            })
                            this.setVisibleForm('HOME')
                        }}
                    >
                        <Image
                            source={
                                this.state.homeIconSelected === true
                                    ? selectedHomeIcon
                                    : emptyHomeIcon
                            }
                            style={{
                                resize: 'contain',
                                height: hp(5),
                                width: hp(5)
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                trophyIconSelected: false,
                                homeIconSelected: false,
                                jokerIconSelected: true
                            })
                        }}
                    >
                        <Image
                            source={
                                this.state.jokerIconSelected === true
                                    ? selectedJokerIcon
                                    : emptyJokerIcon
                            }
                            style={{
                                resize: 'contain',
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
        backgroundColor: '#fcfcfc'
    },
    bottomBar: {
        height: hp(9),
        width: wp(100),
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: '#00D9EF',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: hp(91),
        flexDirection: 'row',
        position: 'absolute'
    }
})
