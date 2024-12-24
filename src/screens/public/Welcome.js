import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Lottie from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Welcome(props) {
  useEffect(() => {
    setTimeout(async () => {
      props.navigation.navigate('Login', {
        token: await AsyncStorage.getItem('token'),
      });
    }, 8000);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.logoBox}>
          <Lottie
            speed={1.9}
            style={{width: 300}}
            source={require('./../../../assets/lottie/sewing-intro.json')}
            autoPlay
          />
          <Text
            style={{color: '#fff', fontFamily: 'Lato-Regular', fontSize: 10}}>
            v.1.0.0
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2d3436',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  logoBox: {
    alignItems: 'center',
  },
  lineStyle: {
    borderWidth: 1,
    margin: 10,
    borderBottomColor: '#fff',
    borderColor: '#fff',
    width: '100%',
    marginTop: 20,
  },
});
