import React from 'react'
import { ProgressCircle } from 'react-native-svg-charts'
import { BarRheostat} from '../../../components/react-native-rheostat';
import { Image, Text, TouchableOpacity, View } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import styles from '../statisticsScreen/style'
import DropDown from '../../../components/mainScreen/dropdown/dropdown'
import NotchView from '../../../components/notchView'
import returnLogo from '../../../assets/return.png'
import { navigationPop } from '../../../services/navigationService'
import Moment from 'moment';
import 'moment/locale/tr';
import SemiCircleProgress from '../../../components/semiCircleProgress'
import { LGS } from '../../../components/mainScreen/carousel/static/exams'
import * as courses from '../../../components/mainScreen/carousel/static/courses'
import { connect } from 'react-redux'

const timezonesList = [
    'Bu hafta',
    'Bu ay',
    'Son 3 ay',
    'Son 6 ay',
    'Ay seçin'
]

class Statistics extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            thisWeek: {values: [0, 6]},
            thisMonth: {values: [0, 30]},
            last3Month: {values: [0,12]},
            last6Month: {values: [0,24]},
            courseLeaderboardList: ['Genel'],
            subjectLeaderboardList: [],
            subjectLeaderboardListDefaultValue: '',
            isSubjectDropdownVisible: false,
            timezone: 'Bu ay',
            startDate: Moment.utc().startOf('month').add(0, 'days').format("YYYY-MM-DD"),
            endDate: Moment.utc().startOf('month').add(1, 'days').format("YYYY-MM-DD")
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

    thisWeekOnRheostatValUpdated = (payload) => {
        this.setState({
            thisWeek: payload,
            startDate: Moment.utc().startOf('month').add(payload.values[0], 'days').format("YYYY-MM-DD"),
            endDate: Moment.utc().startOf('month').add(payload.values[1], 'days').format("YYYY-MM-DD")
        })
        console.log(payload)
    }

    thisMonthOnRheostatValUpdated = (payload) => {
        this.setState({
            thisMonth: payload,
            startDate: Moment.utc().startOf('month').add(payload.values[0], 'days').format("YYYY-MM-DD"),
            endDate: Moment.utc().startOf('month').add(payload.values[1], 'days').format("YYYY-MM-DD")
        })
        console.log(payload)
        console.log(this.state.startDate)
    }

    last3MonthOnRheostatValUpdated = (payload) => {
        this.setState({
            last3Month: payload
        })
        console.log(payload)
    }

    last6MonthOnRheostatValUpdated = (payload) => {
        this.setState({
            last6Month: payload
        })
        console.log(payload)
    }

    render() {
        const thisWeekData = [50, 10, 40, 85, 85, 35, 53]
        const thisMonthData = [50, 10, 40, 85, 85, 35, 53, 24, 35, 100, 50, 10, 40, 85, 85, 35, 53, 24, 35, 100, 50, 10, 40, 85, 85, 35, 53, 24, 35, 100, 50]
        const last3MonthData = [50, 10, 40, 85, 85, 35, 53, 24, 35, 100, 75, 45]
        const last6MonthData = [50, 10, 40, 85, 85, 35, 53, 24, 35, 100, 75, 45, 50, 10, 40, 85, 85, 35, 53, 24, 35, 100, 75, 45]

        const thisWeek= [
            0, 6
        ]
        const thisMonth= [
            0, 30
        ]
        const last3Month= [
            0, 11
        ]
        const last6Month= [
            0, 23
        ]
        return (
            <View style={styles.container}>
                <NotchView/>
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.backButtonOnPress}>
                        <Image source={returnLogo} style={styles.returnLogo} />
                    </TouchableOpacity>
                </View>
                <View style={styles.dropdownsContainer}>
                    <DropDown
                        style={styles.picker}
                        textStyle={styles.pickerText}
                        dropdownTextStyle={
                            styles.pickerDropdownText
                        }
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
                                dropdownTextStyle={
                                    styles.pickerDropdownText
                                }
                                dropdownStyle={styles.pickerDropdown}
                                defaultValue={
                                    this.state
                                        .subjectLeaderboardListDefaultValue
                                }
                                options={
                                    this.state.subjectLeaderboardList
                                }
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
                            dropdownTextStyle={
                                styles.pickerDropdownText
                            }
                            dropdownStyle={styles.pickerDropdown}
                            defaultValue={
                                this.state.timezone
                            }
                            options={timezonesList}
                            onSelect={(idx, value) =>
                                this.timezoneSelect(idx, value)
                            }
                        />
                    </View>
                    <View style={styles.totalGameStatsContainer}>
                        <View style={styles.totalGameStatsInfosContainer}>
                            <Text style={styles.totalGamesPlayedAndSolvedQuestionsCounter}>
                                200
                            </Text>
                            <Text style={styles.totalGamesPlayedAndSolvedQuestionsText}>
                                Oynadığın Oyun
                            </Text>
                            <Text style={styles.wonText}>Kazandığı: 150</Text>
                            <Text style={styles.drawText}>Beraberlik: 10</Text>
                            <Text style={styles.lostText}>Kaybettiği: 40</Text>
                        </View>
                        <View style={styles.semiCircleContainer}>
                            <SemiCircleProgress
                                percentage={75}
                                progressColor={'#00D9EF'}
                                circleRadius={wp(20)}
                                animationSpeed={0.1}
                                progressWidth={wp(5)}
                            >
                                <Text style={styles.chartPercentageText}>
                                    75%
                                </Text>
                            </SemiCircleProgress>
                        </View>
                    </View>
                    <View style={styles.percentagesAndCirclesContainer}>
                        <View style={styles.percentagesContainer}>
                            <View style={styles.totalQuestionsSolvedContainer}>
                                <Text style={styles.totalGamesPlayedAndSolvedQuestionsCounter}>
                                    200
                                </Text>
                                <Text style={styles.totalGamesPlayedAndSolvedQuestionsText}>
                                    Çözülen Soru
                                </Text>
                            </View>
                            <View style={styles.percentageContainer}>
                                <View style={styles.correctPoint}/>
                                <View style={styles.percentagesTextView}>
                                    <Text style={styles.optionsText}>DOĞRU</Text>
                                    <Text style={styles.percentagesText}>150 - 50%</Text>
                                </View>
                            </View>
                            <View style={styles.percentageContainer}>
                                <View style={styles.incorrectPoint}/>
                                <View style={styles.percentagesTextView}>
                                    <Text style={styles.optionsText}>YANLIŞ</Text>
                                    <Text style={styles.percentagesText}>150 - 50%</Text>
                                </View>
                            </View>
                            <View style={styles.percentageContainer}>
                                <View style={styles.unansweredPoint}/>
                                <View style={styles.percentagesTextView}>
                                    <Text style={styles.optionsText}>BOŞ</Text>
                                    <Text style={styles.percentagesText}>150 - 50%</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.circlesContainer}>
                            <ProgressCircle style={styles.correctCircle} progress={0.6} progressColor={'#6AC259'} strokeWidth={wp(3)} startAngle={70} />
                            <ProgressCircle style={styles.incorrectCircle} progress={0.35} progressColor={'#B72A2A'} strokeWidth={wp(3)} startAngle={135} />
                            <ProgressCircle style={styles.unansweredCircle} progress={0.05} progressColor={'#00D9EF'} strokeWidth={wp(3)} startAngle={30} />
                        </View>
                    </View>
                    <View style={styles.timezoneChartContainer}>
                        <View style={styles.timezonesTextView}>
                            {this.state.timezone === 'Bu hafta' && (
                                <Text style={styles.timezonesText}>
                                    {Moment.utc().startOf('week').add(this.state.thisWeek.values[0], 'days').format('dddd')}
                                    -
                                    {Moment.utc().startOf('week').add(this.state.thisWeek.values[1], 'days').format('dddd')}
                                </Text >
                            )}
                            {this.state.timezone === 'Bu ay' && (
                                <Text style={styles.timezonesText}>
                                    {Moment.utc().startOf('month').add(this.state.thisMonth.values[0], 'days').format('LL')}
                                    -
                                    {Moment.utc().startOf('month').add(this.state.thisMonth.values[1], 'days').format('LL')}
                                </Text >
                            )}
                            {this.state.timezone === 'Son 3 ay' && (
                                <Text style={styles.timezonesTextLastMonths}>
                                    {Moment.utc().startOf('today').add(this.state.last3Month.values[0]-12, 'weeks').format('DD MMM')}
                                    -
                                    {Moment.utc().startOf('today').add(this.state.last3Month.values[0]-11, 'weeks').format('DD MMM YYYY')}
                                    /
                                    {Moment.utc().startOf('today').add(this.state.last3Month.values[1]-13, 'weeks').format('DD MMM')}
                                    -
                                    {Moment.utc().startOf('today').add(this.state.last3Month.values[1]-12, 'weeks').format('DD MMM YYYY')}
                                </Text >
                            )}
                            {this.state.timezone === 'Son 6 ay' && (
                                <Text style={styles.timezonesTextLastMonths}>
                                    {Moment.utc().startOf('today').add(this.state.last6Month.values[0]-24, 'weeks').format('DD MMM')}
                                    -
                                    {Moment.utc().startOf('today').add(this.state.last6Month.values[0]-23, 'weeks').format('DD MMM YYYY')}
                                    /
                                    {Moment.utc().startOf('today').add(this.state.last6Month.values[1]-25, 'weeks').format('DD MMM')}
                                    -
                                    {Moment.utc().startOf('today').add(this.state.last6Month.values[1]-24, 'weeks').format('DD MMM YYYY')}
                                </Text >
                            )}
                        </View>
                        <View style={styles.barRheostatContainer}>
                            {this.state.timezone === 'Bu hafta' && (
                                <BarRheostat
                                    values={thisWeek}
                                    min={0}
                                    max={6}
                                    theme={{ rheostat: { themeColor: '#00D9EF', grey: '#CACACA' } }}
                                    svgData={thisWeekData}
                                    snap={false}
                                    onValuesUpdated={this.thisWeekOnRheostatValUpdated}
                                />
                            )}
                            {this.state.timezone === 'Bu ay' && (
                                <BarRheostat
                                    values={thisMonth}
                                    min={0}
                                    max={30}
                                    theme={{ rheostat: { themeColor: '#00D9EF', grey: '#CACACA' } }}
                                    svgData={thisMonthData}
                                    onValuesUpdated={this.thisMonthOnRheostatValUpdated}
                                />
                            )}
                            {this.state.timezone === 'Son 3 ay' && (
                                <BarRheostat
                                    values={last3Month}
                                    min={0}
                                    max={11}
                                    theme={{ rheostat: { themeColor: '#00D9EF', grey: '#CACACA' } }}
                                    svgData={last3MonthData}
                                    onValuesUpdated={this.last3MonthOnRheostatValUpdated}
                                />
                            )}
                            {this.state.timezone === 'Son 6 ay' && (
                                <BarRheostat
                                    values={last6Month}
                                    min={0}
                                    max={23}
                                    theme={{ rheostat: { themeColor: '#00D9EF', grey: '#CACACA' } }}
                                    svgData={last6MonthData}
                                    onValuesUpdated={this.last6MonthOnRheostatValUpdated}
                                />
                            )}
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    choosenExam: state.user.choosenExam
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    null
)(Statistics)