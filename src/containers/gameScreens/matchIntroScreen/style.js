import { StyleSheet } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00D9EF'
    },
    contentContainer: {
        height: hp(11),
        width: wp(100),
        backgroundColor: '#E2871A',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    user1Container: {
        height: hp(32),
        width: wp(100),
        flexDirection: 'row',
        alignItems: 'center'
    },
    user2Container: {
        height: hp(32),
        width: wp(100),
        flexDirection: 'row',
        alignItems: 'center'
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
        height: hp(18),
        width: wp(22)
    },
    user1PicContainer: {
        height: hp(20),
        width: wp(30),
        alignItems: 'flex-start',
        marginLeft: wp(10)
    },
    user1InfoContainer: {
        height: hp(10),
        width: wp(60),
        justifyContent: 'space-around',

    },
    user2PicContainer: {
        height: hp(20),
        width: wp(30),
        alignItems: 'flex-end',
        marginBottom: hp(4),
    },
    user2InfoContainer: {
        height: hp(10),
        width: wp(60),
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        marginBottom: hp(4)
    },
    user1Pic: {
        height: hp(15),
        width: hp(15),
        marginTop: hp(2.7),
        borderRadius: 100
    },
    usernameText: {
        fontFamily: 'Averta-BoldItalic',
        fontSize: wp(5),
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 10
    },
    sinaviaScoreText:{
        fontFamily: 'Averta-BoldItalic',
        fontSize: wp(5.4),
        color: '#FFFFFF',
    },
    courseText: {
        fontFamily: 'Averta-BoldItalic',
        fontSize: wp(7.5),
        color: '#FFFFFF',
    },
    subjectText: {
        fontFamily: 'Averta-BoldItalic',
        fontSize: wp(5),
        color: '#FFFFFF',
    }
})
