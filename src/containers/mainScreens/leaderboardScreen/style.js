import { StyleSheet } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    scrollView: {
        height: hp(80),
        width: wp(100),
        marginBottom: hp(13),
    },
    leaderContainer: {
        height: hp(33),
        width: wp(100)
    },
    tabbarContainer: {
        height: hp(6),
        width: wp(100),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    globalTabContainer: {
        height: hp(5.5),
        width: wp(25),
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        borderWidth: wp(0.5),
        borderColor: '#FF6D00',
        backgroundColor: '#FF6D00',
        justifyContent: 'center',
        alignItems: 'center'
    },
    friendsTabContainer: {
        height: hp(5.5),
        width: wp(25),
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        borderWidth: wp(0.5),
        borderColor: '#FF6D00',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    tabbarGlobalText: {
        fontFamily: 'Averta-Semibold',
        fontSize: wp(4),
        color: '#FFFFFF'
    },
    tabbarFriendsText: {
        fontFamily: 'Averta-Semibold',
        fontSize: wp(4),
        color: '#2E313C'
    },
    dropdownsAndImageContainer: {
        height: hp(18),
        width: wp(100),
        flexDirection: 'row'
    },
    coursesDropdownContainer: {
        height: hp(18),
        width: wp(35),
    },
    leaderImageContainer: {
        height: hp(18),
        width: wp(30),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    subjectsDropdownContainer: {
        height: hp(18),
        width: wp(35),
    },
    nameAndScoreContainer: {
        height: hp(9),
        width: wp(100),
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    firstUserPic: {
        height: hp(13.5),
        width: hp(13.5),
        marginTop: hp(2.7),
        borderRadius: 100,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    firstUserTitlePic: {
        height: hp(6.15),
        width: hp(9.15),
        bottom: hp(4)
    },
    firstUserOrderView: {
        height: hp(4),
        width: hp(4),
        borderRadius: 100,
        backgroundColor: '#FDD835',
        borderWidth: wp(0.5),
        borderColor: '#FFC12E',
        marginLeft: wp(17),
        justifyContent: 'center',
        alignItems: 'center'
    },
    secondToTenUsersOrderView: {
        height: hp(4),
        width: hp(4),
        borderRadius: 100,
        backgroundColor: '#FDD835',
        borderWidth: wp(0.5),
        borderColor: '#FFC12E',
        marginLeft: wp(15),
        justifyContent: 'center',
        alignItems: 'center'
    },
    topTenOrderNumber: {
        fontFamily: 'Averta-Semibold',
        fontSize: wp(4),
        color: '#000000'
    },
    nameText: {
        fontFamily: 'Averta-Semibold',
        fontSize: wp(4),
        color: '#2E313C'
    },
    scoreText:{
        fontFamily: 'Averta-RegularItalic',
        fontSize: wp(4),
        color: '#FF6D00'
    },
    continueOrderTextContainer: {
        height: hp(3.8),
        width: wp(100),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    continueOrderText: {
        fontFamily: 'Averta-RegularItalic',
        fontSize: wp(3.5),
        color: '#00D9EF'
    },
    yourOrderTextContainer: {
        height: hp(4.5),
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        marginTop: hp(87)
    },
    yourOrderText: {
        fontFamily: 'Averta-RegularItalic',
        fontSize: wp(5),
        color: '#FF6D00',
    },
    topTenContainer: {
        height: hp(46.5),
        width: wp(100)
    },
    dividedTopTenContainer: {
        height: hp(15.5),
        width: wp(100),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    topTenUserContainer: {
        height: hp(15.5),
        width: wp(33),
    },
    secondAndThirdUsersFromTopTenPic: {
        height: hp(10),
        width: hp(10),
        borderRadius: 100,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    otherUsersFromTopTenPic: {
        height: hp(10),
        width: hp(10),
        borderRadius: 100,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    secondAndThirdTitlePic: {
        height: hp(4.1),
        width: hp(6.1),
        bottom: hp(3)
    },
    topTenUserNameText: {
        fontFamily: 'Averta-Semibold',
        fontSize: wp(3.5),
        color: '#2E313C'
    },
    topTenUserScoreText: {
        fontFamily: 'Averta-RegularItalic',
        fontSize: wp(4),
        color: '#FF6D00'
    },
    topTenUserPicContainer: {
        height: hp(11),
        width: wp(33),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    topTenUserNameContainer: {
        height: hp(2.2),
        width: wp(33),
        alignItems: 'center'
    },
    topTenUserScoreContainer: {
        height: hp(2.3),
        width: wp(33),
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    slideDownLeftImg: {
        height: hp(1),
        width: hp(2),
        marginRight: wp(1),
        marginBottom : hp(0.9)
    },
    slideDownRightImg: {
        height: hp(1),
        width: hp(2),
        marginLeft: wp(1),
        marginBottom : hp(0.9)
    },
    tenToHundredUserRow: {
        height: hp(6),
        width: wp(100),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: wp(0.1),
        borderBottomColor: '#CACACA'
    },
    tenToHundredUserOrderText: {
        fontFamily: 'Averta-RegularItalic',
        fontSize: wp(4.5),
        color: '#A1A1A1',
        marginLeft: wp(5)
    },
    tenToHundredUserNameText: {
        fontFamily: 'Averta-Semibold',
        fontSize: wp(4.5),
        color: '#2E313C',
        marginLeft: wp(2)
    },
    tenToHundredUserScoreText: {
        fontFamily: 'Averta-Semibold',
        fontSize: wp(4.5),
        color: '#FF6D00'
    },
    tenToHundredUserOrderContainer: {
        height: hp(6),
        width: wp(20),
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    tenToHundredUserNameContainer: {
        height: hp(6),
        width: wp(60),
        justifyContent: 'center',
        alignItems: 'center'
    },
    tenToHundredUserScoreContainer: {
        height: hp(6),
        width: wp(20),
        justifyContent: 'center',
        alignItems: 'flex-start'
    }
})
