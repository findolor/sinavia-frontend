import React from 'react'
import {
    Image,
    ImageBackground,
    FlatList,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { leaderboardServices } from '../../../sagas/leaderboard/'
import { getUserService } from '../../../sagas/user/fetchUser'
import { opponentActions } from '../../../redux/opponents/actions'
import DropDown from '../../../components/mainScreen/dropdown/dropdown'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from './style'
import * as Animatable from 'react-native-animatable'
import { navigationPush, SCENE_KEYS } from '../../../services/navigationService'

import FIRST_TITLE from '../../../assets/firstTitle.png'
import SECOND_TITLE from '../../../assets/secondTitle.png'
import THIRD_TITLE from '../../../assets/thirdTitle.png'
import SLIDE_DOWN from '../../../assets/slide_down.png'

class Leaderboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isFetching: true,
            rankingMode: 'global',
            globalButtonBackgroundColor: '#FF6D00',
            globalButtonTextColor: '#FFFFFF',
            friendsButtonBackgroundColor: '#FFFFFF',
            friendsButtonTextColor: '#2E313C',
            // Dropdown list variables
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
            originalFriendsLeaderboardList: [],
            // Last update date
            hoursPassedSinceUpdate: 1,
            // All the users ids
            allUserIds: []
        }
    }

    componentDidMount() {
        this.setChoosenExamId().then(() => {
            this.fetchLeaderboard().then(data => {
                let userList = []

                if (data !== null)
                    data.userList.forEach(user => {
                        user = JSON.parse(user)
                        userList.push(user)
                    })
                else {
                    this.makeLeaderboardLists(userList)
                    return
                }

                const hourDifference = Math.floor(
                    Math.abs(new Date() - new Date(data.updatedAt)) / 36e5
                )
                this.setState({
                    hoursPassedSinceUpdate:
                        hourDifference === 0 ? 1 : hourDifference
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
        let userIds = []

        userList.forEach(leaderboardEntity => {
            userUsernames.push(leaderboardEntity.username)
            userPoints.push(leaderboardEntity.totalPoints)
            userProfilePictures.push(leaderboardEntity.profilePicture)
            userIds.push(leaderboardEntity.id)
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
            x => x.id === this.props.clientDBId
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
            clientRanking: clientIndex + 1,
            allUserIds: userIds,
            isFetching: false
        })
    }

    resetEveryField = () => {
        this.setState({
            topTenUsernames: [],
            remainingUsernames: [],
            topTenPoints: [],
            remainingPoints: [],
            topTenProfilePictures: [],
            remainingProfilePictures: [],
            remainingUsersFlatList: [],
            allUserIds: [],
            clientRanking: 0
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
            this.setState(
                {
                    subjectList: [],
                    choosenCourseId: null,
                    choosenSubjectId: null
                },
                () => {
                    this.fetchLeaderboard().then(data => {
                        let userList = []

                        if (data !== null)
                            data.userList.forEach(user => {
                                user = JSON.parse(user)
                                userList.push(user)
                            })

                        this.makeLeaderboardLists(userList)
                    })
                }
            )
            return
        }
        // Getting the actual course id
        const courseName = this.state.courseList[index]
        index = this.props.gameContentMap.courses.findIndex(
            x => x.name === courseName && x.examId === this.state.choosenExamId
        )
        const courseId = this.props.gameContentMap.courses[index].id

        const subjectList = ['Hepsi']
        this.props.gameContentMap.subjects.forEach(subject => {
            if (subject.courseId === courseId) subjectList.push(subject.name)
        })
        this.setState(
            {
                subjectList: subjectList,
                subjectListDefaultValue: 'Hepsi',
                isSubjectDropdownVisible: true,
                choosenCourseId: courseId,
                choosenSubjectId: null
            },
            () =>
                this.fetchLeaderboard().then(data => {
                    let userList = []

                    if (data !== null)
                        data.userList.forEach(user => {
                            user = JSON.parse(user)
                            userList.push(user)
                        })

                    this.makeLeaderboardLists(userList)
                })
        )
    }

    selectSubjectDropdown = (idx, value) => {
        let index = parseInt(idx, 10)
        if (index === 0) {
            this.setState({ choosenSubjectId: null }, () =>
                this.fetchLeaderboard().then(data => {
                    let userList = []

                    if (data !== null)
                        data.userList.forEach(user => {
                            user = JSON.parse(user)
                            userList.push(user)
                        })

                    this.makeLeaderboardLists(userList)
                })
            )
            return
        } else {
            // Getting the actual subject id
            const subjectName = this.state.subjectList[index]
            index = this.props.gameContentMap.subjects.findIndex(
                x =>
                    x.name === subjectName &&
                    x.courseId === this.state.choosenCourseId
            )
            const subjectId = this.props.gameContentMap.subjects[index].id

            this.setState({ choosenSubjectId: subjectId }, () =>
                this.fetchLeaderboard().then(data => {
                    let userList = []

                    if (data !== null)
                        data.userList.forEach(user => {
                            user = JSON.parse(user)
                            userList.push(user)
                        })

                    this.makeLeaderboardLists(userList)
                })
            )
        }
    }

    // Fetching the leaderboard based on the selected mode
    fetchLeaderboard = async () => {
        switch (this.state.rankingMode) {
            case 'global':
                if (this.state.choosenCourseId) {
                    if (this.state.choosenSubjectId) {
                        return leaderboardServices.getLeaderboard(
                            this.props.clientToken,
                            {
                                examId: this.state.choosenExamId,
                                courseId: this.state.choosenCourseId,
                                subjectId: this.state.choosenSubjectId
                            }
                        )
                    } else
                        return leaderboardServices.getLeaderboard(
                            this.props.clientToken,
                            {
                                examId: this.state.choosenExamId,
                                courseId: this.state.choosenCourseId
                            }
                        )
                } else
                    return leaderboardServices.getLeaderboard(
                        this.props.clientToken,
                        { examId: this.state.choosenExamId }
                    )
            case 'friends':
                if (this.state.choosenCourseId) {
                    if (this.state.choosenSubjectId) {
                        return leaderboardServices.getFriendScores(
                            this.props.clientToken,
                            this.props.friendIds,
                            this.props.clientDBId,
                            {
                                examId: this.state.choosenExamId,
                                courseId: this.state.choosenCourseId,
                                subjectId: this.state.choosenSubjectId
                            }
                        )
                    } else
                        return leaderboardServices.getFriendScores(
                            this.props.clientToken,
                            this.props.friendIds,
                            this.props.clientDBId,
                            {
                                examId: this.state.choosenExamId,
                                courseId: this.state.choosenCourseId
                            }
                        )
                } else
                    return leaderboardServices.getFriendScores(
                        this.props.clientToken,
                        this.props.friendIds,
                        this.props.clientDBId,
                        { examId: this.state.choosenExamId }
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
                            let userList = []

                            if (data !== null)
                                data.userList.forEach(user => {
                                    user = JSON.parse(user)
                                    userList.push(user)
                                })
                            // We populate the list again
                            this.makeLeaderboardLists(userList)
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
                        if (Object.keys(this.props.friendIds).length === 0) {
                            this.resetEveryField()
                            return
                        }
                        this.fetchLeaderboard().then(data => {
                            let userList = []

                            if (data !== null)
                                data.userList.forEach(user => {
                                    user = JSON.parse(user)
                                    userList.push(user)
                                })
                            // We populate the list again
                            this.makeLeaderboardLists(userList)
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

    userOnPress = userId => {
        if (userId === this.props.clientDBId)
            navigationPush(SCENE_KEYS.mainScreens.profile)
        else
            getUserService(this.props.clientToken, userId).then(
                userInformation => {
                    this.props.getOpponentFullInformation(
                        userInformation,
                        this.props.clientDBId,
                        this.props.clientToken,
                        false
                    )
                }
            )
    }

    // TODO CHANGE THE TOP THEN TO FLAT LIST
    // COMMENT OUT THE CODE HERE AND ADD THE NEW ONE
    // WILL USE THE OLD CODE FOR HELP LATER
    render() {
        if (this.state.isFetching) {
            return (
                <View style={[styles.container, { justifyContent: 'center' }]}>
                    <ActivityIndicator />
                </View>
            )
        }
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
                                            allowFontScaling={false}
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
                                            allowFontScaling={false}
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
                                    {this.state.isSubjectDropdownVisible && (
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
                                    )}
                                </View>
                                <TouchableOpacity
                                    onPress={() =>
                                        this.userOnPress(
                                            this.state.allUserIds[0]
                                        )
                                    }
                                    disabled={
                                        this.state.allUserIds[0] !== undefined
                                            ? false
                                            : true
                                    }
                                >
                                    <Animatable.View
                                        style={styles.leaderImageContainer}
                                        useNativeDriver={true}
                                        animation="zoomIn"
                                        duration={600}
                                    >
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
                                            imageStyle={{
                                                borderRadius: hp(100),
                                                borderWidth: hp(0.4),
                                                borderColor: '#FF9900'
                                            }}
                                        >
                                            <Animatable.View
                                                useNativeDriver={true}
                                                animation="slideInDown"
                                                duration={1250}
                                                delay={200}
                                            >
                                                <Image
                                                    source={FIRST_TITLE}
                                                    style={
                                                        styles.firstUserTitlePic
                                                    }
                                                />
                                            </Animatable.View>
                                            <View
                                                style={
                                                    styles.firstUserOrderView
                                                }
                                            >
                                                <Text
                                                    allowFontScaling={false}
                                                    style={
                                                        styles.topTenOrderNumber
                                                    }
                                                >
                                                    1
                                                </Text>
                                            </View>
                                        </ImageBackground>
                                    </Animatable.View>
                                </TouchableOpacity>
                                <View
                                    style={[
                                        styles.dropdownContainer,
                                        { justifyContent: 'flex-end' }
                                    ]}
                                >
                                    {this.state.rankingMode === 'global' && (
                                        <View style={styles.lastUpdateView}>
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.lastUpdateText}
                                            >
                                                Son Güncelleme Tarihi
                                            </Text>
                                            <Text
                                                allowFontScaling={false}
                                                style={
                                                    styles.lastUpdateTimeText
                                                }
                                            >
                                                {
                                                    this.state
                                                        .hoursPassedSinceUpdate
                                                }{' '}
                                                saat önce
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                            <Animatable.View
                                style={styles.nameAndScoreContainer}
                                useNativeDriver={true}
                                animation="fadeIn"
                                duration={600}
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={styles.nameText}
                                >
                                    {this.state.topTenUsernames[0] !==
                                        undefined &&
                                        this.state.topTenUsernames[0]}
                                    {this.state.topTenUsernames[0] ===
                                        undefined && ''}
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.scoreText}
                                >
                                    {this.state.topTenPoints[0] !== undefined &&
                                        this.state.topTenPoints[0]}
                                    {this.state.topTenPoints[0] === undefined &&
                                        ''}
                                </Text>
                            </Animatable.View>
                        </View>
                        <View style={styles.topTenContainer}>
                            <View style={styles.dividedTopTenContainer}>
                                <Animatable.View
                                    style={styles.topTenUserContainer}
                                    useNativeDriver={true}
                                    animation="fadeIn"
                                    duration={600}
                                >
                                    <TouchableOpacity
                                        style={styles.topTenUserPicContainer}
                                        onPress={() =>
                                            this.userOnPress(
                                                this.state.allUserIds[1]
                                            )
                                        }
                                        disabled={
                                            this.state.allUserIds[1] !==
                                            undefined
                                                ? false
                                                : true
                                        }
                                    >
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
                                            imageStyle={{
                                                borderRadius: hp(100),
                                                borderWidth: hp(0.4),
                                                borderColor: '#FF9900'
                                            }}
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
                                                    allowFontScaling={false}
                                                    style={
                                                        styles.topTenOrderNumber
                                                    }
                                                >
                                                    2
                                                </Text>
                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                    <View
                                        style={styles.topTenUserNameContainer}
                                    >
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.topTenUserNameText}
                                        >
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
                                            allowFontScaling={false}
                                            style={styles.topTenUserScoreText}
                                        >
                                            {this.state.topTenPoints[1] !==
                                                undefined &&
                                                this.state.topTenPoints[1]}
                                            {this.state.topTenPoints[1] ===
                                                undefined && ''}
                                        </Text>
                                    </View>
                                </Animatable.View>
                                <Animatable.View
                                    style={styles.topTenUserContainer}
                                    useNativeDriver={true}
                                    animation="fadeIn"
                                    duration={600}
                                >
                                    <TouchableOpacity
                                        style={styles.topTenUserPicContainer}
                                        onPress={() =>
                                            this.userOnPress(
                                                this.state.allUserIds[2]
                                            )
                                        }
                                        disabled={
                                            this.state.allUserIds[2] !==
                                            undefined
                                                ? false
                                                : true
                                        }
                                    >
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
                                            imageStyle={{
                                                borderRadius: hp(100),
                                                borderWidth: hp(0.4),
                                                borderColor: '#FF9900'
                                            }}
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
                                                    allowFontScaling={false}
                                                    style={
                                                        styles.topTenOrderNumber
                                                    }
                                                >
                                                    3
                                                </Text>
                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                    <View
                                        style={styles.topTenUserNameContainer}
                                    >
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.topTenUserNameText}
                                        >
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
                                            allowFontScaling={false}
                                            style={styles.topTenUserScoreText}
                                        >
                                            {this.state.topTenPoints[2] !==
                                                undefined &&
                                                this.state.topTenPoints[2]}
                                            {this.state.topTenPoints[2] ===
                                                undefined && ''}
                                        </Text>
                                    </View>
                                </Animatable.View>
                                <Animatable.View
                                    style={styles.topTenUserContainer}
                                    useNativeDriver={true}
                                    animation="fadeIn"
                                    duration={600}
                                >
                                    <TouchableOpacity
                                        style={styles.topTenUserPicContainer}
                                        onPress={() =>
                                            this.userOnPress(
                                                this.state.allUserIds[3]
                                            )
                                        }
                                        disabled={
                                            this.state.allUserIds[3] !==
                                            undefined
                                                ? false
                                                : true
                                        }
                                    >
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
                                            imageStyle={{
                                                borderRadius: hp(100),
                                                borderWidth: hp(0.4),
                                                borderColor: '#FF9900'
                                            }}
                                        >
                                            <View
                                                style={
                                                    styles.secondToTenUsersOrderView
                                                }
                                            >
                                                <Text
                                                    allowFontScaling={false}
                                                    style={
                                                        styles.topTenOrderNumber
                                                    }
                                                >
                                                    4
                                                </Text>
                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                    <View
                                        style={styles.topTenUserNameContainer}
                                    >
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.topTenUserNameText}
                                        >
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
                                            allowFontScaling={false}
                                            style={styles.topTenUserScoreText}
                                        >
                                            {this.state.topTenPoints[3] !==
                                                undefined &&
                                                this.state.topTenPoints[3]}
                                            {this.state.topTenPoints[3] ===
                                                undefined && ''}
                                        </Text>
                                    </View>
                                </Animatable.View>
                            </View>
                            <View style={styles.dividedTopTenContainer}>
                                <Animatable.View
                                    style={styles.topTenUserContainer}
                                    useNativeDriver={true}
                                    animation="fadeIn"
                                    duration={600}
                                >
                                    <TouchableOpacity
                                        style={styles.topTenUserPicContainer}
                                        onPress={() =>
                                            this.userOnPress(
                                                this.state.allUserIds[4]
                                            )
                                        }
                                        disabled={
                                            this.state.allUserIds[4] !==
                                            undefined
                                                ? false
                                                : true
                                        }
                                    >
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
                                            imageStyle={{
                                                borderRadius: hp(100),
                                                borderWidth: hp(0.4),
                                                borderColor: '#FF9900'
                                            }}
                                        >
                                            <View
                                                style={
                                                    styles.secondToTenUsersOrderView
                                                }
                                            >
                                                <Text
                                                    allowFontScaling={false}
                                                    style={
                                                        styles.topTenOrderNumber
                                                    }
                                                >
                                                    5
                                                </Text>
                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                    <View
                                        style={styles.topTenUserNameContainer}
                                    >
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.topTenUserNameText}
                                        >
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
                                            allowFontScaling={false}
                                            style={styles.topTenUserScoreText}
                                        >
                                            {this.state.topTenPoints[4] !==
                                                undefined &&
                                                this.state.topTenPoints[4]}
                                            {this.state.topTenPoints[4] ===
                                                undefined && ''}
                                        </Text>
                                    </View>
                                </Animatable.View>
                                <Animatable.View
                                    style={styles.topTenUserContainer}
                                    useNativeDriver={true}
                                    animation="fadeIn"
                                    duration={600}
                                >
                                    <TouchableOpacity
                                        style={styles.topTenUserPicContainer}
                                        onPress={() =>
                                            this.userOnPress(
                                                this.state.allUserIds[5]
                                            )
                                        }
                                        disabled={
                                            this.state.allUserIds[5] !==
                                            undefined
                                                ? false
                                                : true
                                        }
                                    >
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
                                            imageStyle={{
                                                borderRadius: hp(100),
                                                borderWidth: hp(0.4),
                                                borderColor: '#FF9900'
                                            }}
                                        >
                                            <View
                                                style={
                                                    styles.secondToTenUsersOrderView
                                                }
                                            >
                                                <Text
                                                    allowFontScaling={false}
                                                    style={
                                                        styles.topTenOrderNumber
                                                    }
                                                >
                                                    6
                                                </Text>
                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                    <View
                                        style={styles.topTenUserNameContainer}
                                    >
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.topTenUserNameText}
                                        >
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
                                            allowFontScaling={false}
                                            style={styles.topTenUserScoreText}
                                        >
                                            {this.state.topTenPoints[5] !==
                                                undefined &&
                                                this.state.topTenPoints[5]}
                                            {this.state.topTenPoints[5] ===
                                                undefined && ''}
                                        </Text>
                                    </View>
                                </Animatable.View>
                                <Animatable.View
                                    style={styles.topTenUserContainer}
                                    useNativeDriver={true}
                                    animation="fadeIn"
                                    duration={600}
                                >
                                    <TouchableOpacity
                                        style={styles.topTenUserPicContainer}
                                        onPress={() =>
                                            this.userOnPress(
                                                this.state.allUserIds[6]
                                            )
                                        }
                                        disabled={
                                            this.state.allUserIds[6] !==
                                            undefined
                                                ? false
                                                : true
                                        }
                                    >
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
                                            imageStyle={{
                                                borderRadius: hp(100),
                                                borderWidth: hp(0.4),
                                                borderColor: '#FF9900'
                                            }}
                                        >
                                            <View
                                                style={
                                                    styles.secondToTenUsersOrderView
                                                }
                                            >
                                                <Text
                                                    allowFontScaling={false}
                                                    style={
                                                        styles.topTenOrderNumber
                                                    }
                                                >
                                                    7
                                                </Text>
                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                    <View
                                        style={styles.topTenUserNameContainer}
                                    >
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.topTenUserNameText}
                                        >
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
                                            allowFontScaling={false}
                                            style={styles.topTenUserScoreText}
                                        >
                                            {this.state.topTenPoints[6] !==
                                                undefined &&
                                                this.state.topTenPoints[6]}
                                            {this.state.topTenPoints[6] ===
                                                undefined && ''}
                                        </Text>
                                    </View>
                                </Animatable.View>
                            </View>
                            <View style={styles.dividedTopTenContainer}>
                                <Animatable.View
                                    style={styles.topTenUserContainer}
                                    useNativeDriver={true}
                                    animation="fadeIn"
                                    duration={600}
                                >
                                    <TouchableOpacity
                                        style={styles.topTenUserPicContainer}
                                        onPress={() =>
                                            this.userOnPress(
                                                this.state.allUserIds[7]
                                            )
                                        }
                                        disabled={
                                            this.state.allUserIds[7] !==
                                            undefined
                                                ? false
                                                : true
                                        }
                                    >
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
                                            imageStyle={{
                                                borderRadius: hp(100),
                                                borderWidth: hp(0.4),
                                                borderColor: '#FF9900'
                                            }}
                                        >
                                            <View
                                                style={
                                                    styles.secondToTenUsersOrderView
                                                }
                                            >
                                                <Text
                                                    allowFontScaling={false}
                                                    style={
                                                        styles.topTenOrderNumber
                                                    }
                                                >
                                                    8
                                                </Text>
                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                    <View
                                        style={styles.topTenUserNameContainer}
                                    >
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.topTenUserNameText}
                                        >
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
                                            allowFontScaling={false}
                                            style={styles.topTenUserScoreText}
                                        >
                                            {this.state.topTenPoints[7] !==
                                                undefined &&
                                                this.state.topTenPoints[7]}
                                            {this.state.topTenPoints[7] ===
                                                undefined && ''}
                                        </Text>
                                    </View>
                                </Animatable.View>
                                <Animatable.View
                                    style={styles.topTenUserContainer}
                                    useNativeDriver={true}
                                    animation="fadeIn"
                                    duration={600}
                                >
                                    <TouchableOpacity
                                        style={styles.topTenUserPicContainer}
                                        onPress={() =>
                                            this.userOnPress(
                                                this.state.allUserIds[8]
                                            )
                                        }
                                        disabled={
                                            this.state.allUserIds[8] !==
                                            undefined
                                                ? false
                                                : true
                                        }
                                    >
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
                                            imageStyle={{
                                                borderRadius: hp(100),
                                                borderWidth: hp(0.4),
                                                borderColor: '#FF9900'
                                            }}
                                        >
                                            <View
                                                style={
                                                    styles.secondToTenUsersOrderView
                                                }
                                            >
                                                <Text
                                                    allowFontScaling={false}
                                                    style={
                                                        styles.topTenOrderNumber
                                                    }
                                                >
                                                    9
                                                </Text>
                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                    <View
                                        style={styles.topTenUserNameContainer}
                                    >
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.topTenUserNameText}
                                        >
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
                                            allowFontScaling={false}
                                            style={styles.topTenUserScoreText}
                                        >
                                            {this.state.topTenPoints[8] !==
                                                undefined &&
                                                this.state.topTenPoints[8]}
                                            {this.state.topTenPoints[8] ===
                                                undefined && ''}
                                        </Text>
                                    </View>
                                </Animatable.View>
                                <Animatable.View
                                    style={styles.topTenUserContainer}
                                    useNativeDriver={true}
                                    animation="fadeIn"
                                    duration={600}
                                >
                                    <TouchableOpacity
                                        style={styles.topTenUserPicContainer}
                                        onPress={() =>
                                            this.userOnPress(
                                                this.state.allUserIds[9]
                                            )
                                        }
                                        disabled={
                                            this.state.allUserIds[9] !==
                                            undefined
                                                ? false
                                                : true
                                        }
                                    >
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
                                            imageStyle={{
                                                borderRadius: hp(100),
                                                borderWidth: hp(0.4),
                                                borderColor: '#FF9900'
                                            }}
                                        >
                                            <View
                                                style={
                                                    styles.secondToTenUsersOrderView
                                                }
                                            >
                                                <Text
                                                    allowFontScaling={false}
                                                    style={
                                                        styles.topTenOrderNumber
                                                    }
                                                >
                                                    10
                                                </Text>
                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                    <View
                                        style={styles.topTenUserNameContainer}
                                    >
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.topTenUserNameText}
                                        >
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
                                            allowFontScaling={false}
                                            style={styles.topTenUserScoreText}
                                        >
                                            {this.state.topTenPoints[9] !==
                                                undefined &&
                                                this.state.topTenPoints[9]}
                                            {this.state.topTenPoints[9] ===
                                                undefined && ''}
                                        </Text>
                                    </View>
                                </Animatable.View>
                            </View>
                        </View>
                        <View style={styles.continueOrderTextContainer}>
                            <Image
                                source={SLIDE_DOWN}
                                style={styles.slideDownLeftImg}
                            />
                            <Text
                                allowFontScaling={false}
                                style={styles.continueOrderText}
                            >
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
                                                allowFontScaling={false}
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
                                                allowFontScaling={false}
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
                                                allowFontScaling={false}
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
                    <Text allowFontScaling={false} style={styles.yourOrderText}>
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

const mapDispatchToProps = dispatch => ({
    getOpponentFullInformation: (
        opponentInformation,
        clientId,
        clientToken,
        isWithSearchBar
    ) =>
        dispatch(
            opponentActions.getOpponentFullInformation(
                opponentInformation,
                clientId,
                clientToken,
                isWithSearchBar
            )
        )
})

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard)
