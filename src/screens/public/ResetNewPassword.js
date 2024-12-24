import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import React from 'react';
import PrimaryButton from '../../common/PrimaryButton';
import {BG_COLOR} from '../../common/style';
import SVGImg from './../../assets/logo.svg';

let width = Dimensions.get('screen').width;
let height = Dimensions.get('screen').height;
const ResetNewPassword = props => {
  return (
    <ScrollView style={{backgroundColor: BG_COLOR}}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <SVGImg width={200} height={150} />
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.resetPassText}>RESET PASS</Text>
          <Image source={require('../../assets/nidle-vector.png')} />
        </View>
        <View style={styles.loginFormContainer}>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputImage}
              source={require('../../assets/login/password.png')}
            />
            <TextInput
              style={styles.textInput}
              placeholderTextColor="#B9B9B9"
              placeholder="New Password"
            />
            <Image
              style={{width: width * 0.04}}
              source={require('../../assets/login/eye-icon.png')}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputImage}
              source={require('../../assets/login/password.png')}
            />
            <TextInput
              style={styles.textInput}
              placeholderTextColor="#B9B9B9"
              placeholder="Confirm Password"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton title="RESET" />
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
  );
};

export default ResetNewPassword;

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
  resetPassText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 4,
    color: 'black',
  },
  loginFormContainer: {
    marginTop: height * 0.02,
  },
  inputContainer: {
    width: width * 0.78,
    height: height * 0.06,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#C6C6C6',
    marginBottom: height * 0.03,
  },
  inputImage: {
    width: width * 0.08,
    marginLeft: 5,
  },
  textInput: {
    width: width * 0.57,
    marginLeft: 10,
    color: '#4C4C4C',
  },
  loginBottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rememberContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rememberText: {
    fontSize: width * 0.032,
    color: '#7D7D7D',
  },
  buttonContainer: {
    marginTop: height * 0.03,
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
