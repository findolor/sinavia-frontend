import { StyleSheet } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fcfcfc'
    },
    premiumContainer: {
        flex: 44,
        width: wp(100),
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    adsContainer: {
        flex: 11,
        width: wp(93),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bundlesContainer: {
        flex: 21,
        width: wp(100),
        justifyContent: 'center',
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
        height: hp(35),
        width: wp(93),
        borderWidth: hp(0.4),
        borderColor: '#CC7A00',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    premiumBottomView: {
        height: hp(8),
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
        backgroundColor: '#FFD2D2'
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
        height: hp(35),
        width: wp(93)
    },
    linearGradientBottomView: {
        height: hp(8),
        width: wp(93)
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
        backgroundColor: '#D94141'
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
    }
})
