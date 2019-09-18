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
    booksScrollView: {
        height: hp(86),
        width: wp(100),
        marginTop: hp(5),
        position: 'absolute'
    },
    booksRowView: {
        height: hp(43),
        width: wp(100),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    bookView: {
        height: hp(40),
        width: wp(42),
        alignItems: 'center',
        borderWidth: hp(0.3),
        borderRadius: 6,
        borderColor: '#CACACA'
    },
    bookImgContainer: {
        height: hp(20),
        width: wp(42),
        justifyContent: 'center',
        alignItems: 'center'
    },
    bookImgStyle: {
        height: hp(16.9),
        width: hp(13)
    },
    bookInfoContainer: {
        height: hp(5),
        width: wp(42),
        justifyContent: 'center',
        alignItems: 'center'
    },
    bookPublisherContainer: {
        height: hp(5),
        width: wp(42),
        justifyContent: 'center',
        alignItems: 'center'
    },
    bookCostContainer: {
        height: hp(4),
        width: wp(35),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bookBuyButtonContainer: {
        height: hp(6),
        width: wp(42),
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    bookBuyButton: {
        height: hp(4.5),
        width: wp(36),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B72A2A',
        borderRadius: 6
    },
    bookInfoText: {
        fontFamily: 'Averta-Semibold',
        color: 'black',
        fontSize: hp(1.8)
    },
    bookPublisherText: {
        fontFamily: 'Averta-Semibold',
        color: '#929292',
        fontSize: hp(1.8)
    },
    bookCostWithoutSaleText: {
        fontFamily: 'Averta-Semibold',
        color: '#929292',
        fontSize: hp(1.8),
        textDecorationLine: 'line-through'
    },
    bookSalePercentageText: {
        fontFamily: 'Averta-Semibold',
        color: 'black',
        fontSize: hp(1.8)
    },
    bookCostWithSaleText: {
        fontFamily: 'Averta-Semibold',
        color: 'white',
        fontSize: hp(2.5)
    }
})
