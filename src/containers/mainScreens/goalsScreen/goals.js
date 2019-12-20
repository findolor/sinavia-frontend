import React from 'react'
import {
    Image, Text,
    TouchableOpacity,
    View,
    FlatList, Modal
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

class Goals extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleView: 'goalsList',
            courseList: [],
            subjectList: ['Lütfen bir konu seçiniz'],
            goalList: [],
            choosenQuestionAmount: 100,
            isModalVisible: false,
            choosenExamId: null,
            choosenCourseId: null,
            choosenSubjectId: null,
            removeGoalIndex: null
        }
    }

    componentDidMount() {
        this.setChoosenExamId().then(() => {
            this.courseListMaker()
        })
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

    courseListMaker = () => {
        const courseList = []
        this.props.gameContentMap.courses.forEach(course => {
            if (course.examId === this.state.choosenExamId) courseList.push(course.name)
        })

        this.setState({ courseList: courseList })
    }

    // Course name selector for dropdown
    pickerSelectCourse = (idx, value) => {
        this.selectCourseDropdown(idx)
    }

    // this index is the course id in gameContentMap
    selectCourseDropdown = index => {
        const courseName = this.state.courseList[parseInt(index, 10)]
        index = this.props.gameContentMap.courses.findIndex(
            x => x.name === courseName && x.examId === this.state.choosenExamId
        )
        const courseId = this.props.gameContentMap.courses[index].id

        const subjectList = []
        this.props.gameContentMap.subjects.forEach(subject => {
            if (subject.courseId === courseId) subjectList.push(subject.name)
        })
        this.setState(
            {
                subjectList: subjectList,
                choosenCourseId: courseId
            })
    }

    selectSubjectDropdown = (idx, value) => {
        const subjectName = this.state.subjectList[parseInt(idx, 10)]
        const index = this.props.gameContentMap.subjects.findIndex(
            x => x.name === subjectName && x.courseId === this.state.choosenCourseId
        )
        const subjectId = this.props.gameContentMap.subjects[index].id
        this.setState({ choosenSubjectId: subjectId })
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
                            onPress={this.removeGoal}
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

    removeGoalOnPress = (index) => {
        this.setState({
            isModalVisible: true,
            removeGoalIndex: index
        })
    }

    saveGoal = () => {
        if(this.state.choosenSubjectId === null || this.state.choosenCourseId === null) return
        const goalIndex = this.state.goalList.findIndex(x => x.subjectId === this.state.choosenSubjectId)
        if(goalIndex !== -1) return

        const goalList = this.state.goalList

        goalList.push({
            courseId: this.state.choosenCourseId,
            subjectId: this.state.choosenSubjectId,
            solvedQuestion: 0,
            questionGoal: this.state.choosenQuestionAmount
        })

        this.setState({ goalList: goalList, visibleView: 'goalsList' })
    }

    removeGoal = () => {
        const goalList = this.state.goalList

        goalList.splice(this.state.removeGoalIndex, 1)
        this.setState({ goalList: goalList, isModalVisible: false })
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
                    <View style={styles.returnLogoContainer}>
                    {this.state.visibleView !== 'addNewGoal' &&
                        <TouchableOpacity onPress={this.returnButtonOnPress}>
                        <Image
                                source={returnLogo}
                                style={styles.returnLogo}
                            />
                    </TouchableOpacity>
                    }
                    </View>
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
                    {this.state.visibleView === 'goalsList' && Object.keys(this.state.goalList).length !== 0 &&
                        <View style={styles.scrollViewContainer}>
                            <FlatList
                                data={this.state.goalList}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={{height: hp(16.5), width: wp(90), marginTop: hp(1.5)}}>
                                            <View style={[styles.goalView, {borderColor: item.solvedQuestion >= item.questionGoal ? '#21C95A' : '#00D9EF'}]}>
                                                <View style={styles.courseAndSubjectName}>
                                                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end'}}>
                                                        <Text style={styles.courseText}>{this.props.gameContentMap.courses[item.courseId - 1].name}</Text>
                                                        <Text style={styles.subjectText}>    {this.props.gameContentMap.subjects[item.subjectId - 1].name}</Text>
                                                    </View>
                                                    <TouchableOpacity onPress={() => this.removeGoalOnPress(index)}>
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
                {this.state.visibleView === 'goalsList' && Object.keys(this.state.goalList).length === 0 &&
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
                                        onSelect={(idx, value) =>
                                            this.pickerSelectCourse(idx, value)
                                        }
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
                                        options={this.state.subjectList}
                                        defaultValue={'Lütfen bir konu seçiniz'}
                                        onSelect={(idx, value) =>
                                            this.selectSubjectDropdown(
                                                idx,
                                                value
                                            )
                                        }
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
                                <TouchableOpacity style={styles.button} onPress={this.saveGoal}>
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

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, null)(Goals)
