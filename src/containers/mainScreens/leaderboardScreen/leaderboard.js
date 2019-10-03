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
import { leaderboardServices } from '../../../sagas/leaderboard/'
import DropDown from '../../../components/mainScreen/dropdown/dropdown'
import styles from './style'

import FIRST_TITLE from '../../../assets/firstTitle.png'
import SECOND_TITLE from '../../../assets/secondTitle.png'
import THIRD_TITLE from '../../../assets/thirdTitle.png'
import SLIDE_DOWN from '../../../assets/slide_down.png'

class Leaderboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rankingMode: 'global',
            globalButtonBackgroundColor: '#FF6D00',
            globalButtonTextColor: '#FFFFFF',
            friendsButtonBackgroundColor: '#FFFFFF',
            friendsButtonTextColor: '#2E313C',
            // Dropwodn list variables
            courseList: [],
            subjectList: [],
            subjectListDefaultValue: '',
            isSubjectDropdownVisible: false,
            // Choosen game contents
            choosenExamId: null,
            choosenCourseId: null,
            choosenSubjectId: null,
            // User's attributes
            topTenUsernames: [],
            remainingUsernames: [],
            topTenPoints: [],
            remainingPoints: [],
            topTenProfilePictures: [],
            remainingProfilePictures: [],
            // Flatlist user list ( 90 users )
            remainingUsersFlatList: [],
            // Client ranking
            clientRanking: 0,
            // Original lists
            originalGlobalLeaderboardList: [],
            originalFriendsLeaderboardList: []
        }
    }

    // TODO WRITE FETCH FUNCTIONS FOR FETHING WHEN THE COURSE SUBJECT CHANGES
    componentDidMount() {
        this.setChoosenExamId().then(() => {
            this.fetchLeaderboard().then(data => {
                let userList = []

                data.userList.forEach(user => {
                    user = JSON.parse(user)
                    userList.push(user)
                })

                this.makeLeaderboardLists(userList)
            })
        })

        this.courseListMaker()
    }

    makeLeaderboardLists = userList => {
        let userUsernames = []
        let topTenUsernames = []
        let remainingUsernames = []
        let userPoints = []
        let topTenPoints = []
        let remainingPoints = []
        let userProfilePictures = []
        let topTenProfilePictures = []
        let remainingProfilePictures = []

        userList.forEach(user => {
            userUsernames.push(user.user.username)
            userPoints.push(user.totalPoints)
            userProfilePictures.push(user.user.profilePicture)
        })

        // Getting the top ten names to a list and save the rest
        remainingUsernames = userUsernames
        topTenUsernames = remainingUsernames.splice(0, 10)
        remainingUsernames = remainingUsernames.slice(0, 90)
        // Getting the top ten points to a list and save the rest
        remainingPoints = userPoints
        topTenPoints = remainingPoints.splice(0, 10)
        remainingPoints = remainingPoints.slice(0, 90)
        // Getting the top ten profile pictures to a list and save the rest
        remainingProfilePictures = userProfilePictures
        topTenProfilePictures = remainingProfilePictures.splice(0, 10)
        remainingProfilePictures = remainingProfilePictures.slice(0, 90)

        // Putting the remaining usernames and points
        let remainingUsersFlatList = []
        for (i = 0; i < 90; i++) {
            if (remainingUsernames[i] === undefined) continue
            remainingUsersFlatList.push({
                name: remainingUsernames[i],
                totalPoints: remainingPoints[i]
            })
        }

        let clientIndex = userList.findIndex(
            x => x.userId === this.props.clientDBId
        )

        // Saving the original userList based on the ranking mode
        this.state.rankingMode === 'global'
            ? this.setState({ originalGlobalLeaderboardList: userList })
            : this.setState({ originalFriendsLeaderboardList: userList })
        this.setState({
            topTenUsernames: topTenUsernames,
            remainingUsernames: remainingUsernames,
            topTenPoints: topTenPoints,
            remainingPoints: remainingPoints,
            topTenProfilePictures: topTenProfilePictures,
            remainingProfilePictures: remainingProfilePictures,
            remainingUsersFlatList: remainingUsersFlatList,
            clientRanking: clientIndex + 1
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

    // Course name selector for dropdown
    pickerSelectCourse = (idx, value) => {
        this.setState({ isSubjectDropdownVisible: false })
        setTimeout(() => {
            this.selectCourseDropdown(idx)
        }, 200)
    }

    // this index is the course id in gameContentMap
    selectCourseDropdown = index => {
        index = parseInt(index, 10)
        if (index === 0) {
            this.setState({
                subjectList: [],
                choosenCourseId: null,
                choosenSubjectId: null
            })
            return
        }
        const subjectList = ['Hepsi']
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

    selectSubjectDropdown = (idx, value) => {
        let index = parseInt(idx, 10)
        if (index === 0) {
            this.setState({ subjectList: [], choosenSubjectId: null })
            return
        } else {
            this.setState({ choosenSubjectId: index })
        }
    }

    // Fetching the leaderboard based on the selected mode
    fetchLeaderboard = async () => {
        switch (this.state.rankingMode) {
            case 'global':
                return leaderboardServices.getLeaderboard(
                    this.props.clientToken,
                    { examId: this.state.choosenExamId }
                )
            case 'friends':
                return leaderboardServices.getFriendScores(
                    this.props.clientToken,
                    this.props.friendIds,
                    this.props.clientDBId
                )
        }
    }

    orderCategoryButtonOnPress = selectedMode => {
        switch (selectedMode) {
            case 'global':
                if (this.state.rankingMode === selectedMode) return
                this.setState({
                    globalButtonBackgroundColor: '#FF6D00',
                    globalButtonTextColor: '#FFFFFF',
                    friendsButtonBackgroundColor: '#FFFFFF',
                    friendsButtonTextColor: '#2E313C'
                })
                if (
                    Object.keys(this.state.originalGlobalLeaderboardList)
                        .length === 0
                ) {
                    this.setState({ rankingMode: selectedMode }, () => {
                        this.fetchLeaderboard().then(data => {
                            // We populate the list again
                            this.makeLeaderboardLists(data)
                        })
                    })
                } else {
                    this.setState({ rankingMode: selectedMode }, () => {
                        this.makeLeaderboardLists(
                            this.state.originalGlobalLeaderboardList
                        )
                    })
                }
                return
            case 'friends':
                if (this.state.rankingMode === selectedMode) return
                this.setState({
                    globalButtonBackgroundColor: '#FFFFFF',
                    globalButtonTextColor: '#2E313C',
                    friendsButtonBackgroundColor: '#FF6D00',
                    friendsButtonTextColor: '#FFFFFF'
                })
                if (
                    Object.keys(this.state.originalFriendsLeaderboardList)
                        .length === 0
                ) {
                    this.setState({ rankingMode: selectedMode }, () => {
                        // We dont send the request if the user don't have any friends
                        if (Object.keys(this.props.friendIds).length === 0)
                            return
                        this.fetchLeaderboard().then(data => {
                            // We populate the list again
                            this.makeLeaderboardLists(data)
                        })
                    })
                } else {
                    this.setState({ rankingMode: selectedMode }, () => {
                        this.makeLeaderboardLists(
                            this.state.originalFriendsLeaderboardList
                        )
                    })
                }
                return
        }
    }

    // TODO CHANGE THE TOP THEN TO FLAT LIST
    // COMMENT OUT THE CODE HERE AND ADD THE NEW ONE
    // WILL USE THE OLD CODE FOR HELP LATER
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.scrollViewContainer}>
                    <ScrollView
                        style={styles.scrollView}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.leaderContainer}>
                            <View style={styles.tabbarContainer}>
                                <TouchableOpacity
                                    onPress={() =>
                                        this.orderCategoryButtonOnPress(
                                            'global'
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
                                            'friends'
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
                                        options={this.state.courseList}
                                        onSelect={(idx, value) =>
                                            this.pickerSelectCourse(idx, value)
                                        }
                                    />
                                </View>
                                <View style={styles.leaderImageContainer}>
                                    <ImageBackground
                                        source={{
                                            uri:
                                                this.state
                                                    .topTenProfilePictures[0] !==
                                                undefined
                                                    ? this.state
                                                          .topTenProfilePictures[0]
                                                    : null
                                        }}
                                        style={styles.firstUserPic}
                                        imageStyle={{ borderRadius: 100 }}
                                    >
                                        <Image
                                            source={FIRST_TITLE}
                                            style={styles.firstUserTitlePic}
                                        />
                                        <View style={styles.firstUserOrderView}>
                                            <Text
                                                style={styles.topTenOrderNumber}
                                            >
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
                                            dropdownStyle={
                                                styles.pickerDropdown
                                            }
                                            defaultValue={
                                                this.state
                                                    .subjectListDefaultValue
                                            }
                                            options={this.state.subjectList}
                                            onSelect={(idx, value) =>
                                                this.selectSubjectDropdown(
                                                    idx,
                                                    value
                                                )
                                            }
                                        />
                                    </View>
                                )}
                            </View>
                            <View style={styles.nameAndScoreContainer}>
                                <Text style={styles.nameText}>
                                    {this.state.topTenUsernames[0] !==
                                        undefined &&
                                        this.state.topTenUsernames[0]}
                                    {this.state.topTenUsernames[0] ===
                                        undefined && ''}
                                </Text>
                                <Text style={styles.scoreText}>
                                    Puan:{' '}
                                    {this.state.topTenPoints[0] !== undefined &&
                                        this.state.topTenPoints[0]}
                                    {this.state.topTenPoints[0] === undefined &&
                                        ''}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.topTenContainer}>
                            <View style={styles.dividedTopTenContainer}>
                                <View style={styles.topTenUserContainer}>
                                    <View style={styles.topTenUserPicContainer}>
                                        <ImageBackground
                                            source={{
                                                uri:
                                                    this.state
                                                        .topTenProfilePictures[1] !==
                                                    undefined
                                                        ? this.state
                                                              .topTenProfilePictures[1]
                                                        : null
                                            }}
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
                                                    style={
                                                        styles.topTenOrderNumber
                                                    }
                                                >
                                                    2
                                                </Text>
                                            </View>
                                        </ImageBackground>
                                    </View>
                                    <View
                                        style={styles.topTenUserNameContainer}
                                    >
                                        <Text style={styles.topTenUserNameText}>
                                            {this.state.topTenUsernames[1] !==
                                                undefined &&
                                                this.state.topTenUsernames[1]}
                                            {this.state.topTenUsernames[1] ===
                                                undefined && ''}
                                        </Text>
                                    </View>
                                    <View
                                        style={styles.topTenUserScoreContainer}
                                    >
                                        <Text
                                            style={styles.topTenUserScoreText}
                                        >
                                            Puan:{' '}
                                            {this.state.topTenPoints[1] !==
                                                undefined &&
                                                this.state.topTenPoints[1]}
                                            {this.state.topTenPoints[1] ===
                                                undefined && ''}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.topTenUserContainer}>
                                    <View style={styles.topTenUserPicContainer}>
                                        <ImageBackground
                                            source={{
                                                uri:
                                                    this.state
                                                        .topTenProfilePictures[2] !==
                                                    undefined
                                                        ? this.state
                                                              .topTenProfilePictures[2]
                                                        : null
                                            }}
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
                                                    style={
                                                        styles.topTenOrderNumber
                                                    }
                                                >
                                                    3
                                                </Text>
                                            </View>
                                        </ImageBackground>
                                    </View>
                                    <View
                                        style={styles.topTenUserNameContainer}
                                    >
                                        <Text style={styles.topTenUserNameText}>
                                            {this.state.topTenUsernames[2] !==
                                                undefined &&
                                                this.state.topTenUsernames[2]}
                                            {this.state.topTenUsernames[2] ===
                                                undefined && ''}
                                        </Text>
                                    </View>
                                    <View
                                        style={styles.topTenUserScoreContainer}
                                    >
                                        <Text
                                            style={styles.topTenUserScoreText}
                                        >
                                            Puan:{' '}
                                            {this.state.topTenPoints[2] !==
                                                undefined &&
                                                this.state.topTenPoints[2]}
                                            {this.state.topTenPoints[2] ===
                                                undefined && ''}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.topTenUserContainer}>
                                    <View style={styles.topTenUserPicContainer}>
                                        <ImageBackground
                                            source={{
                                                uri:
                                                    this.state
                                                        .topTenProfilePictures[3] !==
                                                    undefined
                                                        ? this.state
                                                              .topTenProfilePictures[3]
                                                        : null
                                            }}
                                            style={
                                                styles.otherUsersFromTopTenPic
                                            }
                                            imageStyle={{ borderRadius: 100 }}
                                        >
                                            <View
                                                style={
                                                    styles.secondToTenUsersOrderView
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.topTenOrderNumber
                                                    }
                                                >
                                                    4
                                                </Text>
                                            </View>
                                        </ImageBackground>
                                    </View>
                                    <View
                                        style={styles.topTenUserNameContainer}
                                    >
                                        <Text style={styles.topTenUserNameText}>
                                            {this.state.topTenUsernames[3] !==
                                                undefined &&
                                                this.state.topTenUsernames[3]}
                                            {this.state.topTenUsernames[3] ===
                                                undefined && ''}
                                        </Text>
                                    </View>
                                    <View
                                        style={styles.topTenUserScoreContainer}
                                    >
                                        <Text
                                            style={styles.topTenUserScoreText}
                                        >
                                            Puan:{' '}
                                            {this.state.topTenPoints[3] !==
                                                undefined &&
                                                this.state.topTenPoints[3]}
                                            {this.state.topTenPoints[3] ===
                                                undefined && ''}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.dividedTopTenContainer}>
                                <View style={styles.topTenUserContainer}>
                                    <View style={styles.topTenUserPicContainer}>
                                        <ImageBackground
                                            source={{
                                                uri:
                                                    this.state
                                                        .topTenProfilePictures[4] !==
                                                    undefined
                                                        ? this.state
                                                              .topTenProfilePictures[4]
                                                        : null
                                            }}
                                            style={
                                                styles.otherUsersFromTopTenPic
                                            }
                                            imageStyle={{ borderRadius: 100 }}
                                        >
                                            <View
                                                style={
                                                    styles.secondToTenUsersOrderView
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.topTenOrderNumber
                                                    }
                                                >
                                                    5
                                                </Text>
                                            </View>
                                        </ImageBackground>
                                    </View>
                                    <View
                                        style={styles.topTenUserNameContainer}
                                    >
                                        <Text style={styles.topTenUserNameText}>
                                            {this.state.topTenUsernames[4] !==
                                                undefined &&
                                                this.state.topTenUsernames[4]}
                                            {this.state.topTenUsernames[4] ===
                                                undefined && ''}
                                        </Text>
                                    </View>
                                    <View
                                        style={styles.topTenUserScoreContainer}
                                    >
                                        <Text
                                            style={styles.topTenUserScoreText}
                                        >
                                            Puan:{' '}
                                            {this.state.topTenPoints[4] !==
                                                undefined &&
                                                this.state.topTenPoints[4]}
                                            {this.state.topTenPoints[4] ===
                                                undefined && ''}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.topTenUserContainer}>
                                    <View style={styles.topTenUserPicContainer}>
                                        <ImageBackground
                                            source={{
                                                uri:
                                                    this.state
                                                        .topTenProfilePictures[5] !==
                                                    undefined
                                                        ? this.state
                                                              .topTenProfilePictures[5]
                                                        : null
                                            }}
                                            style={
                                                styles.otherUsersFromTopTenPic
                                            }
                                            imageStyle={{ borderRadius: 100 }}
                                        >
                                            <View
                                                style={
                                                    styles.secondToTenUsersOrderView
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.topTenOrderNumber
                                                    }
                                                >
                                                    6
                                                </Text>
                                            </View>
                                        </ImageBackground>
                                    </View>
                                    <View
                                        style={styles.topTenUserNameContainer}
                                    >
                                        <Text style={styles.topTenUserNameText}>
                                            {this.state.topTenUsernames[5] !==
                                                undefined &&
                                                this.state.topTenUsernames[5]}
                                            {this.state.topTenUsernames[5] ===
                                                undefined && ''}
                                        </Text>
                                    </View>
                                    <View
                                        style={styles.topTenUserScoreContainer}
                                    >
                                        <Text
                                            style={styles.topTenUserScoreText}
                                        >
                                            Puan:{' '}
                                            {this.state.topTenPoints[5] !==
                                                undefined &&
                                                this.state.topTenPoints[5]}
                                            {this.state.topTenPoints[5] ===
                                                undefined && ''}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.topTenUserContainer}>
                                    <View style={styles.topTenUserPicContainer}>
                                        <ImageBackground
                                            source={{
                                                uri:
                                                    this.state
                                                        .topTenProfilePictures[6] !==
                                                    undefined
                                                        ? this.state
                                                              .topTenProfilePictures[6]
                                                        : null
                                            }}
                                            style={
                                                styles.otherUsersFromTopTenPic
                                            }
                                            imageStyle={{ borderRadius: 100 }}
                                        >
                                            <View
                                                style={
                                                    styles.secondToTenUsersOrderView
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.topTenOrderNumber
                                                    }
                                                >
                                                    7
                                                </Text>
                                            </View>
                                        </ImageBackground>
                                    </View>
                                    <View
                                        style={styles.topTenUserNameContainer}
                                    >
                                        <Text style={styles.topTenUserNameText}>
                                            {this.state.topTenUsernames[6] !==
                                                undefined &&
                                                this.state.topTenUsernames[6]}
                                            {this.state.topTenUsernames[6] ===
                                                undefined && ''}
                                        </Text>
                                    </View>
                                    <View
                                        style={styles.topTenUserScoreContainer}
                                    >
                                        <Text
                                            style={styles.topTenUserScoreText}
                                        >
                                            Puan:{' '}
                                            {this.state.topTenPoints[6] !==
                                                undefined &&
                                                this.state.topTenPoints[6]}
                                            {this.state.topTenPoints[6] ===
                                                undefined && ''}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.dividedTopTenContainer}>
                                <View style={styles.topTenUserContainer}>
                                    <View style={styles.topTenUserPicContainer}>
                                        <ImageBackground
                                            source={{
                                                uri:
                                                    this.state
                                                        .topTenProfilePictures[7] !==
                                                    undefined
                                                        ? this.state
                                                              .topTenProfilePictures[7]
                                                        : null
                                            }}
                                            style={
                                                styles.otherUsersFromTopTenPic
                                            }
                                            imageStyle={{ borderRadius: 100 }}
                                        >
                                            <View
                                                style={
                                                    styles.secondToTenUsersOrderView
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.topTenOrderNumber
                                                    }
                                                >
                                                    8
                                                </Text>
                                            </View>
                                        </ImageBackground>
                                    </View>
                                    <View
                                        style={styles.topTenUserNameContainer}
                                    >
                                        <Text style={styles.topTenUserNameText}>
                                            {this.state.topTenUsernames[7] !==
                                                undefined &&
                                                this.state.topTenUsernames[7]}
                                            {this.state.topTenUsernames[7] ===
                                                undefined && ''}
                                        </Text>
                                    </View>
                                    <View
                                        style={styles.topTenUserScoreContainer}
                                    >
                                        <Text
                                            style={styles.topTenUserScoreText}
                                        >
                                            Puan:{' '}
                                            {this.state.topTenPoints[7] !==
                                                undefined &&
                                                this.state.topTenPoints[7]}
                                            {this.state.topTenPoints[7] ===
                                                undefined && ''}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.topTenUserContainer}>
                                    <View style={styles.topTenUserPicContainer}>
                                        <ImageBackground
                                            source={{
                                                uri:
                                                    this.state
                                                        .topTenProfilePictures[8] !==
                                                    undefined
                                                        ? this.state
                                                              .topTenProfilePictures[8]
                                                        : null
                                            }}
                                            style={
                                                styles.otherUsersFromTopTenPic
                                            }
                                            imageStyle={{ borderRadius: 100 }}
                                        >
                                            <View
                                                style={
                                                    styles.secondToTenUsersOrderView
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.topTenOrderNumber
                                                    }
                                                >
                                                    9
                                                </Text>
                                            </View>
                                        </ImageBackground>
                                    </View>
                                    <View
                                        style={styles.topTenUserNameContainer}
                                    >
                                        <Text style={styles.topTenUserNameText}>
                                            {this.state.topTenUsernames[8] !==
                                                undefined &&
                                                this.state.topTenUsernames[8]}
                                            {this.state.topTenUsernames[8] ===
                                                undefined && ''}
                                        </Text>
                                    </View>
                                    <View
                                        style={styles.topTenUserScoreContainer}
                                    >
                                        <Text
                                            style={styles.topTenUserScoreText}
                                        >
                                            Puan:{' '}
                                            {this.state.topTenPoints[8] !==
                                                undefined &&
                                                this.state.topTenPoints[8]}
                                            {this.state.topTenPoints[8] ===
                                                undefined && ''}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.topTenUserContainer}>
                                    <View style={styles.topTenUserPicContainer}>
                                        <ImageBackground
                                            source={{
                                                uri:
                                                    this.state
                                                        .topTenProfilePictures[9] !==
                                                    undefined
                                                        ? this.state
                                                              .topTenProfilePictures[9]
                                                        : null
                                            }}
                                            style={
                                                styles.otherUsersFromTopTenPic
                                            }
                                            imageStyle={{ borderRadius: 100 }}
                                        >
                                            <View
                                                style={
                                                    styles.secondToTenUsersOrderView
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.topTenOrderNumber
                                                    }
                                                >
                                                    10
                                                </Text>
                                            </View>
                                        </ImageBackground>
                                    </View>
                                    <View
                                        style={styles.topTenUserNameContainer}
                                    >
                                        <Text style={styles.topTenUserNameText}>
                                            {this.state.topTenUsernames[9] !==
                                                undefined &&
                                                this.state.topTenUsernames[9]}
                                            {this.state.topTenUsernames[9] ===
                                                undefined && ''}
                                        </Text>
                                    </View>
                                    <View
                                        style={styles.topTenUserScoreContainer}
                                    >
                                        <Text
                                            style={styles.topTenUserScoreText}
                                        >
                                            Puan:{' '}
                                            {this.state.topTenPoints[9] !==
                                                undefined &&
                                                this.state.topTenPoints[9]}
                                            {this.state.topTenPoints[9] ===
                                                undefined && ''}
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
                            data={this.state.remainingUsersFlatList}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => {
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
                                                {index + 11}
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
                                                {item !== undefined &&
                                                    item.name}
                                                {item === undefined && ''}
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
                                                {item !== undefined &&
                                                    item.totalPoints}
                                                {item === undefined && ''}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </ScrollView>
                </View>
                <View style={styles.yourOrderTextContainer}>
                    <Text style={styles.yourOrderText}>
                        Senin Sıralaman: {this.state.clientRanking}
                    </Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    clientToken: state.client.clientToken,
    clientDBId: state.client.clientDBId,
    choosenExam: state.gameContent.choosenExam,
    gameContentMap: state.gameContent.gameContentMap,
    friendIds: state.friends.friendIds
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    null
)(Leaderboard)
