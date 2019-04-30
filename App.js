/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Linking, Alert} from 'react-native';
import Share from 'react-native-share';
import SendSMS from 'react-native-sms';
import * as Permissions from "./permissions";
const RNFS = require('react-native-fs');


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  constructor() {
    super();
    this.state = {
      smsPermission: undefined,
      status: undefined,
    };

    Permissions.check(Permissions.PERMISSIONS.SEND_SMS).then( upSmsPermission => {
      this.setState({
        smsPermission: upSmsPermission
      });
    });
  }

  getSMSDivider = () => {
    return Platform.OS === "ios" ? "&" : "?";
  }

  testLinking = () => {
    // let phoneNumber = '089699874054';
    let phoneNumber = '087727909189';
    
    if ( phoneNumber.startsWith('0', 0) ) {
      phoneNumber = '+62' + phoneNumber.slice(1, phoneNumber.length) ;
    }
    console.log('phoneNumber: ', phoneNumber);

    const rawMsg = ('llphpf 89 fd98 !@#$^*()~`%la&la');

    // https://wa.me/whatsappphonenumber/?text=urlencodedtext
    const upUrl = 'https://wa.me/' + phoneNumber + '/?text=' + encodeURIComponent(rawMsg);

    // const customMsg = rawMsg.replace('%', '%25').replace('&', '%26');
    // const msg = encodeURIComponent(customMsg);
    // console.log('try to send msg: ', msg);
    // const upUrl = 'sms:' + phoneNumber + this.getSMSDivider() + 'body='+ msg;

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
  
  openSingleShare = async() => {
    const shareOptions = {
      title: 'Share via',
      message: 'some message',
      social: 'email',
    };

    console.log('try to share single option: ', shareOptions);

    try {
      // const bufferPdf = await fs.readFileSync('pre_paid.pdf');
      console.log('Loaded buffer PDF file: ', bufferPdf.length);

      const shareRes = await Share.shareSingle(shareOptions);      
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');  
    }
  }

  sendSms() {
 
    if (this.state.smsPermission) {
    } else {
      this.requestSmsSendPermission();
    }
    

    if (this.state.smsPermission) {
      let myOptionsObject = {
        body: 'The default body of the SMS awesome....!',
        recipients: ['+6287727909189'],
        direct_send: true,
        successTypes: ['sent', 'queued']
      };
      SendSMS.send(myOptionsObject, (completed, cancelled, error) => {
        if (error) {
          console.log('sms error')
        }
        if (cancelled) {
          console.log('sms cancelled')
        }
        if (completed) {
          console.log('sms completed')
        }
        this.setState({
          status: 'An SMS was sent..' 
        })
      });
    } else {

    }
  }

  async requestSmsSendPermission() {
    try {
      console.log('request sms send permission...');
      const granted = await
        Permissions.request(
          Permissions.PERMISSIONS.SEND_SMS,
          {
            'title': 'Sending SMS',
            'message': 'Inviting members needs permission to send SMS'
          }
        )
      
      let titleAlert = '';
      let msgAlert = '';
      if (granted === Permissions.RESULTS.GRANTED) {
        titleAlert = 'Granted Send SMS Permission';
        msgAlert = 'Silahkan coba lagi untuk mengirim SMS';
        this.setState({
          smsPermission: true
        });

      } else {
        titleAlert = 'NOT Granted Send SMS Permission';
        msgAlert = 'Tidak dapat mengirim SMS, silahkan beri akses tersebut.';
        this.setState({
          smsPermission: false
        });
      }
      Alert.alert(
        titleAlert,
        msgAlert,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    } catch (err) {
      console.warn(err)
    }
  }

  // async openSingleShare() {
  //   await Linking.openURL(this.state.url);
  // }

  doDir() {
    console.log('App| do dir for ', RNFS.DocumentDirectoryPath);
    // get a list of files and directories in the main bundle
    RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    .then((result) => {
      console.log('GOT RESULT', result);

      // stat the first file
      return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    })
    .then((statResult) => {
      if (statResult[0].isFile()) {
        // if we have a file, read it
        return RNFS.readFile(statResult[1], 'utf8');
      }

      return 'no file';
    })
    .then((contents) => {
      // log the file contents
      console.log(contents);
    })
    .catch((err) => {
      console.log(err.message, err.code);
    });
  }

  render() {

    console.log('App| on render method here...');
    
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <TouchableOpacity onPress={()=>{
          // this.openSingleShare();
          // this.testLinking();
          // this.sendSms();
          this.doDir();
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
