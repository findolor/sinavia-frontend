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
    scrollViewContainer: {
        flex: 83.5
    },
    scrollView: {
        flex: 1,
        width: wp(100)
    },
    yourOrderTextContainer: {
        flex: 3.5,
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcfcfc'
    },
    leaderContainer: {
        height: hp(33),
        width: wp(100)
    },
    tabbarContainer: {
        flex: 6,
        width: wp(100),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    globalTabContainer: {
        height: hp(5.5),
        width: wp(25),
        borderTopLeftRadius: hp(5),
        borderBottomLeftRadius: hp(5),
        borderWidth: wp(0.5),
        borderColor: '#FF6D00',
        backgroundColor: '#FF6D00',
        justifyContent: 'center',
        alignItems: 'center'
    },
    friendsTabContainer: {
        height: hp(5.5),
        width: wp(25),
        borderTopRightRadius: hp(5),
        borderBottomRightRadius: hp(5),
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
        flex: 18,
        width: wp(100),
        flexDirection: 'row'
    },
    dropdownContainer: {
        height: hp(18),
        width: wp(35),
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    lastUpdateView: {
        height: hp(13.5),
        width: wp(35),
        justifyContent: 'center',
        alignItems: 'center'
    },
    lastUpdateText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(2.3),
        color: '#2E313C',
        textAlign: 'center',
        marginRight: wp(3)
    },
    lastUpdateTimeText: {
        fontFamily: 'Averta-SemiboldItalic',
        fontSize: hp(2.5),
        color: '#2E313C',
        marginRight: wp(3)
    },
    leaderImageContainer: {
        height: hp(18),
        width: wp(30),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    nameAndScoreContainer: {
        flex: 9,
        width: wp(100),
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    firstUserPic: {
        height: hp(13.5),
        width: hp(13.5),
        marginTop: hp(2.7),
        borderRadius: hp(100),
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
        fontSize: hp(2.5),
        color: '#2E313C'
    },
    scoreText:{
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2.75),
        color: '#FF6D00'
    },
    continueOrderTextContainer: {
        height: hp(4),
        width: wp(100),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    continueOrderText: {
        fontFamily: 'Averta-RegularItalic',
        fontSize: wp(3.5),
        color: '#00D9EF'
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
        flex: 15.5,
        width: wp(100),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    topTenUserContainer: {
        flex: 15.5,
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
        fontSize: hp(2),
        color: '#2E313C'
    },
    topTenUserScoreText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2.25),
        color: '#FF6D00'
    },
    topTenUserPicContainer: {
        flex: 11,
        width: wp(33),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    topTenUserNameContainer: {
        flex: 2.2,
        width: wp(33),
        alignItems: 'center'
    },
    topTenUserScoreContainer: {
        flex: 2.3,
        width: wp(33),
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    slideDownLeftImg: {
        height: hp(1),
        width: hp(2),
        marginRight: wp(1),
    },
    slideDownRightImg: {
        height: hp(1),
        width: hp(2),
        marginLeft: wp(1),
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
        width: wp(16),
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    tenToHundredUserNameContainer: {
        height: hp(6),
        width: wp(68),
        justifyContent: 'center',
        alignItems: 'center'
    },
    tenToHundredUserScoreContainer: {
        height: hp(6),
        width: wp(16),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    picker: {
        height: hp(6),
        width: wp(25),
        borderColor: '#FF9900',
        borderWidth: wp(0.5),
        borderRadius: 15,
        marginTop: hp(5)
    },
    pickerText: {
        marginTop: hp(1.3),
        marginBottom: hp(1),
        marginLeft: wp(1),
        marginRight: wp(1),
        fontSize: hp(2),
        color: '#00BACD',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    pickerDropdownText: {
        marginTop: hp(1.3),
        marginBottom: hp(1),
        marginLeft: wp(1),
        marginRight: wp(1),
        fontSize: hp(2),
        color: '#F7941E',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    pickerDropdown: {
        height: hp(50.5),
        width: wp(25),
        borderColor: '#00D9EF',
        borderWidth: wp(0.5),
        borderRadius: 15,
        marginTop: hp(0.5),
        marginLeft: wp(-0.5)
    }
})