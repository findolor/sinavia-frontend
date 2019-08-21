import React from 'react'
import {
    Image,
    FlatList,
    Text,
    TouchableOpacity,
    View, TextInput
} from 'react-native'
import { SCENE_KEYS, navigationPop } from '../../../services/navigationService'
import styles from './style'
import NotchView from '../../../components/notchView'
import returnLogo from '../../../assets/return.png'
import searchlogo from '../../../assets/search.png'
import PROFILE_PIC from '../../../assets/profile2.jpg'

const friendsListData = [
    {
        userPic: PROFILE_PIC,
        name: 'Nurettin Hakan Yılmaz',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Mehmet',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Nakışçı',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Arca Altunsu',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Orkun Külçe',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Ahmet',
        username: 'ahmetnakisci'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Burak',
        username: 'ruzgar'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan Yılmaz',
        username: 'haqotherage'
    },
    {
        userPic: PROFILE_PIC,
        name: 'Hakan',
        username: 'haqotherage'
    }
]

class FriendsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: friendsListData
        }
    }

    returnButtonOnPress = () => {
        navigationPop()
    }

    searchFilterFunction = text => {
        this.setState({
            value: text,
        });

        const newData = friendsListData.filter(item => {
            const itemData = `${item.name.toUpperCase()} ${item.username.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData,
        });
    }

    render() {
        return (
            <View style={styles.container}>
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
                    <View style={styles.searchBar}>
                        <View style={styles.textInputView}>
                            <TextInput
                                style={styles.searchBarText}
                                placeholder="Arkadaşını ara..."
                                placeholderTextColor={'#7B7B7B'}
                                autoCapitalize={'none'}
                                onChangeText={text => this.searchFilterFunction(text)}
                                value={this.state.value}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.spaceView}/>
                <View style={styles.flatListView}>
                    <FlatList
                        data={this.state.data}
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
                                        <View style={styles.nameContainer}>
                                            <Text style={styles.nameText}>
                                                {item.name}
                                            </Text>
                                            <Text style={styles.userNameText}>
                                                @{item.username}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        )
    }
}

export default FriendsList
