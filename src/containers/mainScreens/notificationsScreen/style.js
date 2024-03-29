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
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    tabbarContainer: {
        flex: 7.5,
        width: wp(100),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    flatListContainer: {
        flex: 82.5,
        width: wp(88)
    },
    returnLogo: {
        height: hp(3.5),
        width: hp(3.5)
    },
    generalNotificationsContainer: {
        height: hp(5.5),
        width: wp(44),
        borderTopLeftRadius: hp(1),
        borderBottomLeftRadius: hp(1),
        borderWidth: wp(0.5),
        borderColor: '#FF9900',
        backgroundColor: '#FF9900',
        justifyContent: 'center',
        alignItems: 'center'
    },
    friendsRequestsContainer: {
        height: hp(5.5),
        width: wp(44),
        borderTopRightRadius: hp(1),
        borderBottomRightRadius: hp(1),
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
        borderBottomWidth: hp(0.15),
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
        width: wp(45),
        justifyContent: 'center',
        alignItems: 'center'
    },
    gameRequestTextContainer: {
        height: hp(6),
        width: wp(45),
        justifyContent: 'center',
        alignItems: 'center'
    },
    gameRequestButtonsContainer: {
        height: hp(4),
        width: wp(45),
        marginTop: hp(1),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start'
    },
    textsinRowWithPic: {
        height: hp(8),
        width: wp(75.5),
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: wp(2)
    },
    userPic: {
        height: hp(6.5),
        width: hp(6.5),
        borderColor: '#FF9900',
        borderWidth: hp(0.3),
        borderRadius: 100
    },
    nameContainer: {
        height: hp(8),
        width: wp(50),
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: wp(2)
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
        fontSize: hp(2),
        color: '#FF9900',
        textAlign: 'center'
    },
    gameRequestText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2),
        textAlign: 'center',
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
    },
    emptyFlatListContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(75)
    },
    emptyFlatListText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(3),
        color: '#000'
    }
})
