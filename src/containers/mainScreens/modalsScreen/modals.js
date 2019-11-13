import React from 'react'
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Modal
} from 'react-native'

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'

import styles from './style'

import AuthButton from '../../../components/authScreen/authButton'

export default class Modals extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: false,
            visibleView: ''
        }
    }

    removeFriendshipModal() {
        return (
                <View
                    style={{ height: hp(120), width: wp(100), backgroundColor: '#000000DE' }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.quitView}>
                            <Text style={styles.areYouSureText}>
                                <Text style={[{color: '#FF9900', fontFamily: 'Averta-SemiboldItalic'}]}>hakanyilmaz</Text> kişisi
                            </Text>
                            <Text style={styles.areYouSureText}>
                                arkadaşlıktan çıkarılsın mı?
                            </Text>
                        </View>
                        <View style={styles.yesOrNoButtonsContainer}>
                            <AuthButton
                                height={hp(7)}
                                width={wp(42)}
                                color="#00D9EF"
                                buttonText="Evet"
                                borderRadius={10}
                                onPress={() => this.setState({isModalVisible: false})}
                            />
                            <AuthButton
                                height={hp(7)}
                                width={wp(42)}
                                color="#00D9EF"
                                buttonText="Hayır"
                                borderRadius={10}
                                onPress={() => this.setState({isModalVisible: false})}
                            />
                        </View>
                    </View>
                </View>
        )
    }

    removeFriendshipRequestModal() {
        return (
            <View
                style={{ height: hp(120), width: wp(100), backgroundColor: '#000000DE' }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.quitView}>
                        <Text style={styles.areYouSureText}>
                            <Text style={[{color: '#FF9900', fontFamily: 'Averta-SemiboldItalic'}]}>hakanyilmaz</Text> kişisine
                        </Text>
                        <Text style={styles.areYouSureText}>
                            gönderdiğin arkadaşlık isteği
                        </Text>
                        <Text style={styles.areYouSureText}>
                            iptal edilsin mi?
                        </Text>
                    </View>
                    <View style={styles.yesOrNoButtonsContainer}>
                        <AuthButton
                            height={hp(7)}
                            width={wp(42)}
                            color="#00D9EF"
                            buttonText="Evet"
                            borderRadius={10}
                            onPress={() => this.setState({isModalVisible: false})}
                        />
                        <AuthButton
                            height={hp(7)}
                            width={wp(42)}
                            color="#00D9EF"
                            buttonText="Hayır"
                            borderRadius={10}
                            onPress={() => this.setState({isModalVisible: false})}
                        />
                    </View>
                </View>
            </View>
        )
    }

    friendGameRequestModal() {
        return (
            <View
                style={{ height: hp(120), width: wp(100), backgroundColor: '#000000DE' }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.quitView}>
                        <Text style={styles.areYouSureText}>
                            <Text style={[{color: '#FF9900', fontFamily: 'Averta-SemiboldItalic'}]}>hakanyilmaz</Text> kişisi sana
                        </Text>
                        <Text style={[styles.areYouSureText, {color: '#00D9EF', fontFamily: 'Averta-Bold'}]}>
                            YKS - Türkçe
                        </Text>
                        <Text style={[styles.areYouSureText, {color: '#00D9EF', fontFamily: 'Averta-Bold'}]}>
                            Paragrafta Anlam
                        </Text>
                        <Text style={styles.areYouSureText}>
                            konusunda oyun isteği gönderdi
                        </Text>
                    </View>
                    <View style={styles.yesOrNoButtonsContainer}>
                        <AuthButton
                            height={hp(7)}
                            width={wp(42)}
                            color="#B72A2A"
                            buttonText="Reddet"
                            borderRadius={10}
                            onPress={() => this.setState({isModalVisible: false})}
                        />
                        <AuthButton
                            height={hp(7)}
                            width={wp(42)}
                            color="#FF9900"
                            buttonText="Daha Sonra"
                            borderRadius={10}
                            onPress={() => this.setState({isModalVisible: false})}
                        />
                    </View>
                    <AuthButton
                        height={hp(7)}
                        width={wp(87.5)}
                        color="#3EBB29"
                        buttonText="Şimdi Oyna"
                        borderRadius={10}
                        onPress={() => this.setState({isModalVisible: false})}
                    />
                </View>
            </View>
        )
    }

    quitGameModal() {
        return (
            <View
                style={{ height: hp(120), width: wp(100), backgroundColor: '#000000DE' }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.quitView}>
                        <Text style={styles.areYouSureText}>
                            Oyundan çıkmak istediğine
                        </Text>
                        <Text style={styles.areYouSureText}>
                            emin misin?
                        </Text>
                    </View>
                    <View style={styles.yesOrNoButtonsContainer}>
                        <AuthButton
                            height={hp(7)}
                            width={wp(42)}
                            color="#00D9EF"
                            buttonText="Evet"
                            borderRadius={10}
                            onPress={() => this.setState({isModalVisible: false})}
                        />
                        <AuthButton
                            height={hp(7)}
                            width={wp(42)}
                            color="#00D9EF"
                            buttonText="Hayır"
                            borderRadius={10}
                            onPress={() => this.setState({isModalVisible: false})}
                        />
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.setState({isModalVisible: true, visibleView: 'removeFriendshipModal'})} style={[{height: hp(10), width: wp(70), justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', marginTop: hp(2)}]}>
                    <Text style={[{color: 'white'}]}>Arkadas cikarma</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({isModalVisible: true, visibleView: 'removeFriendshipRequestModal'})} style={[{height: hp(10), width: wp(70), justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', marginTop: hp(2)}]}>
                    <Text style={[{color: 'white'}]}>Arkadas istegi iptali</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({isModalVisible: true, visibleView: 'friendGameRequestModal'})} style={[{height: hp(10), width: wp(70), justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', marginTop: hp(2)}]}>
                    <Text style={[{color: 'white'}]}>Oyun istegi</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({isModalVisible: true, visibleView: 'quitGameModal'})} style={[{height: hp(10), width: wp(70), justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', marginTop: hp(2)}]}>
                    <Text style={[{color: 'white'}]}>Oyundan cikmak istedigine emin misin</Text>
                </TouchableOpacity>
                <Modal
                    visible={this.state.isModalVisible}
                    transparent={true}
                    animationType={'fade'}
                >
                    {this.state.visibleView === 'removeFriendshipModal' &&
                    this.removeFriendshipModal()}
                    {this.state.visibleView === 'removeFriendshipRequestModal' &&
                    this.removeFriendshipRequestModal()}
                    {this.state.visibleView === 'friendGameRequestModal' &&
                    this.friendGameRequestModal()}
                    {this.state.visibleView === 'quitGameModal' &&
                    this.quitGameModal()}
                </Modal>
            </View>
        )
    }
}
