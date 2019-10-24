import React from 'react'
import { ProgressCircle } from 'react-native-svg-charts'
import Rheostat from 'react-native-rheostat'
import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native'
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
import Swiper from 'react-native-swiper'
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
            // Ranked game variables
            totalRankedWin: 0,
            totalRankedLose: 0,
            totalRankedDraw: 0,
            totalRankedGames: 0,
            rankedWinPercentage: 0,
            totalRankedCorrect: 0,
            totalRankedIncorrect: 0,
            totalRankedUnanswered: 0,
            rankedTotalSolved: 0,
            rankedCorrectPercentage: 0,
            rankedIncorrectPercentage: 0,
            rankedUnansweredPercentage: 0,
            // Friend game variables
            totalFriendWin: 0,
            totalFriendLose: 0,
            totalFriendDraw: 0,
            totalFriendGames: 0,
            friendWinPercentage: 0,
            totalFriendCorrect: 0,
            totalFriendIncorrect: 0,
            totalFriendUnanswered: 0,
            friendTotalSolved: 0,
            friendCorrectPercentage: 0,
            friendIncorrectPercentage: 0,
            friendUnansweredPercentage: 0,
            // Question variables
            totalCorrect: 0,
            totalIncorrect: 0,
            totalUnanswered: 0,
            totalQuestionsSolved: 0,
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
            isSixMonthsFetched: false
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
        // Ranked
        let rankedWinCounter = 0,
            rankedLoseCounter = 0,
            rankedDrawCounter = 0,
            rankedCorrectCounter = 0,
            rankedIncorrectCounter = 0,
            rankedUnansweredCounter = 0,
            rankedTotalGames = 0,
            rankedTotalSolved = 0
        // Friend
        let friendWinCounter = 0,
            friendLoseCounter = 0,
            friendDrawCounter = 0,
            friendCorrectCounter = 0,
            friendIncorrectCounter = 0,
            friendUnansweredCounter = 0,
            friendTotalGames = 0,
            friendTotalSolved = 0
        // Question counters
        let correctCounter = 0,
            incorrectCounter = 0,
            unansweredCounter = 0,
            totalQuestionsSolved = 0

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
                if (
                    statistic.gameResult &&
                    (statistic.earnedPoints || statistic.earnedPoints === 0)
                ) {
                    rankedTotalGames++
                    switch (statistic.gameResult) {
                        case 'won':
                            rankedWinCounter++
                            break
                        case 'lost':
                            rankedLoseCounter++
                            break
                        case 'draw':
                            rankedDrawCounter++
                            break
                    }
                    correctCounter += statistic.correctNumber
                    incorrectCounter += statistic.incorrectNumber
                    unansweredCounter += statistic.unansweredNumber
                    rankedCorrectCounter += statistic.correctNumber
                    rankedIncorrectCounter += statistic.incorrectNumber
                    rankedUnansweredCounter += statistic.unansweredNumber
                } else if (statistic.gameResult) {
                    friendTotalGames++
                    switch (statistic.gameResult) {
                        case 'won':
                            friendWinCounter++
                            break
                        case 'lost':
                            friendLoseCounter++
                            break
                        case 'draw':
                            friendDrawCounter++
                            break
                    }
                    correctCounter += statistic.correctNumber
                    incorrectCounter += statistic.incorrectNumber
                    unansweredCounter += statistic.unansweredNumber
                    friendCorrectCounter += statistic.correctNumber
                    friendIncorrectCounter += statistic.incorrectNumber
                    friendUnansweredCounter += statistic.unansweredNumber
                }
            }
        })
        rankedTotalSolved =
            rankedCorrectCounter +
            rankedIncorrectCounter +
            rankedUnansweredCounter
        friendTotalSolved =
            friendCorrectCounter +
            friendIncorrectCounter +
            friendUnansweredCounter
        totalQuestionsSolved =
            correctCounter + incorrectCounter + unansweredCounter

        this.setState({
            // Ranked game variables
            totalRankedWin: rankedWinCounter,
            totalRankedLose: rankedLoseCounter,
            totalRankedDraw: rankedDrawCounter,
            totalRankedGames: rankedTotalGames,
            rankedWinPercentage: (rankedWinCounter / rankedTotalGames) * 100,
            rankedCorrectPercentage:
                rankedTotalSolved === 0
                    ? 0
                    : (rankedCorrectCounter / rankedTotalSolved) * 100,
            rankedIncorrectPercentage:
                rankedTotalSolved === 0
                    ? 0
                    : (rankedIncorrectCounter / rankedTotalSolved) * 100,
            rankedUnansweredPercentage:
                rankedTotalSolved === 0
                    ? 0
                    : (rankedUnansweredCounter / rankedTotalSolved) * 100,
            rankedTotalSolved: rankedTotalSolved,
            totalRankedCorrect: rankedCorrectCounter,
            totalRankedIncorrect: rankedIncorrectCounter,
            totalRankedUnanswered: rankedUnansweredCounter,
            // Friend game variables
            totalFriendWin: friendWinCounter,
            totalFriendLose: friendLoseCounter,
            totalFriendDraw: friendDrawCounter,
            totalFriendGames: friendTotalGames,
            friendWinPercentage: (friendWinCounter / friendTotalGames) * 100,
            friendCorrectPercentage:
                friendTotalSolved === 0
                    ? 0
                    : (friendCorrectCounter / friendTotalSolved) * 100,
            friendIncorrectPercentage:
                friendTotalSolved === 0
                    ? 0
                    : (friendIncorrectCounter / friendTotalSolved) * 100,
            friendUnansweredPercentage:
                friendTotalSolved === 0
                    ? 0
                    : (friendUnansweredCounter / friendTotalSolved) * 100,
            totalFriendCorrect: friendCorrectCounter,
            totalFriendIncorrect: friendIncorrectCounter,
            totalFriendUnanswered: friendUnansweredCounter,
            // Question variables
            totalCorrect: correctCounter,
            totalIncorrect: incorrectCounter,
            totalUnanswered: unansweredCounter,
            totalQuestionsSolved: totalQuestionsSolved
        })
    }

    monthlyRheostatValUpdated = payload => {
        // Ranked
        let rankedWinCounter = 0,
            rankedLoseCounter = 0,
            rankedDrawCounter = 0,
            rankedCorrectCounter = 0,
            rankedIncorrectCounter = 0,
            rankedUnansweredCounter = 0,
            rankedTotalGames = 0,
            rankedTotalSolved = 0
        // Friend
        let friendWinCounter = 0,
            friendLoseCounter = 0,
            friendDrawCounter = 0,
            friendCorrectCounter = 0,
            friendIncorrectCounter = 0,
            friendUnansweredCounter = 0,
            friendTotalGames = 0,
            friendTotalSolved = 0
        // Question counters
        let correctCounter = 0,
            incorrectCounter = 0,
            unansweredCounter = 0,
            totalQuestionsSolved = 0

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
                if (
                    statistic.gameResult &&
                    (statistic.earnedPoints || statistic.earnedPoints === 0)
                ) {
                    rankedTotalGames++
                    switch (statistic.gameResult) {
                        case 'won':
                            rankedWinCounter++
                            break
                        case 'lost':
                            rankedLoseCounter++
                            break
                        case 'draw':
                            rankedDrawCounter++
                            break
                    }
                    correctCounter += statistic.correctNumber
                    incorrectCounter += statistic.incorrectNumber
                    unansweredCounter += statistic.unansweredNumber
                    rankedCorrectCounter += statistic.correctNumber
                    rankedIncorrectCounter += statistic.incorrectNumber
                    rankedUnansweredCounter += statistic.unansweredNumber
                } else if (statistic.gameResult) {
                    friendTotalGames++
                    switch (statistic.gameResult) {
                        case 'won':
                            friendWinCounter++
                            break
                        case 'lost':
                            friendLoseCounter++
                            break
                        case 'draw':
                            friendDrawCounter++
                            break
                    }
                    correctCounter += statistic.correctNumber
                    incorrectCounter += statistic.incorrectNumber
                    unansweredCounter += statistic.unansweredNumber
                    friendCorrectCounter += statistic.correctNumber
                    friendIncorrectCounter += statistic.incorrectNumber
                    friendUnansweredCounter += statistic.unansweredNumber
                }
            }
        })
        rankedTotalSolved =
            rankedCorrectCounter +
            rankedIncorrectCounter +
            rankedUnansweredCounter
        friendTotalSolved =
            friendCorrectCounter +
            friendIncorrectCounter +
            friendUnansweredCounter
        totalQuestionsSolved =
            correctCounter + incorrectCounter + unansweredCounter

        this.setState({
            // Ranked game variables
            totalRankedWin: rankedWinCounter,
            totalRankedLose: rankedLoseCounter,
            totalRankedDraw: rankedDrawCounter,
            totalRankedGames: rankedTotalGames,
            rankedWinPercentage: (rankedWinCounter / rankedTotalGames) * 100,
            rankedCorrectPercentage:
                rankedTotalSolved === 0
                    ? 0
                    : (rankedCorrectCounter / rankedTotalSolved) * 100,
            rankedIncorrectPercentage:
                rankedTotalSolved === 0
                    ? 0
                    : (rankedIncorrectCounter / rankedTotalSolved) * 100,
            rankedUnansweredPercentage:
                rankedTotalSolved === 0
                    ? 0
                    : (rankedUnansweredCounter / rankedTotalSolved) * 100,
            rankedTotalSolved: rankedTotalSolved,
            totalRankedCorrect: rankedCorrectCounter,
            totalRankedIncorrect: rankedIncorrectCounter,
            totalRankedUnanswered: rankedUnansweredCounter,
            // Friend game variables
            totalFriendWin: friendWinCounter,
            totalFriendLose: friendLoseCounter,
            totalFriendDraw: friendDrawCounter,
            totalFriendGames: friendTotalGames,
            friendWinPercentage: (friendWinCounter / friendTotalGames) * 100,
            friendCorrectPercentage:
                friendTotalSolved === 0
                    ? 0
                    : (friendCorrectCounter / friendTotalSolved) * 100,
            friendIncorrectPercentage:
                friendTotalSolved === 0
                    ? 0
                    : (friendIncorrectCounter / friendTotalSolved) * 100,
            friendUnansweredPercentage:
                friendTotalSolved === 0
                    ? 0
                    : (friendUnansweredCounter / friendTotalSolved) * 100,
            totalFriendCorrect: friendCorrectCounter,
            totalFriendIncorrect: friendIncorrectCounter,
            totalFriendUnanswered: friendUnansweredCounter,
            // Question variables
            totalCorrect: correctCounter,
            totalIncorrect: incorrectCounter,
            totalUnanswered: unansweredCounter,
            totalQuestionsSolved: totalQuestionsSolved
        })
    }

    sixMonthsRheostatValUpdated = payload => {
        // Ranked
        let rankedWinCounter = 0,
            rankedLoseCounter = 0,
            rankedDrawCounter = 0,
            rankedCorrectCounter = 0,
            rankedIncorrectCounter = 0,
            rankedUnansweredCounter = 0,
            rankedTotalGames = 0,
            rankedTotalSolved = 0
        // Friend
        let friendWinCounter = 0,
            friendLoseCounter = 0,
            friendDrawCounter = 0,
            friendCorrectCounter = 0,
            friendIncorrectCounter = 0,
            friendUnansweredCounter = 0,
            friendTotalGames = 0,
            friendTotalSolved = 0
        // Question counters
        let correctCounter = 0,
            incorrectCounter = 0,
            unansweredCounter = 0,
            totalQuestionsSolved = 0

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
                if (
                    statistic.gameResult &&
                    (statistic.earnedPoints || statistic.earnedPoints === 0)
                ) {
                    rankedTotalGames++
                    switch (statistic.gameResult) {
                        case 'won':
                            rankedWinCounter++
                            break
                        case 'lost':
                            rankedLoseCounter++
                            break
                        case 'draw':
                            rankedDrawCounter++
                            break
                    }
                    correctCounter += statistic.correctNumber
                    incorrectCounter += statistic.incorrectNumber
                    unansweredCounter += statistic.unansweredNumber
                    rankedCorrectCounter += statistic.correctNumber
                    rankedIncorrectCounter += statistic.incorrectNumber
                    rankedUnansweredCounter += statistic.unansweredNumber
                } else if (statistic.gameResult) {
                    friendTotalGames++
                    switch (statistic.gameResult) {
                        case 'won':
                            friendWinCounter++
                            break
                        case 'lost':
                            friendLoseCounter++
                            break
                        case 'draw':
                            friendDrawCounter++
                            break
                    }
                    correctCounter += statistic.correctNumber
                    incorrectCounter += statistic.incorrectNumber
                    unansweredCounter += statistic.unansweredNumber
                    friendCorrectCounter += statistic.correctNumber
                    friendIncorrectCounter += statistic.incorrectNumber
                    friendUnansweredCounter += statistic.unansweredNumber
                }
            }
        })
        rankedTotalSolved =
            rankedCorrectCounter +
            rankedIncorrectCounter +
            rankedUnansweredCounter
        friendTotalSolved =
            friendCorrectCounter +
            friendIncorrectCounter +
            friendUnansweredCounter
        totalQuestionsSolved =
            correctCounter + incorrectCounter + unansweredCounter

        this.setState({
            // Ranked game variables
            totalRankedWin: rankedWinCounter,
            totalRankedLose: rankedLoseCounter,
            totalRankedDraw: rankedDrawCounter,
            totalRankedGames: rankedTotalGames,
            rankedWinPercentage: (rankedWinCounter / rankedTotalGames) * 100,
            rankedCorrectPercentage:
                rankedTotalSolved === 0
                    ? 0
                    : (rankedCorrectCounter / rankedTotalSolved) * 100,
            rankedIncorrectPercentage:
                rankedTotalSolved === 0
                    ? 0
                    : (rankedIncorrectCounter / rankedTotalSolved) * 100,
            rankedUnansweredPercentage:
                rankedTotalSolved === 0
                    ? 0
                    : (rankedUnansweredCounter / rankedTotalSolved) * 100,
            rankedTotalSolved: rankedTotalSolved,
            totalRankedCorrect: rankedCorrectCounter,
            totalRankedIncorrect: rankedIncorrectCounter,
            totalRankedUnanswered: rankedUnansweredCounter,
            // Friend game variables
            totalFriendWin: friendWinCounter,
            totalFriendLose: friendLoseCounter,
            totalFriendDraw: friendDrawCounter,
            totalFriendGames: friendTotalGames,
            friendWinPercentage: (friendWinCounter / friendTotalGames) * 100,
            friendCorrectPercentage:
                friendTotalSolved === 0
                    ? 0
                    : (friendCorrectCounter / friendTotalSolved) * 100,
            friendIncorrectPercentage:
                friendTotalSolved === 0
                    ? 0
                    : (friendIncorrectCounter / friendTotalSolved) * 100,
            friendUnansweredPercentage:
                friendTotalSolved === 0
                    ? 0
                    : (friendUnansweredCounter / friendTotalSolved) * 100,
            totalFriendCorrect: friendCorrectCounter,
            totalFriendIncorrect: friendIncorrectCounter,
            totalFriendUnanswered: friendUnansweredCounter,
            // Question variables
            totalCorrect: correctCounter,
            totalIncorrect: incorrectCounter,
            totalUnanswered: unansweredCounter,
            totalQuestionsSolved: totalQuestionsSolved
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
                    <View style={styles.scrollViewContainer}>
                        <Swiper loop={true}
                                paginationStyle={{ bottom: hp(0.5) }}
                                activeDotColor={'#FF9900'}
                                removeClippedSubviews = {false}>
                        <View style={styles.totalGameStatsContainer}>
                            <View style={styles.totalGameStatsInfosContainer}>
                                <Text
                                    style={
                                        styles.totalGamesPlayedAndSolvedQuestionsCounter
                                    }
                                >
                                    {this.state.totalRankedGames}
                                </Text>
                                <Text
                                    style={
                                        styles.totalGamesPlayedAndSolvedQuestionsText
                                    }
                                >
                                    Dereceli Mod
                                </Text>
                                <Text
                                    style={
                                        styles.totalGamesPlayedAndSolvedQuestionsAmountText
                                    }
                                >
                                    Oyun Sayısı
                                </Text>
                                <Text style={styles.wonText}>
                                    Kazandığı: {this.state.totalRankedWin}
                                </Text>
                                <Text style={styles.drawText}>
                                    Beraberlik: {this.state.totalRankedDraw}
                                </Text>
                                <Text style={styles.lostText}>
                                    Kaybettiği: {this.state.totalRankedLose}
                                </Text>
                            </View>
                            <View style={styles.semiCircleContainer}>
                                <SemiCircleProgress
                                    percentage={
                                        (this.state.totalRankedWin /
                                            this.state.totalRankedGames) *
                                        100
                                    }
                                    progressColor={'#00D9EF'}
                                    circleRadius={wp(20)}
                                    animationSpeed={0.1}
                                    progressWidth={wp(5)}
                                >
                                    <Text style={styles.chartPercentageText}>
                                        {this.state.totalRankedGames === 0
                                            ? '0'
                                            : (
                                                  (this.state.totalRankedWin /
                                                      this.state
                                                          .totalRankedGames) *
                                                  100
                                              ).toFixed(0)}
                                        %
                                    </Text>
                                </SemiCircleProgress>
                            </View>
                        </View>
                        <View style={styles.totalGameStatsContainer}>
                            <View style={styles.totalGameStatsInfosContainer}>
                                <Text
                                    style={
                                        styles.totalGamesPlayedAndSolvedQuestionsCounter
                                    }
                                >
                                    {this.state.totalFriendGames}
                                </Text>
                                <Text
                                    style={
                                        styles.totalGamesPlayedAndSolvedQuestionsText
                                    }
                                >
                                    Arkadaş Mod
                                </Text>
                                <Text
                                    style={
                                        styles.totalGamesPlayedAndSolvedQuestionsAmountText
                                    }
                                >
                                    Oyun Sayısı
                                </Text>
                                <Text style={styles.wonText}>
                                    Kazandığı: {this.state.totalFriendWin}
                                </Text>
                                <Text style={styles.drawText}>
                                    Beraberlik: {this.state.totalFriendDraw}
                                </Text>
                                <Text style={styles.lostText}>
                                    Kaybettiği: {this.state.totalFriendLose}
                                </Text>
                            </View>
                            <View style={styles.semiCircleContainer}>
                                <SemiCircleProgress
                                    percentage={
                                        (this.state.totalFriendWin /
                                            this.state.totalFriendGames) *
                                        100
                                    }
                                    progressColor={'#00D9EF'}
                                    circleRadius={wp(20)}
                                    animationSpeed={0.1}
                                    progressWidth={wp(5)}
                                >
                                    <Text style={styles.chartPercentageText}>
                                        {this.state.totalFriendGames === 0
                                            ? '0'
                                            : (
                                                  (this.state.totalFriendWin /
                                                      this.state
                                                          .totalFriendGames) *
                                                  100
                                              ).toFixed(0)}
                                        %
                                    </Text>
                                </SemiCircleProgress>
                            </View>
                        </View>
                        </Swiper>
                    </View>
                    <View style={styles.percentagesAndCirclesContainer}>
                        <View style={styles.percentagesContainer}>
                            <View style={styles.totalQuestionsSolvedContainer}>
                                <Text
                                    style={
                                        styles.totalGamesPlayedAndSolvedQuestionsCounter
                                    }
                                >
                                    {this.state.rankedTotalSolved}
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
                                        {this.state.totalRankedCorrect} -{' '}
                                        {this.state.rankedCorrectPercentage.toFixed(
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
                                        {this.state.totalRankedIncorrect} -{' '}
                                        {this.state.rankedIncorrectPercentage.toFixed(
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
                                        {this.state.totalRankedUnanswered} -{' '}
                                        {this.state.rankedUnansweredPercentage.toFixed(
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
                                    this.state.totalRankedCorrect /
                                    this.state.rankedTotalSolved
                                }
                                progressColor={'#6AC259'}
                                strokeWidth={hp(2.2)}
                                startAngle={70}
                            />
                            <ProgressCircle
                                style={styles.incorrectCircle}
                                progress={
                                    this.state.totalRankedIncorrect /
                                    this.state.rankedTotalSolved
                                }
                                progressColor={'#B72A2A'}
                                strokeWidth={hp(2.2)}
                                startAngle={135}
                            />
                            <ProgressCircle
                                style={styles.unansweredCircle}
                                progress={
                                    this.state.totalRankedUnanswered /
                                    this.state.rankedTotalSolved
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
