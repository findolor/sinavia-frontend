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
import * as courses from '../../../components/mainScreen/carousel/static/courses'
import { connect } from 'react-redux'
import { quizList } from './exampleQuizzes'

const timezonesList = ['Bu hafta', 'Bu ay', 'Son 3 ay', 'Son 6 ay', 'Ay seçin']

class Statistics extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            thisWeek: { values: [0, 6] },
            thisMonth: { values: [0, 30] },
            last3Month: { values: [0, 12] },
            last6Month: { values: [0, 24] },
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
            // User statistics list
            statisticsList: []
        }
    }

    async componentDidMount() {
        this.setChoosenExamId().then(() => {
            this.fetchStatistics().then(data => {
                this.makeStatistics(data)
            })
        })

        this.courseListMaker()
    }

    makeStatistics = data => {
        const statisticsList = []
        data.forEach(statistic => {
            delete statistic.earnedPoints
            statistic.createdAt = Moment(statistic.createdAt).format(
                'YYYY-MM-DD'
            )
            statisticsList.push(statistic)
        })
        this.setState({ statisticsList: statisticsList }, () => {
            setTimeout(() => {
                this.thisWeekOnRheostatValUpdated({
                    max: 6,
                    min: 0,
                    values: [0, 6]
                })
            }, 100)
        })
    }

    fetchStatistics = async () => {
        let params
        switch (this.state.timezone) {
            case 'Bu hafta':
                params = this.getStatisticsParams()
                return statisticsServices.getWeeklyStatistics(
                    this.props.clientToken,
                    this.props.clientDBId,
                    params
                )
            case 'Bu ay':
                params = this.getStatisticsParams()
                return statisticsServices.getWeeklyStatistics(
                    this.props.clientToken,
                    this.props.clientDBId,
                    params
                )
            case 'Son 3 ay':
                return
            case 'Son 6 ay':
                return
        }
    }

    getStatisticsParams = () => {
        if (this.state.choosenCourseId !== null) {
            if (this.state.choosenSubjectId !== null) {
                return {
                    examId: this.state.choosenExamId,
                    courseId: this.state.choosenCourseId,
                    subjectId: this.state.choosenSubjectId
                }
            } else
                return {
                    examId: this.state.choosenExamId,
                    courseId: this.state.choosenCourseId
                }
        } else
            return {
                examId: this.state.choosenExamId
            }
    }

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

    pickerSelectCourse = (idx, value) => {
        this.setState({ isSubjectDropdownVisible: false })
        setTimeout(() => {
            this.subjectSwitchPicker(idx)
        }, 300)
    }

    pickerSelectSubject = (idx, value) => {}

    // this index is the course id
    subjectSwitchPicker = index => {
        index = parseInt(index, 10)
        if (index === 0) {
            this.setState({ subjectList: [], choosenCourseId: null })
            return
        }
        const subjectList = []
        this.props.gameContentMap.subjects.forEach(subject => {
            if (subject.courseId === index) subjectList.push(subject.name)
        })

        this.setState({
            subjectList: subjectList,
            subjectListDefaultValue: 'Hepsi',
            isSubjectDropdownVisible: true,
            choosenCourseId: index
        })
    }

    timezoneSelect = (idx, value) => {
        switch (value) {
            case 'Bu hafta':
                this.setState(
                    {
                        timezone: 'Bu hafta'
                    },
                    () => {
                        this.fetchStatistics().then(data => {
                            this.makeStatistics(data)
                        })
                    }
                )
                return
            case 'Bu ay':
                this.setState(
                    {
                        timezone: 'Bu ay'
                    },
                    () => {
                        this.fetchStatistics().then(data => {
                            this.makeStatistics(data)
                        })
                    }
                )
                return
            case 'Son 3 ay':
                this.setState({
                    timezone: 'Son 3 ay'
                })
                return
            case 'Son 6 ay':
                this.setState({
                    timezone: 'Son 6 ay'
                })
                return
            case 'Ay seçin':
                this.setState({
                    timezone: 'Ay Seçin'
                })
                return
        }
    }

    backButtonOnPress = () => {
        navigationPop()
    }

    thisWeekOnRheostatValUpdated = payload => {
        let wonsCounter = 0,
            lostsCounter = 0,
            drawsCounter = 0,
            correctsCounter = 0,
            incorrectsCounter = 0,
            unansweredsCounter = 0
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
        this.state.statisticsList.forEach(statistic => {
            if (
                statistic.createdAt >= this.state.startDate &&
                statistic.createdAt <= this.state.endDate
            ) {
                if (statistic.gameResult === 'won') {
                    wonsCounter++
                } else if (statistic.gameResult === 'lost') {
                    lostsCounter++
                } else {
                    drawsCounter++
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

    thisMonthOnRheostatValUpdated = payload => {
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
        for (let i = 0; i < quizList.length; i++) {
            if (
                quizList[i].createdAt >= this.state.startDate &&
                quizList[i].createdAt <= this.state.endDate
            ) {
                if (quizList[i].gameResult === 'won') {
                    wonsCounter++
                } else if (quizList[i].gameResult === 'lost') {
                    lostsCounter++
                } else {
                    drawsCounter++
                }
                correctsCounter += quizList[i].correctNumber
                incorrectsCounter += quizList[i].incorrectNumber
                unansweredsCounter += quizList[i].unansweredNumber
            }
        }
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
                (correctsCounter /
                    (correctsCounter +
                        incorrectsCounter +
                        unansweredsCounter)) *
                100,
            incorrectPercentage:
                (incorrectsCounter /
                    (correctsCounter +
                        incorrectsCounter +
                        unansweredsCounter)) *
                100,
            unansweredPercentage:
                (unansweredsCounter /
                    (correctsCounter +
                        incorrectsCounter +
                        unansweredsCounter)) *
                100
        })
        console.log(payload)
        console.log(this.state.startDate)
    }

    last3MonthOnRheostatValUpdated = payload => {
        this.setState({
            last3Month: payload
        })
        console.log(payload)
    }

    last6MonthOnRheostatValUpdated = payload => {
        this.setState({
            last6Month: payload
        })
        console.log(payload)
    }

    render() {
        const corrects = this.state.corrects
        const incorrects = this.state.incorrects
        const unanswereds = this.state.unanswereds

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
                                    this.pickerSelectSubject(idx, value)
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
                                {this.state.wons +
                                    this.state.draws +
                                    this.state.losts}
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
                            {this.state.timezone === 'Son 3 ay' && (
                                <Text style={styles.timezonesTextLastMonths}>
                                    {Moment.utc()
                                        .startOf('today')
                                        .add(
                                            this.state.last3Month.values[0] -
                                                12,
                                            'weeks'
                                        )
                                        .format('DD MMM')}
                                    -
                                    {Moment.utc()
                                        .startOf('today')
                                        .add(
                                            this.state.last3Month.values[0] -
                                                11,
                                            'weeks'
                                        )
                                        .format('DD MMM YYYY')}
                                    /
                                    {Moment.utc()
                                        .startOf('today')
                                        .add(
                                            this.state.last3Month.values[1] -
                                                13,
                                            'weeks'
                                        )
                                        .format('DD MMM')}
                                    -
                                    {Moment.utc()
                                        .startOf('today')
                                        .add(
                                            this.state.last3Month.values[1] -
                                                12,
                                            'weeks'
                                        )
                                        .format('DD MMM YYYY')}
                                </Text>
                            )}
                            {this.state.timezone === 'Son 6 ay' && (
                                <Text style={styles.timezonesTextLastMonths}>
                                    {Moment.utc()
                                        .startOf('today')
                                        .add(
                                            this.state.last6Month.values[0] -
                                                24,
                                            'weeks'
                                        )
                                        .format('DD MMM')}
                                    -
                                    {Moment.utc()
                                        .startOf('today')
                                        .add(
                                            this.state.last6Month.values[0] -
                                                23,
                                            'weeks'
                                        )
                                        .format('DD MMM YYYY')}
                                    /
                                    {Moment.utc()
                                        .startOf('today')
                                        .add(
                                            this.state.last6Month.values[1] -
                                                25,
                                            'weeks'
                                        )
                                        .format('DD MMM')}
                                    -
                                    {Moment.utc()
                                        .startOf('today')
                                        .add(
                                            this.state.last6Month.values[1] -
                                                24,
                                            'weeks'
                                        )
                                        .format('DD MMM YYYY')}
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
                                        this.thisWeekOnRheostatValUpdated
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
                                        this.thisMonthOnRheostatValUpdated
                                    }
                                />
                            )}
                            {this.state.timezone === 'Son 3 ay' && (
                                <Rheostat
                                    values={[0, 11]}
                                    min={0}
                                    max={11}
                                    theme={{
                                        rheostat: {
                                            themeColor: '#00D9EF',
                                            grey: '#CACACA'
                                        }
                                    }}
                                    snap={true}
                                    onValuesUpdated={
                                        this.last3MonthOnRheostatValUpdated
                                    }
                                />
                            )}
                            {this.state.timezone === 'Son 6 ay' && (
                                <Rheostat
                                    values={[0, 23]}
                                    min={0}
                                    max={23}
                                    theme={{
                                        rheostat: {
                                            themeColor: '#00D9EF',
                                            grey: '#CACACA'
                                        }
                                    }}
                                    snap={true}
                                    onValuesUpdated={
                                        this.last6MonthOnRheostatValUpdated
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
