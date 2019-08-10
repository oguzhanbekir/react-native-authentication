import React, { Component } from 'react';
import Slideshow from 'react-native-image-slider-show';

import {
    StyleSheet,
    View,
    Text,
    AsyncStorage,
    TextInput,
    TouchableOpacity,

} from 'react-native';

export default class Home extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        position: 1,
        interval: null,
        dataSource: [
          {
            url: 'https://www.patirti.com/content/images/large/159/1594684_dugun-abiyeleri.jpeg',
          }, {
            url: 'https://www.patirti.com/content/images/large/159/1590245_yaz-sikligi.jpeg',
          }, {
            url: 'https://www.patirti.com/content/images/large/159/1598711_elbiseler.jpeg',
          },
        ],
      };
    }
    
  
    componentWillMount() {
      this.setState({
        interval: setInterval(() => {
          this.setState({
            position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
          });
        }, 2000)
      });
    }
  
    componentWillUnmount() {
      clearInterval(this.state.interval);
    }
    submitLogin = () => {
      AsyncStorage.clear()
      this.props.navigation.navigate('Auth')
    }
  
    render() {
      return (
          <View style={{justifyContent:'flex-start',flex:1,backgroundColor:'#fafafa'}}>
            <TextInput style={styles.inputBox} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder='Ürün Ara' 
                    placeholderTextColor='#707070'
                    selectionColor='#707070'
                    keyboardType="email-address"
                    onSubmitEditing={()=>this.password.focus()}
                    onChangeText={email=> this.setState({email})}
                    />
            <Slideshow 
                dataSource={this.state.dataSource}
                position={this.state.position}
                onPositionChanged={position => this.setState({ position })} />
                <TouchableOpacity style={styles.button} onPress={this.submitLogin}>
                    <Text style={styles.buttonStyle}>Çıkış Yap</Text>
                </TouchableOpacity>
        </View>
      );
    }
  }
  

  const styles= StyleSheet.create({
    inputBox:{
        backgroundColor:'#f0f0f0',
        height:40,
        marginHorizontal:5,
        paddingHorizontal:16,
        borderRadius:10,
        fontSize:16,
        color:'#5e5e5e',
        marginVertical:10,
    },
    button:{
        borderRadius:25,
        backgroundColor:"#e71474",
        marginVertical:20,
        marginHorizontal:30,
        paddingVertical:16,
        alignItems:'center',
    },
    buttonStyle:{
        fontSize:16,
        fontWeight:'500',
        color:'#fff',
        textAlign:'center',
    }
});