import React from 'react'
import { ProgressCircle, StackedBarChart, LineChart, YAxis, Grid } from 'react-native-svg-charts'
import { BarRheostat, AreaRheostat } from 'react-native-rheostat';
import { FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
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
                    <View style={styles.timeZoneDropdownsContainer}></View>
                    <View style={styles.percentagesAndCirclesContainer}>
                        <View style={styles.percentagesContainer}>
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
                            <ProgressCircle style={styles.correctCircle} progress={0.4} progressColor={'#6AC259'} strokeWidth={wp(3)} startAngle={30} />
                            <ProgressCircle style={styles.incorrectCircle} progress={0.4} progressColor={'#B72A2A'} strokeWidth={wp(3)} startAngle={30} />
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