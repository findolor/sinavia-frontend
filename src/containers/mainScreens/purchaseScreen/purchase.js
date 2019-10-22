import React from 'react'
import {
    Image,
    ImageBackground,
    Linking,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper'

import styles from './style'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

import NotchView from '../../../components/notchView'

import PLAY_BUTTON from '../../../assets/play_Button.png'
import JOKER_ADS from '../../../assets/joker_ads.png'
import FAVORITE from '../../../assets/favori.png'

import JOKER_1 from '../../../assets/gameScreens/jokers/secondChance.png'
import JOKER_2 from '../../../assets/gameScreens/jokers/fiftyFifty.png'
import JOKER_3 from '../../../assets/gameScreens/jokers/opponentsAnswer.png'

class PurchaseScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.premiumContainer}>
                    <View style={styles.premiumUpperView}>
                        <LinearGradient colors={['white', '#F3CE97']} style={styles.linearGradientUpperView}/>
                    </View>
                    <TouchableOpacity style={styles.premiumBottomView}>
                        <LinearGradient colors={['white', '#F3CE97']} style={styles.linearGradientBottomView}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.adsContainer}>
                    <TouchableOpacity style={styles.adContainer}>
                        <ImageBackground source={JOKER_ADS} style={styles.adView} imageStyle={{ blurRadius: 10 }}>
                            <Text style={styles.adText}>JOKER</Text>
                        </ImageBackground>
                        <View style={styles.playButtonContainer}>
                            <Image source={PLAY_BUTTON} style={styles.playButtonImg}/>
                        </View>
                        <View style={styles.watchTextContainer}>
                            <Text style={styles.watchText}>İZLE &</Text>
                            <Text style={styles.watchText}>KAZAN</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.adContainer}>
                        <View style={styles.adView}>
                            <ImageBackground source={FAVORITE} style={styles.adView} imageStyle={{ blurRadius: 10 }}>
                                <Text style={styles.adText}>OYUN</Text>
                                <Text style={styles.adText}>HAKKI</Text>
                            </ImageBackground>
                        </View>
                        <View style={styles.playButtonContainer}>
                            <Image source={PLAY_BUTTON} style={styles.playButtonImg}/>
                        </View>
                        <View style={styles.watchTextContainer}>
                            <Text style={styles.watchText}>İZLE &</Text>
                            <Text style={styles.watchText}>KAZAN</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.bundlesContainer}>
                        <Swiper loop={true}
                                loadMinimal={true}
                                containerStyle={styles.bundlesView}
                                paginationStyle={{ bottom: hp(0) }}
                                activeDotColor={'#750000'}>
                            <View style={styles.swiperView}>
                                <View style={styles.bundleView}/>
                                <View style={styles.bundleView}/>
                                <View style={styles.bundleView}/>
                            </View>
                            <View style={styles.swiperView}>
                                <View style={styles.bundleView}/>
                                <View style={styles.bundleView}/>
                                <View style={styles.bundleView}/>
                            </View>
                            <View style={styles.swiperView}>
                                <View style={styles.bundleView}/>
                                <View style={styles.bundleView}/>
                                <View style={styles.bundleView}/>
                            </View>
                        </Swiper>
                </View>
                <View style={styles.yourPremiumAndJokersContainer}>
                    <View style={styles.yourPremiumContainer}>
                        <View style={styles.yourPremiumTextView}>
                            <Text style={styles.yourPremiumText}>Elit Öğrenci Paketi</Text>
                            <Text style={styles.yourPremiumText}>Kalan Süre</Text>
                        </View>
                        <View style={styles.yourPremiumCounterView}>
                            <Text style={styles.yourPremiumCounterText}>
                                <Text style={styles.yourPremiumCounterNumbersText}>1</Text> Ay
                                <Text style={styles.yourPremiumCounterNumbersText}> 2</Text> Hafta
                                <Text style={styles.yourPremiumCounterNumbersText}> 6</Text> Gün
                            </Text>
                        </View>
                    </View>
                    <View style={styles.yourJokersContainer}>
                        <View style={styles.jokerContainer}>
                            <View style={styles.jokerImageContainer}>
                                <View style={styles.jokerImageView}>
                                    <View style={styles.jokerCounterView}>
                                        <Text style={styles.jokerCounterText}>20</Text>
                                    </View>
                                    <Image source={JOKER_1} style={styles.jokerImg}/>
                                </View>
                            </View>
                            <View style={styles.jokerNameContainer}>
                                <Text style={styles.jokerNameText}>Çifte Şans</Text>
                            </View>
                        </View>
                        <View style={styles.jokerContainer}>
                            <View style={styles.jokerImageContainer}>
                                <View style={styles.jokerImageView}>
                                    <View style={styles.jokerCounterView}>
                                        <Text style={styles.jokerCounterText}>275</Text>
                                    </View>
                                    <Image source={JOKER_2} style={styles.jokerImg}/>
                                </View>
                            </View>
                            <View style={styles.jokerNameContainer}>
                                <Text style={styles.jokerNameText}>50/50</Text>
                            </View>
                        </View>
                        <View style={styles.jokerContainer}>
                            <View style={styles.jokerImageContainer}>
                                <View style={styles.jokerImageView}>
                                    <View style={styles.jokerCounterView}>
                                        <Text style={styles.jokerCounterText}>5</Text>
                                    </View>
                                    <Image source={JOKER_3} style={styles.jokerImg}/>
                                </View>
                            </View>
                            <View style={styles.jokerNameContainer}>
                                <Text style={styles.jokerNameText}>Rakibi Gör</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default PurchaseScreen
