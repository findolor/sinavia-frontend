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
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    returnLogo: {
        height: hp(3.5),
        width: hp(3.5)
    },
    tabbarContainer: {
        height: hp(7.5),
        width: wp(100),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    generalNotificationsContainer: {
        height: hp(5.5),
        width: wp(44),
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        borderWidth: wp(0.5),
        borderColor: '#FF9900',
        backgroundColor: '#FF9900',
        justifyContent: 'center',
        alignItems: 'center'
    },
    friendsRequestsContainer: {
        height: hp(5.5),
        width: wp(44),
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        borderWidth: wp(0.5),
        borderColor: '#FF9900',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    tabbarGeneralNotificationsText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2),
        color: '#FFFFFF'
    },
    tabbarFriendsRequestsText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2),
        color: '#2E313C'
    },
    userRow: {
        height: hp(8),
        width: wp(88),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: wp(0.1),
        borderBottomColor: '#CACACA'
    },
    gameContentsContainer: {
        height: hp(8),
        width: wp(30.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    userPicContainerInRow: {
        height: hp(8),
        width: wp(12.5),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    gameRequestContainer: {
        height: hp(8),
        width: wp(45)
    },
    gameRequestTextContainer: {
        height: hp(3),
        width: wp(45),
        justifyContent: 'center',
        alignItems: 'center'
    },
    gameRequestButtonsContainer: {
        height: hp(5),
        width: wp(45),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    textsinRowWithPic: {
        height: hp(8),
        width: wp(75.5),
        flexDirection: 'row',
        alignItems: 'center'
    },
    userPic: {
        height: hp(6.5),
        width: hp(6.5),
        borderRadius: 100
    },
    nameContainer: {
        height: hp(8),
        width: wp(50),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    nameText: {
        fontFamily: 'Averta-Semibold',
        fontSize: wp(4.3),
        color: '#5C5C5C'
    },
    friendshipButtonsContainer: {
        height: hp(8),
        width: wp(22),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    friendshipButtons: {
        height: hp(4),
        width: hp(4)
    },
    notificationRowsText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2),
        color: '#2E313C'
    },
    notificationRowsTextOrange: {
        fontFamily: 'Averta-BoldItalic',
        fontSize: hp(2),
        color: '#FF9900'
    },
    notificationRowsTextClick: {
        fontFamily: 'Averta-BoldItalic',
        fontSize: hp(2.4),
        color: '#00D9EF'
    },
    gameContentText: {
        fontFamily: 'Averta-BoldItalic',
        fontSize: hp(1.5),
        color: '#FF9900'
    },
    gameRequestText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(1.3),
        color: '#2E313C'
    },
    acceptButton: {
        height: hp(4),
        width: wp(15),
        borderRadius: 6,
        backgroundColor: '#6AC259',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rejectButton: {
        height: hp(4),
        width: wp(15),
        borderRadius: 6,
        backgroundColor: '#B72A2A',
        justifyContent: 'center',
        alignItems: 'center'
    },
    gameRequestsButtonText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(1.5),
        color: '#FFFFFF'
    }
})
