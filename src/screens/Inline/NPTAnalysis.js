import React, {useContext, useEffect, useState} from 'react';
import {ScanCallbackType, ScanMode, ScanOptions} from 'react-native-ble-plx';
import {StyleSheet, Text, View} from 'react-native';

import {BG_COLOR} from '../../common/style';
import {BleManager} from 'react-native-ble-plx';
import {Dimensions} from 'react-native';
import {GlobalContext} from '../../context/GlobalProvider';
import WebView from 'react-native-webview';
import {getEndPoint} from '../../api';
import {useFocusEffect} from '@react-navigation/native';

export default function NPTAnalysis(props) {
  const manager = new BleManager();
  const [deviceList, setDevice] = useState([]);

  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;
  const {setHeader, token} = useContext(GlobalContext);
  useEffect(() => {
    setHeader('NPT Analysis');
  }, []);

  const myInjectedJs = `(function(){ let tk = window.localStorage.getItem('${token}');
    document.getElementsByTagName('nav')[0].remove();
    document.getElementsByTagName('nb-layout-column')[0].style.backgroundColor='#fff';
    document.getElementsByClassName('layout-container')[0].style.paddingTop=0;
    document.getElementsByClassName('w-25')[0].remove(); 
    document.body.style.userSelect = 'none';
      if(!tk || (tk && tk != '${token}')){ 
        window.localStorage.setItem('auth_app_token', '{"name":"nb:auth:jwt:token","ownerStrategyName":"email","createdAt":1673155312000,"value":"${token}"}'); 
      }
    })();`;

  useFocusEffect(
    React.useCallback(() => {
      setHeader('NPT Analysis');

      const subscription = manager.onStateChange(state => {
        if (state === 'PoweredOn') {
          scanAndConnect();

          subscription.remove();
        }
        console.log(state);
      }, true);
    }, []),
  );

  function scanDevices() {
    manager.devices(re => {
      console.log('device', re);
    });
  }

  function scanAndConnect() {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        console.log(error);
        return;
      }

      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
      if (device.name === 'TI BLE Sensor Tag' || device.name === 'SensorTag') {
        // Stop scanning as it's not necessary if you are scanning for one device.
        manager.stopDeviceScan();

        // Proceed with connection.
      }
      if (device?.name) {
        deviceList.map(dev => {
          if (dev.id !== device.id) {
            deviceList.push(device);
          }
        });
        console.log(device?.name + ' ' + device?.id);
        // console.log('manufacturerData',device.manufacturerData)
      }
    });
  }

  return (
    <View style={styles.container}>
      <>
        <WebView
          showsVerticalScrollIndicator={false}
          javaScriptEnabled={true}
          injectedJavaScript={myInjectedJs}
          originWhitelist={['*']}
          onHttpError={e => console.log(e)}
          // onHttpError={(syntheticEvent) => {
          //     const { nativeEvent } = syntheticEvent;
          //     console.log(
          //       'WebView received error status code: ',
          //       nativeEvent.statusCode,
          //     );
          //   }}
          style={{height: height, width: width}}
          source={{uri: getEndPoint('/#/iot-new/npt-analysis')}}
        />
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: BG_COLOR,
  },
});
