import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import { sceneKeys, navigationPush } from '../services/navigationService'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class App extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container1}>
                    <Image
                        source = {require('../assets/sinavia_logo_cut.png')}
                        style = {{
                            height: hp(40),
                            resizeMode: 'contain',
                        }}/>
                    <Text style={styles.sinaviaText}>Sınavia</Text>
                </View>
                <View style={styles.container2}>
                    <TouchableOpacity onPress={() => {
                        navigationPush(sceneKeys.login)
                    }}>
                        <View style={styles.rectangle}
                              backgroundColor={"#00D9EF"}>
                            <Text style={styles.buttonText}>Giriş Yap</Text>
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.rectangle}
                              backgroundColor={"#00D9EF"}>
                            <Text style={styles.buttonText}>Kayıt Ol</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.separatorContainer} animation={'zoomIn'} delay={700} duration={400}>
                    <View style={styles.separatorLine} />
                    <Text style={styles.separatorOr}>{'veya'}</Text>
                    <View style={styles.separatorLine} />
                </View>
                <View style={styles.container2}>
                    <TouchableOpacity>
                        <View style={styles.rectangle}
                              backgroundColor={"#4267B2"}>
                            <Text style={styles.buttonText}>Facebook ile Bağlan</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.rectangle}
                              backgroundColor={"#0F9D58"}>
                            <Text style={styles.buttonText}>Google ile Bağlan</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#efefef',
    },
    container1: {
        height: hp(55),
        backgroundColor: '#efefef',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container2: {
        height: hp(18),
        width: wp(100),
        backgroundColor: '#efefef',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    sinaviaText: {
        fontSize: hp(10),
        resizeMode: 'contain',
        fontStyle: 'italic',
        color: '#00D9EF'
    },
    rectangle: {
        width: wp(85),
        height: hp(7),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    separatorContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: hp(0),
        backgroundColor: '#efefef',
        height: hp(3),
        width: wp(85)
    },
    separatorLine: {
        flex: 1,
        borderWidth: wp(0.1),
        height: hp(0.1),
        borderColor: '#9B9FA4'
    },
    separatorOr: {
        color: '#9B9FA4',
        marginHorizontal: 8
    },
    buttonText: {
        color: '#FFFFFF',
        letterSpacing: wp(0.1),
        fontSize: hp(2.5)
    },
});
