import { StyleSheet } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcfcfc'
    },
    premiumContainer: {
        flex: 43,
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
    premiumUpperView: {
        zIndex: 1,
        height: hp(34),
        width: wp(93),
        borderWidth: hp(0.4),
        borderColor: '#CC7A00',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    premiumBottomView: {
        height: hp(9),
        width: wp(93),
        borderBottomWidth: hp(0.4),
        borderLeftWidth: hp(0.4),
        borderRightWidth: hp(0.4),
        borderColor: '#CC7A00',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden'
    },
    adContainer: {
        height: hp(8),
        width: wp(45),
        borderRadius: 10,
        backgroundColor: '#00D9EF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bundlesView: {
        height: hp(21),
        width: wp(93),
        borderWidth: hp(0.25),
        borderColor: '#750000',
        borderRadius: 10,
        backgroundColor: '#FFD2D2',
        overflow: 'hidden'
    },
    yourPremiumContainer: {
        height: hp(11),
        width: wp(40)
    },
    yourJokersContainer: {
        height: hp(11),
        width: wp(52),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    linearGradientUpperView: {
        height: hp(34),
        width: wp(93)
    },
    linearGradientBottomView: {
        height: hp(9),
        width: wp(93),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3CE97'
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
        borderWidth: hp(0.4),
        marginTop: hp(0.5),
        borderRadius: 10,
        borderColor: '#750000',
        backgroundColor: '#D94141',
        justifyContent: 'center',
        alignItems: 'center'
    },
    adView: {
        height: hp(8),
        width: wp(17.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    playButtonContainer: {
        height: hp(8),
        width: wp(10),
        justifyContent: 'center',
        alignItems: 'center'
    },
    watchTextContainer: {
        height: hp(8),
        width: wp(17.5),
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
        height: hp(6.5),
        width: wp(40),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    yourPremiumCounterView: {
        height: hp(4.5),
        width: wp(40),
        justifyContent: 'center',
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
        borderRadius: 100,
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
        borderRadius: 100,
        borderColor: '#fcfcfc',
        bottom: hp(2.75),
        right: wp(7.5),
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
        color: 'white',
        marginBottom: hp(0.25)
    },
    premiumSwiperContainer: {
        height: hp(26),
        width: wp(93)
    },
    premiumButtonView: {
        height: hp(9),
        width: wp(93),
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    premiumButton: {
        height: hp(5.75),
        width: wp(75),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF9900',
        borderWidth: hp(0.35),
        borderColor: '#fcfcfc',
        borderRadius: 30
    },
    premiumButtonText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(2),
        textAlign: 'center',
        color: 'white'
    },
    premiumSwiperView: {
        height: hp(26),
        width: wp(93),
        justifyContent: 'center',
        alignItems: 'center'
    },
    premiumSwiperImgView: {
        height: hp(11),
        width: wp(93),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    premiumSwiperHeaderView: {
        height: hp(7),
        width: wp(93),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    premiumSwiperInfoView: {
        height: hp(8),
        width: wp(65),
        justifyContent: 'center',
        alignItems: 'center'
    },
    premiumImg: {
        height: hp(8),
        width: hp(8)
    },
    premiumHeaderText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(4),
        textAlign: 'center',
        color: 'black'
    },
    premiumInfoText: {
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
        flexDirection: 'row'
    },
    jokerPricesView: {
        height: hp(4),
        width: wp(16),
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
        borderRadius: 20,
        backgroundColor: '#00C72C'
    },
    normalPriceText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(3),
        textAlign: 'center',
        color: 'white',
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    },
    discountPriceText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(2),
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
        color: 'white'
    },
    jokerAmountText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(1.5),
        textAlign: 'center',
        color: 'white'
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
        borderRadius: 10,
        borderColor: '#D27E00',
        overflow: 'hidden',
        backgroundColor: 'red',
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
    premiumModalHeaderText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(3),
        textAlign: 'center',
        color: '#FF9900'
    },
    purchasePremiumButton: {
        height: hp(6),
        width: wp(75),
        borderWidth: hp(0.2),
        borderColor: 'white',
        borderRadius: 30,
        backgroundColor: '#00D9EF',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(1.5)
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    premiumOptionBottomView: {
        height: hp(19),
        width: wp(28),
        borderWidth: hp(0.35),
        borderColor: '#00D9EF',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
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
        color: 'white'
    },
    unselectedPremiumOptionHeaderText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(1.4),
        textAlign: 'center',
        color: '#818181'
    }
})
