import React from 'react'
import {
    Image, Text,
    TouchableOpacity,
    View,
    FlatList, Modal, ScrollView,
} from 'react-native';
import styles from './style'
import NotchView from '../../../components/notchView'
import { navigationPop } from '../../../services/navigationService';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

import DropDown from '../../../components/mainScreen/dropdown/dropdown'

import returnLogo from '../../../assets/return.png'
import GARBAGE from '../../../assets/mainScreens/garbage.png'
import NO_RESULTS_GOAL from '../../../assets/noResultsGoal.png'

import { connect } from 'react-redux';
import AuthButton from '../../../components/authScreen/authButton';

const goals = [

]

class Goals extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleView: 'goalsList',
            courseList: [],
            subjectList: [],
            goals: goals,
            choosenQuestionAmount: 100,
            isModalVisible: false
        }
    }

    componentDidMount() {
        this.courseListMaker()
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

    returnButtonOnPress = () => {
        navigationPop()
    }

    addButtonOnPress = () => {
        this.setState({visibleView: 'addNewGoal'})
    }

    cancelButtonOnPress = () => {
        this.setState({visibleView: 'goalsList'})
    }

    questionAmountPicker(questionNumber) {
        this.setState({ choosenQuestionAmount: questionNumber })
    }

    removeGoalModal() {
        return (
            <View
                style={{
                    height: hp(120),
                    width: wp(100),
                    backgroundColor: '#000000DE'
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.quitView}>
                        <Text style={styles.areYouSureText}>
                            Haftalık hedefini kaldırmak istediğine emin misin?
                        </Text>
                    </View>
                    <View style={styles.yesOrNoButtonsContainer}>
                        <AuthButton
                            height={hp(7)}
                            width={wp(42)}
                            color="#00D9EF"
                            buttonText="Evet"
                            fontSize={hp(3)}
                            borderRadius={hp(1.5)}
                        />
                        <AuthButton
                            height={hp(7)}
                            width={wp(42)}
                            color="#00D9EF"
                            buttonText="Hayır"
                            fontSize={hp(3)}
                            borderRadius={hp(1.5)}
                            onPress={() =>
                                this.setState({ isModalVisible: false })
                            }
                        />
                    </View>
                </View>
            </View>
        )
    }

    removeGoalOnPress = () => {
        this.setState({
            isModalVisible: true
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    visible={this.state.isModalVisible}
                    transparent={true}
                    animationType={'fade'}
                >
                    {this.removeGoalModal()}
                </Modal>
                <NotchView />
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.returnButtonOnPress}>
                        <View style={styles.returnLogoContainer}>
                            <Image
                                source={returnLogo}
                                style={styles.returnLogo}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.headerTextWrapper}>
                        <Text style={styles.headerText}>Haftalık Hedefler</Text>
                    </View>
                    {this.state.visibleView === 'goalsList' &&
                        <View style={styles.addLogoContainer}>
                            <TouchableOpacity onPress={this.addButtonOnPress} style={styles.addLogo}>
                                <Text style={styles.addLogoText}>+ Ekle</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
                    {this.state.visibleView === 'goalsList' && Object.keys(this.state.goals).length !== 0 &&
                        <View style={styles.scrollViewContainer}>
                            <FlatList
                                data={this.state.goals}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{height: hp(16.5), width: wp(90), marginTop: hp(1.5)}}>
                                            <View style={[styles.goalView, {borderColor: item.solvedQuestion >= item.questionGoal ? '#21C95A' : '#00D9EF'}]}>
                                                <View style={styles.courseAndSubjectName}>
                                                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end'}}>
                                                        <Text style={styles.courseText}>{item.course}</Text>
                                                        <Text style={styles.subjectText}>    {item.subject}</Text>
                                                    </View>
                                                    <TouchableOpacity onPress={this.removeGoalOnPress}>
                                                        <Image source={GARBAGE} style={{height: hp(3), width: hp(3), marginBottom: hp(1.7)}}/>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.progressBarView}>
                                                    {item.solvedQuestion >= item.questionGoal &&
                                                        <View style={[styles.instantProgressView, {width: wp(85), backgroundColor: '#21C95A'}]}>
                                                            <View style={[styles.solvedQuestionCircle, {backgroundColor: '#21C95A', borderColor: '#1BAB4C'}]}>
                                                                <Text style={styles.solvedQuestionsText}>{item.solvedQuestion}</Text>
                                                            </View>
                                                        </View>
                                                    }
                                                    {item.solvedQuestion < item.questionGoal && item.solvedQuestion > 0 &&
                                                        <View style={[styles.instantProgressView, {width: wp(item.solvedQuestion/item.questionGoal*85)}]}>
                                                            <View style={[styles.solvedQuestionCircle, {backgroundColor: '#FF9900', borderColor: '#E08700'}]}>
                                                                <Text style={styles.solvedQuestionsText}>{item.solvedQuestion}</Text>
                                                            </View>
                                                        </View>
                                                    }
                                                </View>
                                                <View style={styles.questionGoalView}>
                                                    <Text style={styles.questionGoalText}>0</Text>
                                                    <Text style={styles.questionGoalText}>{item.questionGoal}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }}
                                extraData={this.state}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    }
                {this.state.visibleView === 'goalsList' && Object.keys(this.state.goals).length === 0 &&
                <View style={styles.noResultsView}>
                    <Image source={NO_RESULTS_GOAL} style={styles.noResultImg}/>
                    <Text style={styles.noResultsText}>Bu hafta henüz bir hedef belirlemedin, her Pazartesi buraya gelip düzenleyebilirsin</Text>
                </View>
                }
                    {this.state.visibleView === 'addNewGoal' &&
                        <View style={styles.scrollViewContainer}>
                            <View style={styles.goalsInfoView}>
                                <Text style={styles.goalsInfoText}>Haftalık soru hedeflerini belirle, programını kendin takip et</Text>
                            </View>
                            <View style={styles.dropdownsView}>
                                <View style={styles.dropdownView}>
                                    <Text style={styles.dropdownHeaderText}>Ders</Text>
                                    <DropDown
                                        style={styles.picker}
                                        dropdownStyle={
                                            styles.pickerDropdown
                                        }
                                        textStyle={styles.pickerText}
                                        dropdownTextStyle={
                                            styles.pickerDropdownText
                                        }
                                        options={this.state.courseList}
                                        defaultValue={'Lütfen bir ders seçiniz'}
                                    />
                                </View>
                                <View style={styles.dropdownView}>
                                    <Text style={styles.dropdownHeaderText}>Konu</Text>
                                    <DropDown
                                        style={styles.picker}
                                        dropdownStyle={
                                            styles.pickerDropdown
                                        }
                                        textStyle={styles.pickerText}
                                        dropdownTextStyle={
                                            styles.pickerDropdownText
                                        }
                                        options={this.state.courseList}
                                        defaultValue={'Lütfen bir ders seçiniz'}
                                    />
                                </View>
                            </View>
                            <View style={styles.questionAmountView}>
                                <Text style={[styles.dropdownHeaderText, {marginTop: hp(4)}]}>Soru Sayısı</Text>
                                <View style={styles.questionAmounts}>
                                    <TouchableOpacity
                                        style={[
                                            styles.questionNumberCircle,
                                            {
                                                backgroundColor:
                                                    this.state
                                                        .choosenQuestionAmount ===
                                                    25
                                                        ? '#FF9900'
                                                        : '#fcfcfc'
                                            }
                                        ]}
                                        onPress={() => {
                                            this.questionAmountPicker(25)
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.questionNumberText,
                                                {
                                                    color:
                                                        this.state
                                                            .choosenQuestionAmount ===
                                                        25
                                                            ? '#fcfcfc'
                                                            : '#2E313C'
                                                }
                                            ]}
                                        >
                                            25
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.questionNumberCircle,
                                            {
                                                backgroundColor:
                                                    this.state
                                                        .choosenQuestionAmount ===
                                                    50
                                                        ? '#FF9900'
                                                        : '#fcfcfc'
                                            }
                                        ]}
                                        onPress={() => {
                                            this.questionAmountPicker(
                                                50
                                            )
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.questionNumberText,
                                                {
                                                    color:
                                                        this.state
                                                            .choosenQuestionAmount ===
                                                        50
                                                            ? '#fcfcfc'
                                                            : '#2E313C'
                                                }
                                            ]}
                                        >
                                            50
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.questionNumberCircle,
                                            {
                                                backgroundColor:
                                                    this.state
                                                        .choosenQuestionAmount ===
                                                    100
                                                        ? '#FF9900'
                                                        : '#fcfcfc'
                                            }
                                        ]}
                                        onPress={() => {
                                            this.questionAmountPicker(
                                                100
                                            )
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.questionNumberText,
                                                {
                                                    color:
                                                        this.state
                                                            .choosenQuestionAmount ===
                                                        100
                                                            ? '#fcfcfc'
                                                            : '#2E313C'
                                                }
                                            ]}
                                        >
                                            100
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.questionNumberCircle,
                                            {
                                                backgroundColor:
                                                    this.state
                                                        .choosenQuestionAmount ===
                                                    150
                                                        ? '#FF9900'
                                                        : '#fcfcfc'
                                            }
                                        ]}
                                        onPress={() => {
                                            this.questionAmountPicker(
                                                150
                                            )
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.questionNumberText,
                                                {
                                                    color:
                                                        this.state
                                                            .choosenQuestionAmount ===
                                                        150
                                                            ? '#fcfcfc'
                                                            : '#2E313C'
                                                }
                                            ]}
                                        >
                                            150
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.questionNumberCircle,
                                            {
                                                backgroundColor:
                                                    this.state
                                                        .choosenQuestionAmount ===
                                                    250
                                                        ? '#FF9900'
                                                        : '#fcfcfc'
                                            }
                                        ]}
                                        onPress={() => {
                                            this.questionAmountPicker(
                                                250
                                            )
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.questionNumberText,
                                                {
                                                    color:
                                                        this.state
                                                            .choosenQuestionAmount ===
                                                        250
                                                            ? '#fcfcfc'
                                                            : '#2E313C'
                                                }
                                            ]}
                                        >
                                            250
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.buttonsView}>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.buttonText}>Onayla</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.cancelButtonOnPress} style={[styles.button, {backgroundColor: '#BB2E0F', marginTop: hp(2)}]}>
                                    <Text style={styles.buttonText}>Vazgeç</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
            </View>
        )
    }
}

const mapStateToProps = state => ({
    choosenExam: state.gameContent.choosenExam,
    gameContentMap: state.gameContent.gameContentMap
})



export default connect(mapStateToProps)(Goals)
