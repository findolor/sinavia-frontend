import React from 'react'
import { ProgressCircle } from 'react-native-svg-charts'
import Rheostat from 'react-native-rheostat'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { statisticsServices } from '../../../sagas/statistic'
import styles from '../statisticsScreen/style'
import DropDown from '../../../components/mainScreen/dropdown/dropdown'
import NotchView from '../../../components/notchView'
import returnLogo from '../../../assets/return.png'
import { navigationPop } from '../../../services/navigationService'
import Moment from 'moment'
import 'moment/locale/tr'
import SemiCircleProgress from '../../../components/semiCircleProgress'
import { connect } from 'react-redux'

const timezonesList = ['Bu hafta', 'Bu ay', 'Son 6 ay', 'Ay seçin']

class Statistics extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            thisWeek: { values: [0, 6] },
            thisMonth: { values: [0, 30] },
            lastSixMonths: { values: [0, 5] },
            courseList: [],
            subjectList: [],
            subjectListDefaultValue: '',
            isSubjectDropdownVisible: false,
            timezone: 'Bu hafta',
            startDate: null,
            endDate: null,
            wons: 0,
            losts: 0,
            draws: 0,
            corrects: 0,
            incorrects: 0,
            unanswereds: 0,
            wonPercentage: 0,
            correctPercentage: 0,
            incorrectPercentage: 0,
            unansweredPercentage: 0,
            // Choosen game contents
            choosenExamId: null,
            choosenCourseId: null,
            choosenSubjectId: null,
            // User statistics lists
            originalWeeklyStatList: [],
            weeklyStatList: [],
            originalMonthlyStatList: [],
            monthlyStatList: [],
            originalSixMonthsStatList: [],
            sixMonthsStatList: [],
            // Variables to check if we fetched the other times
            isMonthlyFetched: false,
            isSixMonthsFetched: false,
            // Total solved questions
            totalSolvedQuestions: 0
        }
    }

    componentDidMount() {
        this.setChoosenExamId().then(() => {
            this.fetchStatistics().then(data => {
                this.makeStatistics(data, this.weeklyRheostatValueUpdate, {
                    max: 6,
                    min: 0,
                    values: [0, 6]
                })
            })
        })

        this.courseListMaker()
    }

    makeStatistics = (data, rheostatFunction, rheostatFunctionParams) => {
        const statisticsList = []
        data.forEach(statistic => {
            delete statistic.earnedPoints
            statistic.createdAt = Moment(statistic.createdAt).format(
                'YYYY-MM-DD'
            )
            statisticsList.push(statistic)
        })
        switch (this.state.timezone) {
            case 'Bu hafta':
                this.setState(
                    {
                        weeklyStatList: statisticsList,
                        originalWeeklyStatList: statisticsList
                    },
                    () => {
                        setTimeout(() => {
                            rheostatFunction(rheostatFunctionParams)
                        }, 50)
                    }
                )
                break
            case 'Bu ay':
                this.setState(
                    {
                        monthlyStatList: statisticsList,
                        originalMonthlyStatList: statisticsList
                    },
                    () => {
                        setTimeout(() => {
                            rheostatFunction(rheostatFunctionParams)
                        }, 50)
                    }
                )
                break
            case 'Son 6 ay':
                this.setState(
                    {
                        sixMonthsStatList: statisticsList,
                        originalSixMonthsStatList: statisticsList
                    },
                    () => {
                        setTimeout(() => {
                            rheostatFunction(rheostatFunctionParams)
                        }, 50)
                    }
                )
                break
        }
    }

    // Fetching the statistics based on the selected time
    fetchStatistics = async () => {
        switch (this.state.timezone) {
            case 'Bu hafta':
                return statisticsServices.getWeeklyStatistics(
                    this.props.clientToken,
                    this.props.clientDBId,
                    { examId: this.state.choosenExamId }
                )
            case 'Bu ay':
                return statisticsServices.getMonthlyStatistics(
                    this.props.clientToken,
                    this.props.clientDBId,
                    { examId: this.state.choosenExamId }
                )
            case 'Son 6 ay':
                return statisticsServices.getLastSixMonthsStatistics(
                    this.props.clientToken,
                    this.props.clientDBId,
                    { examId: this.state.choosenExamId }
                )
        }
    }

    // This function runs when the screen is opened
    courseListMaker = () => {
        const courseList = ['Genel']
        let index = this.props.gameContentMap.exams.findIndex(
            x => x.name === this.props.choosenExam
        )
        let examId = this.props.gameContentMap.exams[index].id
        this.props.gameContentMap.courses.forEach(course => {
            if (course.examId === examId) courseList.push(course.name)
        })

        this.setState({ courseList: courseList })
    }

    // We set the choosen exam id based on users choosen exam
    setChoosenExamId = async () => {
        new Promise.resolve().then(() => {
            let index = this.props.gameContentMap.exams.findIndex(
                x => x.name === this.props.choosenExam
            )
            let examId = this.props.gameContentMap.exams[index].id
            this.setState(
                {
                    choosenExamId: examId
                },
                () => {
                    return
                }
            )
        })
    }

    // Course name selector for dropdown
    pickerSelectCourse = (idx, value) => {
        this.setState({ isSubjectDropdownVisible: false })
        setTimeout(() => {
            this.selectCourseDropdown(idx)
        }, 200)
    }

    selectSubjectDropdown = (idx, value) => {
        let index = parseInt(idx, 10)
        if (index === 0) {
            this.setState({ subjectList: [], choosenSubjectId: null }, () => {
                this.refreshSubjectStatistics(true)
            })
            return
        } else {
            this.setState({ choosenSubjectId: index }, () => {
                this.refreshSubjectStatistics(false)
            })
        }
    }

    refreshCourseStatistics = isGeneral => {
        let statisticsList = []
        switch (this.state.timezone) {
            case 'Bu hafta':
                if (isGeneral) {
                    this.setState({
                        weeklyStatList: this.state.originalWeeklyStatList
                    })
                } else {
                    this.state.originalWeeklyStatList.forEach(statistic => {
                        if (statistic.courseId === this.state.choosenCourseId) {
                            statisticsList.push(statistic)
                        }
                    })
                    this.setState({ weeklyStatList: statisticsList })
                }
                setTimeout(() => {
                    this.weeklyRheostatValueUpdate({
                        max: 6,
                        min: 0,
                        values: [0, 6]
                    })
                }, 50)
                break
            case 'Bu ay':
                if (isGeneral) {
                    this.setState({
                        monthlyStatList: this.state.originalMonthlyStatList
                    })
                } else {
                    this.state.originalMonthlyStatList.forEach(statistic => {
                        if (statistic.courseId === this.state.choosenCourseId) {
                            statisticsList.push(statistic)
                        }
                    })
                    this.setState({ monthlyStatList: statisticsList })
                }
                setTimeout(() => {
                    this.monthlyRheostatValUpdated({
                        max: 30,
                        min: 0,
                        values: [0, 30]
                    })
                }, 50)
                break
            case 'Son 6 ay':
                if (isGeneral) {
                    this.setState({
                        sixMonthsStatList: this.state.originalSixMonthsStatList
                    })
                } else {
                    this.state.originalSixMonthsStatList.forEach(statistic => {
                        if (statistic.courseId === this.state.choosenCourseId) {
                            statisticsList.push(statistic)
                        }
                    })
                    this.setState({ sixMonthsStatList: statisticsList })
                }
                setTimeout(() => {
                    this.sixMonthsRheostatValUpdated({
                        max: 5,
                        min: 0,
                        values: [0, 5]
                    })
                }, 50)
                break
        }
    }

    refreshSubjectStatistics = isGeneral => {
        let statisticsList = []
        switch (this.state.timezone) {
            case 'Bu hafta':
                if (isGeneral) {
                    this.selectCourseDropdown(this.state.choosenCourseId)
                } else {
                    this.state.originalWeeklyStatList.forEach(statistic => {
                        if (
                            statistic.subjectId ===
                                this.state.choosenSubjectId &&
                            statistic.courseId === this.state.choosenCourseId
                        ) {
                            statisticsList.push(statistic)
                        }
                    })
                    this.setState({ weeklyStatList: statisticsList })
                }
                setTimeout(() => {
                    this.weeklyRheostatValueUpdate({
                        max: 6,
                        min: 0,
                        values: [0, 6]
                    })
                }, 50)
                break
            case 'Bu ay':
                if (isGeneral) {
                    this.selectCourseDropdown(this.state.choosenCourseId)
                } else {
                    this.state.originalMonthlyStatList.forEach(statistic => {
                        if (
                            statistic.subjectId ===
                                this.state.choosenSubjectId &&
                            statistic.courseId === this.state.choosenCourseId
                        ) {
                            statisticsList.push(statistic)
                        }
                    })
                    this.setState({ monthlyStatList: statisticsList })
                }
                setTimeout(() => {
                    this.monthlyRheostatValUpdated({
                        max: 30,
                        min: 0,
                        values: [0, 30]
                    })
                }, 50)
                break
            case 'Son 6 ay':
                if (isGeneral) {
                    this.selectCourseDropdown(this.state.choosenCourseId)
                } else {
                    this.state.originalSixMonthsStatList.forEach(statistic => {
                        if (
                            statistic.subjectId ===
                                this.state.choosenSubjectId &&
                            statistic.courseId === this.state.choosenCourseId
                        ) {
                            statisticsList.push(statistic)
                        }
                    })
                    this.setState({ sixMonthsStatList: statisticsList })
                }
                setTimeout(() => {
                    this.sixMonthsRheostatValUpdated({
                        max: 5,
                        min: 0,
                        values: [0, 5]
                    })
                }, 50)
                break
        }
    }

    // this index is the course id in gameContentMap
    selectCourseDropdown = index => {
        index = parseInt(index, 10)
        if (index === 0) {
            this.setState(
                {
                    subjectList: [],
                    choosenCourseId: null,
                    choosenSubjectId: null
                },
                () => {
                    this.refreshCourseStatistics(true)
                }
            )
            return
        }
        const subjectList = ['Hepsi']
        this.props.gameContentMap.subjects.forEach(subject => {
            if (subject.courseId === index) subjectList.push(subject.name)
        })
        this.setState(
            {
                subjectList: subjectList,
                subjectListDefaultValue: 'Hepsi',
                isSubjectDropdownVisible: true,
                choosenCourseId: index
            },
            () => {
                this.refreshCourseStatistics(false)
            }
        )
    }

    timezoneSelect = (idx, value) => {
        switch (value) {
            // Because we fetched this week at the start
            // We just use the same list and update the results again
            case 'Bu hafta':
                this.setState({ timezone: 'Bu hafta' }, () => {
                    if (this.state.choosenCourseId !== null) {
                        if (this.state.choosenSubjectId !== null) {
                            this.refreshSubjectStatistics(false)
                        } else {
                            this.refreshCourseStatistics(false)
                        }
                    } else this.refreshCourseStatistics(true)
                })
                break
            case 'Bu ay':
                this.setState({ timezone: 'Bu ay' }, () => {
                    // If we have fetched monthly list
                    // We dont fetch it again and use the same list
                    if (this.state.isMonthlyFetched) {
                        if (this.state.choosenCourseId !== null) {
                            if (this.state.choosenSubjectId !== null) {
                                this.refreshSubjectStatistics(false)
                            } else {
                                this.refreshCourseStatistics(false)
                            }
                        } else this.refreshCourseStatistics(true)
                    }
                    // If we havent fetched it before we get the results
                    else
                        this.fetchStatistics().then(data => {
                            this.setState({ isMonthlyFetched: true })
                            this.makeStatistics(
                                data,
                                this.monthlyRheostatValUpdated,
                                {
                                    max: 30,
                                    min: 0,
                                    values: [0, 30]
                                }
                            )
                            if (this.state.choosenCourseId !== null) {
                                if (this.state.choosenSubjectId !== null) {
                                    this.refreshSubjectStatistics(false)
                                } else {
                                    this.refreshCourseStatistics(false)
                                }
                            }
                        })
                })
                break
            case 'Son 6 ay':
                this.setState({ timezone: 'Son 6 ay' }, () => {
                    // If we have fetched three months list
                    // We dont fetch it again and use the same list
                    if (this.state.isSixMonthsFetched) {
                        if (this.state.choosenCourseId !== null) {
                            if (this.state.choosenSubjectId !== null) {
                                this.refreshSubjectStatistics(false)
                            } else {
                                this.refreshCourseStatistics(false)
                            }
                        } else this.refreshCourseStatistics(true)
                    }
                    // If we havent fetched it before we get the results
                    else
                        this.fetchStatistics().then(data => {
                            this.setState({ isSixMonthsFetched: true })
                            this.makeStatistics(
                                data,
                                this.sixMonthsRheostatValUpdated,
                                {
                                    max: 5,
                                    min: 0,
                                    values: [0, 5]
                                }
                            )
                            if (this.state.choosenCourseId !== null) {
                                if (this.state.choosenSubjectId !== null) {
                                    this.refreshSubjectStatistics(false)
                                } else {
                                    this.refreshCourseStatistics(false)
                                }
                            }
                        })
                })
                break
            case 'Ay seçin':
                this.setState({
                    timezone: 'Ay Seçin'
                })
                break
        }
    }

    backButtonOnPress = () => {
        navigationPop()
    }

    weeklyRheostatValueUpdate = payload => {
        let wonsCounter = 0,
            lostsCounter = 0,
            drawsCounter = 0,
            correctsCounter = 0,
            incorrectsCounter = 0,
            unansweredsCounter = 0,
            totalSolvedQuestions = 0
        this.setState({
            thisWeek: payload,
            startDate: Moment.utc()
                .startOf('week')
                .add(payload.values[0], 'days')
                .format('YYYY-MM-DD'),
            endDate: Moment.utc()
                .startOf('week')
                .add(payload.values[1], 'days')
                .format('YYYY-MM-DD')
        })
        this.state.weeklyStatList.forEach(statistic => {
            if (
                statistic.createdAt >= this.state.startDate &&
                statistic.createdAt <= this.state.endDate
            ) {
                totalSolvedQuestions++
                switch (statistic.gameResult) {
                    case 'won':
                        wonsCounter++
                        break
                    case 'lost':
                        lostsCounter++
                        break
                    case 'draw':
                        drawsCounter++
                        break
                }
                correctsCounter += statistic.correctNumber
                incorrectsCounter += statistic.incorrectNumber
                unansweredsCounter += statistic.unansweredNumber
            }
        })
        let totalSolved =
            correctsCounter + incorrectsCounter + unansweredsCounter
        this.setState({
            wons: wonsCounter,
            losts: lostsCounter,
            draws: drawsCounter,
            totalSolvedQuestions: totalSolvedQuestions,
            corrects: correctsCounter,
            incorrects: incorrectsCounter,
            unanswereds: unansweredsCounter,
            wonPercentage:
                (wonsCounter / (wonsCounter + lostsCounter + drawsCounter)) *
                100,
            correctPercentage:
                totalSolved === 0 ? 0 : (correctsCounter / totalSolved) * 100,
            incorrectPercentage:
                totalSolved === 0 ? 0 : (incorrectsCounter / totalSolved) * 100,
            unansweredPercentage:
                totalSolved === 0 ? 0 : (unansweredsCounter / totalSolved) * 100
        })
    }

    monthlyRheostatValUpdated = payload => {
        let wonsCounter = 0,
            lostsCounter = 0,
            drawsCounter = 0,
            correctsCounter = 0,
            incorrectsCounter = 0,
            unansweredsCounter = 0
        this.setState({
            thisMonth: payload,
            startDate: Moment.utc()
                .startOf('month')
                .add(payload.values[0], 'days')
                .format('YYYY-MM-DD'),
            endDate: Moment.utc()
                .startOf('month')
                .add(payload.values[1], 'days')
                .format('YYYY-MM-DD')
        })
        this.state.monthlyStatList.forEach(statistic => {
            if (
                statistic.createdAt >= this.state.startDate &&
                statistic.createdAt <= this.state.endDate
            ) {
                switch (statistic.gameResult) {
                    case 'won':
                        wonsCounter++
                        break
                    case 'lost':
                        lostsCounter++
                        break
                    case 'draw':
                        drawsCounter++
                        break
                    case null:
                }
                correctsCounter += statistic.correctNumber
                incorrectsCounter += statistic.incorrectNumber
                unansweredsCounter += statistic.unansweredNumber
            }
        })
        let totalSolved =
            correctsCounter + incorrectsCounter + unansweredsCounter
        this.setState({
            wons: wonsCounter,
            losts: lostsCounter,
            draws: drawsCounter,
            corrects: correctsCounter,
            incorrects: incorrectsCounter,
            unanswereds: unansweredsCounter,
            wonPercentage:
                (wonsCounter / (wonsCounter + lostsCounter + drawsCounter)) *
                100,
            correctPercentage:
                totalSolved === 0 ? 0 : (correctsCounter / totalSolved) * 100,
            incorrectPercentage:
                totalSolved === 0 ? 0 : (incorrectsCounter / totalSolved) * 100,
            unansweredPercentage:
                totalSolved === 0 ? 0 : (unansweredsCounter / totalSolved) * 100
        })
    }

    sixMonthsRheostatValUpdated = payload => {
        let wonsCounter = 0,
            lostsCounter = 0,
            drawsCounter = 0,
            correctsCounter = 0,
            incorrectsCounter = 0,
            unansweredsCounter = 0
        this.setState({
            lastSixMonths: payload,
            startDate: Moment.utc()
                .startOf('month')
                .subtract(5 - payload.values[0], 'months')
                .format('YYYY-MM-DD'),
            endDate: Moment.utc()
                .endOf('month')
                .subtract(5 - payload.values[1], 'months')
                .format('YYYY-MM-DD')
        })
        this.state.sixMonthsStatList.forEach(statistic => {
            if (
                statistic.createdAt >= this.state.startDate &&
                statistic.createdAt <= this.state.endDate
            ) {
                switch (statistic.gameResult) {
                    case 'won':
                        wonsCounter++
                        break
                    case 'lost':
                        lostsCounter++
                        break
                    case 'draw':
                        drawsCounter++
                        break
                }
                correctsCounter += statistic.correctNumber
                incorrectsCounter += statistic.incorrectNumber
                unansweredsCounter += statistic.unansweredNumber
            }
        })
        let totalSolved =
            correctsCounter + incorrectsCounter + unansweredsCounter
        this.setState({
            wons: wonsCounter,
            losts: lostsCounter,
            draws: drawsCounter,
            corrects: correctsCounter,
            incorrects: incorrectsCounter,
            unanswereds: unansweredsCounter,
            wonPercentage:
                (wonsCounter / (wonsCounter + lostsCounter + drawsCounter)) *
                100,
            correctPercentage:
                totalSolved === 0 ? 0 : (correctsCounter / totalSolved) * 100,
            incorrectPercentage:
                totalSolved === 0 ? 0 : (incorrectsCounter / totalSolved) * 100,
            unansweredPercentage:
                totalSolved === 0 ? 0 : (unansweredsCounter / totalSolved) * 100
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView />
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.backButtonOnPress}>
                        <Image source={returnLogo} style={styles.returnLogo} />
                    </TouchableOpacity>
                </View>
                <View style={styles.dropdownsContainer}>
                    <DropDown
                        style={styles.picker}
                        textStyle={styles.pickerText}
                        dropdownTextStyle={styles.pickerDropdownText}
                        dropdownStyle={styles.pickerDropdown}
                        defaultValue={'Genel'}
                        options={this.state.courseList}
                        onSelect={(idx, value) =>
                            this.pickerSelectCourse(idx, value)
                        }
                    />
                    {this.state.isSubjectDropdownVisible && (
                        <View style={styles.dropdownContainer}>
                            <DropDown
                                style={styles.picker}
                                textStyle={styles.pickerText}
                                dropdownTextStyle={styles.pickerDropdownText}
                                dropdownStyle={styles.pickerDropdown}
                                defaultValue={
                                    this.state.subjectListDefaultValue
                                }
                                options={this.state.subjectList}
                                onSelect={(idx, value) =>
                                    this.selectSubjectDropdown(idx, value)
                                }
                            />
                        </View>
                    )}
                </View>
                <View style={styles.statisticsContainer}>
                    <View style={styles.timeZoneDropdownsContainer}>
                        <DropDown
                            style={styles.picker}
                            textStyle={styles.pickerText}
                            dropdownTextStyle={styles.pickerDropdownText}
                            dropdownStyle={styles.pickerDropdown}
                            defaultValue={this.state.timezone}
                            options={timezonesList}
                            onSelect={(idx, value) =>
                                this.timezoneSelect(idx, value)
                            }
                        />
                    </View>
                    <View style={styles.totalGameStatsContainer}>
                        <View style={styles.totalGameStatsInfosContainer}>
                            <Text
                                style={
                                    styles.totalGamesPlayedAndSolvedQuestionsCounter
                                }
                            >
                                {this.state.totalSolvedQuestions}
                            </Text>
                            <Text
                                style={
                                    styles.totalGamesPlayedAndSolvedQuestionsText
                                }
                            >
                                Oynadığın Oyun
                            </Text>
                            <Text style={styles.wonText}>
                                Kazandığı: {this.state.wons}
                            </Text>
                            <Text style={styles.drawText}>
                                Beraberlik: {this.state.draws}
                            </Text>
                            <Text style={styles.lostText}>
                                Kaybettiği: {this.state.losts}
                            </Text>
                        </View>
                        <View style={styles.semiCircleContainer}>
                            <SemiCircleProgress
                                percentage={
                                    (this.state.wons /
                                        (this.state.wons +
                                            this.state.losts +
                                            this.state.draws)) *
                                    100
                                }
                                progressColor={'#00D9EF'}
                                circleRadius={wp(20)}
                                animationSpeed={0.1}
                                progressWidth={wp(5)}
                            >
                                <Text style={styles.chartPercentageText}>
                                    {this.state.wons +
                                        this.state.losts +
                                        this.state.draws ===
                                    0
                                        ? '0'
                                        : (
                                              (this.state.wons /
                                                  (this.state.wons +
                                                      this.state.losts +
                                                      this.state.draws)) *
                                              100
                                          ).toFixed(0)}
                                    %
                                </Text>
                            </SemiCircleProgress>
                        </View>
                    </View>
                    <View style={styles.percentagesAndCirclesContainer}>
                        <View style={styles.percentagesContainer}>
                            <View style={styles.totalQuestionsSolvedContainer}>
                                <Text
                                    style={
                                        styles.totalGamesPlayedAndSolvedQuestionsCounter
                                    }
                                >
                                    {this.state.corrects +
                                        this.state.incorrects +
                                        this.state.unanswereds}
                                </Text>
                                <Text
                                    style={
                                        styles.totalGamesPlayedAndSolvedQuestionsText
                                    }
                                >
                                    Çözülen Soru
                                </Text>
                            </View>
                            <View style={styles.percentageContainer}>
                                <View style={styles.correctPoint} />
                                <View style={styles.percentagesTextView}>
                                    <Text style={styles.optionsText}>
                                        DOĞRU
                                    </Text>
                                    <Text style={styles.percentagesText}>
                                        {this.state.corrects} -{' '}
                                        {this.state.correctPercentage.toFixed(
                                            2
                                        )}
                                        %
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.percentageContainer}>
                                <View style={styles.incorrectPoint} />
                                <View style={styles.percentagesTextView}>
                                    <Text style={styles.optionsText}>
                                        YANLIŞ
                                    </Text>
                                    <Text style={styles.percentagesText}>
                                        {this.state.incorrects} -{' '}
                                        {this.state.incorrectPercentage.toFixed(
                                            2
                                        )}
                                        %
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.percentageContainer}>
                                <View style={styles.unansweredPoint} />
                                <View style={styles.percentagesTextView}>
                                    <Text style={styles.optionsText}>BOŞ</Text>
                                    <Text style={styles.percentagesText}>
                                        {this.state.unanswereds} -{' '}
                                        {this.state.unansweredPercentage.toFixed(
                                            2
                                        )}
                                        %
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.circlesContainer}>
                            <ProgressCircle
                                style={styles.correctCircle}
                                progress={
                                    this.state.corrects /
                                    (this.state.corrects +
                                        this.state.incorrects +
                                        this.state.unanswereds)
                                }
                                progressColor={'#6AC259'}
                                strokeWidth={hp(2.2)}
                                startAngle={70}
                            />
                            <ProgressCircle
                                style={styles.incorrectCircle}
                                progress={
                                    this.state.incorrects /
                                    (this.state.corrects +
                                        this.state.incorrects +
                                        this.state.unanswereds)
                                }
                                progressColor={'#B72A2A'}
                                strokeWidth={hp(2.2)}
                                startAngle={135}
                            />
                            <ProgressCircle
                                style={styles.unansweredCircle}
                                progress={
                                    this.state.unanswereds /
                                    (this.state.corrects +
                                        this.state.incorrects +
                                        this.state.unanswereds)
                                }
                                progressColor={'#00D9EF'}
                                strokeWidth={hp(2.2)}
                                startAngle={30}
                            />
                        </View>
                    </View>
                    <View style={styles.timezoneChartContainer}>
                        <View style={styles.timezonesTextView}>
                            {this.state.timezone === 'Bu hafta' && (
                                <Text style={styles.timezonesText}>
                                    {Moment.utc()
                                        .startOf('week')
                                        .add(
                                            this.state.thisWeek.values[0],
                                            'days'
                                        )
                                        .format('dddd')}
                                    -
                                    {Moment.utc()
                                        .startOf('week')
                                        .add(
                                            this.state.thisWeek.values[1],
                                            'days'
                                        )
                                        .format('dddd')}
                                </Text>
                            )}
                            {this.state.timezone === 'Bu ay' && (
                                <Text style={styles.timezonesText}>
                                    {Moment.utc()
                                        .startOf('month')
                                        .add(
                                            this.state.thisMonth.values[0],
                                            'days'
                                        )
                                        .format('LL')}
                                    -
                                    {Moment.utc()
                                        .startOf('month')
                                        .add(
                                            this.state.thisMonth.values[1],
                                            'days'
                                        )
                                        .format('LL')}
                                </Text>
                            )}
                            {this.state.timezone === 'Son 6 ay' && (
                                <Text style={styles.timezonesTextLastMonths}>
                                    {Moment.utc()
                                        .startOf('month')
                                        .subtract(
                                            5 -
                                                this.state.lastSixMonths
                                                    .values[0],
                                            'months'
                                        )
                                        .format('MMM YYYY')}
                                    /
                                    {Moment.utc()
                                        .startOf('month')
                                        .subtract(
                                            5 -
                                                this.state.lastSixMonths
                                                    .values[1],
                                            'months'
                                        )
                                        .format('MMM YYYY')}
                                </Text>
                            )}
                        </View>
                        <View style={styles.barRheostatContainer}>
                            {this.state.timezone === 'Bu hafta' && (
                                <Rheostat
                                    values={[0, 6]}
                                    min={0}
                                    max={6}
                                    theme={{
                                        rheostat: {
                                            themeColor: '#00D9EF',
                                            grey: '#CACACA'
                                        }
                                    }}
                                    snap={false}
                                    onValuesUpdated={
                                        this.weeklyRheostatValueUpdate
                                    }
                                />
                            )}
                            {this.state.timezone === 'Bu ay' && (
                                <Rheostat
                                    values={[0, 30]}
                                    min={0}
                                    max={30}
                                    theme={{
                                        rheostat: {
                                            themeColor: '#00D9EF',
                                            grey: '#CACACA'
                                        }
                                    }}
                                    snap={false}
                                    onValuesUpdated={
                                        this.monthlyRheostatValUpdated
                                    }
                                />
                            )}
                            {this.state.timezone === 'Son 6 ay' && (
                                <Rheostat
                                    values={[0, 5]}
                                    min={0}
                                    max={5}
                                    theme={{
                                        rheostat: {
                                            themeColor: '#00D9EF',
                                            grey: '#CACACA'
                                        }
                                    }}
                                    snap={true}
                                    onValuesUpdated={
                                        this.sixMonthsRheostatValUpdated
                                    }
                                />
                            )}
                        </View>
                    </View>
                </View>
                <View style={styles.spaceView} />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    choosenExam: state.gameContent.choosenExam,
    gameContentMap: state.gameContent.gameContentMap,
    clientToken: state.client.clientToken,
    clientDBId: state.client.clientDBId
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    null
)(Statistics)
