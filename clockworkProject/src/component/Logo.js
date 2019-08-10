import React, { Component } from 'react';

import {
    StyleSheet,
    Image,
    View,
} from 'react-native';


export default class Logo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logoStyle} source={require('../images/logo.png')}></Image>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container:{
        flexGrow:1,
        justifyContent:'center',
        alignItems:'center',
    },
    logoStyle:{
        width:225,
        height:175,
    }
});

