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
    bottomBar: {
        height: hp(9),
        width: wp(100),
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: '#00D9EF',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: hp(91),
        flexDirection: 'row',
        position: 'absolute'
    },
    scrollViewContainer: {
        backgroundColor: 'green',
        alignItems: 'center'
    },
    cardsScrollView: {
        height: hp(53),
        width: wp(87),
        marginTop: hp(34),
        marginLeft: wp(6.5),
        marginRight: wp(6.5),
        position: 'absolute',
        backgroundColor: '#fcfcfc'
    },
    card: {
        height: hp(9),
        width: wp(87),
        borderWidth: wp(0.6),
        borderRadius: 15,
        borderColor: '#FF9900',
        marginBottom: hp(1.4),
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardText: {
        fontFamily: 'Averta-SemiboldItalic',
        color: '#00BACD',
        fontSize: hp(3.3)
    },
    carouselContainer: {
        height: hp(25),
        marginTop: hp(1.5),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fcfcfc'
    },
    header: {
        height: hp(7.5),
        width: wp(100),
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fcfcfc'
    },
    picker: {
        height: hp(6),
        width: wp(30),
        borderColor: '#FF9900',
        borderWidth: wp(0.5),
        borderRadius: 15
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
        width: wp(30),
        borderColor: '#00D9EF',
        borderWidth: wp(0.5),
        borderRadius: 15,
        marginTop: hp(0.5),
        marginLeft: wp(-0.5)
    },
    modalView: {
        backgroundColor: '#ffffff',
        height: hp(67),
        width: wp(87.5),
        marginTop: hp(3),
        borderColor: '#00D9EF',
        borderWidth: wp(0.75),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalSubjectText: {
        fontFamily: 'Averta-BoldItalic',
        color: '#F7941E',
        marginTop: hp(1),
        fontSize: hp(3.3)
    },
    separatorContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fcfcfc',
        height: hp(3),
        width: wp(75)
    },
    separatorLine: {
        flex: 1,
        borderWidth: wp(0.2),
        height: hp(0.1),
        borderColor: '#D9D9D9'
    },
    gameModesContainer: {
        height: hp(30),
        width: wp(75)
    },
    gameModeContainer: {
        height: hp(10),
        width: wp(75),
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center'
    },
    gameModeLogoContainer: {
        height: hp(7.5),
        width: wp(30),
        borderColor: '#A8A8A8',
        borderWidth: 2,
        borderRadius: wp(3),
        marginRight: wp(5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    gameModeContextContainer: {
        height: hp(10),
        width: wp(42),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    gameModeContextText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(2),
        color: '#A8A8A8'
    },
    profilePic: {
        height: hp(5.8),
        width: hp(5.8),
        borderRadius: 100,
        marginLeft: wp(0)
    },
    notificationLogo: {
        height: hp(4),
        width: hp(4),
        marginRight: wp(0)
    },
    profilePicContainer: {
        height: hp(7.5),
        width: wp(20),
        backgroundColor: '#fcfcfc',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickerContainer: {
        height: hp(7.5),
        width: wp(60),
        backgroundColor: '#fcfcfc',
        justifyContent: 'center',
        alignItems: 'center'
    },
    notificationLogoContainer: {
        height: hp(7.5),
        width: wp(20),
        backgroundColor: '#fcfcfc',
        justifyContent: 'center',
        alignItems: 'center'
    },
    xLogo: {
        height: hp(4),
        width: hp(4),
        marginTop: hp(5),
        marginLeft: wp(77)
    },
    modal: {
        flex: 1,
        backgroundColor: '#000000DE',
        alignItems: 'center'
    },
    rankedModeImage: {
        resizeMode: 'contain',
        height: hp(6),
        width: wp(6)
    },
    friendsModeImage: {
        resizeMode: 'contain',
        height: hp(9),
        width: wp(9)
    },
    groupModeImage: {
        resizeMode: 'contain',
        height: hp(9),
        width: wp(9)
    },
    createOrJoinRoomButtonsContainer: {
        height: hp(30),
        width: wp(60),
        justifyContent: 'space-between'
    },
    createOrJoinRoomButton: {
        height: hp(10),
        width: wp(60),
        backgroundColor: '#00D9EF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gameCodeContainer: {
        height: hp(12),
        width: wp(87.5),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    gameCodeBox: {
        height: hp(10),
        width: wp(66),
        borderWidth: wp(0.5),
        borderRadius: 10,
        borderColor: '#707070',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    gameCodeBoxLeftView: {
        height: hp(10),
        width: wp(10)
    },
    gameCodeBoxTextView: {
        height: hp(10),
        width: wp(46),
        justifyContent: 'center',
        alignItems: 'center'
    },
    gameCodeBoxRightView: {
        height: hp(10),
        width: wp(10),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    gameCodeText: {
        fontFamily: 'Averta-Semibold',
        fontSize: wp(7),
        letterSpacing: wp(1),
        color: '#5C5C5C'
    },
    copyImage: {
        height: hp(3),
        width: hp(3),
        marginBottom: hp(1)
    },
    gameCodeInfoTextContainer: {
        height: hp(7.5),
        width: wp(66),
        justifyContent: 'center',
        alignItems: 'center'
    },
    gameCodeInfoText: {
        fontFamily: 'Averta-Regular',
        fontSize: wp(3),
        color: '#A8A8A8'
    },
    usersListContainer: {
        height: hp(35),
        width: wp(87.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    userRow: {
        height: hp(6),
        width: wp(66),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: wp(0.1),
        borderBottomColor: '#CACACA'
    },
    profilePicContainerinRow: {
        height: hp(6),
        width: wp(15),
        justifyContent: 'center',
        alignItems: 'center'
    },
    userPic: {
        height: hp(5),
        width: hp(5),
        borderRadius: 100
    },
    nameContainer: {
        height: hp(6),
        width: wp(51),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    nameText: {
        fontFamily: 'Averta-Semibold',
        fontSize: wp(4),
        color: '#5C5C5C'
    },
    usersCounterContainer: {
        height: hp(5),
        width: wp(87.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    usersCounterText: {
        fontFamily: 'Averta-Bold',
        fontSize: wp(4),
        color: '#5C5C5C'
    },
    questionsNumberContainer: {
        height: hp(7.5),
        width: wp(66),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    questionsNumberText: {
        fontFamily: 'Averta-Bold',
        fontSize: wp(4.5),
        color: '#5C5C5C',
        marginBottom: hp(1)
    },
    questionNumberPicker: {
        height: hp(6),
        width: wp(15),
        borderColor: '#707070',
        borderWidth: wp(0.5),
        borderRadius: 15,
        marginBottom: hp(1)
    },
    questionPickerText: {
        marginTop: hp(1.3),
        marginBottom: hp(1),
        marginLeft: wp(1),
        marginRight: wp(1),
        fontSize: hp(2),
        color: '#F7941E',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    questionPickerDropdownText: {
        marginTop: hp(1.3),
        marginBottom: hp(1),
        marginLeft: wp(1),
        marginRight: wp(1),
        fontSize: hp(2),
        color: '#F7941E',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    questionPickerDropdown: {
        height: hp(32),
        width: wp(15),
        borderColor: '#707070',
        borderWidth: wp(0.5),
        borderRadius: 15,
        marginTop: hp(0.5),
        marginLeft: wp(-0.5)
    },
    joinGameCodeContainer: {
        height: hp(12),
        width: wp(87.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    joinGameInfoContainer: {
        height: hp(15),
        width: wp(66),
        justifyContent: 'center',
        alignItems: 'center'
    },
    joinGameInfoText: {
        fontFamily: 'Averta-Semibold',
        fontSize: wp(4.5),
        color: '#5C5C5C'
    },
    joinGameCodeTextInput: {
        fontFamily: 'Averta-Regular',
        fontSize: wp(7),
        letterSpacing: wp(1)
    },
    isJoinedRoomSubjectContainer: {
        height: hp(9),
        width: wp(66),
        justifyContent: 'center',
        alignItems: 'center'
    },
    quitView: {
        backgroundColor: '#ffffff',
        height: hp(20),
        width: wp(87.5),
        marginTop: hp(35),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#00D9EF',
        borderWidth: wp(0.75),
        borderRadius: 10
    },
    areYouSureText: {
        fontFamily: 'Averta-Regular',
        fontSize: wp(4.5),
        color: '#5C5C5C'
    },
    yesOrNoButtonsContainer: {
        height: hp(10),
        width: wp(87.5),
        marginTop: hp(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    }
})
