import React from 'react';
import Home from './homeScreen/home'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { navigationPush } from '../../services/navigationService'
import trophyDolu from '../../assets/mainScreens/trophy_Dolu.png'
import trophyBos from '../../assets/mainScreens/trophy.png'
import homeDolu from '../../assets/mainScreens/home_dolu.png'
import homeBos from '../../assets/mainScreens/home.png'
import jokerDolu from '../../assets/mainScreens/joker_dolu.png'
import jokerBos from '../../assets/mainScreens/joker.png'

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleForm: 'HOME',
            homeIconSelected: true,
            trophyIconSelected: false,
            jokerIconSelected: false
        }
    }

    setVisibleForm = (visibleForm) => {
        this.setState({visibleForm: visibleForm})
    };

    render() {
        const visibleForm = this.state.visibleForm;
        return (
            <View style={styles.container}>
                {(visibleForm === 'HOME') && (
                    <Home
                    />
                )}
                <View style={styles.bottomBar}>
                    <TouchableOpacity
                        onPress = {() => {
                            this.setState({ trophyIconSelected: true, homeIconSelected: false, jokerIconSelected: false })
                        }}>
                        <Image
                            source={
                                this.state.trophyIconSelected === true
                                    ?  trophyDolu
                                    :  trophyBos
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
                            this.setState({ trophyIconSelected: false, homeIconSelected: true, jokerIconSelected: false })
                            this.setVisibleForm('HOME');
                        }}
                    >
                        <Image
                            source={
                                this.state.homeIconSelected === true
                                    ?  homeDolu
                                    :  homeBos
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
                            this.setState({ trophyIconSelected: false, homeIconSelected: false, jokerIconSelected: true })
                        }}>
                        <Image
                            source={
                                this.state.jokerIconSelected === true
                                    ?  jokerDolu
                                    :  jokerBos
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
        );
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