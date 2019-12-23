import { StyleSheet } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    premiumContainer: {
        flex: 36.5,
        width: wp(93),
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    socialMediaContainer: {
        flex: 8,
        width: wp(100),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    adsContainer: {
        flex: 11,
        width: wp(93),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bundlesContainer: {
        flex: 22,
        width: wp(100),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    yourPremiumAndJokersContainer: {
        flex: 11,
        width: wp(93),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    premiumUserAddButtonsContainer: {
        flex: 47.5,
        width: wp(93),
        justifyContent: 'space-evenly'
    },
    premiumUpperView: {
        zIndex: 1,
        height: hp(25.5),
        width: wp(93),
        borderTopLeftRadius: hp(1.8),
        borderTopRightRadius: hp(1.8),
        overflow: 'hidden'
    },
    linearGradientUpperView: {
        height: hp(23.7),
        width: wp(92.2)
    },
    premiumBottomView: {
        zIndex: 1,
        height: hp(9),
        width: wp(93),
        backgroundColor: '#F3CE97',
        /* borderBottomWidth: hp(0.4),
        borderLeftWidth: hp(0.4),
        borderRightWidth: hp(0.4), */
        borderColor: '#CC7A00',
        borderBottomLeftRadius: hp(1.8),
        borderBottomRightRadius: hp(1.8),
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: hp(0.4)
    },
    adContainer: {
        height: hp(8),
        width: wp(93),
        borderRadius: hp(1.8),
        backgroundColor: '#00D9EF',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    bundlesView: {
        height: hp(21),
        width: wp(93),
        borderWidth: hp(0.25),
        borderColor: '#00D9EF',
        borderRadius: hp(1.8),
        backgroundColor: '#CCF7FC',
        overflow: 'hidden'
    },
    yourPremiumContainer: {
        height: hp(11),
        width: wp(40),
        overflow: 'hidden'
    },
    yourJokersContainer: {
        height: hp(11),
        width: wp(52),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    swiperView: {
        height: hp(21),
        width: wp(93),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start'
    },
    bundleView: {
        height: hp(18),
        width: wp(27),
        marginTop: hp(0.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    bundleDivider: {
        height: hp(12),
        width: wp(0.5),
        marginTop: hp(3.25),
        backgroundColor: '#C4C4C4'
    },
    adView: {
        height: hp(8),
        width: wp(20),
        justifyContent: 'center',
        alignItems: 'center'
    },
    playButtonContainer: {
        height: hp(8),
        width: wp(12),
        justifyContent: 'center',
        alignItems: 'center'
    },
    watchTextContainer: {
        height: hp(8),
        width: wp(20),
        justifyContent: 'center',
        alignItems: 'center'
    },
    playButtonImg: {
        height: hp(4.5),
        width: hp(4.5)
    },
    adImg: {
        height: hp(3.75),
        width: hp(3.75)
    },
    adText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(1.75),
        textAlign: 'center',
        color: 'white'
    },
    watchText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(2),
        color: 'white'
    },
    yourPremiumTextView: {
        height: hp(5.5),
        width: wp(40),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    yourPremiumCounterView: {
        height: hp(5.5),
        width: wp(40),
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    yourPremiumText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(2),
        textAlign: 'center',
        color: 'black'
    },
    yourPremiumCounterText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(1.75),
        textAlign: 'center',
        color: '#565656'
    },
    yourPremiumCounterNumbersText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(2.75),
        textAlign: 'center',
        color: '#FF9900'
    },
    jokerContainer: {
        height: hp(11),
        width: wp(16.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    jokerImageContainer: {
        height: hp(8),
        width: wp(16.5),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    jokerImageView: {
        height: hp(6.75),
        width: hp(6.75),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: hp(0.25),
        borderRadius: hp(100),
        borderColor: '#FF9900'
    },
    jokerCounterView: {
        position: 'absolute',
        height: hp(4),
        width: hp(4),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        borderWidth: hp(0.35),
        borderRadius: hp(100),
        borderColor: '#fcfcfc',
        bottom: hp(2.75),
        right: wp(6.5),
        zIndex: 1
    },
    jokerNameContainer: {
        height: hp(3),
        width: wp(16.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    jokerNameText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(1.5),
        textAlign: 'center',
        color: 'black'
    },
    jokerImg: {
        resizeMode: 'contain',
        height: hp(3),
        width: hp(3)
    },
    jokerCounterText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(2),
        textAlign: 'center',
        color: 'white',
        marginBottom: hp(0.25)
    },
    inviteText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(2),
        textAlign: 'center',
        color: 'black',
        marginBottom: hp(0.25)
    },
    earnPremiumWithInviteText: {
        fontFamily: 'Averta-ExtraBold',
        fontSize: hp(2.5),
        textAlign: 'center',
        color: 'black',
        marginBottom: hp(0.25)
    },
    premiumSwiperContainer: {
        height: hp(18.5),
        width: wp(93),
        borderTopWidth: hp(0.4),
        borderLeftWidth: hp(0.4),
        borderRightWidth: hp(0.4),
        borderColor: '#CC7A00',
        borderTopLeftRadius: hp(1.8),
        borderTopRightRadius: hp(1.8)
    },
    premiumModalSwiperContainer: {
        height: hp(26),
        width: wp(93)
    },
    premiumButtonView: {
        height: hp(7),
        width: wp(93),
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRightWidth: hp(0.4),
        borderLeftWidth: hp(0.4),
        borderColor: '#CC7A00'
    },
    premiumButton: {
        height: hp(5),
        width: wp(75),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF9900',
        borderWidth: hp(0.35),
        borderColor: '#fcfcfc',
        borderRadius: hp(4)
    },
    premiumButtonText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(2),
        textAlign: 'center',
        color: 'white'
    },
    premiumSwiperView: {
        height: hp(18.5),
        width: wp(93),
        justifyContent: 'center',
        alignItems: 'center'
    },
    premiumModalSwiperView: {
        height: hp(26),
        width: wp(93),
        justifyContent: 'center',
        alignItems: 'center'
    },
    premiumSwiperImgView: {
        height: hp(7.5),
        width: wp(93),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    premiumModalSwiperImgView: {
        height: hp(11),
        width: wp(93),
        justifyContent: 'center',
        alignItems: 'center'
    },
    premiumSwiperHeaderView: {
        height: hp(4.5),
        width: wp(93),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    premiumModalSwiperHeaderView: {
        height: hp(5),
        width: wp(93),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    premiumSwiperInfoView: {
        height: hp(6.5),
        width: wp(70),
        justifyContent: 'center',
        alignItems: 'center'
    },
    premiumModalSwiperInfoView: {
        height: hp(10),
        width: wp(85),
        justifyContent: 'center',
        alignItems: 'center'
    },
    premiumImg: {
        resizeMode: 'contain',
        height: hp(6.5)
    },
    premiumModalImg: {
        resizeMode: 'contain',
        height: hp(8),
        marginTop: hp(1)
    },
    premiumHeaderText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(3),
        textAlign: 'center',
        color: 'black'
    },
    premiumModalHeaderText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(3),
        textAlign: 'center',
        color: '#2E313C'
    },
    premiumInfoText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(1.8),
        textAlign: 'center',
        color: '#303030'
    },
    premiumModalInfoText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(2.2),
        textAlign: 'center',
        color: '#565656'
    },
    totalJokerAmountView: {
        height: hp(4),
        width: wp(27),
        justifyContent: 'center',
        alignItems: 'center'
    },
    jokersView: {
        height: hp(5.5),
        width: wp(27),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    jokerPricesView: {
        height: hp(4),
        width: wp(27),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    purchaseJokerButtonView: {
        height: hp(4.5),
        width: wp(27),
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    jokerView: {
        height: hp(5.5),
        width: wp(9),
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    purchaseJokerButton: {
        height: hp(3.5),
        width: wp(22),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hp(4),
        backgroundColor: '#00C72C'
    },
    normalPriceText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(2.25),
        textAlign: 'center',
        color: '#858585'
    },
    discountPriceText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(2.35),
        textAlign: 'center',
        color: 'white'
    },
    discountText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(2),
        textAlign: 'center',
        color: 'white'
    },
    jokerAmountsText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(2.5),
        textAlign: 'center',
        color: 'black'
    },
    jokerAmountText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(1.5),
        textAlign: 'center',
        color: 'black'
    },
    premiumModal: {
        flex: 1,
        backgroundColor: '#000000DE',
        justifyContent: 'center',
        alignItems: 'center'
    },
    premiumModalView: {
        position: 'absolute',
        zIndex: 1,
        height: hp(71),
        width: wp(93),
        borderWidth: hp(0.5),
        borderRadius: hp(1.5),
        borderColor: '#D27E00',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    linearGradientPremiumModalView: {
        height: hp(71),
        width: wp(93)
    },
    premiumModalHeaderView: {
        height: hp(7),
        width: wp(93),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    premiumOptionsView: {
        height: hp(22),
        width: wp(93),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    buttonsInPremiumModalView: {
        height: hp(16),
        width: wp(93),
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    purchasePremiumButton: {
        height: hp(6),
        width: wp(75),
        borderWidth: hp(0.2),
        borderColor: 'white',
        borderRadius: hp(4),
        backgroundColor: '#00D9EF',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(2.5)
    },
    purchasePremiumButtonText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(3),
        textAlign: 'center',
        color: 'white'
    },
    purchasePremiumCancelText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(2.5),
        textAlign: 'center',
        color: 'white',
        marginTop: hp(2)
    },
    premiumOptionView: {
        height: hp(22),
        width: wp(28),
        justifyContent: 'center',
        alignItems: 'center'
    },
    premiumOptionUpperView: {
        height: hp(3),
        width: wp(28),
        borderTopLeftRadius: hp(2),
        borderTopRightRadius: hp(2),
        justifyContent: 'center',
        alignItems: 'center'
    },
    premiumOptionBottomView: {
        height: hp(19),
        width: wp(28),
        borderWidth: hp(0.35),
        borderColor: '#00D9EF',
        borderBottomLeftRadius: hp(2),
        borderBottomRightRadius: hp(2),
        justifyContent: 'center',
        alignItems: 'center'
    },
    premiumOptionMonthsView: {
        height: hp(11),
        width: wp(27),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    premiumOptionPriceAmountView: {
        height: hp(8),
        width: wp(27),
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedMonthNumberText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(5),
        textAlign: 'center',
        color: 'black'
    },
    unselectedMonthNumberText: {
        fontFamily: 'Averta-Light',
        fontSize: hp(4.5),
        textAlign: 'center',
        color: '#818181'
    },
    selectedMonthText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(3),
        textAlign: 'center',
        color: 'black'
    },
    unselectedMonthText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(2.5),
        textAlign: 'center',
        color: '#818181'
    },
    selectedPricePerMonthText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(2),
        textAlign: 'center',
        color: '#818181'
    },
    unselectedPricePerMonthText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(1.8),
        textAlign: 'center',
        color: '#818181'
    },
    selectedPriceAmountText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(3),
        textAlign: 'center',
        color: 'black'
    },
    unselectedPriceAmountText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(2.5),
        textAlign: 'center',
        color: 'black'
    },
    selectedPremiumOptionHeaderText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(1.4),
        textAlign: 'center',
        color: '#FF9900'
    },
    unselectedPremiumOptionHeaderText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(1.4),
        textAlign: 'center',
        color: '#818181'
    },
    socialMediaView: {
        height: hp(8),
        width: wp(93),
        backgroundColor: '#FF9900',
        borderRadius: hp(1.8),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    socialMediaLogosView: {
        height: hp(8),
        width: wp(15),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    socialMediaInfoView: {
        height: hp(8),
        width: wp(42),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: wp(2.5)
    },
    socialMediaLogoCircle: {
        height: hp(6),
        width: hp(6),
        backgroundColor: 'white',
        borderRadius: hp(100),
        justifyContent: 'center',
        alignItems: 'center'
    },
    socialMediaInfoText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(1.5),
        textAlign: 'center',
        color: 'white'
    },
    socialMediaLogo: {
        resizeMode: 'contain',
        height: hp(3)
    },
    premiumUserJokerButtonStyle: {
        height: hp(13),
        width: wp(93),
        borderRadius: hp(2)
    },
    adButton2: {
        height: hp(9),
        width: wp(30),
        borderRadius: hp(2)
    }
})
