import React from 'react'
import Home from './homeScreen/home'
import Leaderboard from './leaderboardScreen/leaderboard'
import Purchase from './purchaseScreen/purchase'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { Image, StyleSheet, TouchableOpacity, View, Alert } from 'react-native'
import Swiper from 'react-native-swiper'
import { connect } from 'react-redux'
import { showMessage } from 'react-native-flash-message'

import NotchView from '../../components/notchView'

import selectedTrophyIcon from '../../assets/mainScreens/trophy_Dolu.png'
import emptyTrophyIcon from '../../assets/mainScreens/trophy.png'
import selectedHomeIcon from '../../assets/mainScreens/home_dolu.png'
import emptyHomeIcon from '../../assets/mainScreens/home.png'
import selectedPurchaseIcon from '../../assets/mainScreens/joker_dolu.png'
import emptyPurchaseIcon from '../../assets/mainScreens/joker.png'

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleForm: 'HOME',
            homeIconSelected: true,
            trophyIconSelected: false,
            jokerIconSelected: false,
            currentPage: 1
        }
    }

    setVisibleForm = visibleForm => {
        this.setState({ visibleForm: visibleForm })
    }

    updatePageIcons = pageName => {
        if (!this.props.isNetworkConnected) {
            showMessage({
                message: 'Lütfen internet bağlantınızı kontrol ediniz',
                type: 'danger',
                duration: 2000,
                titleStyle: styles.networkErrorStyle,
                icon: 'auto'
            })
            return
        }

        let finalIndex
        switch (pageName) {
            case 0:
                this.setState({
                    currentPage: 0,
                    trophyIconSelected: true,
                    homeIconSelected: false,
                    jokerIconSelected: false
                })
                break
            case 1:
                this.setState({
                    currentPage: 1,
                    trophyIconSelected: false,
                    homeIconSelected: true,
                    jokerIconSelected: false
                })
                break
            case 2:
                this.setState({
                    currentPage: 2,
                    trophyIconSelected: false,
                    homeIconSelected: false,
                    jokerIconSelected: true
                })
                break
            case 'TROPHY':
                finalIndex = 0 - this.state.currentPage
                if (finalIndex === 0) {
                    break
                } else {
                    this.refs.swiper.scrollBy(finalIndex)
                    break
                }
            case 'HOME':
                finalIndex = 1 - this.state.currentPage
                if (finalIndex === 0) {
                    break
                } else {
                    this.refs.swiper.scrollBy(finalIndex)
                    break
                }
            case 'PURCHASE':
                finalIndex = 2 - this.state.currentPage
                if (finalIndex === 0) {
                    break
                } else {
                    this.refs.swiper.scrollBy(finalIndex)
                    break
                }
        }
    }

    render() {
        const visibleForm = this.state.visibleForm
        return (
            <View style={styles.container}>
                <NotchView color={'#fcfcfc'} />
                <View style={styles.formContainer}>
                    <Swiper
                        ref="swiper"
                        index={this.state.currentPage}
                        onIndexChanged={index => this.updatePageIcons(index)}
                        loop={false}
                        showsPagination={false}
                        loadMinimal={true}
                        loadMinimalSize={0}
                    >
                        <Leaderboard style={styles.formsStyle} />
                        <Home style={styles.formsStyle} />
                        <Purchase style={styles.formsStyle} />
                    </Swiper>
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
                                height: hp(5.5),
                                width: hp(10),
                                marginRight: wp(3)
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
                                height: hp(5.5),
                                width: hp(10)
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.updatePageIcons('PURCHASE')}
                    >
                        <Image
                            source={
                                this.state.jokerIconSelected === true
                                    ? selectedPurchaseIcon
                                    : emptyPurchaseIcon
                            }
                            style={{
                                resizeMode: 'contain',
                                height: hp(5.5),
                                width: hp(10),
                                marginLeft: wp(3)
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

export default connect(mapStateToProps, null)(Main)

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
        borderTopRightRadius: hp(2.5),
        borderTopLeftRadius: hp(2.5),
        backgroundColor: '#00D9EF',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    }
})
