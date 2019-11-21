import { StyleSheet } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        justifyContent: 'center'
    },
    contentContainer: {
        flex: 10,
        width: wp(100),
        backgroundColor: '#00D9EF',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    coversContainer: {
        flex: 86,
        justifyContent: 'center'
    },
    coverContainer: {
        flex: 1,
        width: wp(100)
    },
    separatorContainer: {
        height: hp(21),
        width: wp(100),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    separatorLineLeft: {
        height: hp(2),
        width: wp(40),
        backgroundColor: '#E2871A',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    separatorLineRight: {
        height: hp(2),
        width: wp(40),
        backgroundColor: '#E2871A',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    sword: {
        height: hp(19.5),
        width: hp(12.75)
    },
    userPicContainer: {
        height: hp(20),
        width: wp(33),
        alignItems: 'flex-end',
        marginBottom: hp(3)
    },
    userInfoContainer: {
        height: hp(20),
        width: wp(67),
        marginBottom: hp(3),
        justifyContent: 'center'
    },
    opponentPicContainer: {
        height: hp(20),
        width: wp(33),
        alignItems: 'flex-start',
        marginTop: hp(3)
    },
    opponentInfoContainer: {
        height: hp(20),
        width: wp(67),
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: hp(3)
    },
    playerPic: {
        height: hp(15),
        width: hp(15),
        marginTop: hp(2.7),
        borderWidth: hp(0.5),
        borderColor: '#FF9900',
        borderRadius: 100
    },
    usernameText: {
        fontFamily: 'Averta-BoldItalic',
        fontSize: hp(3),
        color: '#FFFFFF'
    },
    sinaviaScoreText: {
        fontFamily: 'Averta-BoldItalic',
        fontSize: hp(2.5),
        color: '#FF9900'
    },
    subjectBasedSinaviaScoreText: {
        fontFamily: 'Averta-BoldItalic',
        fontSize: hp(2.5),
        color: '#FF9900'
    },
    courseText: {
        fontFamily: 'Averta-ExtraBoldItalic',
        fontSize: hp(3.5),
        color: '#FFFFFF'
    },
    subjectText: {
        fontFamily: 'Averta-SemiboldItalic',
        fontSize: hp(3),
        color: '#FFFFFF'
    },
    cover: {
        flex: 1,
        height: hp(43)
    },
    playerView: {
        height: hp(43),
        width: wp(100),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    separatorView: {
        height: hp(20),
        width: wp(100),
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    separatorLine: {
        height: hp(0.5),
        width: wp(35),
        backgroundColor: 'white'
    },
    separatorCircle: {
        height: wp(30),
        width: wp(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: hp(0.5),
        borderColor: 'white',
        borderRadius: hp(100),
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    swordPic: {
        height: wp(19.5),
        width: wp(12.75)
    }
})
