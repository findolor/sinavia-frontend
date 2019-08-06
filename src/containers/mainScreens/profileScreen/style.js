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
        height: hp(6),
        width: wp(88),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    searchBar: {
        height: hp(5),
        width: wp(66),
        borderRadius: 30,
        borderColor: '#00D9EF',
        borderWidth: hp(0.3),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    profileContainer: {
        height: hp(32),
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxesContainer: {
        height: hp(58),
        width: wp(100)
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
        borderRadius: 30,
        marginTop: hp(0.5),
        alignItems: 'center'
    },
    statisticsBox: {
        height: hp(25),
        width: wp(42.5),
        borderRadius: 30,
        marginLeft: wp(5),
        borderColor: '#00D9EF',
        borderWidth: hp(0.3),
        justifyContent: 'center',
        alignItems: 'center'
    },
    friendsBox: {
        height: hp(25),
        width: wp(42.5),
        borderRadius: 30,
        marginRight: wp(5),
        borderColor: '#00D9EF',
        borderWidth: hp(0.3),
        justifyContent: 'center',
        alignItems: 'center'
    },
    badgesBox: {
        height: hp(25),
        width: wp(42.5),
        borderRadius: 30,
        marginLeft: wp(5),
        borderColor: '#00D9EF',
        borderWidth: hp(0.3),
        marginBottom: hp(1),
        justifyContent: 'center',
        alignItems: 'center'
    },
    favoritesBox: {
        height: hp(25),
        width: wp(42.5),
        borderRadius: 30,
        marginRight: wp(5),
        borderColor: '#00D9EF',
        borderWidth: hp(0.3),
        marginBottom: hp(1),
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxText: {
        fontFamily: 'Averta-ExtraBoldItalic',
        fontSize: hp(3.5),
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
        paddingVertical: hp(0)
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
        height: hp(15),
        width: hp(15),
        marginTop: hp(2.7),
        borderRadius: 100
    },
    profilePicView: {
        height: hp(18),
        width: wp(50),
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameView: {
        height: hp(10),
        width: wp(70),
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    nameSurnameText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(3.5),
        color: '#2E313C',
        paddingVertical: hp(0)
    },
    usernameText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(2.4),
        color: '#2E313C',
        paddingVertical: hp(0)
    },
    nameSurnameContainer: {
        backgroundColor: '#FFFFFF80',
        width: wp(40),
        alignItems: 'center',
        borderRadius: 30
    },
    usernameContainer: {
        backgroundColor: '#FFFFFF80',
        width: wp(30),
        height: hp(3.5),
        alignItems: 'center',
        borderRadius: 30
    }
})
