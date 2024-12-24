import React, {useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {BG_COLOR} from '../../common/style';
import {Dimensions} from 'react-native';
import {GlobalContext} from '../../context/GlobalProvider';
import WebView from 'react-native-webview';
import {getEndPoint} from '../../api';

export default function LiveDashboard(props) {
  const width = Dimensions.get('screen').width;
  const {setHeader, token} = useContext(GlobalContext);
  useEffect(() => {
    setHeader('Live Monitoring Dashboard');
  }, []);

  useEffect(() => {
    webViewRef.current.reload();
  }, [props.navigation.navigate]);

  const myInjectedJs = `(function(){ let tk = window.localStorage.getItem('${token}');
    document.getElementsByTagName('nav')[0].remove();
    document.getElementsByTagName('nb-layout-column')[0].style.backgroundColor='#fff';
    document.getElementsByClassName('layout-container')[0].style.paddingTop=0;
    document.body.style.userSelect = 'none';
      if(!tk || (tk && tk != '${token}')){ 
        window.localStorage.setItem('auth_app_token', '{"name":"nb:auth:jwt:token","ownerStrategyName":"email","createdAt":1673155312000,"value":"${token}"}'); 
      }
    })();`;

  const webViewRef = useRef();

  return (
    <View style={styles.container}>
      <View>
        <WebView
          ref={ref => (webViewRef.current = ref)}
          showsVerticalScrollIndicator={false}
          javaScriptEnabled={true}
          injectedJavaScript={myInjectedJs}
          originWhitelist={['*']}
          onHttpError={e => console.log(e)}
          onError={syntheticEvent => {
            const {nativeEvent} = syntheticEvent;
            alert('Something went wrong');
          }}
          // onHttpError={(syntheticEvent) => {
          //     const { nativeEvent } = syntheticEvent;
          //     console.log(
          //       'WebView received error status code: ',
          //       nativeEvent.statusCode,
          //     );
          //   }}
          style={{height: 100, width: width}}
          source={{uri: getEndPoint('/#/iot-new/live-monitor')}}
        />
      </View>
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
