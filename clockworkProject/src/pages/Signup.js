import React, { Component } from 'react';

import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    TextInput,
} from 'react-native';

import Logo from '../component/Logo';
import axios from 'axios';


class Signup extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            userName:'',
            address:''
        }
    }
    submitSignUp = () => {
        var self = this;
        const{userName, email,password,passwordCheck,address}=this.state;
        if(userName=="" || email=="" || password=="" || passwordCheck=="" || address=="")
            this.setState({message:'Lütfen tüm alanları doldurunuz'});
        else if(password != passwordCheck)
            this.setState({message:'Parola uyuşmamaktadır'});
         else {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
            if(reg.test(email) === false)
            {
                self.setState({message:"Lütfen geçerli bir email adresi giriniz"});
                 return false;
            }
            else {
              this.setState({email:email})
                    this.setState({message:''});
                    axios.post('http://10.0.2.2:8080/api/users', {
                    userName,    
                    email,
                    password,
                    address,

                })
                .then(function (response) {
                    self.setState({message: response.data.message});
                    self.props.navigation.navigate('Login');
                })
                .catch(function (err) {
                    alert("Kayıt Oluşturulamadı");
                });
            }
         }   
        
    }

    render() {
        return (
        <ScrollView >
            <View style={styles.container}>
                <Logo/>
                <Text style={{color:'red',textAlign: 'left'}}>{this.state.message}</Text>
                <TextInput style={styles.inputBox} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder='Ad Soyad' 
                    placeholderTextColor='#fff'
                    onSubmitEditing={()=>this.email.focus()}
                    onChangeText={userName=> this.setState({userName})}/>
                <TextInput style={styles.inputBox} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder='Email' 
                    placeholderTextColor='#fff'
                    selectionColor='#fff'
                    keyboardType="email-address"
                    ref={(input) => this.email = input}
                    onSubmitEditing={()=>this.password.focus()}
                    onChangeText={email=> this.setState({email})}
                    />
                <TextInput style={styles.inputBox} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder='Parola' 
                    secureTextEntry={true}
                    placeholderTextColor='#fff'
                    ref={(input) => this.password = input}
                    onSubmitEditing={()=>this.passwordCheck.focus()}
                    onChangeText={password=> this.setState({password})}/>
                <TextInput style={styles.inputBox} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder='Parolayı tekrar giriniz' 
                    secureTextEntry={true}
                    placeholderTextColor='#fff'
                    ref={(input) => this.passwordCheck = input}
                    onSubmitEditing={()=>this.address.focus()}
                    onChangeText={passwordCheck=> this.setState({passwordCheck})}/>
                <TextInput style={styles.inputBox} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder='Adres' 
                    placeholderTextColor='#fff'
                    ref={(input) => this.address = input}
                    onChangeText={address=> this.setState({address})}/>
                <TouchableOpacity style={styles.button} onPress={this.submitSignUp}>
                    <Text style={styles.buttonStyle}>Kayıt Ol</Text>
                </TouchableOpacity>
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Zaten üye misiniz?</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}><Text style={styles.signupButton}> Giriş Yap</Text></TouchableOpacity>
                </View>
            </View>
        </ScrollView>
        )
    }
}

const styles= StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flexGrow:1,
        alignItems:'center',
        justifyContent:'center',
    },
    signupTextCont:{
        flexGrow:1,
        justifyContent:'center',
        paddingVertical:16,
        flexDirection:'row'
    },
    signupText: {
        color: 'rgba(0,0,0,0.6)',
        fontSize:16,
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

export default Signup;