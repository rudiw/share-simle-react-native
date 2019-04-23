/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';
import Share from 'react-native-share';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props)
        this.state = {
          url: 'sms:087727909189?body=message body here...',
        }
  }

  getSMSDivider = () => {
    return Platform.OS === "ios" ? "&" : "?";
  }

  testWA = () => {
    // let phoneNumber = '089699874054';
    let phoneNumber = '087727909189';
    
    if ( phoneNumber.startsWith('0', 0) ) {
      phoneNumber = '+62' + phoneNumber.slice(1, phoneNumber.length) ;
    }
    console.log('phoneNumber: ', phoneNumber);
    //https://wa.me/whatsappphonenumber/?text=urlencodedtext
    // const waUrl = 'https://wa.me/' + phoneNumber + '/?text=mymessagelhoooo';

    const msg = escape("llphpf 89 fd98 !@#$%^&*()_+-~` lala");
    console.log('msg: ', msg);
    const upUrl = 'sms:' + phoneNumber + this.getSMSDivider() + 'body='+ msg;

    // this.dismissShare();

    return Linking.canOpenURL(upUrl).then( (supported) => {
        if (supported) {
            Linking.openURL(upUrl);
        } else {
            console.log('PLNPaymentResponseForm| can not open url for sending WA...');
        }
    } ).catch( (error) => {
        console.error('PLNPaymentResponseForm| failed to open url for sending WA: ', error);
    } );
  }
  

  componentDidMount() {
    const upUrl = this.state.url;
    Linking.addEventListener(upUrl, this.handleOpenURL);
  }

  componentWillUnmount() {
    const upUrl = this.state.url;
    Linking.removeEventListener(upUrl, this.handleOpenURL);
  }
  
  handleOpenURL(event) {
    console.log(event.url);
    const route = e.url.replace(/.*?:\/\//g, '');
    // do something with the url, in our case navigate(route)
  }

  openSingleShare = async() => {
    const shareOptions = {
      title: 'Share via',
      message: 'some message',
      social: 'email',
    };

    console.log('try to share single option: ', shareOptions);

    try {
      const shareRes = await Share.shareSingle(shareOptions);      
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');  
    }
  }

  // async openSingleShare() {
  //   await Linking.openURL(this.state.url);
  // }

  render() {

    console.log('App| on render method here...');
    
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <TouchableOpacity onPress={()=>{
          // this.openSingleShare();
          this.testWA();
        }}>
          <View style={styles.instructions}>
            <Text>Simple Share</Text>
          </View>
        </TouchableOpacity>
      </View>
    );

  }//end of render

}//end of class

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
