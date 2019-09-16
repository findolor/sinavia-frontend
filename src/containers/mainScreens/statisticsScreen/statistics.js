import React from 'react'
import { ProgressCircle } from 'react-native-svg-charts'
import Rheostat from 'react-native-rheostat'
import { Image, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import styles from '../statisticsScreen/style'
import DropDown from '../../../components/mainScreen/dropdown/dropdown'
import NotchView from '../../../components/notchView'
import returnLogo from '../../../assets/return.png'
import { navigationPop } from '../../../services/navigationService'
import Moment from 'moment'
import 'moment/locale/tr'
import SemiCircleProgress from '../../../components/semiCircleProgress'
import { LGS } from '../../../components/mainScreen/carousel/static/exams'
import * as courses from '../../../components/mainScreen/carousel/static/courses'
import { connect } from 'react-redux'
import { quizList } from './exampleQuizzes'

const timezonesList = ['Bu hafta', 'Bu ay', 'Son 3 ay', 'Son 6 ay', 'Ay seçin']

const quizResult = {
    examName: 'YKS',
    courseName: 'Türkçe',
    subjectName: 'Paragrafta Anlam',
    correctNumber: '3',
    incorrectNumber: '1',
    unansweredNumber: '1',
    earnedPoints: '',
    gameResult: 'won',
    createdAt: '1566086400'
}

class Statistics extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            thisWeek: { values: [0, 6] },
            thisMonth: { values: [0, 30] },
            last3Month: { values: [0, 12] },
            last6Month: { values: [0, 24] },
            courseLeaderboardList: ['Genel'],
            subjectLeaderboardList: [],
            subjectLeaderboardListDefaultValue: '',
            isSubjectDropdownVisible: false,
            timezone: 'Bu ay',
            startDate: Moment.utc()
                .startOf('month')
                .add(0, 'days')
                .format('YYYY-MM-DD'),
            endDate: Moment.utc()
                .startOf('month')
                .add(1, 'days')
                .format('YYYY-MM-DD'),
            wons: 0,
            losts: 0,
            draws: 0,
            corrects: 0,
            incorrects: 0,
            unanswereds: 0,
            wonPercentage: 0,
            correctPercentage: 0,
            incorrectPercentage: 0,
            unansweredPercentage: 0
        }
    }

    componentDidMount() {
        const courseList = this.state.courseLeaderboardList

        this.courseSwitchPicker(courseList)
    }

    courseSwitchPicker = courseList => {
        switch (this.props.choosenExam) {
            case 'LGS':
                LGS.forEach(course => {
                    courseList.push(course.courseName)
                })
                return
        }
        this.setState({ courseLeaderboardList: courseList })
    }

    pickerSelectCourse = (idx, value) => {
        this.setState({ isSubjectDropdownVisible: false })
        setTimeout(() => {
            this.subjectSwitchPicker(value)
        }, 300)
    }

    pickerSelectSubject = (idx, value) => {}

    subjectSwitchPicker = selectedCourse => {
        switch (this.props.choosenExam) {
            case 'LGS':
                switch (selectedCourse) {
                    case 'Genel':
                        this.setState({
                            subjectLeaderboardList: [],
                            subjectLeaderboardListDefaultValue: ''
                        })
                        return
                    case 'Türkçe':
                        this.setState({
                            subjectLeaderboardList: courses.LGS.turkce,
                            subjectLeaderboardListDefaultValue: 'Hepsi',
                            isSubjectDropdownVisible: true
                        })
                        return
                    case 'Matematik':
                        this.setState({
                            subjectLeaderboardList: courses.LGS.matematik,
                            subjectLeaderboardListDefaultValue: 'Hepsi',
                            isSubjectDropdownVisible: true
                        })
                        return
                    case 'Tarih':
                        this.setState({
                            subjectLeaderboardList: courses.LGS.tarih,
                            subjectLeaderboardListDefaultValue: 'Hepsi',
                            isSubjectDropdownVisible: true
                        })
                        return
                    case 'Fen Bilimleri':
                        this.setState({
                            subjectLeaderboardList: courses.LGS.fen,
                            subjectLeaderboardListDefaultValue: 'Hepsi',
                            isSubjectDropdownVisible: true
                        })
                        return
                    case 'İngilizce':
                        this.setState({
                            subjectLeaderboardList: courses.LGS.ingilizce,
                            subjectLeaderboardListDefaultValue: 'Hepsi',
                            isSubjectDropdownVisible: true
                        })
                        return
                    case 'Din Kültürü':
                        this.setState({
                            subjectLeaderboardList: courses.LGS.din,
                            subjectLeaderboardListDefaultValue: 'Hepsi',
                            isSubjectDropdownVisible: true
                        })
                        return
                }
                return
        }
    }

    timezoneSelect = (idx, value) => {
        switch (value) {
            case 'Bu hafta':
                this.setState({
                    timezone: 'Bu hafta'
                })
                return
            case 'Bu ay':
                this.setState({
                    timezone: 'Bu ay'
                })
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
        console.log(this.state.startDate)
        console.log(payload)
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
        const wons = this.state.wons
        const losts = this.state.losts
        const draws = this.state.draws
        const corrects = this.state.corrects
        const incorrects = this.state.incorrects
        const unanswereds = this.state.unanswereds
        const thisWeekData = [50, 180, 40, 85, 85, 35, 53]
        const thisMonthData = [
            50,
            10,
            40,
            85,
            85,
            35,
            53,
            24,
            35,
            100,
            50,
            10,
            40,
            85,
            85,
            35,
            53,
            24,
            35,
            100,
            50,
            10,
            40,
            85,
            85,
            35,
            53,
            24,
            35,
            100,
            50
        ]
        const last3MonthData = [50, 10, 40, 85, 85, 35, 53, 24, 35, 100, 75, 45]
        const last6MonthData = [
            50,
            180,
            40,
            85,
            85,
            35,
            53,
            24,
            35,
            100,
            75,
            45,
            50,
            10,
            40,
            85,
            85,
            35,
            53,
            24,
            35,
            100,
            75,
            45
        ]

        const thisWeek = [0, 6]
        const thisMonth = [0, 30]
        const last3Month = [0, 11]
        const last6Month = [0, 23]
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
                        options={this.state.courseLeaderboardList}
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
                                    this.state
                                        .subjectLeaderboardListDefaultValue
                                }
                                options={this.state.subjectLeaderboardList}
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
                                {wons + draws + losts}
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
                                    (wons / (wons + losts + draws)) * 100
                                }
                                progressColor={'#00D9EF'}
                                circleRadius={wp(20)}
                                animationSpeed={0.1}
                                progressWidth={wp(5)}
                            >
                                <Text style={styles.chartPercentageText}>
                                    {wons + losts + draws === 0
                                        ? '0'
                                        : (
                                              (wons / (wons + losts + draws)) *
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
                                    {corrects + incorrects + unanswereds}
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
                                        {corrects} -{' '}
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
                                        {incorrects} -{' '}
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
                                        {unanswereds} -{' '}
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
                                    corrects /
                                    (corrects + incorrects + unanswereds)
                                }
                                progressColor={'#6AC259'}
                                strokeWidth={hp(2.2)}
                                startAngle={70}
                            />
                            <ProgressCircle
                                style={styles.incorrectCircle}
                                progress={
                                    incorrects /
                                    (corrects + incorrects + unanswereds)
                                }
                                progressColor={'#B72A2A'}
                                strokeWidth={hp(2.2)}
                                startAngle={135}
                            />
                            <ProgressCircle
                                style={styles.unansweredCircle}
                                progress={
                                    unanswereds /
                                    (corrects + incorrects + unanswereds)
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
                                    values={thisWeek}
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
                                    values={thisMonth}
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
                                    values={last3Month}
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
                                    values={last6Month}
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
                <View style={styles.spaceView}/>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    choosenExam: state.client.choosenExam
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    null
)(Statistics)
