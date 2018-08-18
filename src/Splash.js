import React, { Component } from 'react';
import { View, Image } from 'react-native';

const logo = require('./img/coffe.png');

export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.goToHome = this.goToHome.bind(this);
    }
    componentDidMount() {
        setTimeout(() => {
          this.goToHome();
        }, 3000);
      }

      goToHome(){
        this.props.navigation.navigate('Home')
      }

      render() {
          return (
            <View 
            style={{
                flex:1,
                backgroundColor:"#FFF",
                alignItems:"center",
                justifyContent:"center"
            }}>
            <Image
            source={logo}
            style={{ width:100, height:100}} />
            </View>
          )
      }
}

