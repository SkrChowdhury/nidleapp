import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {BG_COLOR} from '../../common/style';
import {Dimensions} from 'react-native';
import {GlobalContext} from '../../context/GlobalProvider';
import WebView from 'react-native-webview';
import {getEndPoint} from '../../api';
import {useFocusEffect} from '@react-navigation/native';

export default function SkillMatrix(props) {
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;
  const {setHeader, token} = useContext(GlobalContext);

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
      setHeader('Skill Matrix');
    }, []),
  );

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
          source={{uri: getEndPoint('/#/iot-new/skill-matrix')}}
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
