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
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    scrollViewContainer: {
        flex: 90,
        width: wp(100),
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    noResultsView: {
        flex: 90,
        width: wp(88),
        justifyContent: 'center',
        alignItems: 'center'
    },
    noResultsText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(3),
        color: '#2E313C',
        textAlign: 'center',
        marginTop: hp(5)
    },
    noResultImg: {
        resizeMode: 'contain',
        height: hp(20)
    },
    returnLogo: {
        height: hp(3.5),
        width: hp(3.5)
    },
    headerTextWrapper: {
        height: hp(6),
        width: wp(54),
        justifyContent: 'center',
        alignItems: 'center'
    },
    returnLogoContainer: {
        height: hp(6),
        width: wp(18),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    addLogoContainer: {
        height: hp(6),
        width: wp(18),
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    addLogo: {
        height: hp(5),
        width: wp(18),
        backgroundColor: '#FF9900',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hp(3)
    },
    addLogoText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2.3),
        color: '#FFFFFF'
    },
    headerText: {
        fontFamily: 'Averta-BoldItalic',
        fontSize: hp(2.9),
        color: '#00D9EF'
    },
    addNewGoalImg: {
        position: 'absolute',
        height: hp(8),
        width: hp(8),
        top: hp(78),
        left: wp(78)
    },
    goalsInfoView: {
        flex: 19,
        width: wp(90),
        justifyContent: 'center',
        alignItems: 'center'
    },
    goalsInfoText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(3),
        color: '#2E313C',
        textAlign: 'center'
    },
    dropdownsView: {
        flex: 29,
        width: wp(100),
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dropdownView: {
        height: hp(13.3),
        width: wp(90),
        justifyContent: 'space-evenly'
    },
    questionAmountView: {
        flex: 20,
        width: wp(90),
        justifyContent: 'space-evenly',
        alignItems: 'flex-start'
    },
    questionAmounts: {
        height: hp(10),
        width: wp(90),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(1.5)
    },
    buttonsView: {
        flex: 22,
        width: wp(100),
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    picker: {
        width: wp(90),
        borderColor: '#00D9EF',
        borderWidth: wp(0.5),
        borderRadius: hp(1)
    },
    pickerText: {
        marginTop: hp(1.3),
        marginBottom: hp(1),
        marginLeft: wp(1),
        marginRight: wp(1),
        fontSize: hp(2),
        color: '#FF9900',
        textAlign: 'center'
    },
    pickerDropdownText: {
        marginTop: hp(1.3),
        marginBottom: hp(1),
        marginLeft: wp(1),
        marginRight: wp(1),
        fontSize: hp(2),
        color: '#2E313C',
        textAlign: 'center'
    },
    pickerDropdown: {
        height: hp(39),
        width: wp(90),
        borderColor: '#00D9EF',
        borderWidth: wp(0.5),
        borderRadius: hp(1),
        marginLeft: wp(-0.5)
    },
    dropdownHeaderText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(2.75),
        color: '#2E313C'
    },
    button: {
        height: hp(7.5),
        width: wp(90),
        borderRadius: hp(1.25),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#21C95A'
    },
    buttonText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2.75),
        color: '#FFFFFF'
    },
    questionNumberCircle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(5),
        width: hp(8),
        borderRadius: hp(100)
    },
    questionNumberText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2.75),
        color: '#FF9900'
    },
    goalView: {
        height: hp(15.5),
        width: wp(90),
        borderWidth: hp(0.4),
        borderColor: '#00D9EF',
        borderRadius: hp(1.5),
        alignItems: 'center'
    },
    courseAndSubjectName: {
        height: hp(6),
        width: wp(85),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    courseText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(3),
        color: '#2E313C',
        marginBottom: hp(1.3)
    },
    subjectText: {
        fontFamily: 'Averta-RegularItalic',
        fontSize: hp(2),
        color: '#858585',
        marginBottom: hp(1.6)
    },
    progressBarView: {
        height: hp(3),
        width: wp(85),
        borderRadius: hp(5),
        backgroundColor: '#E5E5E5'
    },
    instantProgressView: {
        position: 'absolute',
        height: hp(3),
        borderRadius: hp(5),
        backgroundColor: '#FF9900',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    solvedQuestionCircle: {
        height: hp(5.3),
        width: hp(5.3),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hp(100),
        borderWidth: hp(0.25)
    },
    solvedQuestionsText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2),
        color: '#FFFFFF'
    },
    questionGoalView: {
        height: hp(6.5),
        width: wp(85),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    questionGoalText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2.75),
        marginTop: hp(0.75),
        color: '#2E313C'
    },
    modalContainer: {
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
    }
})
