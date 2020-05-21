import { StyleSheet } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    topContainer: {
        backgroundColor: '#3FC8D9',
        flex: 72,
        width: wp(100),
        borderBottomLeftRadius: hp(3),
        borderBottomRightRadius: hp(3),
        marginBottom: hp(1)
    },
    headerContainer: {
        flex: 14,
        width: wp(100),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    questionContainer: {
        backgroundColor: '#ffffff',
        flex: 52,
        width: wp(84),
        marginLeft: wp(8),
        borderRadius: hp(2),
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    questionAndZoomButtonContainer: {
        flex: 6,
        width: wp(100),
        flexDirection: 'row',
        justifyContent: 'center'
    },
    questionInformation: {
        alignItems: 'center',
        height: hp(6),
        width: wp(54),
        justifyContent: 'center'
    },
    questionInformationText: {
        color: '#fff',
        fontFamily: 'Averta-Regular',
        fontSize: hp(3),
        fontWeight: '700'
    },
    dummyButtonContainer: {
        flex: 14,
        width: wp(100),
        justifyContent: 'space-evenly'
    },
    topButtonRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: wp(100),
        height: hp(7),
        alignItems: 'center'
    },
    button: {
        borderWidth: hp(0.5),
        width: wp(27),
        height: hp(5.5),
        borderRadius: hp(1.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#000',
        fontFamily: 'Averta-Regular',
        fontSize: hp(3),
        fontWeight: '700'
    },
    bottomButtonRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: wp(100),
        height: hp(7),
        alignItems: 'center'
    },
    jokerContainer: {
        width: wp(100),
        flex: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: hp(1),
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    joker: {
        height: hp(3),
        width: hp(3),
        resizeMode: 'contain'
    },
    jokerAndTextContainer: {
        alignItems: 'center'
    },
    touchableJokerContainer: {
        width: wp(25),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    jokerText: {
        color: '#000',
        fontFamily: 'Averta-Regular',
        fontSize: hp(1.8),
        fontWeight: '600'
    },
    questionStyle: {
        resizeMode: 'contain',
        width: wp(84),
        flex: 1
    },
    userContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: wp(40)
    },
    userProfilePicture: {
        height: hp(6),
        width: hp(6),
        borderRadius: hp(100),
        borderWidth: hp(0.3),
        borderColor: '#FF9900'
    },
    usernameContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    answersContainer: {
        height: hp(4),
        width: wp(27),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    answerView: {
        height: hp(3.5),
        width: hp(3.5),
        borderRadius: hp(100),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    usernameText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(1.65),
        color: '#fff'
    },
    answersText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(2.3),
        color: '#fff',
        fontWeight: '600'
    },
    countdownContainer: {
        height: hp(13),
        width: wp(40),
        justifyContent: 'center',
        alignItems: 'center'
    },
    countdownInnerContainer: {
        height: hp(10),
        width: hp(10),
        borderWidth: hp(0.5),
        borderColor: 'white',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    countdownText: {
        fontFamily: 'Averta-Bold',
        fontSize: wp(3.5),
        color: '#fff',
        fontWeight: '800'
    },
    backButton: {
        height: hp(3),
        width: hp(3)
    },
    backButtonContainer: {
        position: 'absolute',
        paddingLeft: wp(4)
    },
    zoomButton: {
        resizeMode: 'contain',
        height: hp(4),
        width: hp(4)
    },
    zoomButtonContainer: {
        height: hp(6),
        width: wp(15),
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    questionModalContainer: {
        backgroundColor: '#000000d0',
        flex: 1
    },
    questionModalImageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    questionModalStyle: {
        resizeMode: 'contain',
        flex: 1,
        width: wp(100)
    },
    closeModalContainer: {
        position: 'absolute',
        paddingLeft: wp(85),
        paddingTop: hp(3)
    },
    closeModal: {
        height: hp(7),
        width: wp(7),
        resizeMode: 'contain'
    },
    spaceContainer: {
        height: hp(6),
        width: wp(15)
    },
    quitModalContainer: {
        flex: 1,
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
        height: hp(9),
        width: wp(87.5),
        marginTop: hp(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    jokerImageContainer: {
        height: hp(8),
        width: wp(12),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(0.75)
    },
    jokerImageView: {
        height: hp(6.75),
        width: hp(6.75),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: hp(0.25),
        borderRadius: 100,
        borderColor: '#FF9900'
    },
    jokerCounterView: {
        position: 'absolute',
        height: hp(4),
        width: hp(4),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        borderWidth: hp(0.35),
        borderRadius: 100,
        borderColor: '#fcfcfc',
        bottom: hp(2.75),
        right: wp(6.5),
        zIndex: 1
    },
    jokerCounterText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(2),
        textAlign: 'center',
        color: 'white',
        marginBottom: hp(0.25)
    },
    jokerImg: {
        height: hp(3),
        width: hp(3)
    },
    jokerNameContainer: {
        height: hp(8),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(0.75)
    },
    jokerNameText: {
        fontFamily: 'Averta-Bold',
        fontSize: hp(2),
        marginLeft: wp(1.5),
        textAlign: 'center',
        color: 'black'
    },
    strokeColorButton: {
        width: hp(6),
        height: hp(6),
        borderRadius: hp(100),
        marginBottom: hp(3),
        marginLeft: wp(3),
        borderColor: 'transparent'
    },
    strokeSelectedColorButton: {
        width: hp(6),
        height: hp(6),
        borderRadius: hp(100),
        marginBottom: hp(3),
        marginLeft: wp(3)
    },
    strokeWidthButton: {
        marginTop: hp(4),
        marginRight: wp(4),
        width: wp(8),
        height: wp(8),
        borderRadius: hp(100),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff9900'
    },
    functionButton: {
        marginTop: hp(4),
        height: hp(6),
        width: wp(17),
        backgroundColor: '#ff9900',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hp(1)
    }
})

export const countdownProps = {
    size: hp(2.5)
}
