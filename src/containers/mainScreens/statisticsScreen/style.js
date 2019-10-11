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
    dropdownsContainer: {
        flex: 9,
        width: wp(88),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    statisticsContainer: {
        flex: 78,
        width: wp(88),
        borderColor: '#FF9900',
        borderWidth: wp(0.5),
        borderRadius: 6,
        alignItems: 'center'
    },
    spaceView: {
        flex: 3
    },
    returnLogo: {
        height: hp(3.5),
        width: hp(3.5)
    },
    picker: {
        height: hp(7),
        width: wp(40),
        borderColor: '#FF9900',
        borderWidth: wp(0.5),
        borderRadius: 6,
        marginTop: hp(0.5)
    },
    pickerText: {
        marginTop: hp(1.3),
        marginBottom: hp(1),
        marginLeft: wp(1),
        marginRight: wp(1),
        fontFamily: 'Averta-Bold',
        fontSize: hp(2),
        color: '#2E313C',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    pickerDropdownText: {
        marginTop: hp(1.3),
        marginBottom: hp(1),
        marginLeft: wp(1),
        marginRight: wp(1),
        fontFamily: 'Averta-Bold',
        fontSize: hp(2),
        color: '#2E313C',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    pickerDropdown: {
        height: hp(38),
        width: wp(40),
        borderColor: '#FF9900',
        borderWidth: wp(0.5),
        borderRadius: 6,
        marginTop: hp(0.5),
        marginLeft: wp(-0.5)
    },
    percentagesAndCirclesContainer: {
        height: hp(32),
        width: wp(82),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: wp(0.3),
        borderColor: '#CACACA'
    },
    totalQuestionsSolvedContainer: {
        height: hp(9),
        width: wp(34),
        justifyContent: 'flex-start'
    },
    percentagesContainer: {
        height: hp(32),
        width: wp(34),
        justifyContent: 'center'
    },
    circlesContainer: {
        height: hp(25),
        width: wp(54),
        justifyContent: 'center',
        alignItems: 'center'
    },
    correctCircle: {
        height: hp(24),
        width: hp(26)
    },
    incorrectCircle: {
        height: hp(16),
        width: hp(18),
        position: 'absolute'
    },
    unansweredCircle: {
        height: hp(8),
        width: hp(10),
        position: 'absolute'
    },
    wonPercentageSemiCircle: {
        height: hp(20),
        width: hp(22),
        marginTop: hp(1),
        position: 'absolute'
    },
    percentageContainer: {
        height: hp(6),
        width: wp(34),
        flexDirection: 'row',
        marginLeft: wp(2)
    },
    percentagesTextView: {
        height: hp(6)
    },
    correctPoint: {
        height: hp(1.75),
        width: hp(1.75),
        backgroundColor: '#6AC259',
        borderRadius: 2,
        marginTop: hp(0.4),
        marginLeft: wp(6.5)
    },
    incorrectPoint: {
        height: hp(1.75),
        width: hp(1.75),
        backgroundColor: '#B72A2A',
        borderRadius: 2,
        marginTop: hp(0.4),
        marginLeft: wp(6.5)
    },
    unansweredPoint: {
        height: hp(1.75),
        width: hp(1.75),
        backgroundColor: '#00D9EF',
        borderRadius: 2,
        marginTop: hp(0.4),
        marginLeft: wp(6.5)
    },
    optionsText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2),
        color: '#AEAEAE',
        marginLeft: wp(2)
    },
    percentagesText: {
        fontFamily: 'Averta-RegularItalic',
        fontSize: hp(2),
        color: '#2E313C',
        marginLeft: wp(2)
    },
    timeZoneDropdownsContainer: {
        height: hp(9),
        width: wp(88),
        justifyContent: 'center',
        alignItems: 'center'
    },
    timezoneChartContainer: {
        height: hp(15),
        width: wp(88),
        justifyContent: 'center',
        alignItems: 'center'
    },
    barRheostatContainer: {
        height: hp(6),
        width: wp(75)
    },
    timezonesTextView: {
        height: hp(6),
        width: wp(88),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    timezonesText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2.5),
        color: '#2E313C',
        marginBottom: hp(1)
    },
    timezonesTextLastMonths: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2.2),
        color: '#2E313C',
        marginBottom: hp(1)
    },
    totalGameStatsInfosContainer: {
        height: hp(16),
        width: wp(34)
    },
    totalGameStatsText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(2.3),
        color: '#2E313C',
        marginLeft: wp(4)
    },
    totalGamesPlayedAndSolvedQuestionsCounter: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(4),
        color: '#2E313C',
        marginLeft: wp(8.5)
    },
    totalGamesPlayedAndSolvedQuestionsText: {
        fontFamily: 'Averta-Semibold',
        fontSize: hp(1.8),
        color: '#CACACA',
        marginLeft: wp(8.5)
    },
    wonText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(1.8),
        color: '#6AC259',
        marginLeft: wp(8.5),
        marginTop: hp(0.8)
    },
    drawText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(1.8),
        color: '#2E313C',
        marginLeft: wp(8.5)
    },
    lostText: {
        fontFamily: 'Averta-Regular',
        fontSize: hp(1.8),
        color: '#B72A2A',
        marginLeft: wp(8.5)
    },
    semiCircleContainer: {
        height: hp(16),
        width: wp(54),
        justifyContent: 'center',
        alignItems: 'center'
    },
    chartPercentageText: {
        fontFamily: 'Averta-BoldItalic',
        fontSize: hp(4),
        color: '#FF9900'
    },
    totalGameStatsContainer: {
        height: hp(21),
        width: wp(82),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: wp(0.3),
        borderColor: '#CACACA'
    },
    scrollViewContainer: {
        width: wp(82)
    }
})
