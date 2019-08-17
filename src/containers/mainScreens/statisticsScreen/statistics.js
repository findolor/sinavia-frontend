import React from 'react'
import { ProgressCircle } from 'react-native-svg-charts'
import { BarRheostat} from 'react-native-rheostat';
import { Image, Text, TouchableOpacity, View } from 'react-native'
import {
    heightPercentageToDP as hp, widthPercentageToDP,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import styles from '../statisticsScreen/style'
import DropDown from '../../../components/mainScreen/dropdown/dropdown'
import NotchView from '../../../components/notchView'
import returnLogo from '../../../assets/return.png'
import { navigationPop } from '../../../services/navigationService'
import Moment from 'moment';
import SemiCircleProgress from '../../../components/semiCircleProgress'

class Statistics extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timeRange:{
                values: [0,30]
            }
        }
    }

    backButtonOnPress = () => {
        navigationPop()
    }

    onRheostatValUpdated = (payload) => {
        this.setState({
            timeRange: payload
        })
        console.log(payload)
    }

    render() {
        const randomStartAngleCorrectCircle = Math.floor(Math.random() * 345) + 15;
        const randomStartAngleIncorrectCircle = Math.floor(Math.random() * 345) + 15;
        const randomStartAngleUnansweredCircle = Math.floor(Math.random() * 345) + 15;
        const areaSvgData = [50, 10, 40, 85, 85, 35, 53, 24,
            50, 10, 40, 95, 85, 40,
            24,50, 10, 40, 85, 85, 91, 35, 53, 24,
            50, 10, 40, 95, 85, 40,50, 10, 40, 85, 85, 35, 53, 24,
            50, 10, 40, 95, 85, 40,
            24,50, 10, 40, 85, 85, 91, 35, 53, 24,
            50, 10, 40, 95, 85, 40]
        const values= [
            0, 30
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
                    />
                    <DropDown
                        style={styles.picker}
                    />
                </View>
                <View style={styles.statisticsContainer}>
                    <View style={styles.timeZoneDropdownsContainer}>
                        <DropDown
                            style={styles.picker}
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
                                circleRadius={widthPercentageToDP(20)}
                                animationSpeed={0.1}
                                progressWidth={widthPercentageToDP(5)}
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
                                    <Text style={styles.percentagesText}>50%</Text>
                                </View>
                            </View>
                            <View style={styles.percentageContainer}>
                                <View style={styles.incorrectPoint}/>
                                <View style={styles.percentagesTextView}>
                                    <Text style={styles.optionsText}>YANLIŞ</Text>
                                    <Text style={styles.percentagesText}>50%</Text>
                                </View>
                            </View>
                            <View style={styles.percentageContainer}>
                                <View style={styles.unansweredPoint}/>
                                <View style={styles.percentagesTextView}>
                                    <Text style={styles.optionsText}>BOŞ</Text>
                                    <Text style={styles.percentagesText}>50%</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.circlesContainer}>
                            <ProgressCircle style={styles.correctCircle} progress={0.4} progressColor={'#6AC259'} strokeWidth={wp(3)} startAngle={70} />
                            <ProgressCircle style={styles.incorrectCircle} progress={0.4} progressColor={'#B72A2A'} strokeWidth={wp(3)} startAngle={135} />
                            <ProgressCircle style={styles.unansweredCircle} progress={0.4} progressColor={'#00D9EF'} strokeWidth={wp(3)} startAngle={30} />
                        </View>
                    </View>
                    <View style={styles.timezoneChartContainer}>
                        <View style={styles.barRheostatContainer}>
                        <BarRheostat
                            values={values}
                            min={0}
                            max={30}
                            theme={{ rheostat: { themeColor: '#00D9EF', grey: '#CACACA' } }}
                            svgData={areaSvgData}
                            onValuesUpdated={this.onRheostatValUpdated}
                        />
                        </View>
                        <View style={styles.timezonesTextView}>
                            <Text style={styles.timezonesText}>
                                {Moment.utc().startOf('month').add(this.state.timeRange.values[0], 'days').format('DD/MM/YYYY')}
                                -
                                {Moment.utc().startOf('month').add(this.state.timeRange.values[1], 'days').format('DD/MM/YYYY')}
                            </Text >
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default Statistics