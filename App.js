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

  // async openSingleShare() {
  //   await Share.shareSingle(shareOptions);
  // }

  async openSingleShare() {
    await Linking.openURL(this.state.url);
  }

  render() {

    const shareOptions = {
      title: 'Share Title',
      message: 'Message Body',
      // url: 'https://id.yahoo.com',
      social: 'sms'
    }

    console.log('App| on render method here...');
    
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <TouchableOpacity onPress={()=>{
          this.openSingleShare();
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
