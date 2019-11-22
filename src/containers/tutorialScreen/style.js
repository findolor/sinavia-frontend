import { StyleSheet } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    onePageTutorialView: {
        flex: 1
    },
    iconContainer: {
        flex: 50,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    headerTextContainer: {
        flex: 14,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    infoTextContainer: {
        flex: 36,
        width: wp(80),
        marginLeft: wp(10),
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    headerText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(4.5),
        textAlign: 'center',
        color: '#00D9EF'
    },
    infoText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2.5),
        textAlign: 'center',
        color: '#636363',
        marginTop: hp(5),
        lineHeight: hp(4)
    },
    iconImg: {
        height: hp(25),
        marginBottom: hp(3)
    },
    skipButton: {
        height: hp(5),
        width: wp(22),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hp(5),
        backgroundColor: '#00D9EF',
        marginBottom: hp(12.5),
        marginLeft: wp(60)
    },
    skipButtonText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(3),
        textAlign: 'center',
        color: '#FFFFFF'
    },
    startButton: {
        height: hp(7),
        width: wp(64),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hp(5),
        backgroundColor: '#00D9EF',
        marginTop: hp(3.5)
    },
    iconPaginationImg: {
        resizeMode: 'contain',
        height: hp(5),
        marginLeft: hp(0.5)
    }
})
