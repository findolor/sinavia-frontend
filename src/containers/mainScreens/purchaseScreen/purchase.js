import React from 'react'
import {
    Image,
    ImageBackground,
    Linking, Modal,
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

import PREMIUM_ADS from '../../../assets/premiumAds.png'

class PurchaseScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isPremiumModalVisible: false,
            premiumOption: 'oneMonth'
        }
    }

    onPressPremiumView() {
        this.setState({
            isPremiumModalVisible: true
        })
    }

    closePremiumView() {
        this.setState({
            isPremiumModalVisible: false
        })
    }

    oneMonthOnPress = () => {
        this.setState({
            premiumOption: 'oneMonth'
        })
    }

    threeMonthsOnPress = () => {
        this.setState({
            premiumOption: 'threeMonths'
        })
    }

    sixMonthsOnPress = () => {
        this.setState({
            premiumOption: 'sixMonths'
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    visible={this.state.isPremiumModalVisible}
                    transparent={true}
                    animationType={'fade'}
                >
                    <View style={styles.premiumModal}>
                        <TouchableOpacity onPress={() => {
                            this.closePremiumView()
                        }} style={ {height: hp(120), width: wp(100)}}/>
                        <View style={styles.premiumModalView}>
                            <LinearGradient colors={['white', 'white', '#FFA800']} style={styles.linearGradientPremiumModalView}>
                                <View style={styles.premiumModalHeaderView}>
                                    <Text style={styles.premiumModalHeaderText}>ELİT ÖĞRENCİ PAKETİ</Text>
                                </View>
                                <View style={styles.premiumSwiperContainer}>
                                    <Swiper autoplay={true}
                                            loop={true}
                                            loadMinimal={false}
                                            showsPagination={false}
                                            scrollEnabled={false}>
                                        <View style={styles.premiumSwiperView}>
                                            <View style={styles.premiumSwiperImgView}>
                                                <Image source={PREMIUM_ADS} style={styles.premiumImg}/>
                                            </View>
                                            <View style={styles.premiumSwiperHeaderView}>
                                                <Text style={styles.premiumHeaderText}>Reklam Yok!</Text>
                                            </View>
                                            <View style={[styles.premiumSwiperInfoView, {justifyContent: 'flex-start'}]}>
                                                <Text style={[styles.premiumInfoText, {marginTop: hp(0.4)}]}>Reklamsız oyun oynamanın keyfini sen de çıkar</Text>
                                            </View>
                                        </View>
                                        <View style={styles.premiumSwiperView}>
                                            <View style={styles.premiumSwiperImgView}>
                                                <Image source={PREMIUM_ADS} style={styles.premiumImg}/>
                                            </View>
                                            <View style={styles.premiumSwiperHeaderView}>
                                                <Text style={styles.premiumHeaderText}>Reklam Yok!</Text>
                                            </View>
                                            <View style={[styles.premiumSwiperInfoView, {justifyContent: 'flex-start'}]}>
                                                <Text style={[styles.premiumInfoText, {marginTop: hp(0.4)}]}>Reklamsız oyun oynamanın keyfini sen de çıkar</Text>
                                            </View>
                                        </View>
                                        <View style={styles.premiumSwiperView}>
                                            <View style={styles.premiumSwiperImgView}>
                                                <Image source={PREMIUM_ADS} style={styles.premiumImg}/>
                                            </View>
                                            <View style={styles.premiumSwiperHeaderView}>
                                                <Text style={styles.premiumHeaderText}>Reklam Yok!</Text>
                                            </View>
                                            <View style={[styles.premiumSwiperInfoView, {justifyContent: 'flex-start'}]}>
                                                <Text style={[styles.premiumInfoText, {marginTop: hp(0.4)}]}>Reklamsız oyun oynamanın keyfini sen de çıkar</Text>
                                            </View>
                                        </View>
                                        <View style={styles.premiumSwiperView}>
                                            <View style={styles.premiumSwiperImgView}>
                                                <Image source={PREMIUM_ADS} style={styles.premiumImg}/>
                                            </View>
                                            <View style={styles.premiumSwiperHeaderView}>
                                                <Text style={styles.premiumHeaderText}>Reklam Yok!</Text>
                                            </View>
                                            <View style={[styles.premiumSwiperInfoView, {justifyContent: 'flex-start'}]}>
                                                <Text style={[styles.premiumInfoText, {marginTop: hp(0.4)}]}>Reklamsız oyun oynamanın keyfini sen de çıkar</Text>
                                            </View>
                                        </View>
                                        <View style={styles.premiumSwiperView}>
                                            <View style={styles.premiumSwiperImgView}>
                                                <Image source={PREMIUM_ADS} style={styles.premiumImg}/>
                                            </View>
                                            <View style={styles.premiumSwiperHeaderView}>
                                                <Text style={styles.premiumHeaderText}>Reklam Yok!</Text>
                                            </View>
                                            <View style={[styles.premiumSwiperInfoView, {justifyContent: 'flex-start'}]}>
                                                <Text style={[styles.premiumInfoText, {marginTop: hp(0.4)}]}>Reklamsız oyun oynamanın keyfini sen de çıkar</Text>
                                            </View>
                                        </View>
                                    </Swiper>
                                </View>
                                <View style={styles.premiumOptionsView}>
                                    <TouchableOpacity onPress={this.oneMonthOnPress} style={styles.premiumOptionView}>
                                        <View style={[styles.premiumOptionUpperView,
                                            {
                                                backgroundColor: this.state.premiumOption === 'oneMonth' ? '#00D9EF': 'rgba(0, 0, 0, 0)',
                                                borderTopLeftRadius: this.state.premiumOption === 'oneMonth' ? 10 : 0,
                                                borderTopRightRadius: this.state.premiumOption === 'oneMonth' ? 10 : 0
                                            }]}>
                                            <Text style={this.state.premiumOption === 'oneMonth' ? styles.selectedPremiumOptionHeaderText: styles.unselectedPremiumOptionHeaderText}>BAŞLANGIÇ</Text>
                                        </View>
                                        <View style={[styles.premiumOptionBottomView, {
                                            borderColor: this.state.premiumOption === 'oneMonth' ? '#00D9EF': 'rgba(0, 0, 0, 0)',
                                            borderBottomLeftRadius: this.state.premiumOption === 'oneMonth' ? 10 : 0,
                                            borderBottomRightRadius: this.state.premiumOption === 'oneMonth' ? 10 : 0
                                        }]}>
                                            <View style={styles.premiumOptionMonthsView}>
                                                <Text style={this.state.premiumOption === 'oneMonth' ? styles.selectedMonthNumberText: styles.unselectedMonthNumberText}>1</Text>
                                                <Text style={this.state.premiumOption === 'oneMonth' ? styles.selectedMonthText: styles.unselectedMonthText}>ay</Text>
                                            </View>
                                            <View style={styles.premiumOptionPriceAmountView}>
                                                <Text style={this.state.premiumOption === 'oneMonth' ? styles.selectedPricePerMonthText: styles.unselectedPricePerMonthText}>5,99 TL/ay</Text>
                                                <Text style={this.state.premiumOption === 'oneMonth' ? styles.selectedPriceAmountText: styles.unselectedPriceAmountText}>5,99 TL</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.threeMonthsOnPress} style={styles.premiumOptionView}>
                                        <View style={[styles.premiumOptionUpperView,
                                            {
                                                backgroundColor: this.state.premiumOption === 'threeMonths' ? '#00D9EF': 'rgba(0, 0, 0, 0)',
                                                borderTopLeftRadius: this.state.premiumOption === 'threeMonths' ? 10 : 0,
                                                borderTopRightRadius: this.state.premiumOption === 'threeMonths' ? 10 : 0
                                            }]}>
                                            <Text style={this.state.premiumOption === 'threeMonths' ? styles.selectedPremiumOptionHeaderText: styles.unselectedPremiumOptionHeaderText}>EN POPÜLER</Text>
                                        </View>
                                        <View style={[styles.premiumOptionBottomView, {
                                            borderColor: this.state.premiumOption === 'threeMonths' ? '#00D9EF': 'rgba(0, 0, 0, 0)',
                                            borderBottomLeftRadius: this.state.premiumOption === 'threeMonths' ? 10 : 0,
                                            borderBottomRightRadius: this.state.premiumOption === 'threeMonths' ? 10 : 0
                                        }]}>
                                            <View style={styles.premiumOptionMonthsView}>
                                                <Text style={this.state.premiumOption === 'threeMonths' ? styles.selectedMonthNumberText: styles.unselectedMonthNumberText}>3</Text>
                                                <Text style={this.state.premiumOption === 'threeMonths' ? styles.selectedMonthText: styles.unselectedMonthText}>ay</Text>
                                            </View>
                                            <View style={styles.premiumOptionPriceAmountView}>
                                                <Text style={this.state.premiumOption === 'threeMonths' ? styles.selectedPricePerMonthText: styles.unselectedPricePerMonthText}>4,99 TL/ay</Text>
                                                <Text style={this.state.premiumOption === 'threeMonths' ? styles.selectedPriceAmountText: styles.unselectedPriceAmountText}>14,99 TL</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.sixMonthsOnPress} style={styles.premiumOptionView}>
                                        <View style={[styles.premiumOptionUpperView,
                                            {
                                                backgroundColor: this.state.premiumOption === 'sixMonths' ? '#00D9EF': 'rgba(0, 0, 0, 0)',
                                                borderTopLeftRadius: this.state.premiumOption === 'sixMonths' ? 10 : 0,
                                                borderTopRightRadius: this.state.premiumOption === 'sixMonths' ? 10 : 0
                                            }]}>
                                            <Text style={this.state.premiumOption === 'sixMonths' ? styles.selectedPremiumOptionHeaderText: styles.unselectedPremiumOptionHeaderText}>EN AVANTAJLI</Text>
                                        </View>
                                        <View style={[styles.premiumOptionBottomView, {
                                            borderColor: this.state.premiumOption === 'sixMonths' ? '#00D9EF': 'rgba(0, 0, 0, 0)',
                                            borderBottomLeftRadius: this.state.premiumOption === 'sixMonths' ? 10 : 0,
                                            borderBottomRightRadius: this.state.premiumOption === 'sixMonths' ? 10 : 0
                                        }]}>
                                            <View style={styles.premiumOptionMonthsView}>
                                                <Text style={this.state.premiumOption === 'sixMonths' ? styles.selectedMonthNumberText: styles.unselectedMonthNumberText}>6</Text>
                                                <Text style={this.state.premiumOption === 'sixMonths' ? styles.selectedMonthText: styles.unselectedMonthText}>ay</Text>
                                            </View>
                                            <View style={styles.premiumOptionPriceAmountView}>
                                                <Text style={this.state.premiumOption === 'sixMonths' ? styles.selectedPricePerMonthText: styles.unselectedPricePerMonthText}>2,99 TL/ay</Text>
                                                <Text style={this.state.premiumOption === 'sixMonths' ? styles.selectedPriceAmountText: styles.unselectedPriceAmountText}>17,99 TL</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonsInPremiumModalView}>
                                    <TouchableOpacity style={styles.purchasePremiumButton}>
                                        <Text style={styles.purchasePremiumButtonText}>HEMEN SATIN AL</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {this.closePremiumView()}} >
                                        <Text style={styles.purchasePremiumCancelText}>HAYIR, TEŞEKKÜRLER</Text>
                                    </TouchableOpacity>
                                </View>
                            </LinearGradient>
                        </View>
                    </View>
                </Modal>
                <View style={styles.bundlesContainer}>
                    <View style={styles.bundlesView}>
                        <Swiper loop={true}
                                paginationStyle={{ bottom: hp(0) }}
                                activeDotColor={'#750000'}>
                            <View style={styles.swiperView}>
                                <TouchableOpacity style={styles.bundleView}>
                                    <View style={styles.totalJokerAmountView}>
                                        <Text style={styles.jokerAmountsText}>30 Joker</Text>
                                    </View>
                                    <View style={styles.jokersView}>
                                        <View style={styles.jokerView}>
                                            <Image source={JOKER_1} style={styles.jokerImg}/>
                                            <Text style={styles.jokerAmountText}>x10</Text>
                                        </View>
                                        <View style={styles.jokerView}>
                                            <Image source={JOKER_2} style={styles.jokerImg}/>
                                            <Text style={styles.jokerAmountText}>x10</Text>
                                        </View>
                                        <View style={styles.jokerView}>
                                            <Image source={JOKER_3} style={styles.jokerImg}/>
                                            <Text style={styles.jokerAmountText}>x10</Text>
                                        </View>
                                    </View>
                                    <View style={styles.jokerPricesView}>
                                        <Text style={styles.normalPriceText}>9 TL</Text>
                                    </View>
                                    <View style={styles.purchaseJokerButtonView}>
                                        <TouchableOpacity style={styles.purchaseJokerButton}>
                                            <Text style={styles.discountPriceText}>6 TL</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.bundleView}>
                                    <View style={styles.totalJokerAmountView}>
                                        <Text style={styles.jokerAmountsText}>90 Joker</Text>
                                    </View>
                                    <View style={styles.jokersView}>
                                        <View style={styles.jokerView}>
                                            <Image source={JOKER_1} style={styles.jokerImg}/>
                                            <Text style={styles.jokerAmountText}>x10</Text>
                                        </View>
                                        <View style={styles.jokerView}>
                                            <Image source={JOKER_2} style={styles.jokerImg}/>
                                            <Text style={styles.jokerAmountText}>x10</Text>
                                        </View>
                                        <View style={styles.jokerView}>
                                            <Image source={JOKER_3} style={styles.jokerImg}/>
                                            <Text style={styles.jokerAmountText}>x10</Text>
                                        </View>
                                    </View>
                                    <View style={styles.jokerPricesView}>
                                        <Text style={styles.normalPriceText}>9 TL</Text>
                                    </View>
                                    <View style={styles.purchaseJokerButtonView}>
                                        <TouchableOpacity style={styles.purchaseJokerButton}>
                                            <Text style={styles.discountPriceText}>6 TL</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.bundleView}>
                                    <View style={styles.totalJokerAmountView}>
                                        <Text style={styles.jokerAmountsText}>180 Joker</Text>
                                    </View>
                                    <View style={styles.jokersView}>
                                        <View style={styles.jokerView}>
                                            <Image source={JOKER_1} style={styles.jokerImg}/>
                                            <Text style={styles.jokerAmountText}>x10</Text>
                                        </View>
                                        <View style={styles.jokerView}>
                                            <Image source={JOKER_2} style={styles.jokerImg}/>
                                            <Text style={styles.jokerAmountText}>x10</Text>
                                        </View>
                                        <View style={styles.jokerView}>
                                            <Image source={JOKER_3} style={styles.jokerImg}/>
                                            <Text style={styles.jokerAmountText}>x10</Text>
                                        </View>
                                    </View>
                                    <View style={styles.jokerPricesView}>
                                        <Text style={styles.normalPriceText}>9 TL</Text>
                                    </View>
                                    <View style={styles.purchaseJokerButtonView}>
                                        <TouchableOpacity style={styles.purchaseJokerButton}>
                                            <Text style={styles.discountPriceText}>6 TL</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
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
                <View style={styles.premiumContainer}>
                    <TouchableOpacity   onPress={() => {
                                        this.onPressPremiumView()
                                        }}
                                        style={styles.premiumUpperView}>
                        <LinearGradient colors={['white', '#F3CE97']} style={styles.linearGradientUpperView}>
                            <View style={styles.premiumSwiperContainer}>
                                <Swiper autoplay={true}
                                        loop={true}
                                        loadMinimal={false}
                                        showsPagination={false}
                                        scrollEnabled={false}>
                                    <View style={styles.premiumSwiperView}>
                                        <View style={styles.premiumSwiperImgView}>
                                            <Image source={PREMIUM_ADS} style={styles.premiumImg}/>
                                        </View>
                                        <View style={styles.premiumSwiperHeaderView}>
                                            <Text style={styles.premiumHeaderText}>Reklam Yok!</Text>
                                        </View>
                                        <View style={styles.premiumSwiperInfoView}>
                                            <Text style={styles.premiumInfoText}>Reklamsız oyun oynamanın keyfini sen de çıkar</Text>
                                        </View>
                                    </View>
                                    <View style={styles.premiumSwiperView}>
                                        <View style={styles.premiumSwiperImgView}>
                                            <Image source={PREMIUM_ADS} style={styles.premiumImg}/>
                                        </View>
                                        <View style={styles.premiumSwiperHeaderView}>
                                            <Text style={styles.premiumHeaderText}>Reklam Yok!</Text>
                                        </View>
                                        <View style={styles.premiumSwiperInfoView}>
                                            <Text style={styles.premiumInfoText}>Reklamsız oyun oynamanın keyfini sen de çıkar</Text>
                                        </View>
                                    </View>
                                    <View style={styles.premiumSwiperView}>
                                        <View style={styles.premiumSwiperImgView}>
                                            <Image source={PREMIUM_ADS} style={styles.premiumImg}/>
                                        </View>
                                        <View style={styles.premiumSwiperHeaderView}>
                                            <Text style={styles.premiumHeaderText}>Reklam Yok!</Text>
                                        </View>
                                        <View style={styles.premiumSwiperInfoView}>
                                            <Text style={styles.premiumInfoText}>Reklamsız oyun oynamanın keyfini sen de çıkar</Text>
                                        </View>
                                    </View>
                                    <View style={styles.premiumSwiperView}>
                                        <View style={styles.premiumSwiperImgView}>
                                            <Image source={PREMIUM_ADS} style={styles.premiumImg}/>
                                        </View>
                                        <View style={styles.premiumSwiperHeaderView}>
                                            <Text style={styles.premiumHeaderText}>Reklam Yok!</Text>
                                        </View>
                                        <View style={styles.premiumSwiperInfoView}>
                                            <Text style={styles.premiumInfoText}>Reklamsız oyun oynamanın keyfini sen de çıkar</Text>
                                        </View>
                                    </View>
                                    <View style={styles.premiumSwiperView}>
                                        <View style={styles.premiumSwiperImgView}>
                                            <Image source={PREMIUM_ADS} style={styles.premiumImg}/>
                                        </View>
                                        <View style={styles.premiumSwiperHeaderView}>
                                            <Text style={styles.premiumHeaderText}>Reklam Yok!</Text>
                                        </View>
                                        <View style={styles.premiumSwiperInfoView}>
                                            <Text style={styles.premiumInfoText}>Reklamsız oyun oynamanın keyfini sen de çıkar</Text>
                                        </View>
                                    </View>
                                </Swiper>
                            </View>
                            <View style={styles.premiumButtonView}>
                                <TouchableOpacity   onPress={() => {
                                                    this.onPressPremiumView()
                                                    }}
                                                    style={styles.premiumButton}>
                                    <Text style={styles.premiumButtonText}>ELİT ÖĞRENCİ PAKETİ'Nİ ŞİMDİ AL</Text>
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.premiumBottomView}>
                        <View style={styles.linearGradientBottomView}>
                            <Text style={styles.inviteText}>Arkadaşını davet et</Text>
                            <Text style={styles.earnPremiumWithInviteText}>1 Haftalık Elit Öğrenci Paketi Kazan!</Text>
                        </View>
                    </TouchableOpacity>
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
