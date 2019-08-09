import React from 'react'
import {
    FlatList,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import styles from './style'
import NotchView from '../../../components/notchView'
import { navigationPop } from '../../../services/navigationService'

import returnLogo from '../../../assets/return.png'
import PROFILE_PIC from '../../../assets/profile2.jpg'

const usersList = [
    {
        userPic: PROFILE_PIC,
        name: 'Nurettin Hakan Yılmaz',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Nurettin Hakan Yılmaz',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Nurettin Hakan Yılmaz',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Nurettin Hakan Yılmaz',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Nurettin Hakan Yılmaz',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Nurettin Hakan Yılmaz',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Nurettin Hakan Yılmaz',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Nurettin Hakan Yılmaz',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Nurettin Hakan Yılmaz',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Nurettin Hakan Yılmaz',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Nurettin Hakan Yılmaz',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Nurettin Hakan Yılmaz',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Nurettin Hakan Yılmaz',
        username: 'haqotherage'
    },
]

class ProfileSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            usersList: usersList
        }
    }

    backButtonOnPress = () => {
        navigationPop()
    }

    render() {
        return (
            <View style={styles.container}>
                <NotchView color={'#fcfcfc'} />
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.backButtonOnPress}>
                        <Image source={returnLogo} style={styles.returnLogo} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.usersList}
                    vertical={true}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity>
                            <View style={styles.userRow}>
                                <View
                                    style={
                                        styles.userPicContainerInRow
                                    }
                                >
                                    <Image
                                        source={item.userPic}
                                        style={styles.userPic}
                                    />
                                </View>
                                <View style={styles.namesContainer}>
                                    <View style={styles.nameContainer}>
                                        <Text style={styles.nameText}>{item.name}</Text>
                                    </View>
                                    <View style={styles.usernameContainer}>
                                        <Text style={styles.usernameText}>@{item.username}</Text>
                                    </View>
                                </View>
                            </View>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }
}

export default ProfileSearch