import React from 'react'
import {
    Image,
    ImageBackground,
    FlatList,
    Modal,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { connect } from 'react-redux'
import { clientActions } from '../../../redux/client/actions'
import DropDown from '../../../components/mainScreen/dropdown/dropdown'
import { LGS, YKS } from '../../../components/mainScreen/carousel/static/exams'
import * as courses from '../../../components/mainScreen/carousel/static/courses'
import styles from './style'
import NotchView from '../../../components/notchView'
import PROFILE_PIC from '../../../assets/profile2.jpg'
import FIRST_TITLE from '../../../assets/firstTitle.png'
import SECOND_TITLE from '../../../assets/secondTitle.png'
import THIRD_TITLE from '../../../assets/thirdTitle.png'
import SLIDE_DOWN from '../../../assets/slide_down.png'

const data = [
    {
        number: '11',
        name: 'Hakan Yılmaz',
        score: '400'
    },
    {
        number: '11',
        name: 'Hakan Yılmaz',
        score: '400'
    },
    {
        number: '11',
        name: 'Hakan Yılmaz',
        score: '400'
    },
    {
        number: '11',
        name: 'Hakan Yılmaz',
        score: '400'
    },
    {
        number: '11',
        name: 'Hakan Yılmaz',
        score: '400'
    },
    {
        number: '11',
        name: 'Hakan Yılmaz',
        score: '400'
    }
]

class Leaderboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: data,
            selectedOrderMode: 'global',
            globalButtonBackgroundColor: '#FF6D00',
            globalButtonTextColor: '#FFFFFF',
            friendsButtonBackgroundColor: '#FFFFFF',
            friendsButtonTextColor: '#2E313C',
            // Dropwodn list variables
            courseLeaderboardList: ['Genel'],
            subjectLeaderboardList: [],
            subjectLeaderboardListDefaultValue: '',
            isSubjectDropdownVisible: false
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

    updateOrderCategoryButtonUI = orderMode => {
        switch (orderMode) {
            case 'globalOrder':
                if (this.state.selectedOrderMode === orderMode) return
                this.setState({
                    globalButtonBackgroundColor: '#FF6D00',
                    globalButtonTextColor: '#FFFFFF',
                    friendsButtonBackgroundColor: '#FFFFFF',
                    friendsButtonTextColor: '#2E313C'
                })
                this.setState({ selectedGameMode: orderMode })
                return
            case 'friendsOrder':
                if (this.state.selectedOrderMode === orderMode) return
                this.setState({
                    globalButtonBackgroundColor: '#FFFFFF',
                    globalButtonTextColor: '#2E313C',
                    friendsButtonBackgroundColor: '#FF6D00',
                    friendsButtonTextColor: '#FFFFFF'
                })
                this.setState({ selectedGameMode: orderMode })
                return
        }
    }

    orderCategoryButtonOnPress = selectedMode => {
        this.updateOrderCategoryButtonUI(selectedMode)
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

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                >
                    <NotchView color={'#fcfcfc'} />
                    <View style={styles.leaderContainer}>
                        <View style={styles.tabbarContainer}>
                            <TouchableOpacity
                                onPress={() =>
                                    this.orderCategoryButtonOnPress(
                                        'globalOrder'
                                    )
                                }
                            >
                                <View
                                    style={[
                                        styles.globalTabContainer,
                                        {
                                            backgroundColor: this.state
                                                .globalButtonBackgroundColor
                                        }
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.tabbarGlobalText,
                                            {
                                                color: this.state
                                                    .globalButtonTextColor
                                            }
                                        ]}
                                    >
                                        Global
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    this.orderCategoryButtonOnPress(
                                        'friendsOrder'
                                    )
                                }
                            >
                                <View
                                    style={[
                                        styles.friendsTabContainer,
                                        {
                                            backgroundColor: this.state
                                                .friendsButtonBackgroundColor
                                        }
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.tabbarFriendsText,
                                            {
                                                color: this.state
                                                    .friendsButtonTextColor
                                            }
                                        ]}
                                    >
                                        Arkadaş
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dropdownsAndImageContainer}>
                            <View style={styles.dropdownContainer}>
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
                            </View>
                            <View style={styles.leaderImageContainer}>
                                <ImageBackground
                                    source={PROFILE_PIC}
                                    style={styles.firstUserPic}
                                    imageStyle={{ borderRadius: 100 }}
                                >
                                    <Image
                                        source={FIRST_TITLE}
                                        style={styles.firstUserTitlePic}
                                    />
                                    <View style={styles.firstUserOrderView}>
                                        <Text style={styles.topTenOrderNumber}>
                                            1
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </View>
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
                        <View style={styles.nameAndScoreContainer}>
                            <Text style={styles.nameText}>Hakan Yılmaz</Text>
                            <Text style={styles.scoreText}>
                                Sınavia Puanı: 400
                            </Text>
                        </View>
                    </View>
                    <View style={styles.topTenContainer}>
                        <View style={styles.dividedTopTenContainer}>
                            <View style={styles.topTenUserContainer}>
                                <View style={styles.topTenUserPicContainer}>
                                    <ImageBackground
                                        source={PROFILE_PIC}
                                        style={
                                            styles.secondAndThirdUsersFromTopTenPic
                                        }
                                        imageStyle={{ borderRadius: 100 }}
                                    >
                                        <Image
                                            source={SECOND_TITLE}
                                            style={
                                                styles.secondAndThirdTitlePic
                                            }
                                        />
                                        <View
                                            style={
                                                styles.secondToTenUsersOrderView
                                            }
                                        >
                                            <Text
                                                style={styles.topTenOrderNumber}
                                            >
                                                2
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                                <View style={styles.topTenUserNameContainer}>
                                    <Text style={styles.topTenUserNameText}>
                                        Hakan Yılmaz
                                    </Text>
                                </View>
                                <View style={styles.topTenUserScoreContainer}>
                                    <Text style={styles.topTenUserScoreText}>
                                        400
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.topTenUserContainer}>
                                <View style={styles.topTenUserPicContainer}>
                                    <ImageBackground
                                        source={PROFILE_PIC}
                                        style={
                                            styles.secondAndThirdUsersFromTopTenPic
                                        }
                                        imageStyle={{ borderRadius: 100 }}
                                    >
                                        <Image
                                            source={THIRD_TITLE}
                                            style={
                                                styles.secondAndThirdTitlePic
                                            }
                                        />
                                        <View
                                            style={
                                                styles.secondToTenUsersOrderView
                                            }
                                        >
                                            <Text
                                                style={styles.topTenOrderNumber}
                                            >
                                                3
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                                <View style={styles.topTenUserNameContainer}>
                                    <Text style={styles.topTenUserNameText}>
                                        Hakan Yılmaz
                                    </Text>
                                </View>
                                <View style={styles.topTenUserScoreContainer}>
                                    <Text style={styles.topTenUserScoreText}>
                                        400
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.topTenUserContainer}>
                                <View style={styles.topTenUserPicContainer}>
                                    <ImageBackground
                                        source={PROFILE_PIC}
                                        style={styles.otherUsersFromTopTenPic}
                                        imageStyle={{ borderRadius: 100 }}
                                    >
                                        <View
                                            style={
                                                styles.secondToTenUsersOrderView
                                            }
                                        >
                                            <Text
                                                style={styles.topTenOrderNumber}
                                            >
                                                4
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                                <View style={styles.topTenUserNameContainer}>
                                    <Text style={styles.topTenUserNameText}>
                                        Hakan Yılmaz
                                    </Text>
                                </View>
                                <View style={styles.topTenUserScoreContainer}>
                                    <Text style={styles.topTenUserScoreText}>
                                        400
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.dividedTopTenContainer}>
                            <View style={styles.topTenUserContainer}>
                                <View style={styles.topTenUserPicContainer}>
                                    <ImageBackground
                                        source={PROFILE_PIC}
                                        style={styles.otherUsersFromTopTenPic}
                                        imageStyle={{ borderRadius: 100 }}
                                    >
                                        <View
                                            style={
                                                styles.secondToTenUsersOrderView
                                            }
                                        >
                                            <Text
                                                style={styles.topTenOrderNumber}
                                            >
                                                5
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                                <View style={styles.topTenUserNameContainer}>
                                    <Text style={styles.topTenUserNameText}>
                                        Hakan Yılmaz
                                    </Text>
                                </View>
                                <View style={styles.topTenUserScoreContainer}>
                                    <Text style={styles.topTenUserScoreText}>
                                        400
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.topTenUserContainer}>
                                <View style={styles.topTenUserPicContainer}>
                                    <ImageBackground
                                        source={PROFILE_PIC}
                                        style={styles.otherUsersFromTopTenPic}
                                        imageStyle={{ borderRadius: 100 }}
                                    >
                                        <View
                                            style={
                                                styles.secondToTenUsersOrderView
                                            }
                                        >
                                            <Text
                                                style={styles.topTenOrderNumber}
                                            >
                                                6
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                                <View style={styles.topTenUserNameContainer}>
                                    <Text style={styles.topTenUserNameText}>
                                        Hakan Yılmaz
                                    </Text>
                                </View>
                                <View style={styles.topTenUserScoreContainer}>
                                    <Text style={styles.topTenUserScoreText}>
                                        400
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.topTenUserContainer}>
                                <View style={styles.topTenUserPicContainer}>
                                    <ImageBackground
                                        source={PROFILE_PIC}
                                        style={styles.otherUsersFromTopTenPic}
                                        imageStyle={{ borderRadius: 100 }}
                                    >
                                        <View
                                            style={
                                                styles.secondToTenUsersOrderView
                                            }
                                        >
                                            <Text
                                                style={styles.topTenOrderNumber}
                                            >
                                                7
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                                <View style={styles.topTenUserNameContainer}>
                                    <Text style={styles.topTenUserNameText}>
                                        Hakan Yılmaz
                                    </Text>
                                </View>
                                <View style={styles.topTenUserScoreContainer}>
                                    <Text style={styles.topTenUserScoreText}>
                                        400
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.dividedTopTenContainer}>
                            <View style={styles.topTenUserContainer}>
                                <View style={styles.topTenUserPicContainer}>
                                    <ImageBackground
                                        source={PROFILE_PIC}
                                        style={styles.otherUsersFromTopTenPic}
                                        imageStyle={{ borderRadius: 100 }}
                                    >
                                        <View
                                            style={
                                                styles.secondToTenUsersOrderView
                                            }
                                        >
                                            <Text
                                                style={styles.topTenOrderNumber}
                                            >
                                                8
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                                <View style={styles.topTenUserNameContainer}>
                                    <Text style={styles.topTenUserNameText}>
                                        Hakan Yılmaz
                                    </Text>
                                </View>
                                <View style={styles.topTenUserScoreContainer}>
                                    <Text style={styles.topTenUserScoreText}>
                                        400
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.topTenUserContainer}>
                                <View style={styles.topTenUserPicContainer}>
                                    <ImageBackground
                                        source={PROFILE_PIC}
                                        style={styles.otherUsersFromTopTenPic}
                                        imageStyle={{ borderRadius: 100 }}
                                    >
                                        <View
                                            style={
                                                styles.secondToTenUsersOrderView
                                            }
                                        >
                                            <Text
                                                style={styles.topTenOrderNumber}
                                            >
                                                9
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                                <View style={styles.topTenUserNameContainer}>
                                    <Text style={styles.topTenUserNameText}>
                                        Hakan Yılmaz
                                    </Text>
                                </View>
                                <View style={styles.topTenUserScoreContainer}>
                                    <Text style={styles.topTenUserScoreText}>
                                        400
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.topTenUserContainer}>
                                <View style={styles.topTenUserPicContainer}>
                                    <ImageBackground
                                        source={PROFILE_PIC}
                                        style={styles.otherUsersFromTopTenPic}
                                        imageStyle={{ borderRadius: 100 }}
                                    >
                                        <View
                                            style={
                                                styles.secondToTenUsersOrderView
                                            }
                                        >
                                            <Text
                                                style={styles.topTenOrderNumber}
                                            >
                                                10
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                                <View style={styles.topTenUserNameContainer}>
                                    <Text style={styles.topTenUserNameText}>
                                        Hakan Yılmaz
                                    </Text>
                                </View>
                                <View style={styles.topTenUserScoreContainer}>
                                    <Text style={styles.topTenUserScoreText}>
                                        400
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.continueOrderTextContainer}>
                        <Image
                            source={SLIDE_DOWN}
                            style={styles.slideDownLeftImg}
                        />
                        <Text style={styles.continueOrderText}>
                            Sıralamanın devamı için kaydır
                        </Text>
                        <Image
                            source={SLIDE_DOWN}
                            style={styles.slideDownRightImg}
                        />
                    </View>
                    <FlatList
                        data={this.state.data}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.tenToHundredUserRow}>
                                    <View
                                        style={
                                            styles.tenToHundredUserOrderContainer
                                        }
                                    >
                                        <Text
                                            style={
                                                styles.tenToHundredUserOrderText
                                            }
                                        >
                                            {item.number}
                                        </Text>
                                    </View>
                                    <View
                                        style={
                                            styles.tenToHundredUserNameContainer
                                        }
                                    >
                                        <Text
                                            style={
                                                styles.tenToHundredUserNameText
                                            }
                                        >
                                            {item.name}
                                        </Text>
                                    </View>
                                    <View
                                        style={
                                            styles.tenToHundredUserScoreContainer
                                        }
                                    >
                                        <Text
                                            style={
                                                styles.tenToHundredUserScoreText
                                            }
                                        >
                                            {item.score}
                                        </Text>
                                    </View>
                                </View>
                            )
                        }}
                        keyExtractor={(item, index) => index}
                    />
                </ScrollView>
                <View style={styles.yourOrderTextContainer}>
                    <Text style={styles.yourOrderText}>
                        Senin Sıralaman: 300
                    </Text>
                </View>
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
)(Leaderboard)
