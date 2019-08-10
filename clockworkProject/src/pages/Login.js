import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    TextInput
} from 'react-native';

import Logo from '../component/Logo';
import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:''
        }
    }

    submitLogin = () => {
        var self = this;
        const{email,password}=this.state;
        if(email==""){
            this.setState({message:'Lütfen mail alanını doldurunuz'});
        } else if(password==""){
            this.setState({message:'Lütfen parola alanını doldurunuz'});
        }else{
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
            if(reg.test(email) === false)
            {
                self.setState({message:"Lütfen geçerli bir email adresi giriniz"});
                return false;
            } else {
                this.setState({email:email})
                    this.setState({message:''});
                    axios.post('http://10.0.2.2:8080/api/login', {
                    email,
                    password
                })
                .then(function (response) {
                    self.setState({message: response.data.message});
                    if(response.data.login==0){
                        AsyncStorage.setItem('token', response.data.token, () => {  
                                self.props.navigation.navigate('Home')
                            });
                    }
                })
                .catch(function (err) {
                    alert("Giriş Yapılamadı");
                });
            }
        }
    }

    render() {
        var self = this;
        return (
        <View style={styles.container}>
            <Logo />
            <Text style={{color:'red',textAlign: 'left'}}>{this.state.message}</Text>
            <TextInput style={styles.inputBox} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder='Email' 
                placeholderTextColor='#fff'
                selectionColor='#fff'
                keyboardType="email-address"
                onSubmitEditing={()=>this.password.focus()}
                onChangeText={email=> this.setState({email})}
                />
            <TextInput style={styles.inputBox} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder='Parola' 
                secureTextEntry={true}
                placeholderTextColor='#fff'
                ref={(input) => this.password = input}
                onChangeText={password=> this.setState({password})}
                />
            <TouchableOpacity style={styles.button} onPress={this.submitLogin}>
                <Text style={styles.buttonStyle}>Giriş</Text>
            </TouchableOpacity>
            <View style={styles.signupTextCont}>
                <Text style={styles.signupText}>Üye Değil misiniz?</Text>
                <TouchableOpacity onPress={() => self.props.navigation.navigate('Signup')}>
                    <Text style={styles.signupButton}> Kayıt Ol</Text>
                </TouchableOpacity>
            </View>
        </View>
        )
    }
}

const styles= StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    signupTextCont:{
        flex:1,
        justifyContent:'flex-start',
        paddingVertical:16,
        flexDirection:'row'
    },
    signupText: {
        color: 'rgba(0,0,0,0.6)',
        fontSize:16
    },
    signupButton:{
        color:"#000",
        fontSize:16,
        fontWeight:'500'
    },
    inputBox:{
        width:300,
        backgroundColor:'#d3d3d3',
        borderRadius:25,
        paddingHorizontal:16,
        fontSize:16,
        color:'#fff',
        marginVertical:10,
    },
    button:{
        borderRadius:25,
        backgroundColor:"#e71474",
        marginVertical:10,
        paddingVertical:16,
        width:300,
        alignItems:'center',
    },
    buttonStyle:{
        fontSize:16,
        fontWeight:'500',
        color:'#fff',
        textAlign:'center',
    }
});

export default Login;