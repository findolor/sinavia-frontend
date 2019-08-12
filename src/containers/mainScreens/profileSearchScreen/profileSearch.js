import React from 'react'
import { FlatList, View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './style'
import NotchView from '../../../components/notchView'
import { navigationPop } from '../../../services/navigationService'
import { connect } from 'react-redux'
import { userActions } from '../../../redux/user/actions'

import returnLogo from '../../../assets/return.png'

class ProfileSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.props.searchUsers(this.props.searchedKeyword)
        console.log(this.props.returnedSearchList)
    }

    backButtonOnPress = () => {
        navigationPop()
    }

    userOnPress = text => {
        console.log(text)
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView color={'#fcfcfc'} />
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.backButtonOnPress}>
                        <View style={styles.returnLogoContainer}>
                            <Image
                                source={returnLogo}
                                style={styles.returnLogo}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.headerTextWrapper}>
                        <Text style={styles.searchText}>
                            "{this.props.searchedKeyword}"
                        </Text>
                        <Text style={styles.searchInfoText}>
                            ile alakalı sonuçlar
                        </Text>
                    </View>
                </View>
                {Object.keys(this.props.returnedSearchList).length !== 0 && (
                    <FlatList
                        data={this.props.returnedSearchList}
                        vertical={true}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() =>
                                        this.userOnPress(item.userId)
                                    }
                                >
                                    <View style={styles.userRow}>
                                        <View
                                            style={styles.userPicContainerInRow}
                                        >
                                            <Image
                                                source={{
                                                    uri: item.profilePicture
                                                }}
                                                style={styles.userPic}
                                            />
                                        </View>
                                        <View style={styles.namesContainer}>
                                            <View style={styles.nameContainer}>
                                                <Text style={styles.nameText}>
                                                    {item.name}
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.usernameContainer}
                                            >
                                                <Text
                                                    style={styles.usernameText}
                                                >
                                                    @{item.username}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
                {Object.keys(this.props.returnedSearchList).length === 0 && (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center'
                        }}
                    >
                        <Text>Sonuç yok</Text>
                    </View>
                )}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    returnedSearchList: state.user.returnedSearchList
})

const mapDispatchToProps = dispatch => ({
    searchUsers: searchedKeyword =>
        dispatch(userActions.searchUsers(searchedKeyword))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileSearch)
