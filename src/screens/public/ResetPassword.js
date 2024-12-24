import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import PrimaryButton from '../../common/PrimaryButton';
import SecondaryButton from '../../common/SecondaryButton';
import {BG_COLOR} from '../../common/style';
import SVGImg from './../../assets/logo.svg';

let width = Dimensions.get('screen').width;
let height = Dimensions.get('screen').height;
export default function ResetPassword(props) {
  return (
    <>
      <ScrollView style={{backgroundColor: BG_COLOR}}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <SVGImg width={200} height={150} />
          </View>

          <View style={styles.buttonContainer}>
            <View>
              <PrimaryButton
                onPress={() =>
                  props.navigation.navigate('ResetPasswordWithEmail')
                }
                title="Reset Password"
              />
            </View>

            <SecondaryButton
              onPress={() => props.navigation.navigate('GetUsername')}
              title="Get Username"
            />
          </View>
        </View>
        <View style={styles.bottomText}>
          <Text style={styles.alreadyText}>Already have an account?</Text>
          <Text
            style={styles.loginText}
            onPress={() => props.navigation.navigate('Login')}>
            Log In
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  logoContainer: {
    marginVertical: height * 0.07,
  },

  buttonContainer: {
    marginTop: height * 0.07,
  },
  bottomText: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  alreadyText: {
    fontSize: width * 0.038,
    fontFamily: 'Lato-Regular',
    color: '#4C4C4C',
  },
  loginText: {
    marginLeft: width * 0.03,
    fontSize: width * 0.038,
    fontFamily: 'Lato-Bold',
    color: '#4C4C4C',
  },
});
