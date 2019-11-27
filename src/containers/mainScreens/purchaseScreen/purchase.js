import React from 'react'
import {
    Image,
    ImageBackground,
    Linking,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper'
import { connect } from 'react-redux'
import moment from 'moment'

import styles from './style'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

import PLAY_BUTTON from '../../../assets/play_Button.png'
import JOKER_ADS from '../../../assets/joker_ads.png'

import INSTAGRAM_LOGO from '../../../assets/instagram_logo.png'
import TWITTER_LOGO from '../../../assets/twitter_logo.png'
import FACEBOOK_LOGO from '../../../assets/facebook_logo.png'

import PREMIUM_ADS from '../../../assets/premiumAds.png'
import PREMIUM_FAV from '../../../assets/favori.png'
import PREMIUM_JOKER from '../../../assets/premiumJoker.png'
import PREMIUM_BACK from '../../../assets/premiumBack.png'
import PREMIUM_MAP from '../../../assets/premiumMap.png'
import PREMIUM_SINGLE_MODE from '../../../assets/premiumSingleMode.png'

const instagram_page = 'https://www.instagram.com/sinavia.app/'
const twitter_page = 'https://twitter.com/sinavia'
const facebook_page = 'https://www.facebook.com/sinaviaapp'

class PurchaseScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isPremiumModalVisible: false,
            premiumOption: 'threeMonths',
            firstJoker: {
                joker: {
                    imageLink: null,
                    name: null
                }
            },
            secondJoker: {
                joker: {
                    imageLink: null,
                    name: null
                }
            },
            thirdJoker: {
                joker: {
                    imageLink: null,
                    name: null
                }
            },
            remainingPremiumDays: null,
            remainingPremiumWeeks: null,
            remainingPremiumMonths: null
        }
    }

    componentDidMount() {
        this.props.userJokers.forEach(userJoker => {
            switch(userJoker.jokerId) {
                case 1:
                    this.setState({ firstJoker: userJoker})
                    break
                case 2:
                    this.setState({ secondJoker: userJoker})
                    break
                case 3:
                    this.setState({ thirdJoker: userJoker})
                    break
            }
        })
        this.calculateDateUntilPremiumEnd()
    }

    calculateDateUntilPremiumEnd = () => {
        const dateToday = moment()
        const endDate = moment(this.props.clientInformation.premiumEndDate)
        const remainingPremiumMonths = endDate.diff(dateToday, 'months')
        let remainingPremiumWeeks = 0
        let remainingPremiumDays = endDate.diff(dateToday, 'days')
        let daysToSubtract = 0

        if(remainingPremiumMonths !== 0) {
            let tempDate = moment()
            let daysInMonth = tempDate.daysInMonth()
            for(let i = 1; i < remainingPremiumMonths + 1; i++) {
                daysToSubtract += daysInMonth
                tempDate = moment().add(i, 'months')
                daysInMonth = tempDate.daysInMonth()
            }
        }
        remainingPremiumDays -= daysToSubtract
        if(remainingPremiumDays >= 7) {
            remainingPremiumWeeks = Math.floor(remainingPremiumDays / 7)
            remainingPremiumDays -= remainingPremiumWeeks * 7
        }

        this.setState({
            remainingPremiumDays: remainingPremiumDays,
            remainingPremiumWeeks: remainingPremiumWeeks,
            remainingPremiumMonths: remainingPremiumMonths
        })
    }

    onPressPremiumView() {
        this.setState({
            isPremiumModalVisible: true
        })
    }

    closePremiumView() {
        this.setState({
            isPremiumModalVisible: false,
            premiumOption: 'threeMonths'
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
                            <LinearGradient colors={['white', '#FFE6BB', '#FFA800']} style={styles.linearGradientPremiumModalView}>
                                <View style={styles.premiumModalHeaderView}>
                                    <Text style={styles.premiumModalHeaderText}>ELİT ÖĞRENCİ PAKETİ</Text>
                                </View>
                                <View style={styles.premiumModalSwiperContainer}>
                                    <Swiper autoplay={true}
                                            loop={true}
                                            loadMinimal={false}
                                            showsPagination={false}
                                            scrollEnabled={false}
                                            autoplayTimeout={5}>
                                        <View style={styles.premiumModalSwiperView}>
                                            <View style={styles.premiumModalSwiperImgView}>
                                                <Image source={PREMIUM_ADS} style={styles.premiumModalImg}/>
                                            </View>
                                            <View style={styles.premiumModalSwiperHeaderView}>
                                                <Text style={styles.premiumModalHeaderText}>Reklam Yok!</Text>
                                            </View>
                                            <View style={styles.premiumModalSwiperInfoView}>
                                                <Text style={[styles.premiumModalInfoText, {marginBottom: hp(0.5)}]}>Reklamsız oyun oynamanın keyfini sen de çıkar</Text>
                                            </View>
                                        </View>
                                        <View style={styles.premiumModalSwiperView}>
                                            <View style={styles.premiumModalSwiperImgView}>
                                                <Image source={PREMIUM_FAV} style={styles.premiumModalImg}/>
                                            </View>
                                            <View style={styles.premiumModalSwiperHeaderView}>
                                                <Text style={styles.premiumModalHeaderText}>Soru favorile!</Text>
                                            </View>
                                            <View style={styles.premiumModalSwiperInfoView}>
                                                <Text style={[styles.premiumModalInfoText, {marginBottom: hp(0.5)}]}>Hoşuna giden ya da sonra tekrar bakmak istediğin soruları favorile</Text>
                                            </View>
                                        </View>
                                        <View style={styles.premiumModalSwiperView}>
                                            <View style={styles.premiumModalSwiperImgView}>
                                                <Image source={PREMIUM_MAP} style={styles.premiumModalImg}/>
                                            </View>
                                            <View style={styles.premiumModalSwiperHeaderView}>
                                                <Text style={styles.premiumModalHeaderText}>Türkiye geneli deneme sınavları!</Text>
                                            </View>
                                            <View style={styles.premiumModalSwiperInfoView}>
                                                <Text style={[styles.premiumModalInfoText, {marginBottom: hp(0.5)}]}>Ülke çapındaki deneme sınavlarına ücretsiz katıl, tüm öğrenciler arasındaki sıralamanı gör</Text>
                                            </View>
                                        </View>
                                        <View style={styles.premiumModalSwiperView}>
                                            <View style={styles.premiumModalSwiperImgView}>
                                                <Image source={PREMIUM_SINGLE_MODE} style={styles.premiumModalImg}/>
                                            </View>
                                            <View style={styles.premiumModalSwiperHeaderView}>
                                                <Text style={styles.premiumModalHeaderText}>Tek başına!</Text>
                                            </View>
                                            <View style={styles.premiumModalSwiperInfoView}>
                                                <Text style={[styles.premiumModalInfoText, {marginBottom: hp(0.5)}]}>"Tek rakibim kendim" diyenler için tek başına soru çözebilme imkanı</Text>
                                            </View>
                                        </View>
                                        <View style={styles.premiumModalSwiperView}>
                                            <View style={styles.premiumModalSwiperImgView}>
                                                <Image source={PREMIUM_BACK} style={styles.premiumModalImg}/>
                                            </View>
                                            <View style={styles.premiumModalSwiperHeaderView}>
                                                <Text style={styles.premiumModalHeaderText}>Çözülmedik soru kalmasın!</Text>
                                            </View>
                                            <View style={styles.premiumModalSwiperInfoView}>
                                                <Text style={[styles.premiumModalInfoText, {marginBottom: hp(0.5)}]}>Boş bıraktığın veya yanlış yaptığın soruları tekrar tekrar çözme fırsatı</Text>
                                            </View>
                                        </View>
                                        <View style={styles.premiumModalSwiperView}>
                                            <View style={styles.premiumModalSwiperImgView}>
                                                <Image source={PREMIUM_JOKER} style={styles.premiumModalImg}/>
                                            </View>
                                            <View style={styles.premiumModalSwiperHeaderView}>
                                                <Text style={styles.premiumModalHeaderText}>Günlük joker!</Text>
                                            </View>
                                            <View style={styles.premiumModalSwiperInfoView}>
                                                <Text style={[styles.premiumModalInfoText, {marginBottom: hp(0.5)}]}>Her gün verilen jokerlerle soruların cevabına 1 adım daha yaklaş, rakiplerinin önüne geç</Text>
                                            </View>
                                        </View>
                                    </Swiper>
                                </View>
                                <View style={styles.premiumOptionsView}>
                                    <TouchableOpacity onPress={this.oneMonthOnPress} style={styles.premiumOptionView}>
                                        <View style={[styles.premiumOptionUpperView,
                                            {
                                                backgroundColor: this.state.premiumOption === 'oneMonth' ? '#00D9EF': 'rgba(0, 0, 0, 0)'
                                            }]}>
                                            <Text style={this.state.premiumOption === 'oneMonth' ? styles.selectedPremiumOptionHeaderText: styles.unselectedPremiumOptionHeaderText}>BAŞLANGIÇ</Text>
                                        </View>
                                        <View style={[styles.premiumOptionBottomView, {
                                            borderColor: this.state.premiumOption === 'oneMonth' ? '#00D9EF': 'rgba(0, 0, 0, 0)'
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
                                            }]}>
                                            <Text style={this.state.premiumOption === 'threeMonths' ? styles.selectedPremiumOptionHeaderText: styles.unselectedPremiumOptionHeaderText}>EN POPÜLER</Text>
                                        </View>
                                        <View style={[styles.premiumOptionBottomView, {
                                            borderColor: this.state.premiumOption === 'threeMonths' ? '#00D9EF': 'rgba(0, 0, 0, 0)',
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
                                                backgroundColor: this.state.premiumOption === 'sixMonths' ? '#00D9EF': 'rgba(0, 0, 0, 0)'
                                            }]}>
                                            <Text style={this.state.premiumOption === 'sixMonths' ? styles.selectedPremiumOptionHeaderText: styles.unselectedPremiumOptionHeaderText}>EN AVANTAJLI</Text>
                                        </View>
                                        <View style={[styles.premiumOptionBottomView, {
                                            borderColor: this.state.premiumOption === 'sixMonths' ? '#00D9EF': 'rgba(0, 0, 0, 0)'
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
                        <Swiper loop={false}
                                paginationStyle={{ bottom: hp(0.25) }}
                                activeDot={<View style={{height: hp(1.5), width: hp(1.5), backgroundColor: '#00D9EF', borderRadius: hp(100), marginLeft: wp(1), marginRight: wp(1)}}/>}
                                dot={<View style={{height: hp(1.5), width: hp(1.5), backgroundColor: 'rgba(0,0,0,.2)', borderRadius: hp(100), marginLeft: wp(1), marginRight: wp(1)}}/>}
                        >
                            <View style={styles.swiperView}>
                                <TouchableOpacity style={styles.bundleView}>
                                    <View style={styles.totalJokerAmountView}>
                                        <Text style={styles.jokerAmountsText}>30 Joker</Text>
                                    </View>
                                    <View style={styles.jokersView}>
                                        <View style={styles.jokerView}>
                                            <Image source={{ uri: this.state.firstJoker.joker.imageLink }} style={styles.jokerImg}/>
                                            <Text style={styles.jokerAmountText}>x10</Text>
                                        </View>
                                        <View style={styles.jokerView}>
                                            <Image source={{ uri: this.state.secondJoker.joker.imageLink }} style={styles.jokerImg}/>
                                            <Text style={styles.jokerAmountText}>x10</Text>
                                        </View>
                                        <View style={styles.jokerView}>
                                            <Image source={{ uri: this.state.thirdJoker.joker.imageLink }} style={styles.jokerImg}/>
                                            <Text style={styles.jokerAmountText}>x10</Text>
                                        </View>
                                    </View>
                                    <View style={styles.jokerPricesView}>
                                        <Text style={styles.normalPriceText}>9 ₺ yerine</Text>
                                    </View>
                                    <View style={styles.purchaseJokerButtonView}>
                                        <TouchableOpacity style={styles.purchaseJokerButton}>
                                            <Text style={styles.discountPriceText}>6 ₺</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.bundleDivider}/>
                                <TouchableOpacity style={styles.bundleView}>
                                    <View style={styles.totalJokerAmountView}>
                                        <Text style={styles.jokerAmountsText}>90 Joker</Text>
                                    </View>
                                    <View style={styles.jokersView}>
                                        <View style={styles.jokerView}>
                                            <Image source={{ uri: this.state.firstJoker.joker.imageLink }} style={styles.jokerImg}/>
                                            <Text style={styles.jokerAmountText}>x30</Text>
                                        </View>
                                        <View style={styles.jokerView}>
                                            <Image source={{ uri: this.state.secondJoker.joker.imageLink }} style={styles.jokerImg}/>
                                            <Text style={styles.jokerAmountText}>x30</Text>
                                        </View>
                                        <View style={styles.jokerView}>
                                            <Image source={{ uri: this.state.thirdJoker.joker.imageLink }} style={styles.jokerImg}/>
                                            <Text style={styles.jokerAmountText}>x30</Text>
                                        </View>
                                    </View>
                                    <View style={styles.jokerPricesView}>
                                        <Text style={styles.normalPriceText}>27 ₺ yerine</Text>
                                    </View>
                                    <View style={styles.purchaseJokerButtonView}>
                                        <TouchableOpacity style={styles.purchaseJokerButton}>
                                            <Text style={styles.discountPriceText}>15 ₺</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.bundleDivider}/>
                                <TouchableOpacity style={styles.bundleView}>
                                    <View style={styles.totalJokerAmountView}>
                                        <Text style={styles.jokerAmountsText}>180 Joker</Text>
                                    </View>
                                    <View style={styles.jokersView}>
                                        <View style={styles.jokerView}>
                                            <Image source={{ uri: this.state.firstJoker.joker.imageLink }} style={styles.jokerImg}/>
                                            <Text style={styles.jokerAmountText}>x60</Text>
                                        </View>
                                        <View style={styles.jokerView}>
                                            <Image source={{ uri: this.state.secondJoker.joker.imageLink }} style={styles.jokerImg}/>
                                            <Text style={styles.jokerAmountText}>x60</Text>
                                        </View>
                                        <View style={styles.jokerView}>
                                            <Image source={{ uri: this.state.thirdJoker.joker.imageLink }} style={styles.jokerImg}/>
                                            <Text style={styles.jokerAmountText}>x60</Text>
                                        </View>
                                    </View>
                                    <View style={styles.jokerPricesView}>
                                        <Text style={styles.normalPriceText}>54 ₺ yerine</Text>
                                    </View>
                                    <View style={styles.purchaseJokerButtonView}>
                                        <TouchableOpacity style={styles.purchaseJokerButton}>
                                            <Text style={styles.discountPriceText}>25 ₺</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.swiperView}>
                                <TouchableOpacity style={styles.bundleView}>
                                    <View style={styles.totalJokerAmountView}>
                                        <Text style={styles.jokerAmountsText}>Rakibi Gör</Text>
                                    </View>
                                    <View style={styles.jokersView}>
                                        <Image source={{ uri: this.state.firstJoker.joker.imageLink }} style={[styles.jokerImg, {height: hp(4), width: hp(4)}]}/>
                                        <Text style={[styles.jokerAmountText, { fontFamily: 'Averta-Semibold',fontSize: hp(3.75), color: '#FF9900'}]}>x30</Text>
                                    </View>
                                    <View style={styles.jokerPricesView}>
                                        <Text style={styles.normalPriceText}>12 ₺ yerine</Text>
                                    </View>
                                    <View style={styles.purchaseJokerButtonView}>
                                        <TouchableOpacity style={styles.purchaseJokerButton}>
                                            <Text style={styles.discountPriceText}>8 ₺</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.bundleDivider}/>
                                <TouchableOpacity style={styles.bundleView}>
                                    <View style={styles.totalJokerAmountView}>
                                        <Text style={styles.jokerAmountsText}>Şık Ele</Text>
                                    </View>
                                    <View style={styles.jokersView}>
                                        <Image source={{ uri: this.state.secondJoker.joker.imageLink }} style={[styles.jokerImg, {height: hp(4), width: hp(4)}]}/>
                                        <Text style={[styles.jokerAmountText, { fontFamily: 'Averta-Semibold',fontSize: hp(3.75), color: '#FF9900'}]}>x30</Text>
                                    </View>
                                    <View style={styles.jokerPricesView}>
                                        <Text style={styles.normalPriceText}>8 ₺ yerine</Text>
                                    </View>
                                    <View style={styles.purchaseJokerButtonView}>
                                        <TouchableOpacity style={styles.purchaseJokerButton}>
                                            <Text style={styles.discountPriceText}>5 ₺</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.bundleDivider}/>
                                <TouchableOpacity style={styles.bundleView}>
                                    <View style={styles.totalJokerAmountView}>
                                        <Text style={styles.jokerAmountsText}>Çifte Şans</Text>
                                    </View>
                                    <View style={styles.jokersView}>
                                        <Image source={{ uri: this.state.thirdJoker.joker.imageLink }} style={[styles.jokerImg, {height: hp(4), width: hp(4)}]}/>
                                        <Text style={[styles.jokerAmountText, { fontFamily: 'Averta-Semibold',fontSize: hp(3.75), color: '#FF9900'}]}>x30</Text>
                                    </View>
                                    <View style={styles.jokerPricesView}>
                                        <Text style={styles.normalPriceText}>10 ₺ yerine</Text>
                                    </View>
                                    <View style={styles.purchaseJokerButtonView}>
                                        <TouchableOpacity style={styles.purchaseJokerButton}>
                                            <Text style={styles.discountPriceText}>7 ₺</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.swiperView}>
                                <TouchableOpacity style={styles.bundleView}>
                                    <View style={styles.totalJokerAmountView}>
                                        <Text style={styles.jokerAmountsText}>Rakibi Gör</Text>
                                    </View>
                                    <View style={styles.jokersView}>
                                        <Image source={{ uri: this.state.firstJoker.joker.imageLink }} style={[styles.jokerImg, {height: hp(4), width: hp(4)}]}/>
                                        <Text style={[styles.jokerAmountText, { fontFamily: 'Averta-Semibold',fontSize: hp(3.75), color: '#FF9900'}]}>x90</Text>
                                    </View>
                                    <View style={styles.jokerPricesView}>
                                        <Text style={styles.normalPriceText}>36 ₺ yerine</Text>
                                    </View>
                                    <View style={styles.purchaseJokerButtonView}>
                                        <TouchableOpacity style={styles.purchaseJokerButton}>
                                            <Text style={styles.discountPriceText}>21 ₺</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.bundleDivider}/>
                                <TouchableOpacity style={styles.bundleView}>
                                    <View style={styles.totalJokerAmountView}>
                                        <Text style={styles.jokerAmountsText}>Şık Ele</Text>
                                    </View>
                                    <View style={styles.jokersView}>
                                        <Image source={{ uri: this.state.secondJoker.joker.imageLink }} style={[styles.jokerImg, {height: hp(4), width: hp(4)}]}/>
                                        <Text style={[styles.jokerAmountText, { fontFamily: 'Averta-Semibold',fontSize: hp(3.75), color: '#FF9900'}]}>x90</Text>
                                    </View>
                                    <View style={styles.jokerPricesView}>
                                        <Text style={styles.normalPriceText}>24 ₺ yerine</Text>
                                    </View>
                                    <View style={styles.purchaseJokerButtonView}>
                                        <TouchableOpacity style={styles.purchaseJokerButton}>
                                            <Text style={styles.discountPriceText}>14 ₺</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.bundleDivider}/>
                                <TouchableOpacity style={styles.bundleView}>
                                    <View style={styles.totalJokerAmountView}>
                                        <Text style={styles.jokerAmountsText}>Çifte Şans</Text>
                                    </View>
                                    <View style={styles.jokersView}>
                                        <Image source={{ uri: this.state.thirdJoker.joker.imageLink }} style={[styles.jokerImg, {height: hp(4), width: hp(4)}]}/>
                                        <Text style={[styles.jokerAmountText, { fontFamily: 'Averta-Semibold',fontSize: hp(3.75), color: '#FF9900'}]}>x90</Text>
                                    </View>
                                    <View style={styles.jokerPricesView}>
                                        <Text style={styles.normalPriceText}>30 ₺ yerine</Text>
                                    </View>
                                    <View style={styles.purchaseJokerButtonView}>
                                        <TouchableOpacity style={styles.purchaseJokerButton}>
                                            <Text style={styles.discountPriceText}>18 ₺</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.swiperView}>
                                <TouchableOpacity style={styles.bundleView}>
                                    <View style={styles.totalJokerAmountView}>
                                        <Text style={styles.jokerAmountsText}>Rakibi Gör</Text>
                                    </View>
                                    <View style={styles.jokersView}>
                                        <Image source={{ uri: this.state.firstJoker.joker.imageLink }} style={[styles.jokerImg, {height: hp(4), width: hp(4)}]}/>
                                        <Text style={[styles.jokerAmountText, { fontFamily: 'Averta-Semibold',fontSize: hp(3.75), color: '#FF9900'}]}>x180</Text>
                                    </View>
                                    <View style={styles.jokerPricesView}>
                                        <Text style={styles.normalPriceText}>72 ₺ yerine</Text>
                                    </View>
                                    <View style={styles.purchaseJokerButtonView}>
                                        <TouchableOpacity style={styles.purchaseJokerButton}>
                                            <Text style={styles.discountPriceText}>36 ₺</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.bundleDivider}/>
                                <TouchableOpacity style={styles.bundleView}>
                                    <View style={styles.totalJokerAmountView}>
                                        <Text style={styles.jokerAmountsText}>Şık Ele</Text>
                                    </View>
                                    <View style={styles.jokersView}>
                                        <Image source={{ uri: this.state.secondJoker.joker.imageLink }} style={[styles.jokerImg, {height: hp(4), width: hp(4)}]}/>
                                        <Text style={[styles.jokerAmountText, { fontFamily: 'Averta-Semibold',fontSize: hp(3.75), color: '#FF9900'}]}>x180</Text>
                                    </View>
                                    <View style={styles.jokerPricesView}>
                                        <Text style={styles.normalPriceText}>48 ₺ yerine</Text>
                                    </View>
                                    <View style={styles.purchaseJokerButtonView}>
                                        <TouchableOpacity style={styles.purchaseJokerButton}>
                                            <Text style={styles.discountPriceText}>27 ₺</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.bundleDivider}/>
                                <TouchableOpacity style={styles.bundleView}>
                                    <View style={styles.totalJokerAmountView}>
                                        <Text style={styles.jokerAmountsText}>Çifte Şans</Text>
                                    </View>
                                    <View style={styles.jokersView}>
                                        <Image source={{ uri: this.state.thirdJoker.joker.imageLink }} style={[styles.jokerImg, {height: hp(4), width: hp(4)}]}/>
                                        <Text style={[styles.jokerAmountText, { fontFamily: 'Averta-Semibold',fontSize: hp(3.75), color: '#FF9900'}]}>x180</Text>
                                    </View>
                                    <View style={styles.jokerPricesView}>
                                        <Text style={styles.normalPriceText}>60 ₺ yerine</Text>
                                    </View>
                                    <View style={styles.purchaseJokerButtonView}>
                                        <TouchableOpacity style={styles.purchaseJokerButton}>
                                            <Text style={styles.discountPriceText}>30 ₺</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Swiper>
                    </View>
                </View>
                <View style={styles.adsContainer}>
                    <TouchableOpacity style={styles.adContainer}>
                        <ImageBackground source={JOKER_ADS} style={styles.adView}>
                            <Text style={styles.adText}>JOKER</Text>
                        </ImageBackground>
                        <View style={styles.playButtonContainer}>
                            <Image source={PLAY_BUTTON} style={styles.playButtonImg}/>
                        </View>
                        <View style={styles.watchTextContainer}>
                            <Text style={styles.watchText}>İZLE & KAZAN</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.premiumContainer}>
                    <LinearGradient colors={['white', '#F3CE97']} style={styles.premiumUpperView}>
                            <View style={styles.premiumSwiperContainer}>
                                <Swiper autoplay={true}
                                        loop={true}
                                        loadMinimal={false}
                                        showsPagination={false}
                                        scrollEnabled={false}
                                        autoplayTimeout={5}>
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
                                            <Image source={PREMIUM_FAV} style={styles.premiumImg}/>
                                        </View>
                                        <View style={styles.premiumSwiperHeaderView}>
                                            <Text style={styles.premiumHeaderText}>Soru favorile!</Text>
                                        </View>
                                        <View style={styles.premiumSwiperInfoView}>
                                            <Text style={styles.premiumInfoText}>Hoşuna giden ya da sonra tekrar bakmak istediğin soruları favorile</Text>
                                        </View>
                                    </View>
                                    <View style={styles.premiumSwiperView}>
                                        <View style={styles.premiumSwiperImgView}>
                                            <Image source={PREMIUM_MAP} style={styles.premiumImg}/>
                                        </View>
                                        <View style={styles.premiumSwiperHeaderView}>
                                            <Text style={styles.premiumHeaderText}>Türkiye geneli deneme sınavları!</Text>
                                        </View>
                                        <View style={styles.premiumSwiperInfoView}>
                                            <Text style={styles.premiumInfoText}>Ülke çapındaki deneme sınavlarına ücretsiz katıl, tüm öğrenciler arasındaki sıralamanı gör</Text>
                                        </View>
                                    </View>
                                    <View style={styles.premiumSwiperView}>
                                        <View style={styles.premiumSwiperImgView}>
                                            <Image source={PREMIUM_SINGLE_MODE} style={styles.premiumImg}/>
                                        </View>
                                        <View style={styles.premiumSwiperHeaderView}>
                                            <Text style={styles.premiumHeaderText}>Tek başına!</Text>
                                        </View>
                                        <View style={styles.premiumSwiperInfoView}>
                                            <Text style={styles.premiumInfoText}>"Tek rakibim kendim" diyenler için tek başına soru çözebilme imkanı</Text>
                                        </View>
                                    </View>
                                    <View style={styles.premiumSwiperView}>
                                        <View style={styles.premiumSwiperImgView}>
                                            <Image source={PREMIUM_BACK} style={styles.premiumImg}/>
                                        </View>
                                        <View style={styles.premiumSwiperHeaderView}>
                                            <Text style={styles.premiumHeaderText}>Çözülmedik soru kalmasın!</Text>
                                        </View>
                                        <View style={styles.premiumSwiperInfoView}>
                                            <Text style={styles.premiumInfoText}>Boş bıraktığın veya yanlış yaptığın soruları tekrar tekrar çözme fırsatı</Text>
                                        </View>
                                    </View>
                                    <View style={styles.premiumSwiperView}>
                                        <View style={styles.premiumSwiperImgView}>
                                            <Image source={PREMIUM_JOKER} style={styles.premiumImg}/>
                                        </View>
                                        <View style={styles.premiumSwiperHeaderView}>
                                            <Text style={styles.premiumHeaderText}>Günlük joker!</Text>
                                        </View>
                                        <View style={styles.premiumSwiperInfoView}>
                                            <Text style={styles.premiumInfoText}>Her gün sana verilen jokerler ile soruların cevabına 1 adım daha yaklaş, rakiplerinin önüne geç</Text>
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
                    <TouchableOpacity style={styles.premiumBottomView}>
                        <Text style={styles.inviteText}>Arkadaşını davet et</Text>
                        <Text style={styles.earnPremiumWithInviteText}>1 Haftalık Elit Öğrenci Paketi Kazan!</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.socialMediaContainer}>
                    <View style={styles.socialMediaView}>
                        <View style={styles.socialMediaLogosView}>
                            <TouchableOpacity onPress={() => Linking.openURL(instagram_page)} style={styles.socialMediaLogoCircle}>
                                <Image source={INSTAGRAM_LOGO} style={styles.socialMediaLogo}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.socialMediaLogosView}>
                            <TouchableOpacity onPress={() => Linking.openURL(twitter_page)} style={styles.socialMediaLogoCircle}>
                                <Image source={TWITTER_LOGO} style={styles.socialMediaLogo}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.socialMediaLogosView}>
                            <TouchableOpacity onPress={() => Linking.openURL(facebook_page)} style={styles.socialMediaLogoCircle}>
                                <Image source={FACEBOOK_LOGO} style={styles.socialMediaLogo}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.socialMediaInfoView}>
                            <Text style={styles.socialMediaInfoText}>Sosyal medya hesaplarımızı takip ederek ödülleri ve en güncel haberleri kaçırma!</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.yourPremiumAndJokersContainer}>
                    <View style={styles.yourPremiumContainer}>
                        <View style={styles.yourPremiumTextView}>
                            <Text style={styles.yourPremiumText}>Elit Öğrenci Paketi</Text>
                            <Text style={styles.yourPremiumText}>Kalan Süre</Text>
                        </View>
                        <View style={styles.yourPremiumCounterView}>
                            <Text style={styles.yourPremiumCounterText}>
                                <Text style={styles.yourPremiumCounterNumbersText}>{this.state.remainingPremiumMonths}</Text> Ay
                                <Text style={styles.yourPremiumCounterNumbersText}> {this.state.remainingPremiumWeeks}</Text> Hafta
                                <Text style={styles.yourPremiumCounterNumbersText}> {this.state.remainingPremiumDays}</Text> Gün
                            </Text>
                        </View>
                    </View>
                    <View style={styles.yourJokersContainer}>
                        <View style={styles.jokerContainer}>
                            <View style={styles.jokerImageContainer}>
                                <View style={styles.jokerImageView}>
                                    <View style={[styles.jokerCounterView, { width: ((''+this.state.firstJoker.amount).length) < 3 ? hp(4) : hp(5.5)}]}>
                                        <Text style={styles.jokerCounterText}>{this.state.firstJoker.amount}</Text>
                                    </View>
                                    <Image source={{ uri: this.state.firstJoker.joker.imageLink }} style={styles.jokerImg}/>
                                </View>
                            </View>
                            <View style={styles.jokerNameContainer}>
                                <Text style={styles.jokerNameText}>{this.state.firstJoker.joker.name}</Text>
                            </View>
                        </View>
                        <View style={styles.jokerContainer}>
                            <View style={styles.jokerImageContainer}>
                                <View style={styles.jokerImageView}>
                                    <View style={[styles.jokerCounterView, { width: ((''+this.state.secondJoker.amount).length) < 3 ? hp(4) : hp(5.5)}]}>
                                        <Text style={styles.jokerCounterText}>{this.state.secondJoker.amount}</Text>
                                    </View>
                                    <Image source={{ uri: this.state.secondJoker.joker.imageLink }} style={styles.jokerImg}/>
                                </View>
                            </View>
                            <View style={styles.jokerNameContainer}>
                                <Text style={styles.jokerNameText}>{this.state.secondJoker.joker.name}</Text>
                            </View>
                        </View>
                        <View style={styles.jokerContainer}>
                            <View style={styles.jokerImageContainer}>
                                <View style={styles.jokerImageView}>
                                    <View style={[styles.jokerCounterView, { width: ((''+this.state.thirdJoker.amount).length) < 3 ? hp(4) : hp(5.5)}]}>
                                        <Text style={styles.jokerCounterText}>{this.state.thirdJoker.amount}</Text>
                                    </View>
                                    <Image source={{ uri: this.state.thirdJoker.joker.imageLink }} style={styles.jokerImg}/>
                                </View>
                            </View>
                            <View style={styles.jokerNameContainer}>
                                <Text style={styles.jokerNameText}>{this.state.thirdJoker.joker.name}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
const mapStateToProps = state => ({
    userJokers: state.client.userJokers,
    clientInformation: state.client.clientInformation
})
const mapDispatchToProps = dispatch => ({
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PurchaseScreen)