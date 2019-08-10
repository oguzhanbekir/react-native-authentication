import React from 'react';
import { View , AsyncStorage } from 'react-native';
import Logo from '../component/Logo';

class Splash extends React.Component {
  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    )
  }

  async componentDidMount() { 
    const data = await this.performTimeConsumingTask();
    const self = this;
    if (data !== null) {
        try {
            let value = await AsyncStorage.getItem('token');
            
            if (value != null){
              self.props.navigate('Home');
            } else{
              self.props.navigate('Login');
            }
          } catch (error) {
            this.setState({loaded: 'false'});
          }
    }
  }

  render() {
    return (
      <View style={styles.viewStyles}>
          <Logo />
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  }
}

export default Splash;