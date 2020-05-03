import React from 'react'
import {
    Image,
    Linking,
    Modal,
    Text,
    TouchableOpacity,
    View,
    Platform,
    TextInput,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    ActivityIndicator,
    Clipboard
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Swiper from 'react-native-swiper'
import { connect } from 'react-redux'
import moment from 'moment'
import RNIap from 'react-native-iap'
import styles from './style'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

import INSTAGRAM_LOGO from '../../../assets/instagram_logo.png'
import TWITTER_LOGO from '../../../assets/twitter_logo.png'
import FACEBOOK_LOGO from '../../../assets/facebook_logo.png'

import PREMIUM_ADS from '../../../assets/premiumAds.png'
import PREMIUM_FAV from '../../../assets/favori.png'
import PREMIUM_JOKER from '../../../assets/premiumJoker.png'
import PREMIUM_BACK from '../../../assets/premiumBack.png'
import PREMIUM_MAP from '../../../assets/premiumMap.png'
import PREMIUM_SINGLE_MODE from '../../../assets/premiumSingleMode.png'
import PREMIUM_VIDEO from '../../../assets/premiumVideo.png'
import PREMIUM_SOLVING from '../../../assets/premiumSolvingImg.png'

import SEE_OPPONENT_JOKER_IMAGE from '../../../assets/jokers/seeOpponent.png'
import REMOVE_OPTIONS_JOKER_IMAGE from '../../../assets/jokers/removeOptions.png'
import SECOND_CHANGE_JOKER_IMAGE from '../../../assets/jokers/secondChance.png'
//import { rewardAd } from '../../../services/admobService'
import firebase from 'react-native-firebase'
import { inviteCodeServices } from '../../../sagas/inviteCode'

import COPY_IMAGE from '../../../assets/mainScreens/copy.png'

import NEW_PLAY_AD from '../../../assets/mainScreens/newPlayAd.png'

import {
    navigationPush,
    SCENE_KEYS,
    navigationReset
} from '../../../services/navigationService'

const instagram_page = 'https://www.instagram.com/sinavia.app/'
const twitter_page = 'https://twitter.com/sinavia'
const facebook_page = 'https://www.facebook.com/sinaviaapp'

const itemSkus = Platform.select({
    ios: ['10_jokers_each'],
    android: []
})

class PurchaseScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isPremiumModalVisible: false,
            isPromotionCodeModalVisible: false,
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
            remainingPremiumMonths: null,
            remainingExamDays: null,
            remainingExamWeeks: null,
            remainingExamMonths: null,
            // Available products for in-app purchase
            availableProducts: null,
            friendCode: 'PAROLA',
            usePromotionCode: '',
            remaningInviteCodes: 0,
            isActivityIndicatorOn: false
        }
    }

    async componentDidMount() {
        this.props.userJokers.forEach(userJoker => {
            switch (userJoker.jokerId) {
                case 1:
                    userJoker.joker.imageLink = SEE_OPPONENT_JOKER_IMAGE
                    this.setState({ firstJoker: userJoker })
                    break
                case 2:
                    userJoker.joker.imageLink = REMOVE_OPTIONS_JOKER_IMAGE
                    this.setState({ secondJoker: userJoker })
                    break
                case 3:
                    userJoker.joker.imageLink = SECOND_CHANGE_JOKER_IMAGE
                    this.setState({ thirdJoker: userJoker })
                    break
            }
        })

        inviteCodeServices
            .getInviteCode(this.props.clientToken, this.props.clientDBId)
            .then(data => {
                if (data.remainingCodes !== 0)
                    this.setState({
                        remaningInviteCodes: data.remainingCodes,
                        friendCode: data.code
                    })
                else
                    this.setState({
                        remaningInviteCodes: data.remainingCodes,
                        friendCode: 'BİTTİ'
                    })
            })
            .catch(error => {
                console.log(error)
            })

        this.calculateDateUntilPremiumEnd()
        this.calculateRemainingExamTime()
        await this.getProducts()
    }

    getProducts = async () => {
        try {
            const products = await RNIap.getProducts(itemSkus)
            this.setState({ availableProducts: products })
            console.log(products)
        } catch (err) {
            console.warn(err)
        }
    }

    calculateDateUntilPremiumEnd = () => {
        if (!this.props.clientInformation.isPremium) {
            this.setState({
                remainingPremiumDays: 0,
                remainingPremiumWeeks: 0,
                remainingPremiumMonths: 0
            })
            return
        }

        const dateToday = moment()
        const endDate = moment(this.props.clientInformation.premiumEndDate)
        const remainingPremiumMonths = endDate.diff(dateToday, 'months')
        let remainingPremiumWeeks = 0
        let remainingPremiumDays = endDate.diff(dateToday, 'days')
        let daysToSubtract = 0

        if (remainingPremiumMonths !== 0) {
            let tempDate = moment()
            let daysInMonth = tempDate.daysInMonth()
            for (let i = 1; i < remainingPremiumMonths + 1; i++) {
                daysToSubtract += daysInMonth
                tempDate = moment().add(i, 'months')
                daysInMonth = tempDate.daysInMonth()
            }
        }
        remainingPremiumDays -= daysToSubtract
        if (remainingPremiumDays >= 7) {
            remainingPremiumWeeks = Math.floor(remainingPremiumDays / 7)
            remainingPremiumDays -= remainingPremiumWeeks * 7
        }

        this.setState({
            remainingPremiumDays: remainingPremiumDays,
            remainingPremiumWeeks: remainingPremiumWeeks,
            remainingPremiumMonths: remainingPremiumMonths
        })
    }

    calculateRemainingExamTime = () => {
        let examIndex = this.props.gameContentMap.exams.findIndex(
            x => x.name === this.props.choosenExam
        )
        let examDate = this.props.gameContentMap.exams[examIndex].examDate

        const dateToday = moment()
        const endDate = moment(examDate)
        const remainingExamMonths = endDate.diff(dateToday, 'months')
        let remainingExamWeeks = 0
        let remainingExamDays = endDate.diff(dateToday, 'days')
        let daysToSubtract = 0

        if (remainingExamMonths !== 0) {
            let tempDate = moment()
            let daysInMonth = tempDate.daysInMonth()
            for (let i = 1; i < remainingExamMonths + 1; i++) {
                daysToSubtract += daysInMonth
                tempDate = moment().add(i, 'months')
                daysInMonth = tempDate.daysInMonth()
            }
        }
        remainingExamDays -= daysToSubtract
        if (remainingExamDays >= 7) {
            remainingExamWeeks = Math.floor(remainingExamDays / 7)
            remainingExamDays -= remainingExamWeeks * 7
        }

        this.setState({
            remainingExamDays: remainingExamDays,
            remainingExamWeeks: remainingExamWeeks,
            remainingExamMonths: remainingExamMonths
        })
    }

    onPressPromotionCodeView = () => {
        this.setState({
            isPromotionCodeModalVisible: true
        })
    }

    closesPromotionCodeView = () => {
        this.setState({
            isPromotionCodeModalVisible: false
        })
    }

    onPressPremiumView = () => {
        this.setState({
            isPremiumModalVisible: true
        })
    }

    closePremiumView = () => {
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

    rewardAd = jokerNumber => {
        let isAdWatched = false
        const advert = firebase
            .admob()
            .rewarded('ca-app-pub-3940256099942544/1712485313')

        const AdRequest = firebase.admob.AdRequest
        const request = new AdRequest()
        advert.loadAd(request.build())

        advert.on('onAdLoaded', () => {
            this.setState({ isActivityIndicatorOn: false }, () => {
                advert.show()
            })
        })

        advert.on('onRewarded', event => {
            isAdWatched = true
            this.refreshJokerOnReward(jokerNumber)
        })

        advert.on('onAdFailedToLoad', event => {
            this.setState({ isActivityIndicatorOn: false })
        })

        advert.on('onAdClosed', event => {
            if (!isAdWatched) navigationReset('main')
        })
    }

    jokerRewardOnPress = jokerNumber => {
        this.setState({ isActivityIndicatorOn: true })
        this.rewardAd(jokerNumber)
    }

    refreshJokerOnReward = jokerNumber => {
        navigationPush(SCENE_KEYS.mainScreens.jokerReward, {
            jokerNumber: jokerNumber
        })
    }

    resetToMain = () => {
        navigationReset('main')
    }

    writeToClipboard = async () => {
        await Clipboard.setString(this.state.friendCode)
    }

    render() {
        if (this.state.isActivityIndicatorOn) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss()
                }}
            >
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={'position'}
                >
                    <View style={{ alignItems: 'center' }}>
                        <Modal
                            visible={this.state.isPremiumModalVisible}
                            transparent={true}
                            animationType={'fade'}
                        >
                            <View style={styles.premiumModal}>
                                <TouchableOpacity
                                    onPress={this.closePremiumView}
                                    style={{ height: hp(120), width: wp(100) }}
                                />
                                <View style={styles.premiumModalView}>
                                    <LinearGradient
                                        colors={['white', '#FFE6BB', '#FFA800']}
                                        style={
                                            styles.linearGradientPremiumModalView
                                        }
                                    >
                                        <View
                                            style={
                                                styles.premiumModalHeaderView
                                            }
                                        >
                                            <Text
                                                style={
                                                    styles.premiumModalHeaderText
                                                }
                                            >
                                                ELİT ÖĞRENCİ PAKETİ
                                            </Text>
                                        </View>
                                        <View
                                            style={
                                                styles.premiumModalSwiperContainer
                                            }
                                        >
                                            <Swiper
                                                autoplay={true}
                                                loop={true}
                                                loadMinimal={false}
                                                showsPagination={false}
                                                scrollEnabled={false}
                                                autoplayTimeout={5}
                                            >
                                                <View
                                                    style={
                                                        styles.premiumModalSwiperView
                                                    }
                                                >
                                                    <View
                                                        style={
                                                            styles.premiumModalSwiperImgView
                                                        }
                                                    >
                                                        <Image
                                                            source={PREMIUM_ADS}
                                                            style={
                                                                styles.premiumModalImg
                                                            }
                                                        />
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumModalSwiperHeaderView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.premiumModalHeaderText
                                                            }
                                                        >
                                                            Reklam Yok!
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumModalSwiperInfoView
                                                        }
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.premiumModalInfoText,
                                                                {
                                                                    marginBottom: hp(
                                                                        0.5
                                                                    )
                                                                }
                                                            ]}
                                                        >
                                                            Reklamsız oyun
                                                            oynamanın keyfini
                                                            sen de çıkar
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View
                                                    style={
                                                        styles.premiumModalSwiperView
                                                    }
                                                >
                                                    <View
                                                        style={
                                                            styles.premiumModalSwiperImgView
                                                        }
                                                    >
                                                        <Image
                                                            source={PREMIUM_FAV}
                                                            style={
                                                                styles.premiumModalImg
                                                            }
                                                        />
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumModalSwiperHeaderView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.premiumModalHeaderText
                                                            }
                                                        >
                                                            Soru favorile!
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumModalSwiperInfoView
                                                        }
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.premiumModalInfoText,
                                                                {
                                                                    marginBottom: hp(
                                                                        0.5
                                                                    )
                                                                }
                                                            ]}
                                                        >
                                                            Hoşuna giden ya da
                                                            sonra tekrar bakmak
                                                            istediğin soruları
                                                            favorile
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View
                                                    style={
                                                        styles.premiumModalSwiperView
                                                    }
                                                >
                                                    <View
                                                        style={
                                                            styles.premiumModalSwiperImgView
                                                        }
                                                    >
                                                        <Image
                                                            source={
                                                                PREMIUM_VIDEO
                                                            }
                                                            style={
                                                                styles.premiumModalImg
                                                            }
                                                        />
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumModalSwiperHeaderView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.premiumModalHeaderText
                                                            }
                                                        >
                                                            Soru çözüm videoları
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumModalSwiperInfoView
                                                        }
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.premiumModalInfoText,
                                                                {
                                                                    marginBottom: hp(
                                                                        0.5
                                                                    )
                                                                }
                                                            ]}
                                                        >
                                                            Yapamadığın
                                                            soruların
                                                            çözümlerini
                                                            izleyerek anlamanı
                                                            pekiştir
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View
                                                    style={
                                                        styles.premiumModalSwiperView
                                                    }
                                                >
                                                    <View
                                                        style={
                                                            styles.premiumModalSwiperImgView
                                                        }
                                                    >
                                                        <Image
                                                            source={
                                                                PREMIUM_SOLVING
                                                            }
                                                            style={
                                                                styles.premiumModalImg
                                                            }
                                                        />
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumModalSwiperHeaderView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.premiumModalHeaderText
                                                            }
                                                        >
                                                            Doğru çözümlere bak
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumModalSwiperInfoView
                                                        }
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.premiumModalInfoText,
                                                                {
                                                                    marginBottom: hp(
                                                                        0.5
                                                                    )
                                                                }
                                                            ]}
                                                        >
                                                            Soruların çözüm
                                                            yöntemlerine bakarak
                                                            kavrayabilirsin
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View
                                                    style={
                                                        styles.premiumModalSwiperView
                                                    }
                                                >
                                                    <View
                                                        style={
                                                            styles.premiumModalSwiperImgView
                                                        }
                                                    >
                                                        <Image
                                                            source={
                                                                PREMIUM_SINGLE_MODE
                                                            }
                                                            style={
                                                                styles.premiumModalImg
                                                            }
                                                        />
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumModalSwiperHeaderView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.premiumModalHeaderText
                                                            }
                                                        >
                                                            Tek başına!
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumModalSwiperInfoView
                                                        }
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.premiumModalInfoText,
                                                                {
                                                                    marginBottom: hp(
                                                                        0.5
                                                                    )
                                                                }
                                                            ]}
                                                        >
                                                            "Tek rakibim kendim"
                                                            diyenler için tek
                                                            başına soru
                                                            çözebilme imkanı
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View
                                                    style={
                                                        styles.premiumModalSwiperView
                                                    }
                                                >
                                                    <View
                                                        style={
                                                            styles.premiumModalSwiperImgView
                                                        }
                                                    >
                                                        <Image
                                                            source={
                                                                PREMIUM_BACK
                                                            }
                                                            style={
                                                                styles.premiumModalImg
                                                            }
                                                        />
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumModalSwiperHeaderView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.premiumModalHeaderText
                                                            }
                                                        >
                                                            Çözülmedik soru
                                                            kalmasın!
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumModalSwiperInfoView
                                                        }
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.premiumModalInfoText,
                                                                {
                                                                    marginBottom: hp(
                                                                        0.5
                                                                    )
                                                                }
                                                            ]}
                                                        >
                                                            Boş bıraktığın veya
                                                            yanlış yaptığın
                                                            soruları tekrar
                                                            tekrar çözme fırsatı
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View
                                                    style={
                                                        styles.premiumModalSwiperView
                                                    }
                                                >
                                                    <View
                                                        style={
                                                            styles.premiumModalSwiperImgView
                                                        }
                                                    >
                                                        <Image
                                                            source={
                                                                PREMIUM_JOKER
                                                            }
                                                            style={
                                                                styles.premiumModalImg
                                                            }
                                                        />
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumModalSwiperHeaderView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.premiumModalHeaderText
                                                            }
                                                        >
                                                            Günlük joker!
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumModalSwiperInfoView
                                                        }
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.premiumModalInfoText,
                                                                {
                                                                    marginBottom: hp(
                                                                        0.5
                                                                    )
                                                                }
                                                            ]}
                                                        >
                                                            Her gün verilen
                                                            jokerlerle soruların
                                                            cevabına 1 adım daha
                                                            yaklaş, rakiplerinin
                                                            önüne geç
                                                        </Text>
                                                    </View>
                                                </View>
                                            </Swiper>
                                        </View>
                                        <View style={styles.premiumOptionsView}>
                                            <TouchableOpacity
                                                onPress={this.oneMonthOnPress}
                                                style={styles.premiumOptionView}
                                            >
                                                <View
                                                    style={[
                                                        styles.premiumOptionUpperView,
                                                        {
                                                            backgroundColor:
                                                                this.state
                                                                    .premiumOption ===
                                                                'oneMonth'
                                                                    ? 'white'
                                                                    : 'rgba(0, 0, 0, 0)'
                                                        }
                                                    ]}
                                                >
                                                    <Text
                                                        style={
                                                            this.state
                                                                .premiumOption ===
                                                            'oneMonth'
                                                                ? styles.selectedPremiumOptionHeaderText
                                                                : styles.unselectedPremiumOptionHeaderText
                                                        }
                                                    >
                                                        BAŞLANGIÇ
                                                    </Text>
                                                </View>
                                                <View
                                                    style={[
                                                        styles.premiumOptionBottomView,
                                                        {
                                                            borderColor:
                                                                this.state
                                                                    .premiumOption ===
                                                                'oneMonth'
                                                                    ? 'white'
                                                                    : 'rgba(0, 0, 0, 0)'
                                                        }
                                                    ]}
                                                >
                                                    <View
                                                        style={
                                                            styles.premiumOptionMonthsView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                this.state
                                                                    .premiumOption ===
                                                                'oneMonth'
                                                                    ? styles.selectedMonthNumberText
                                                                    : styles.unselectedMonthNumberText
                                                            }
                                                        >
                                                            1
                                                        </Text>
                                                        <Text
                                                            style={
                                                                this.state
                                                                    .premiumOption ===
                                                                'oneMonth'
                                                                    ? styles.selectedMonthText
                                                                    : styles.unselectedMonthText
                                                            }
                                                        >
                                                            ay
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumOptionPriceAmountView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                this.state
                                                                    .premiumOption ===
                                                                'oneMonth'
                                                                    ? styles.selectedPricePerMonthText
                                                                    : styles.unselectedPricePerMonthText
                                                            }
                                                        >
                                                            5,99 TL/ay
                                                        </Text>
                                                        <Text
                                                            style={
                                                                this.state
                                                                    .premiumOption ===
                                                                'oneMonth'
                                                                    ? styles.selectedPriceAmountText
                                                                    : styles.unselectedPriceAmountText
                                                            }
                                                        >
                                                            5,99 TL
                                                        </Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={
                                                    this.threeMonthsOnPress
                                                }
                                                style={styles.premiumOptionView}
                                            >
                                                <View
                                                    style={[
                                                        styles.premiumOptionUpperView,
                                                        {
                                                            backgroundColor:
                                                                this.state
                                                                    .premiumOption ===
                                                                'threeMonths'
                                                                    ? 'white'
                                                                    : 'rgba(0, 0, 0, 0)'
                                                        }
                                                    ]}
                                                >
                                                    <Text
                                                        style={
                                                            this.state
                                                                .premiumOption ===
                                                            'threeMonths'
                                                                ? styles.selectedPremiumOptionHeaderText
                                                                : styles.unselectedPremiumOptionHeaderText
                                                        }
                                                    >
                                                        EN POPÜLER
                                                    </Text>
                                                </View>
                                                <View
                                                    style={[
                                                        styles.premiumOptionBottomView,
                                                        {
                                                            borderColor:
                                                                this.state
                                                                    .premiumOption ===
                                                                'threeMonths'
                                                                    ? 'white'
                                                                    : 'rgba(0, 0, 0, 0)'
                                                        }
                                                    ]}
                                                >
                                                    <View
                                                        style={
                                                            styles.premiumOptionMonthsView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                this.state
                                                                    .premiumOption ===
                                                                'threeMonths'
                                                                    ? styles.selectedMonthNumberText
                                                                    : styles.unselectedMonthNumberText
                                                            }
                                                        >
                                                            3
                                                        </Text>
                                                        <Text
                                                            style={
                                                                this.state
                                                                    .premiumOption ===
                                                                'threeMonths'
                                                                    ? styles.selectedMonthText
                                                                    : styles.unselectedMonthText
                                                            }
                                                        >
                                                            ay
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumOptionPriceAmountView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                this.state
                                                                    .premiumOption ===
                                                                'threeMonths'
                                                                    ? styles.selectedPricePerMonthText
                                                                    : styles.unselectedPricePerMonthText
                                                            }
                                                        >
                                                            4,99 TL/ay
                                                        </Text>
                                                        <Text
                                                            style={
                                                                this.state
                                                                    .premiumOption ===
                                                                'threeMonths'
                                                                    ? styles.selectedPriceAmountText
                                                                    : styles.unselectedPriceAmountText
                                                            }
                                                        >
                                                            14,99 TL
                                                        </Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={this.sixMonthsOnPress}
                                                style={styles.premiumOptionView}
                                            >
                                                <View
                                                    style={[
                                                        styles.premiumOptionUpperView,
                                                        {
                                                            backgroundColor:
                                                                this.state
                                                                    .premiumOption ===
                                                                'sixMonths'
                                                                    ? 'white'
                                                                    : 'rgba(0, 0, 0, 0)'
                                                        }
                                                    ]}
                                                >
                                                    <Text
                                                        style={
                                                            this.state
                                                                .premiumOption ===
                                                            'sixMonths'
                                                                ? styles.selectedPremiumOptionHeaderText
                                                                : styles.unselectedPremiumOptionHeaderText
                                                        }
                                                    >
                                                        EN AVANTAJLI
                                                    </Text>
                                                </View>
                                                <View
                                                    style={[
                                                        styles.premiumOptionBottomView,
                                                        {
                                                            borderColor:
                                                                this.state
                                                                    .premiumOption ===
                                                                'sixMonths'
                                                                    ? 'white'
                                                                    : 'rgba(0, 0, 0, 0)'
                                                        }
                                                    ]}
                                                >
                                                    <View
                                                        style={
                                                            styles.premiumOptionMonthsView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                this.state
                                                                    .premiumOption ===
                                                                'sixMonths'
                                                                    ? styles.selectedMonthNumberText
                                                                    : styles.unselectedMonthNumberText
                                                            }
                                                        >
                                                            6
                                                        </Text>
                                                        <Text
                                                            style={
                                                                this.state
                                                                    .premiumOption ===
                                                                'sixMonths'
                                                                    ? styles.selectedMonthText
                                                                    : styles.unselectedMonthText
                                                            }
                                                        >
                                                            ay
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumOptionPriceAmountView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                this.state
                                                                    .premiumOption ===
                                                                'sixMonths'
                                                                    ? styles.selectedPricePerMonthText
                                                                    : styles.unselectedPricePerMonthText
                                                            }
                                                        >
                                                            2,99 TL/ay
                                                        </Text>
                                                        <Text
                                                            style={
                                                                this.state
                                                                    .premiumOption ===
                                                                'sixMonths'
                                                                    ? styles.selectedPriceAmountText
                                                                    : styles.unselectedPriceAmountText
                                                            }
                                                        >
                                                            17,99 TL
                                                        </Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View
                                            style={
                                                styles.buttonsInPremiumModalView
                                            }
                                        >
                                            <TouchableOpacity
                                                style={
                                                    styles.purchasePremiumButton
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.purchasePremiumButtonText
                                                    }
                                                >
                                                    HEMEN SATIN AL
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.closePremiumView()
                                                }}
                                            >
                                                <Text
                                                    style={
                                                        styles.purchasePremiumCancelText
                                                    }
                                                >
                                                    HAYIR, TEŞEKKÜRLER
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </LinearGradient>
                                </View>
                            </View>
                        </Modal>
                        <Modal
                            visible={this.state.isPromotionCodeModalVisible}
                            transparent={true}
                            animationType={'fade'}
                        >
                            <View style={styles.premiumModal}>
                                <TouchableOpacity
                                    onPress={this.closesPromotionCodeView}
                                    style={{ height: hp(120), width: wp(100) }}
                                />
                                <View style={styles.premiumModalView}>
                                    <LinearGradient
                                        colors={['white', '#FFE6BB', '#FFA800']}
                                        style={
                                            styles.linearGradientPremiumModalView
                                        }
                                    >
                                        <View style={styles.inviteFriendView}>
                                            <View
                                                style={
                                                    styles.inviteFriendInfoView
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.promotionCodeInfoText
                                                    }
                                                >
                                                    1 - Sınavia'ya üye olmayan
                                                    bir arkadaşına aşağıdaki
                                                    kodu gönder
                                                </Text>
                                                <Text
                                                    style={
                                                        styles.promotionCodeInfoText
                                                    }
                                                >
                                                    2 - Arkadaşın uygulamaya
                                                    kayıtlanırken bu kodu
                                                    kullansın
                                                </Text>
                                                <Text
                                                    style={
                                                        styles.promotionCodeInfoText
                                                    }
                                                >
                                                    3 - 1 haftalık{' '}
                                                    <Text
                                                        onPress={() => {
                                                            this.setState(
                                                                {
                                                                    isPromotionCodeModalVisible: false
                                                                },
                                                                () =>
                                                                    this.onPressPremiumView()
                                                            )
                                                        }}
                                                        style={{
                                                            color: 'black',
                                                            fontFamily:
                                                                'Averta-ExtraBold',
                                                            textDecorationLine:
                                                                'underline'
                                                        }}
                                                    >
                                                        ELİT ÖĞRENCİ PAKETİ
                                                    </Text>{' '}
                                                    kazan!
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.inviteFriendBox}
                                            >
                                                {this.state
                                                    .remaningInviteCodes !==
                                                    0 && (
                                                    <View
                                                        style={{
                                                            height: hp(10),
                                                            width: wp(20),
                                                            right: wp(2),
                                                            bottom: hp(1),
                                                            position:
                                                                'absolute',
                                                            justifyContent:
                                                                'flex-end',
                                                            alignItems:
                                                                'flex-end'
                                                        }}
                                                    >
                                                        <TouchableOpacity
                                                            onPress={
                                                                this
                                                                    .writeToClipboard
                                                            }
                                                        >
                                                            <Image
                                                                source={
                                                                    COPY_IMAGE
                                                                }
                                                                style={
                                                                    styles.copyImage
                                                                }
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                )}
                                                <Text
                                                    style={styles.promotionCode}
                                                    selectable={true}
                                                >
                                                    {this.state.friendCode}
                                                </Text>
                                            </View>
                                            <View
                                                style={
                                                    styles.inviteFriendKeyAmountsView
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.inviteFriendKeyAmounts
                                                    }
                                                >
                                                    {
                                                        this.state
                                                            .remaningInviteCodes
                                                    }{' '}
                                                    adet hakkın kaldı
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.usePromotionButton}
                                            onPress={() => {
                                                this.setState(
                                                    {
                                                        isPromotionCodeModalVisible: false
                                                    },
                                                    () =>
                                                        this.onPressPremiumView()
                                                )
                                            }}
                                        >
                                            <Text
                                                style={
                                                    styles.purchasePremiumButtonText
                                                }
                                            >
                                                ELİT ÖĞRENCİ PAKETİ
                                            </Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </View>
                            </View>
                        </Modal>
                        <View style={styles.bundlesContainer}>
                            <View style={styles.bundlesView}>
                                <Swiper
                                    loop={false}
                                    paginationStyle={{ bottom: hp(0.25) }}
                                    activeDot={
                                        <View
                                            style={{
                                                height: hp(1.5),
                                                width: hp(1.5),
                                                backgroundColor: '#00D9EF',
                                                borderRadius: hp(100),
                                                marginLeft: wp(1),
                                                marginRight: wp(1)
                                            }}
                                        />
                                    }
                                    dot={
                                        <View
                                            style={{
                                                height: hp(1.5),
                                                width: hp(1.5),
                                                backgroundColor:
                                                    'rgba(0,0,0,.2)',
                                                borderRadius: hp(100),
                                                marginLeft: wp(1),
                                                marginRight: wp(1)
                                            }}
                                        />
                                    }
                                >
                                    <View style={styles.swiperView}>
                                        <TouchableOpacity
                                            style={styles.bundleView}
                                        >
                                            <View
                                                style={
                                                    styles.totalJokerAmountView
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.jokerAmountsText
                                                    }
                                                >
                                                    30 Joker
                                                </Text>
                                            </View>
                                            <View style={styles.jokersView}>
                                                <View style={styles.jokerView}>
                                                    <Image
                                                        source={
                                                            this.state
                                                                .firstJoker
                                                                .joker.imageLink
                                                        }
                                                        style={styles.jokerImg}
                                                    />
                                                    <Text
                                                        style={
                                                            styles.jokerAmountText
                                                        }
                                                    >
                                                        x10
                                                    </Text>
                                                </View>
                                                <View style={styles.jokerView}>
                                                    <Image
                                                        source={
                                                            this.state
                                                                .secondJoker
                                                                .joker.imageLink
                                                        }
                                                        style={styles.jokerImg}
                                                    />
                                                    <Text
                                                        style={
                                                            styles.jokerAmountText
                                                        }
                                                    >
                                                        x10
                                                    </Text>
                                                </View>
                                                <View style={styles.jokerView}>
                                                    <Image
                                                        source={
                                                            this.state
                                                                .thirdJoker
                                                                .joker.imageLink
                                                        }
                                                        style={styles.jokerImg}
                                                    />
                                                    <Text
                                                        style={
                                                            styles.jokerAmountText
                                                        }
                                                    >
                                                        x10
                                                    </Text>
                                                </View>
                                            </View>
                                            <View
                                                style={styles.jokerPricesView}
                                            >
                                                <Text
                                                    style={
                                                        styles.normalPriceText
                                                    }
                                                >
                                                    9 ₺ yerine
                                                </Text>
                                            </View>
                                            <View
                                                style={
                                                    styles.purchaseJokerButtonView
                                                }
                                            >
                                                <TouchableOpacity
                                                    style={
                                                        styles.purchaseJokerButton
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.discountPriceText
                                                        }
                                                    >
                                                        6 ₺
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={styles.bundleDivider} />
                                        <TouchableOpacity
                                            style={styles.bundleView}
                                        >
                                            <View
                                                style={
                                                    styles.totalJokerAmountView
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.jokerAmountsText
                                                    }
                                                >
                                                    90 Joker
                                                </Text>
                                            </View>
                                            <View style={styles.jokersView}>
                                                <View style={styles.jokerView}>
                                                    <Image
                                                        source={
                                                            this.state
                                                                .firstJoker
                                                                .joker.imageLink
                                                        }
                                                        style={styles.jokerImg}
                                                    />
                                                    <Text
                                                        style={
                                                            styles.jokerAmountText
                                                        }
                                                    >
                                                        x30
                                                    </Text>
                                                </View>
                                                <View style={styles.jokerView}>
                                                    <Image
                                                        source={
                                                            this.state
                                                                .secondJoker
                                                                .joker.imageLink
                                                        }
                                                        style={styles.jokerImg}
                                                    />
                                                    <Text
                                                        style={
                                                            styles.jokerAmountText
                                                        }
                                                    >
                                                        x30
                                                    </Text>
                                                </View>
                                                <View style={styles.jokerView}>
                                                    <Image
                                                        source={
                                                            this.state
                                                                .thirdJoker
                                                                .joker.imageLink
                                                        }
                                                        style={styles.jokerImg}
                                                    />
                                                    <Text
                                                        style={
                                                            styles.jokerAmountText
                                                        }
                                                    >
                                                        x30
                                                    </Text>
                                                </View>
                                            </View>
                                            <View
                                                style={styles.jokerPricesView}
                                            >
                                                <Text
                                                    style={
                                                        styles.normalPriceText
                                                    }
                                                >
                                                    27 ₺ yerine
                                                </Text>
                                            </View>
                                            <View
                                                style={
                                                    styles.purchaseJokerButtonView
                                                }
                                            >
                                                <TouchableOpacity
                                                    style={
                                                        styles.purchaseJokerButton
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.discountPriceText
                                                        }
                                                    >
                                                        15 ₺
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={styles.bundleDivider} />
                                        <TouchableOpacity
                                            style={styles.bundleView}
                                        >
                                            <View
                                                style={
                                                    styles.totalJokerAmountView
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.jokerAmountsText
                                                    }
                                                >
                                                    180 Joker
                                                </Text>
                                            </View>
                                            <View style={styles.jokersView}>
                                                <View style={styles.jokerView}>
                                                    <Image
                                                        source={
                                                            this.state
                                                                .firstJoker
                                                                .joker.imageLink
                                                        }
                                                        style={styles.jokerImg}
                                                    />
                                                    <Text
                                                        style={
                                                            styles.jokerAmountText
                                                        }
                                                    >
                                                        x60
                                                    </Text>
                                                </View>
                                                <View style={styles.jokerView}>
                                                    <Image
                                                        source={
                                                            this.state
                                                                .secondJoker
                                                                .joker.imageLink
                                                        }
                                                        style={styles.jokerImg}
                                                    />
                                                    <Text
                                                        style={
                                                            styles.jokerAmountText
                                                        }
                                                    >
                                                        x60
                                                    </Text>
                                                </View>
                                                <View style={styles.jokerView}>
                                                    <Image
                                                        source={
                                                            this.state
                                                                .thirdJoker
                                                                .joker.imageLink
                                                        }
                                                        style={styles.jokerImg}
                                                    />
                                                    <Text
                                                        style={
                                                            styles.jokerAmountText
                                                        }
                                                    >
                                                        x60
                                                    </Text>
                                                </View>
                                            </View>
                                            <View
                                                style={styles.jokerPricesView}
                                            >
                                                <Text
                                                    style={
                                                        styles.normalPriceText
                                                    }
                                                >
                                                    54 ₺ yerine
                                                </Text>
                                            </View>
                                            <View
                                                style={
                                                    styles.purchaseJokerButtonView
                                                }
                                            >
                                                <TouchableOpacity
                                                    style={
                                                        styles.purchaseJokerButton
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.discountPriceText
                                                        }
                                                    >
                                                        25 ₺
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.swiperView}>
                                        <TouchableOpacity
                                            style={styles.bundleView}
                                        >
                                            <View
                                                style={
                                                    styles.totalJokerAmountView
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.jokerAmountsText
                                                    }
                                                >
                                                    {
                                                        this.state.firstJoker
                                                            .joker.name
                                                    }
                                                </Text>
                                            </View>
                                            <View style={styles.jokersView}>
                                                <Image
                                                    source={
                                                        this.state.firstJoker
                                                            .joker.imageLink
                                                    }
                                                    style={[
                                                        styles.jokerImg,
                                                        {
                                                            height: hp(4),
                                                            width: hp(4)
                                                        }
                                                    ]}
                                                />
                                                <Text
                                                    style={[
                                                        styles.jokerAmountText,
                                                        {
                                                            fontFamily:
                                                                'Averta-Semibold',
                                                            fontSize: hp(3.75),
                                                            color: '#FF9900'
                                                        }
                                                    ]}
                                                >
                                                    x30
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.jokerPricesView}
                                            >
                                                <Text
                                                    style={
                                                        styles.normalPriceText
                                                    }
                                                >
                                                    12 ₺ yerine
                                                </Text>
                                            </View>
                                            <View
                                                style={
                                                    styles.purchaseJokerButtonView
                                                }
                                            >
                                                <TouchableOpacity
                                                    style={
                                                        styles.purchaseJokerButton
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.discountPriceText
                                                        }
                                                    >
                                                        8 ₺
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={styles.bundleDivider} />
                                        <TouchableOpacity
                                            style={styles.bundleView}
                                        >
                                            <View
                                                style={
                                                    styles.totalJokerAmountView
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.jokerAmountsText
                                                    }
                                                >
                                                    {
                                                        this.state.secondJoker
                                                            .joker.name
                                                    }
                                                </Text>
                                            </View>
                                            <View style={styles.jokersView}>
                                                <Image
                                                    source={
                                                        this.state.secondJoker
                                                            .joker.imageLink
                                                    }
                                                    style={[
                                                        styles.jokerImg,
                                                        {
                                                            height: hp(4),
                                                            width: hp(4)
                                                        }
                                                    ]}
                                                />
                                                <Text
                                                    style={[
                                                        styles.jokerAmountText,
                                                        {
                                                            fontFamily:
                                                                'Averta-Semibold',
                                                            fontSize: hp(3.75),
                                                            color: '#FF9900'
                                                        }
                                                    ]}
                                                >
                                                    x30
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.jokerPricesView}
                                            >
                                                <Text
                                                    style={
                                                        styles.normalPriceText
                                                    }
                                                >
                                                    8 ₺ yerine
                                                </Text>
                                            </View>
                                            <View
                                                style={
                                                    styles.purchaseJokerButtonView
                                                }
                                            >
                                                <TouchableOpacity
                                                    style={
                                                        styles.purchaseJokerButton
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.discountPriceText
                                                        }
                                                    >
                                                        5 ₺
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={styles.bundleDivider} />
                                        <TouchableOpacity
                                            style={styles.bundleView}
                                        >
                                            <View
                                                style={
                                                    styles.totalJokerAmountView
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.jokerAmountsText
                                                    }
                                                >
                                                    {
                                                        this.state.thirdJoker
                                                            .joker.name
                                                    }
                                                </Text>
                                            </View>
                                            <View style={styles.jokersView}>
                                                <Image
                                                    source={
                                                        this.state.thirdJoker
                                                            .joker.imageLink
                                                    }
                                                    style={[
                                                        styles.jokerImg,
                                                        {
                                                            height: hp(4),
                                                            width: hp(4)
                                                        }
                                                    ]}
                                                />
                                                <Text
                                                    style={[
                                                        styles.jokerAmountText,
                                                        {
                                                            fontFamily:
                                                                'Averta-Semibold',
                                                            fontSize: hp(3.75),
                                                            color: '#FF9900'
                                                        }
                                                    ]}
                                                >
                                                    x30
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.jokerPricesView}
                                            >
                                                <Text
                                                    style={
                                                        styles.normalPriceText
                                                    }
                                                >
                                                    10 ₺ yerine
                                                </Text>
                                            </View>
                                            <View
                                                style={
                                                    styles.purchaseJokerButtonView
                                                }
                                            >
                                                <TouchableOpacity
                                                    style={
                                                        styles.purchaseJokerButton
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.discountPriceText
                                                        }
                                                    >
                                                        7 ₺
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.swiperView}>
                                        <TouchableOpacity
                                            style={styles.bundleView}
                                        >
                                            <View
                                                style={
                                                    styles.totalJokerAmountView
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.jokerAmountsText
                                                    }
                                                >
                                                    {
                                                        this.state.firstJoker
                                                            .joker.name
                                                    }
                                                </Text>
                                            </View>
                                            <View style={styles.jokersView}>
                                                <Image
                                                    source={
                                                        this.state.firstJoker
                                                            .joker.imageLink
                                                    }
                                                    style={[
                                                        styles.jokerImg,
                                                        {
                                                            height: hp(4),
                                                            width: hp(4)
                                                        }
                                                    ]}
                                                />
                                                <Text
                                                    style={[
                                                        styles.jokerAmountText,
                                                        {
                                                            fontFamily:
                                                                'Averta-Semibold',
                                                            fontSize: hp(3.75),
                                                            color: '#FF9900'
                                                        }
                                                    ]}
                                                >
                                                    x90
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.jokerPricesView}
                                            >
                                                <Text
                                                    style={
                                                        styles.normalPriceText
                                                    }
                                                >
                                                    36 ₺ yerine
                                                </Text>
                                            </View>
                                            <View
                                                style={
                                                    styles.purchaseJokerButtonView
                                                }
                                            >
                                                <TouchableOpacity
                                                    style={
                                                        styles.purchaseJokerButton
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.discountPriceText
                                                        }
                                                    >
                                                        21 ₺
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={styles.bundleDivider} />
                                        <TouchableOpacity
                                            style={styles.bundleView}
                                        >
                                            <View
                                                style={
                                                    styles.totalJokerAmountView
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.jokerAmountsText
                                                    }
                                                >
                                                    {
                                                        this.state.secondJoker
                                                            .joker.name
                                                    }
                                                </Text>
                                            </View>
                                            <View style={styles.jokersView}>
                                                <Image
                                                    source={
                                                        this.state.secondJoker
                                                            .joker.imageLink
                                                    }
                                                    style={[
                                                        styles.jokerImg,
                                                        {
                                                            height: hp(4),
                                                            width: hp(4)
                                                        }
                                                    ]}
                                                />
                                                <Text
                                                    style={[
                                                        styles.jokerAmountText,
                                                        {
                                                            fontFamily:
                                                                'Averta-Semibold',
                                                            fontSize: hp(3.75),
                                                            color: '#FF9900'
                                                        }
                                                    ]}
                                                >
                                                    x90
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.jokerPricesView}
                                            >
                                                <Text
                                                    style={
                                                        styles.normalPriceText
                                                    }
                                                >
                                                    24 ₺ yerine
                                                </Text>
                                            </View>
                                            <View
                                                style={
                                                    styles.purchaseJokerButtonView
                                                }
                                            >
                                                <TouchableOpacity
                                                    style={
                                                        styles.purchaseJokerButton
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.discountPriceText
                                                        }
                                                    >
                                                        14 ₺
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={styles.bundleDivider} />
                                        <TouchableOpacity
                                            style={styles.bundleView}
                                        >
                                            <View
                                                style={
                                                    styles.totalJokerAmountView
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.jokerAmountsText
                                                    }
                                                >
                                                    {
                                                        this.state.thirdJoker
                                                            .joker.name
                                                    }
                                                </Text>
                                            </View>
                                            <View style={styles.jokersView}>
                                                <Image
                                                    source={
                                                        this.state.thirdJoker
                                                            .joker.imageLink
                                                    }
                                                    style={[
                                                        styles.jokerImg,
                                                        {
                                                            height: hp(4),
                                                            width: hp(4)
                                                        }
                                                    ]}
                                                />
                                                <Text
                                                    style={[
                                                        styles.jokerAmountText,
                                                        {
                                                            fontFamily:
                                                                'Averta-Semibold',
                                                            fontSize: hp(3.75),
                                                            color: '#FF9900'
                                                        }
                                                    ]}
                                                >
                                                    x90
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.jokerPricesView}
                                            >
                                                <Text
                                                    style={
                                                        styles.normalPriceText
                                                    }
                                                >
                                                    30 ₺ yerine
                                                </Text>
                                            </View>
                                            <View
                                                style={
                                                    styles.purchaseJokerButtonView
                                                }
                                            >
                                                <TouchableOpacity
                                                    style={
                                                        styles.purchaseJokerButton
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.discountPriceText
                                                        }
                                                    >
                                                        18 ₺
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.swiperView}>
                                        <TouchableOpacity
                                            style={styles.bundleView}
                                        >
                                            <View
                                                style={
                                                    styles.totalJokerAmountView
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.jokerAmountsText
                                                    }
                                                >
                                                    {
                                                        this.state.firstJoker
                                                            .joker.name
                                                    }
                                                </Text>
                                            </View>
                                            <View style={styles.jokersView}>
                                                <Image
                                                    source={
                                                        this.state.firstJoker
                                                            .joker.imageLink
                                                    }
                                                    style={[
                                                        styles.jokerImg,
                                                        {
                                                            height: hp(4),
                                                            width: hp(4)
                                                        }
                                                    ]}
                                                />
                                                <Text
                                                    style={[
                                                        styles.jokerAmountText,
                                                        {
                                                            fontFamily:
                                                                'Averta-Semibold',
                                                            fontSize: hp(3.75),
                                                            color: '#FF9900'
                                                        }
                                                    ]}
                                                >
                                                    x180
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.jokerPricesView}
                                            >
                                                <Text
                                                    style={
                                                        styles.normalPriceText
                                                    }
                                                >
                                                    72 ₺ yerine
                                                </Text>
                                            </View>
                                            <View
                                                style={
                                                    styles.purchaseJokerButtonView
                                                }
                                            >
                                                <TouchableOpacity
                                                    style={
                                                        styles.purchaseJokerButton
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.discountPriceText
                                                        }
                                                    >
                                                        36 ₺
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={styles.bundleDivider} />
                                        <TouchableOpacity
                                            style={styles.bundleView}
                                        >
                                            <View
                                                style={
                                                    styles.totalJokerAmountView
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.jokerAmountsText
                                                    }
                                                >
                                                    {
                                                        this.state.secondJoker
                                                            .joker.name
                                                    }
                                                </Text>
                                            </View>
                                            <View style={styles.jokersView}>
                                                <Image
                                                    source={
                                                        this.state.secondJoker
                                                            .joker.imageLink
                                                    }
                                                    style={[
                                                        styles.jokerImg,
                                                        {
                                                            height: hp(4),
                                                            width: hp(4)
                                                        }
                                                    ]}
                                                />
                                                <Text
                                                    style={[
                                                        styles.jokerAmountText,
                                                        {
                                                            fontFamily:
                                                                'Averta-Semibold',
                                                            fontSize: hp(3.75),
                                                            color: '#FF9900'
                                                        }
                                                    ]}
                                                >
                                                    x180
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.jokerPricesView}
                                            >
                                                <Text
                                                    style={
                                                        styles.normalPriceText
                                                    }
                                                >
                                                    48 ₺ yerine
                                                </Text>
                                            </View>
                                            <View
                                                style={
                                                    styles.purchaseJokerButtonView
                                                }
                                            >
                                                <TouchableOpacity
                                                    style={
                                                        styles.purchaseJokerButton
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.discountPriceText
                                                        }
                                                    >
                                                        27 ₺
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={styles.bundleDivider} />
                                        <TouchableOpacity
                                            style={styles.bundleView}
                                        >
                                            <View
                                                style={
                                                    styles.totalJokerAmountView
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.jokerAmountsText
                                                    }
                                                >
                                                    {
                                                        this.state.thirdJoker
                                                            .joker.name
                                                    }
                                                </Text>
                                            </View>
                                            <View style={styles.jokersView}>
                                                <Image
                                                    source={
                                                        this.state.thirdJoker
                                                            .joker.imageLink
                                                    }
                                                    style={[
                                                        styles.jokerImg,
                                                        {
                                                            height: hp(4),
                                                            width: hp(4)
                                                        }
                                                    ]}
                                                />
                                                <Text
                                                    style={[
                                                        styles.jokerAmountText,
                                                        {
                                                            fontFamily:
                                                                'Averta-Semibold',
                                                            fontSize: hp(3.75),
                                                            color: '#FF9900'
                                                        }
                                                    ]}
                                                >
                                                    x180
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.jokerPricesView}
                                            >
                                                <Text
                                                    style={
                                                        styles.normalPriceText
                                                    }
                                                >
                                                    60 ₺ yerine
                                                </Text>
                                            </View>
                                            <View
                                                style={
                                                    styles.purchaseJokerButtonView
                                                }
                                            >
                                                <TouchableOpacity
                                                    style={
                                                        styles.purchaseJokerButton
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.discountPriceText
                                                        }
                                                    >
                                                        30 ₺
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </Swiper>
                            </View>
                        </View>
                        {this.props.clientInformation.isPremium === false && (
                            <View style={{ flex: 47.5, width: wp(93) }}>
                                <View style={styles.adsContainer}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            this.jokerRewardOnPress(1)
                                        }
                                        style={[
                                            styles.newPremiumUserJokerButtonStyle,
                                            { height: hp(9), width: wp(30) }
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.newPremiumUserJokerButton1Style,
                                                { height: hp(9), width: wp(12) }
                                            ]}
                                        >
                                            <Image
                                                source={
                                                    this.state.firstJoker.joker
                                                        .imageLink
                                                }
                                                style={[
                                                    styles.newJokerPlayAdImg,
                                                    {
                                                        height: hp(3),
                                                        width: hp(3)
                                                    }
                                                ]}
                                            />
                                        </View>
                                        <View
                                            style={[
                                                styles.newPremiumUserJokerButton2Style,
                                                { height: hp(9), width: wp(6) }
                                            ]}
                                        >
                                            <Image
                                                source={NEW_PLAY_AD}
                                                style={[
                                                    styles.newPlayAd,
                                                    {
                                                        height: hp(3),
                                                        width: hp(3)
                                                    }
                                                ]}
                                            />
                                        </View>
                                        <View
                                            style={[
                                                styles.newPremiumUserJokerButton3Style,
                                                { height: hp(9), width: wp(12) }
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.newPlayAdText,
                                                    {
                                                        fontSize: hp(1.5),
                                                        textAlign: 'center'
                                                    }
                                                ]}
                                            >
                                                İzle & Kazan
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() =>
                                            this.jokerRewardOnPress(2)
                                        }
                                        style={[
                                            styles.newPremiumUserJokerButtonStyle,
                                            { height: hp(9), width: wp(30) }
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.newPremiumUserJokerButton1Style,
                                                { height: hp(9), width: wp(12) }
                                            ]}
                                        >
                                            <Image
                                                source={
                                                    this.state.secondJoker.joker
                                                        .imageLink
                                                }
                                                style={[
                                                    styles.newJokerPlayAdImg,
                                                    {
                                                        height: hp(3),
                                                        width: hp(3)
                                                    }
                                                ]}
                                            />
                                        </View>
                                        <View
                                            style={[
                                                styles.newPremiumUserJokerButton2Style,
                                                { height: hp(9), width: wp(6) }
                                            ]}
                                        >
                                            <Image
                                                source={NEW_PLAY_AD}
                                                style={[
                                                    styles.newPlayAd,
                                                    {
                                                        height: hp(3),
                                                        width: hp(3)
                                                    }
                                                ]}
                                            />
                                        </View>
                                        <View
                                            style={[
                                                styles.newPremiumUserJokerButton3Style,
                                                { height: hp(9), width: wp(12) }
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.newPlayAdText,
                                                    {
                                                        fontSize: hp(1.5),
                                                        textAlign: 'center'
                                                    }
                                                ]}
                                            >
                                                İzle & Kazan
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() =>
                                            this.jokerRewardOnPress(3)
                                        }
                                        style={[
                                            styles.newPremiumUserJokerButtonStyle,
                                            { height: hp(9), width: wp(30) }
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.newPremiumUserJokerButton1Style,
                                                { height: hp(9), width: wp(12) }
                                            ]}
                                        >
                                            <Image
                                                source={
                                                    this.state.thirdJoker.joker
                                                        .imageLink
                                                }
                                                style={[
                                                    styles.newJokerPlayAdImg,
                                                    {
                                                        height: hp(3),
                                                        width: hp(3)
                                                    }
                                                ]}
                                            />
                                        </View>
                                        <View
                                            style={[
                                                styles.newPremiumUserJokerButton2Style,
                                                { height: hp(9), width: wp(6) }
                                            ]}
                                        >
                                            <Image
                                                source={NEW_PLAY_AD}
                                                style={[
                                                    styles.newPlayAd,
                                                    {
                                                        height: hp(3),
                                                        width: hp(3)
                                                    }
                                                ]}
                                            />
                                        </View>
                                        <View
                                            style={[
                                                styles.newPremiumUserJokerButton3Style,
                                                { height: hp(9), width: wp(12) }
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.newPlayAdText,
                                                    {
                                                        fontSize: hp(1.5),
                                                        textAlign: 'center'
                                                    }
                                                ]}
                                            >
                                                İzle & Kazan
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.premiumContainer}>
                                    <LinearGradient
                                        colors={['white', '#F3CE97']}
                                        style={styles.premiumUpperView}
                                    >
                                        <View
                                            style={
                                                styles.premiumSwiperContainer
                                            }
                                        >
                                            <Swiper
                                                autoplay={true}
                                                loop={true}
                                                loadMinimal={false}
                                                showsPagination={false}
                                                scrollEnabled={false}
                                                autoplayTimeout={5}
                                            >
                                                <View
                                                    style={
                                                        styles.premiumSwiperView
                                                    }
                                                >
                                                    <View
                                                        style={
                                                            styles.premiumSwiperImgView
                                                        }
                                                    >
                                                        <Image
                                                            source={PREMIUM_ADS}
                                                            style={
                                                                styles.premiumImg
                                                            }
                                                        />
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumSwiperHeaderView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.premiumHeaderText
                                                            }
                                                        >
                                                            Reklam Yok!
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumSwiperInfoView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.premiumInfoText
                                                            }
                                                        >
                                                            Reklamsız oyun
                                                            oynamanın keyfini
                                                            sen de çıkar
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View
                                                    style={
                                                        styles.premiumSwiperView
                                                    }
                                                >
                                                    <View
                                                        style={
                                                            styles.premiumSwiperImgView
                                                        }
                                                    >
                                                        <Image
                                                            source={PREMIUM_FAV}
                                                            style={
                                                                styles.premiumImg
                                                            }
                                                        />
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumSwiperHeaderView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.premiumHeaderText
                                                            }
                                                        >
                                                            Soru favorile!
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumSwiperInfoView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.premiumInfoText
                                                            }
                                                        >
                                                            Hoşuna giden ya da
                                                            sonra tekrar bakmak
                                                            istediğin soruları
                                                            favorile
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View
                                                    style={
                                                        styles.premiumSwiperView
                                                    }
                                                >
                                                    <View
                                                        style={
                                                            styles.premiumSwiperImgView
                                                        }
                                                    >
                                                        <Image
                                                            source={
                                                                PREMIUM_VIDEO
                                                            }
                                                            style={
                                                                styles.premiumImg
                                                            }
                                                        />
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumSwiperHeaderView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.premiumHeaderText
                                                            }
                                                        >
                                                            Soru çözüm videoları
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumSwiperInfoView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.premiumInfoText
                                                            }
                                                        >
                                                            Yapamadığın
                                                            soruların
                                                            çözümlerini
                                                            izleyerek anlamanı
                                                            pekiştir
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View
                                                    style={
                                                        styles.premiumSwiperView
                                                    }
                                                >
                                                    <View
                                                        style={
                                                            styles.premiumSwiperImgView
                                                        }
                                                    >
                                                        <Image
                                                            source={
                                                                PREMIUM_SOLVING
                                                            }
                                                            style={
                                                                styles.premiumImg
                                                            }
                                                        />
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumSwiperHeaderView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.premiumHeaderText
                                                            }
                                                        >
                                                            Doğru çözümlere bak
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumSwiperInfoView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.premiumInfoText
                                                            }
                                                        >
                                                            Soruların çözüm
                                                            yöntemlerine bakarak
                                                            kavrayabilirsin
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View
                                                    style={
                                                        styles.premiumSwiperView
                                                    }
                                                >
                                                    <View
                                                        style={
                                                            styles.premiumSwiperImgView
                                                        }
                                                    >
                                                        <Image
                                                            source={
                                                                PREMIUM_SINGLE_MODE
                                                            }
                                                            style={
                                                                styles.premiumImg
                                                            }
                                                        />
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumSwiperHeaderView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.premiumHeaderText
                                                            }
                                                        >
                                                            Tek başına!
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumSwiperInfoView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.premiumInfoText
                                                            }
                                                        >
                                                            "Tek rakibim kendim"
                                                            diyenler için tek
                                                            başına soru
                                                            çözebilme imkanı
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View
                                                    style={
                                                        styles.premiumSwiperView
                                                    }
                                                >
                                                    <View
                                                        style={
                                                            styles.premiumSwiperImgView
                                                        }
                                                    >
                                                        <Image
                                                            source={
                                                                PREMIUM_BACK
                                                            }
                                                            style={
                                                                styles.premiumImg
                                                            }
                                                        />
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumSwiperHeaderView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.premiumHeaderText
                                                            }
                                                        >
                                                            Çözülmedik soru
                                                            kalmasın!
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumSwiperInfoView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.premiumInfoText
                                                            }
                                                        >
                                                            Boş bıraktığın veya
                                                            yanlış yaptığın
                                                            soruları tekrar
                                                            tekrar çözme fırsatı
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View
                                                    style={
                                                        styles.premiumSwiperView
                                                    }
                                                >
                                                    <View
                                                        style={
                                                            styles.premiumSwiperImgView
                                                        }
                                                    >
                                                        <Image
                                                            source={
                                                                PREMIUM_JOKER
                                                            }
                                                            style={
                                                                styles.premiumImg
                                                            }
                                                        />
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumSwiperHeaderView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.premiumHeaderText
                                                            }
                                                        >
                                                            Günlük joker!
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={
                                                            styles.premiumSwiperInfoView
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.premiumInfoText
                                                            }
                                                        >
                                                            Her gün sana verilen
                                                            jokerler ile
                                                            soruların cevabına 1
                                                            adım daha yaklaş
                                                        </Text>
                                                    </View>
                                                </View>
                                            </Swiper>
                                        </View>
                                        <View style={styles.premiumButtonView}>
                                            <TouchableOpacity
                                                onPress={
                                                    this.onPressPremiumView
                                                }
                                                style={styles.premiumButton}
                                            >
                                                <Text
                                                    style={
                                                        styles.premiumButtonText
                                                    }
                                                >
                                                    ELİT ÖĞRENCİ PAKETİ'Nİ ŞİMDİ
                                                    AL
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </LinearGradient>
                                    <TouchableOpacity
                                        onPress={this.onPressPromotionCodeView}
                                        style={styles.premiumBottomView}
                                    >
                                        <Text style={styles.inviteText}>
                                            Arkadaşını davet et,
                                        </Text>
                                        <Text
                                            style={
                                                styles.earnPremiumWithInviteText
                                            }
                                        >
                                            ELİT ÖĞRENCİ PAKETİ Kazan!
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        {this.props.clientInformation.isPremium && (
                            <View style={styles.premiumUserAddButtonsContainer}>
                                <TouchableOpacity
                                    onPress={() => this.jokerRewardOnPress(1)}
                                    style={
                                        styles.newPremiumUserJokerButtonStyle
                                    }
                                >
                                    <View
                                        style={
                                            styles.newPremiumUserJokerButton1Style
                                        }
                                    >
                                        <Image
                                            source={
                                                this.state.firstJoker.joker
                                                    .imageLink
                                            }
                                            style={styles.newJokerPlayAdImg}
                                        />
                                    </View>
                                    <View
                                        style={
                                            styles.newPremiumUserJokerButton2Style
                                        }
                                    >
                                        <Image
                                            source={NEW_PLAY_AD}
                                            style={styles.newPlayAd}
                                        />
                                    </View>
                                    <View
                                        style={
                                            styles.newPremiumUserJokerButton3Style
                                        }
                                    >
                                        <Text style={styles.newPlayAdText}>
                                            {'     '}
                                            İzle & Kazan
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.jokerRewardOnPress(2)}
                                    style={
                                        styles.newPremiumUserJokerButtonStyle
                                    }
                                >
                                    <View
                                        style={
                                            styles.newPremiumUserJokerButton1Style
                                        }
                                    >
                                        <Image
                                            source={
                                                this.state.secondJoker.joker
                                                    .imageLink
                                            }
                                            style={styles.newJokerPlayAdImg}
                                        />
                                    </View>
                                    <View
                                        style={
                                            styles.newPremiumUserJokerButton2Style
                                        }
                                    >
                                        <Image
                                            source={NEW_PLAY_AD}
                                            style={styles.newPlayAd}
                                        />
                                    </View>
                                    <View
                                        style={
                                            styles.newPremiumUserJokerButton3Style
                                        }
                                    >
                                        <Text style={styles.newPlayAdText}>
                                            {'     '}
                                            İzle & Kazan
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.jokerRewardOnPress(3)}
                                    style={
                                        styles.newPremiumUserJokerButtonStyle
                                    }
                                >
                                    <View
                                        style={
                                            styles.newPremiumUserJokerButton1Style
                                        }
                                    >
                                        <Image
                                            source={
                                                this.state.thirdJoker.joker
                                                    .imageLink
                                            }
                                            style={styles.newJokerPlayAdImg}
                                        />
                                    </View>
                                    <View
                                        style={
                                            styles.newPremiumUserJokerButton2Style
                                        }
                                    >
                                        <Image
                                            source={NEW_PLAY_AD}
                                            style={styles.newPlayAd}
                                        />
                                    </View>
                                    <View
                                        style={
                                            styles.newPremiumUserJokerButton3Style
                                        }
                                    >
                                        <Text style={styles.newPlayAdText}>
                                            {'     '}
                                            İzle & Kazan
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                        <View style={styles.socialMediaContainer}>
                            {this.props.clientInformation.isPremium && (
                                <View
                                    style={{
                                        width: wp(93),
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <View
                                        style={[
                                            styles.socialMediaView,
                                            {
                                                width: wp(40),
                                                justifyContent: 'space-evenly'
                                            }
                                        ]}
                                    >
                                        <TouchableOpacity
                                            onPress={() =>
                                                Linking.openURL(instagram_page)
                                            }
                                            style={[
                                                styles.socialMediaLogoCircle,
                                                {
                                                    height: hp(4.8),
                                                    width: hp(4.8)
                                                }
                                            ]}
                                        >
                                            <Image
                                                source={INSTAGRAM_LOGO}
                                                style={[
                                                    styles.socialMediaLogo,
                                                    { height: hp(2.75) }
                                                ]}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() =>
                                                Linking.openURL(twitter_page)
                                            }
                                            style={[
                                                styles.socialMediaLogoCircle,
                                                {
                                                    height: hp(4.8),
                                                    width: hp(4.8)
                                                }
                                            ]}
                                        >
                                            <Image
                                                source={TWITTER_LOGO}
                                                style={[
                                                    styles.socialMediaLogo,
                                                    { height: hp(2.75) }
                                                ]}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() =>
                                                Linking.openURL(facebook_page)
                                            }
                                            style={[
                                                styles.socialMediaLogoCircle,
                                                {
                                                    height: hp(4.8),
                                                    width: hp(4.8)
                                                }
                                            ]}
                                        >
                                            <Image
                                                source={FACEBOOK_LOGO}
                                                style={[
                                                    styles.socialMediaLogo,
                                                    { height: hp(2.75) }
                                                ]}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity
                                        onPress={this.onPressPromotionCodeView}
                                        style={[
                                            styles.socialMediaView,
                                            {
                                                width: wp(51),
                                                flexDirection: 'column',
                                                justifyContent: 'center'
                                            }
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.socialMediaInfoText,
                                                {
                                                    fontFamily: 'Averta-Bold',
                                                    fontSize: hp(1.7)
                                                }
                                            ]}
                                        >
                                            ELİT ÖĞRENCİ PAKETİ SÜRENİ UZATMAK
                                            İÇİN, TIKLA!
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            {this.props.clientInformation.isPremium ===
                                false && (
                                <View style={styles.socialMediaView}>
                                    <View style={styles.socialMediaLogosView}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                Linking.openURL(instagram_page)
                                            }
                                            style={styles.socialMediaLogoCircle}
                                        >
                                            <Image
                                                source={INSTAGRAM_LOGO}
                                                style={styles.socialMediaLogo}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.socialMediaLogosView}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                Linking.openURL(twitter_page)
                                            }
                                            style={styles.socialMediaLogoCircle}
                                        >
                                            <Image
                                                source={TWITTER_LOGO}
                                                style={styles.socialMediaLogo}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.socialMediaLogosView}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                Linking.openURL(facebook_page)
                                            }
                                            style={styles.socialMediaLogoCircle}
                                        >
                                            <Image
                                                source={FACEBOOK_LOGO}
                                                style={styles.socialMediaLogo}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.socialMediaInfoView}>
                                        <Text
                                            style={styles.socialMediaInfoText}
                                        >
                                            Sosyal medya hesaplarımızı takip
                                            ederek ödülleri ve en güncel
                                            haberleri kaçırma!
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </View>
                        <View style={styles.yourPremiumAndJokersContainer}>
                            <View style={styles.yourPremiumContainer}>
                                <Swiper
                                    loop={true}
                                    autoplay={true}
                                    autoplayTimeout={3}
                                    showsPagination={false}
                                >
                                    <View>
                                        <View
                                            style={styles.yourPremiumTextView}
                                        >
                                            <Text
                                                style={styles.yourPremiumText}
                                            >
                                                {this.props.choosenExam}
                                            </Text>
                                            <Text
                                                style={styles.yourPremiumText}
                                            >
                                                Kalan Süre
                                            </Text>
                                        </View>
                                        <View
                                            style={
                                                styles.yourPremiumCounterView
                                            }
                                        >
                                            <Text
                                                style={
                                                    styles.yourPremiumCounterText
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.yourPremiumCounterNumbersText
                                                    }
                                                >
                                                    {
                                                        this.state
                                                            .remainingExamMonths
                                                    }
                                                </Text>{' '}
                                                Ay
                                                <Text
                                                    style={
                                                        styles.yourPremiumCounterNumbersText
                                                    }
                                                >
                                                    {' '}
                                                    {
                                                        this.state
                                                            .remainingExamWeeks
                                                    }
                                                </Text>{' '}
                                                Hafta
                                                {this.state
                                                    .remainingExamMonths <
                                                    10 && (
                                                    <Text>
                                                        <Text
                                                            style={
                                                                styles.yourPremiumCounterNumbersText
                                                            }
                                                        >
                                                            {' '}
                                                            {
                                                                this.state
                                                                    .remainingExamDays
                                                            }
                                                        </Text>
                                                        <Text
                                                            style={
                                                                styles.yourPremiumCounterText
                                                            }
                                                        >
                                                            {' '}
                                                            Gün
                                                        </Text>
                                                    </Text>
                                                )}
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <View
                                            style={styles.yourPremiumTextView}
                                        >
                                            <Text
                                                style={styles.yourPremiumText}
                                            >
                                                Elit Öğrenci Paketi
                                            </Text>
                                            <Text
                                                style={styles.yourPremiumText}
                                            >
                                                Kalan Süre
                                            </Text>
                                        </View>
                                        <View
                                            style={
                                                styles.yourPremiumCounterView
                                            }
                                        >
                                            <Text
                                                style={
                                                    styles.yourPremiumCounterText
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.yourPremiumCounterNumbersText
                                                    }
                                                >
                                                    {
                                                        this.state
                                                            .remainingPremiumMonths
                                                    }
                                                </Text>{' '}
                                                Ay
                                                <Text
                                                    style={
                                                        styles.yourPremiumCounterNumbersText
                                                    }
                                                >
                                                    {' '}
                                                    {
                                                        this.state
                                                            .remainingPremiumWeeks
                                                    }
                                                </Text>{' '}
                                                Hafta
                                                {this.state
                                                    .remainingPremiumMonths <
                                                    10 && (
                                                    <Text>
                                                        <Text
                                                            style={
                                                                styles.yourPremiumCounterNumbersText
                                                            }
                                                        >
                                                            {' '}
                                                            {
                                                                this.state
                                                                    .remainingPremiumDays
                                                            }
                                                        </Text>
                                                        <Text
                                                            style={
                                                                styles.yourPremiumCounterText
                                                            }
                                                        >
                                                            {' '}
                                                            Gün
                                                        </Text>
                                                    </Text>
                                                )}
                                            </Text>
                                        </View>
                                    </View>
                                </Swiper>
                            </View>
                            <View style={styles.yourJokersContainer}>
                                <View style={styles.jokerContainer}>
                                    <View style={styles.jokerImageContainer}>
                                        <View style={styles.jokerImageView}>
                                            <View
                                                style={[
                                                    styles.jokerCounterView,
                                                    {
                                                        width:
                                                            (
                                                                '' +
                                                                this.state
                                                                    .firstJoker
                                                                    .amount
                                                            ).length < 3
                                                                ? hp(4)
                                                                : hp(5.5)
                                                    }
                                                ]}
                                            >
                                                <Text
                                                    style={
                                                        styles.jokerCounterText
                                                    }
                                                >
                                                    {
                                                        this.state.firstJoker
                                                            .amount
                                                    }
                                                </Text>
                                            </View>
                                            <Image
                                                source={
                                                    this.state.firstJoker.joker
                                                        .imageLink
                                                }
                                                style={styles.jokerImg}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.jokerNameContainer}>
                                        <Text style={styles.jokerNameText}>
                                            {this.state.firstJoker.joker.name}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.jokerContainer}>
                                    <View style={styles.jokerImageContainer}>
                                        <View style={styles.jokerImageView}>
                                            <View
                                                style={[
                                                    styles.jokerCounterView,
                                                    {
                                                        width:
                                                            (
                                                                '' +
                                                                this.state
                                                                    .secondJoker
                                                                    .amount
                                                            ).length < 3
                                                                ? hp(4)
                                                                : hp(5.5)
                                                    }
                                                ]}
                                            >
                                                <Text
                                                    style={
                                                        styles.jokerCounterText
                                                    }
                                                >
                                                    {
                                                        this.state.secondJoker
                                                            .amount
                                                    }
                                                </Text>
                                            </View>
                                            <Image
                                                source={
                                                    this.state.secondJoker.joker
                                                        .imageLink
                                                }
                                                style={styles.jokerImg}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.jokerNameContainer}>
                                        <Text style={styles.jokerNameText}>
                                            {this.state.secondJoker.joker.name}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.jokerContainer}>
                                    <View style={styles.jokerImageContainer}>
                                        <View style={styles.jokerImageView}>
                                            <View
                                                style={[
                                                    styles.jokerCounterView,
                                                    {
                                                        width:
                                                            (
                                                                '' +
                                                                this.state
                                                                    .thirdJoker
                                                                    .amount
                                                            ).length < 3
                                                                ? hp(4)
                                                                : hp(5.5)
                                                    }
                                                ]}
                                            >
                                                <Text
                                                    style={
                                                        styles.jokerCounterText
                                                    }
                                                >
                                                    {
                                                        this.state.thirdJoker
                                                            .amount
                                                    }
                                                </Text>
                                            </View>
                                            <Image
                                                source={
                                                    this.state.thirdJoker.joker
                                                        .imageLink
                                                }
                                                style={styles.jokerImg}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.jokerNameContainer}>
                                        <Text style={styles.jokerNameText}>
                                            {this.state.thirdJoker.joker.name}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        )
    }
}

const mapStateToProps = state => ({
    userJokers: state.client.userJokers,
    clientInformation: state.client.clientInformation,
    gameContentMap: state.gameContent.gameContentMap,
    choosenExam: state.gameContent.choosenExam,
    clientDBId: state.client.clientDBId,
    clientToken: state.client.clientToken
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseScreen)
