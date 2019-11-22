import { StyleSheet } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fcfcfc'
    },
    header: {
        flex: 6,
        width: wp(88),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    profileContainer: {
        flex: 32,
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxesContainer: {
        flex: 58,
        width: wp(100)
    },
    searchBar: {
        height: hp(5),
        width: wp(66),
        borderRadius: hp(10),
        borderColor: '#00D9EF',
        borderWidth: hp(0.3),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    profileContainerShadowView:{
        height: hp(30),
        width: wp(90),
        borderRadius: hp(3),
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    first2Box: {
        height: hp(29),
        width: wp(100),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    second2Box: {
        height: hp(29),
        width: wp(100),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    coverPhoto: {
        height: hp(30),
        width: wp(90),
        borderRadius: hp(3),
        marginTop: hp(1)
    },
    statisticsBox: {
        height: hp(25),
        width: wp(42.5),
        borderRadius: hp(3),
        marginLeft: wp(5),
        borderColor: '#00D9EF',
        borderWidth: hp(0.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    friendsBox: {
        height: hp(25),
        width: wp(42.5),
        borderRadius: hp(3),
        marginRight: wp(5),
        borderColor: '#00D9EF',
        borderWidth: hp(0.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    badgesBox: {
        height: hp(25),
        width: wp(42.5),
        borderRadius: hp(3),
        marginLeft: wp(5),
        borderColor: '#00D9EF',
        borderWidth: hp(0.5),
        marginBottom: hp(1),
        justifyContent: 'center',
        alignItems: 'center'
    },
    favoritesBox: {
        height: hp(25),
        width: wp(42.5),
        borderRadius: hp(3),
        marginRight: wp(5),
        borderColor: '#00D9EF',
        borderWidth: hp(0.5),
        marginBottom: hp(1),
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxTextContainer: {
        height: hp(12),
        width: wp(42.5),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    boxLogoContainer:{
        height: hp(13),
        width: wp(42.5),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    boxText: {
        fontFamily: 'Averta-ExtraBoldItalic',
        fontSize: hp(3),
        color: '#2E313C',
        marginBottom: hp(1)
    },
    boxLogo: {
        height: hp(7),
        width: hp(7)
    },
    returnLogo: {
        height: hp(3.5),
        width: hp(3.5)
    },
    searchBarText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(2.2),
        paddingVertical: hp(0),
        color: '#2E313C'
    },
    searchBarLogo: {
        height: hp(2.7),
        width: hp(2.7),
        marginRight: wp(3)
    },
    textInputView: {
        height: hp(3.8),
        width: wp(55),
        justifyContent: 'center',
        marginLeft: wp(2.7)
    },
    settingsLogo: {
        height: hp(4),
        width: hp(4)
    },
    profilePic: {
        height: hp(13.5),
        width: hp(13.5),
        marginTop: hp(2),
        borderRadius: hp(100),
        borderWidth: hp(0.4),
        borderColor: '#FF9900'
    },
    profilePicView: {
        height: hp(16.5),
        width: wp(50),
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileInfoView: {
        height: hp(12),
        width: wp(80),
        alignItems: 'center',
        justifyContent: 'center'
    },
    nameSurnameText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(3.5),
        color: 'white',
        paddingVertical: hp(0)
    },
    usernameText: {
        fontFamily: 'Averta-RegularItalic',
        fontSize: hp(2.4),
        color: 'white',
        paddingVertical: hp(0)
    },
    sinaviaScoreText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2.4),
        color: '#FF9900',
        paddingVertical: hp(0)
    },
    friendsCounterBoxText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(7),
        color: '#FF9900',
        bottom: hp(1)
    }
})
