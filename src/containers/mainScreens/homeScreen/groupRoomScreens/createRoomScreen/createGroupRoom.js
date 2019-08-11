import React from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import DropDown from '../../../components/mainScreen/dropdown/dropdown'
import AuthButton from '../../../components/authScreen/authButton'

// Images
const CLOSE_BUTTON = require('../../../assets/closeButton.png')
const COPY_IMAGE = require('../../../assets/mainScreens/copy.png')

class CreateGroupRoom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // Room code
            groupCode: '',
            // Group game question number
            questionNumber: '5',
            // Group player list
            groupRoomPlayerList: []
        }
    }

    render() {
        return (
            <View style={styles.modal}>
                <View style={styles.onlyCloseButtonContainer}>
                    <TouchableOpacity onPress={this.closeGroupOnPressCreate}>
                        <Image source={CLOSE_BUTTON} style={styles.xLogo} />
                    </TouchableOpacity>
                </View>
                <View style={styles.modalView}>
                    <View style={styles.gameCodeContainer}>
                        <View style={styles.gameCodeBox}>
                            <View style={styles.gameCodeBoxLeftView} />
                            <View style={styles.gameCodeBoxTextView}>
                                <Text
                                    style={styles.gameCodeText}
                                    selectable={true}
                                >
                                    {this.state.groupCode}
                                </Text>
                            </View>
                            <View style={styles.gameCodeBoxRightView}>
                                <TouchableOpacity
                                    onPress={this.writeToClipboard}
                                >
                                    <Image
                                        source={COPY_IMAGE}
                                        style={styles.copyImage}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.gameCodeInfoTextContainer}>
                        <Text style={styles.gameCodeInfoText}>
                            Grup olarak oynamak için{' '}
                        </Text>
                        <Text style={styles.gameCodeInfoText}>
                            yukarıdaki kodu arkadaşlarınla paylaş
                        </Text>
                    </View>
                    <View style={styles.questionsNumberContainer}>
                        <Text style={styles.questionsNumberText}>
                            Soru Sayısı:{' '}
                        </Text>
                        <DropDown
                            style={styles.questionNumberPicker}
                            textStyle={styles.questionPickerText}
                            dropdownTextStyle={
                                styles.questionPickerDropdownText
                            }
                            dropdownStyle={styles.questionPickerDropdown}
                            options={questionsNumbersList}
                            defaultValue={this.state.questionNumber}
                            onSelect={(idx, value) =>
                                this.questionsPickerSelect(idx, value)
                            }
                        />
                    </View>
                    <View style={styles.usersListContainer}>
                        <FlatList
                            data={this.state.groupRoomPlayerList}
                            vertical={true}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.userRow}>
                                        <View
                                            style={
                                                styles.profilePicContainerinRow
                                            }
                                        >
                                            <Image
                                                source={{
                                                    uri: item.profilePicture
                                                }}
                                                style={styles.userPic}
                                            />
                                        </View>
                                        <View style={styles.nameContainer}>
                                            <Text style={styles.nameText}>
                                                {item.username}
                                            </Text>
                                            <Text>{item.status}</Text>
                                        </View>
                                    </View>
                                )
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <View style={styles.usersCounterContainer}>
                        <Text style={styles.usersCounterText}>
                            {Object.keys(this.state.groupRoomPlayerList).length}
                            /30
                        </Text>
                    </View>
                </View>
                <AuthButton
                    marginTop={hp(2)}
                    height={hp(7)}
                    width={wp(87.5)}
                    color="#00D9EF"
                    buttonText="Başla"
                    onPress={this.startGroupOnPress}
                />
            </View>
        )
    }
}
