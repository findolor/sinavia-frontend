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
    carouselContainer: {
        flex: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        flex: 8,
        width: wp(100),
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    scrollViewContainer: {
        flex: 54
    },
    cardsScrollView: {
        flex: 1,
        width: wp(87),
        marginLeft: wp(6.5),
        marginRight: wp(6.5)
    },
    card: {
        height: hp(9),
        width: wp(87),
        marginBottom: hp(1.4),
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardText: {
        fontFamily: 'Averta-SemiboldItalic',
        color: '#2E313C',
        fontSize: hp(3),
        textAlign: 'center'
    },
    picker: {
        width: wp(30),
        borderColor: '#FF9900',
        borderWidth: hp(0.4),
        borderRadius: hp(1.5)
    },
    pickerText: {
        // marginTop: hp(1.3),
        // marginBottom: hp(1),
        // marginLeft: wp(1),
        // marginRight: wp(1),
        fontFamily: 'Averta-Semibold',
        fontSize: hp(3),
        color: '#2E313C',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    pickerDropdownText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2),
        color: '#2E313C',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    pickerDropdown: {
        height: hp(20),
        width: wp(30),
        borderWidth: hp(0.4),
        borderRadius: hp(1.5),
        borderColor: '#FF9900',
        marginLeft: wp(-0.5)
    },
    modalView: {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: '#ffffff',
        height: hp(67),
        width: wp(87.5),
        marginTop: hp(14),
        borderColor: '#00D9EF',
        borderWidth: wp(0.75),
        borderRadius: hp(1.5),
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
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
        backgroundColor: '#ffffff',
        height: hp(2),
        width: wp(75)
    },
    separatorLine: {
        height: hp(0.1),
        width: wp(75),
        borderWidth: wp(0.2),
        borderColor: '#D9D9D9'
    },
    gameModesContainer: {
        height: hp(30),
        width: wp(75)
    },
    gameModeContainer: {
        height: hp(9),
        width: wp(75),
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center'
    },
    gameModeButtonContainer: {
        height: hp(9),
        width: wp(33),
        justifyContent: 'center',
        alignItems: 'flex-start'
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
        height: hp(9),
        width: wp(42),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    gameModeContextText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(1.8),
        color: '#A8A8A8'
    },
    profilePic: {
        height: hp(5.8),
        width: hp(5.8),
        borderWidth: hp(0.3),
        borderColor: '#FF9900',
        borderRadius: 100,
        marginLeft: wp(0)
    },
    notificationLogo: {
        resizeMode: 'contain',
        height: hp(4)
    },
    profilePicContainer: {
        height: hp(7.5),
        width: wp(20),
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickerContainer: {
        height: hp(7.5),
        width: wp(60),
        justifyContent: 'center',
        alignItems: 'center'
    },
    notificationLogoContainer: {
        height: hp(7.5),
        width: wp(20),
        justifyContent: 'center',
        alignItems: 'center'
    },
    backAndCloseButtonsContainer: {
        position: 'absolute',
        zIndex: 1,
        height: hp(6),
        width: wp(86),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: hp(6)
    },
    onlyCloseButtonContainer: {
        height: hp(6),
        width: wp(86),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: hp(6)
    },
    xLogo: {
        height: hp(4),
        width: hp(4)
    },
    backLogo: {
        height: hp(4),
        width: hp(4)
    },
    modal: {
        flex: 1,
        backgroundColor: '#000000DE',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    gameModeImage: {
        resizeMode: 'contain',
        height: hp(5)
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
        justifyContent: 'center'
    },
    gameCodeText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(5),
        letterSpacing: wp(1),
        color: '#5C5C5C'
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
        fontSize: hp(4),
        textAlign: 'center',
        color: 'black',
        letterSpacing: wp(2)
    },
    usersContainer: {
        height: hp(22),
        width: wp(87.5),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    userContainer: {
        height: hp(22),
        width: wp(43.75)
    },
    userPicContainer: {
        height: hp(12),
        width: wp(43.75),
        justifyContent: 'center',
        alignItems: 'center'
    },
    userPic: {
        height: hp(10.5),
        width: hp(10.5),
        marginTop: hp(2.25),
        borderWidth: hp(0.3),
        borderColor: '#FF9900',
        borderRadius: hp(100)
    },
    nameAndUsernameContainer: {
        height: hp(10),
        width: wp(43.75),
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameAndSurnameText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(1.9),
        marginTop: hp(0.5),
        textAlign: 'center',
        color: '#5C5C5C'
    },
    sword: {
        height: hp(6.5),
        width: hp(4.25),
        position: 'absolute'
    },
    userListContainer: {
        height: hp(45),
        width: wp(87.35),
        alignItems: 'center'
    },
    noResultsView: {
        height: hp(45),
        width: wp(87.35),
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: hp(10)
    },
    noResultsText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(3),
        color: '#FF9900',
        textAlign: 'center',
        marginTop: hp(5)
    },
    noResultImg: {
        resizeMode: 'contain',
        height: hp(20)
    },
    userRow: {
        height: hp(10.5),
        width: wp(75),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: wp(0.1),
        borderBottomColor: '#CACACA',
        marginBottom: hp(1)
    },
    userPicContainerInRow: {
        height: hp(10.5),
        width: wp(14),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    userPicInRow: {
        height: hp(6.5),
        width: hp(6.5),
        borderWidth: hp(0.3),
        borderColor: '#FF9900',
        borderRadius: hp(100)
    },
    nameContainer: {
        height: hp(10.5),
        width: wp(61),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    nameText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2.4),
        color: '#5C5C5C'
    },
    userNameText: {
        fontFamily: 'Averta-RegularItalic',
        fontSize: hp(2.4),
        color: '#FF9900'
    },
    searchBar: {
        height: hp(6),
        width: wp(75),
        borderRadius: 30,
        borderColor: '#00D9EF',
        borderWidth: hp(0.3),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textInputView: {
        height: hp(3.8),
        width: wp(63),
        justifyContent: 'center',
        marginLeft: wp(2.7)
    },
    searchBarText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(2.2),
        paddingVertical: hp(0),
        color: '#2E313C'
    },
    spaceView: {
        height: hp(1.5)
    },
    scoreContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    levelProgressBarContainer: {
        height: hp(5.5),
        width: wp(75),
        justifyContent: 'center',
        alignItems: 'center'
    },
    scoreTextInModal: {
        fontFamily: 'Averta-RegularItalic',
        color: '#00D9EF',
        fontSize: hp(3.3)
    },
    scoreInModal: {
        fontFamily: 'Averta-ExtraBoldItalic',
        color: '#00D9EF',
        fontSize: hp(3.3)
    },
    progressBarView: {
        height: hp(5),
        width: wp(65),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: hp(1),
        backgroundColor: '#B0B0B0'
    },
    instantProgressView: {
        position: 'absolute',
        height: hp(5),
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        backgroundColor: '#FF9900'
    },
    progressScoreView: {
        height: hp(4),
        width: wp(25),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    levelText: {
        fontFamily: 'Averta-Semibold',
        zIndex: 1,
        marginLeft: wp(1),
        fontSize: hp(2.5),
        color: 'white'
    },
    levelInProgressText: {
        fontFamily: 'Averta-Semibold',
        marginRight: wp(1),
        fontSize: hp(2.5),
        color: 'white'
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center'
    },
    gameRequestView: {
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
    gameRequestText: {
        fontFamily: 'Averta-Regular',
        fontSize: wp(4.5),
        color: '#5C5C5C',
        textAlign: 'center'
    },
    yesOrNoButtonsContainer: {
        height: hp(9),
        width: wp(87.5),
        marginTop: hp(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    questionsNumberText: {
        fontFamily: 'Averta-Bold',
        fontSize: wp(4),
        color: '#5C5C5C'
    },
    questionNumberText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(3.5),
        color: '#FF9900'
    },
    questionNumberCircle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(6),
        width: hp(6),
        borderRadius: hp(100)
    },
    modalButtonsContainer: {
        position: 'absolute',
        marginTop: hp(83.5),
        height: hp(7),
        width: wp(87.5),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    videoButton: {
        height: hp(7),
        width: wp(42),
        backgroundColor: '#00D9EF',
        borderRadius: hp(1.5),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    videoButtonLogo: {
        height: hp(4),
        width: hp(4),
        marginRight: wp(3)
    },
    videoButtonText: {
        fontFamily: 'Averta-Semibold',
        color: '#FFFFFF',
        letterSpacing: wp(0.1),
        fontSize: hp(2)
    },
    rewardAdModalText: {
        fontFamily: 'Averta-SemiboldItalic',
        color: '#2E313C',
        fontSize: hp(3),
        textAlign: 'center',
        marginRight: wp(2),
        marginLeft: wp(2)
    }
})
