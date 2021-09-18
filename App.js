import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native';



import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import Clipboard from '@react-native-clipboard/clipboard';


export default App = () => {
  const [scan, setScan] = useState(false)
  const [result, setResult] = useState()

  const onSuccess = (e) => {
    setResult(e.data)
    setScan(false)
    
  }
 
  const startScan = () => {
    setScan(true)
    setResult()
  }


  const copyToClipboard = (str) => {
    Clipboard.setString(str);
  };
  
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View>
            <Text style={styles.title}>
              Welcome to Qr Scanner app
            </Text>

          </View>

          <View style={styles.body}>
            { result &&
              <View style={styles.sectionContainer}>
                      <TouchableOpacity 
                       onPress={() => {copyToClipboard(result);Alert.alert('Alert','Copied to clipboard')}}
                      >
                      <Text style={styles.centerText}>{result}</Text>
                      </TouchableOpacity>
                        
              </View>
            }
            { !scan &&
              
              <TouchableOpacity
              onPress={startScan}
              >
                  <Text style={styles.ScanButton}>Scan Your Barcode!!</Text>
              </TouchableOpacity>
            }
            { scan &&
              <View style={styles.sectionContainer}>
                <QRCodeScanner
                  reactivate={true}
                  flashMode={RNCamera.Constants.FlashMode.torch}
                  showMarker={true}
                  ref={(node) => { scanner = node }}
                  onRead={onSuccess}
                  topContent={
                    <Text style={styles.centerText}>
                      Scan your QRCode!
                    </Text>
                  }
                  bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable} onPress={() => setScan(false)}>
                      <Text style={styles.buttonText}>Cancel Scan</Text>
                    </TouchableOpacity>
                    
                  }
                />
                
              </View>
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );

  }

  const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: '#333',
    },
    body: {
      backgroundColor: '#fff',
      height: Dimensions.get('window').height - StatusBar.currentHeight ,
      justifyContent:'center',
      alignItems:'center',
    },
    sectionContainer: {
      marginTop: 32,
      justifyContent:'center',
      alignItems:'center',
      height:400,
      width:400
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: '#fff',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: '#fff',
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color: '#333',
      fontSize: 12,
      fontWeight: '400',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777',
    },
    textBold: {
      fontWeight: '500',
      color: '#000',
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
      padding: 10,
    },
    title:{
      padding:15,
      fontSize:20,
      textAlign:'center',
      color:'#fff',
      fontWeight:'500'
    },
    ScanButton:{
      textAlign:'center',
      alignItems:'center',
      padding:10,
      fontSize:20,
      height:60,
      width:270,
      backgroundColor:'coral',
      borderRadius:20
    }
    
        
  });
